
import { QuizOptionsModalComponent } from '../../shared/modals/modal-quiz/quiz-options-modal/quiz-options-modal.component';
import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { Loader1Component } from '../../../../loader1/loader1.component';
import { FileUploadOptionsComponent } from '../../file-upload-options/file-upload-options.component';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { ApiModelo } from '../../services/api-modelo1.service';
import { PromptService } from '../../services/prompt.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadContentService } from '../../services-interfas/modal-upload-content.service';
import { DataGeneratorServiceService } from '../../services/data-generator-service.service';


@Component({
  selector: 'app-quiz-setup',
  imports: [QuizOptionsModalComponent, CommonModule, Loader1Component, QuizSetupComponent, FileUploadOptionsComponent],
  templateUrl: './quiz-setup.component.html',
  styleUrl: './quiz-setup.component.css'
})
export class QuizSetupComponent implements OnInit{

  constructor(private sidebarServices:SidebarService ,
              private localStorageServices:LocalstorageService, 
              private route: ActivatedRoute,
              private router: Router,
              private modalUploadOptionServices:ModalUploadContentService, 
              private generatedData:DataGeneratorServiceService
            ){}
  
  showModalPersonaliceQuiz:boolean = false;
  showLoader1:boolean = false;
  showModalSession:boolean = false;
  showQuesions:boolean = false;
  showBtnGeneratedInitialQuiz!:boolean;
  showModalUlploadOptions!:boolean;
  showBtnGeneratedNewQuiz!:boolean;
  id!:any
  quizData:any[]=[]
  numQuestions:number=10
  numSelecOption:number = 3
  textToGenerateQuiz:any;
  titulo:string = '';
  
  ngOnInit(): void {
    this.sidebarServices.Display_None();
    this.id = this.getIdOfTheUrl() || '';  // Obtener ID desde la URL

    // Si existe un ID en la URL, recuperamos el texto asociado desde LocalStorage
    if (this.id) {
      this.loadQuizData(this.id);  // Cargar el quiz existente
      this.showModalPersonaliceQuiz = true;
    } else {
      this.modalUploadOptionServices.updateState(true)  // Mostrar opción de crear un nuevo quiz
    }

    this.modalUploadOptionServices.state$.subscribe((state: boolean) => {
      this.showModalUlploadOptions = state;
    });
  }



  // si en la url hay un id la obtengo
  getIdOfTheUrl(){
    return this.route.snapshot.paramMap.get('id');
  }


  async loadQuizData(id: string) {
    const quiz = await this.localStorageServices.getDataQuizByID(id);
    if (quiz) {
      this.textToGenerateQuiz = quiz[0].text;  // Usamos el texto almacenado para regenerar el quiz
      this.titulo = quiz[0].titulo;
      this.modalUploadOptionServices.updateState(false)
      this.showModalPersonaliceQuiz = true;  // Mostrar el modal de personalización
    } else {
      console.error('No se encontró el quiz en el localStorage con el ID:', id);
      this.router.navigate(['/home'])
    }
  }


  async recivedTextToGenerateQuiz(data:any){
    this.textToGenerateQuiz = await data;
    this.showModalPersonaliceQuiz = true;
  }
  
  async recivedDataPerzonaliceQuestions(dataConfigQuestions:any){
    this.numQuestions = dataConfigQuestions.numQuestions;
    this.numSelecOption = dataConfigQuestions.numSelecOption;
    this.generateInitialQuiz()
  }
  
  
  async generateInitialQuiz(){
    this.sidebarServices.Display_None();
    this.showModalPersonaliceQuiz=false;
    this.showLoader1=true;
    
    // Si no hay un id generado, generamos uno nuevo
    if (!this.id) {
      this.generarIDSeguro().then(generado => {
        this.id = generado;
      });
    }

    if(!this.titulo){
      this.titulo = await this.generatedData.titulo(this.textToGenerateQuiz, 'quiz')
    }

    this.quizData = await this.generatedData.quiz(this.textToGenerateQuiz, this.numQuestions, this.numSelecOption, []);
    // si ya exite un quiz igual se debe eliminar
    await this.localStorageServices.setNewMaterial(this.id, this.quizData, 'quiz', this.textToGenerateQuiz, this.titulo); //Guardo la data del quiz
    await this.router.navigate(['/quiz/',this.id]);
  }

  async generarIDSeguro(): Promise<string> {
    const aleatorio = crypto.getRandomValues(new Uint8Array(16));
    const timestamp = new TextEncoder().encode(Date.now().toString());
    const data = new Uint8Array([...timestamp, ...aleatorio]);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
  }
  
  async deleteQuiz(id:string){
    
    let dataLocalStorage = await this.localStorageServices.getMaterialsData()
    let res =  dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })
    
    return res
  }
  
}
