import { Component, OnInit } from '@angular/core';
import { QuizOptionsModalComponent } from '../../../../shared/modals/modal-quiz/quiz-options-modal/quiz-options-modal.component';
import { CommonModule } from '@angular/common';
import { FileUploadOptionsComponent } from '../../../../file-upload-options/file-upload-options.component';
import { QuizSetupComponent } from '../../../../quiz/quiz-setup/quiz-setup.component';
import { Loader1Component } from '../../../../../../loader1/loader1.component';
import { SidebarService } from '../../../../services-interfas/sidebar.service';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalUploadContentService } from '../../../../services-interfas/modal-upload-content.service';
import { DataGeneratorServiceService } from '../../../../services/data-generator-service.service';
import { CloseComponent } from '../../../../shared/buttoms/close/close.component';

@Component({
  selector: 'app-mode-studio-quiz-setup',
  imports: [QuizOptionsModalComponent, RouterModule, CommonModule, Loader1Component, QuizSetupComponent, FileUploadOptionsComponent, CloseComponent],
  templateUrl: './mode-studio-quiz-setup.component.html',
  styleUrl: './mode-studio-quiz-setup.component.css'
})
export class ModeStudioQuizSetupComponent implements OnInit{

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
  quizData:any
  numQuestions:number=10
  numSelecOption:number = 3
  textToGenerateQuiz:any;
  titulo:string = '';
  materialData:any;
  
  async ngOnInit(){
    
    this.sidebarServices.Display_None();
    this.id = this.getIdOfTheUrl() || '';
    this.quizData= await this.getQuizData();
    this.materialData = await this.getMaterialData(this.id)
    if(!this.quizData || this.quizData.length === 0){
      this.showModalPersonaliceQuiz = true
    }

    if(!this.quizData || this.quizData.length > 0){
      this.router.navigate(['/material/mode-studio/quiz-play/'+this.id])
    }
  }

  getIdOfTheUrl(){
    return this.route.snapshot.paramMap.get('id');
  }

  async getMaterialData(id:any):Promise<any>{
    const materialData = await this.localStorageServices.getMaterialDataById(id);
    return materialData
  }

  async getQuizData():Promise<any>{
    const materialData = await this.getMaterialData(this.id)
    const quizData = await materialData.data.quiz
    return quizData
  }

  async recivedDataPerzonaliceQuestions(dataConfigQuestions:any){
    this.numQuestions = dataConfigQuestions.numQuestions;
    this.numSelecOption = dataConfigQuestions.numSelecOption;
    this.handleQuizCreationFlow()
  }

   async handleQuizCreationFlow(){
    this.showLoader1=true;
    this.showModalPersonaliceQuiz=false;
    await this.generateDataQuiz();
    await this.saveQuizDataToMaterial()
    await this.router.navigate(['/material/mode-studio/quiz-play/',this.id]);
    this.showLoader1=false;
  }

  async generateDataQuiz(){
    const textList = this.materialData.data.sumarize.resumenes;
    const text = textList.map((item: any) => 
        `• ${item.titulo}: ${item.descripcion}`
    ).join('\n\n');
    this.textToGenerateQuiz = text;
    console.log(this.textToGenerateQuiz)
    this.quizData = await this.generatedData.quiz(this.textToGenerateQuiz, this.numQuestions, this.numSelecOption, [])
  }

  async saveQuizDataToMaterial() {
    const updatedMaterial = {
      ...this.materialData,
      data: {
        ...this.materialData.data,
        quiz: this.quizData
      }
    };
    
    await this.localStorageServices.setNewMaterial(
      updatedMaterial.id,
      updatedMaterial.data,
      'mode-studio',
      updatedMaterial.text,
      updatedMaterial.description,
      updatedMaterial.name
    );
  }



 





















  // si en la url hay un id la obtengo
  // async loadQuizData(id: string) {
  //   const quiz = await this.localStorageServices.getDataQuizByID(id);
  //   if (quiz) {
  //     this.textToGenerateQuiz = quiz[0].text;  // Usamos el texto almacenado para regenerar el quiz
  //     this.titulo = quiz[0].titulo;
  //     this.modalUploadOptionServices.updateState(false)
  //     this.showModalPersonaliceQuiz = true;  // Mostrar el modal de personalización
  //   } else {
  //     console.error('No se encontró el quiz en el localStorage con el ID:', id);
  //     this.router.navigate(['/home'])
  //   }
  // }


  
  
  
  
  // async generateInitialQuiz(){
  //   this.sidebarServices.Display_None();
  //   this.showModalPersonaliceQuiz=false;
  //   this.showLoader1=true;
  //   this.quizData = await this.generatedData.quiz(this.textToGenerateQuiz, this.numQuestions, this.numSelecOption, []);
  //   await this.localStorageServices.setNewMaterial(this.id, this.quizData, 'quiz', this.textToGenerateQuiz, this.titulo); //Guardo la data del quiz
  //   await this.router.navigate(['/material/mode-studio/quiz-play',this.id]);
  // }


  
}
