import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';
import { SidebarService } from '../../../services-interfas/sidebar.service';
import { ModalUploadContentService } from '../../../services-interfas/modal-upload-content.service';
import { DataGeneratorServiceService } from '../../../services/data-generator-service.service';
import { FileUploadOptionsComponent } from '../../../file-upload-options/file-upload-options.component';
import { QuizSetupComponent } from '../../../quiz/quiz-setup/quiz-setup.component';
import { Loader1Component } from '../../../../../loader1/loader1.component';
import { CommonModule } from '@angular/common';
import { QuizOptionsModalComponent } from '../../../shared/modals/modal-quiz/quiz-options-modal/quiz-options-modal.component';

@Component({
  selector: 'app-quiz-setup-of-summarize',
  imports: [QuizOptionsModalComponent, CommonModule, Loader1Component, QuizSetupComponent, FileUploadOptionsComponent],
  templateUrl: './quiz-setup-of-summarize.component.html',
  styleUrl: './quiz-setup-of-summarize.component.css'
})
export class QuizSetupOfSummarizeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private localStorageServices:LocalstorageService,
              private sidebarServices:SidebarService ,
              private modalUploadOptionServices:ModalUploadContentService, 
              private generatedData:DataGeneratorServiceService,
              private router: Router
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
  description:string = '';
  type!:string;
  name!:string;

  textForQuiz:any= '';
  idSummarize:any;
  indexOfSumarize:any;
  idForQuiz:string = '';

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idSummarize = params.get('idsummarize');
      this.indexOfSumarize = params.get('indexsummarize');
    });
    
    this.textForQuiz = await this.getTextSummarize()
    this.showModalPersonaliceQuiz = true
  }

  async getTextSummarize(){
    const sumarize:any = await this.localStorageServices.getDataSumarizeByID(this.idSummarize)
    const aSummaryPoint = sumarize[0].data.resumenes[this.indexOfSumarize].descripcion
    return aSummaryPoint
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
      this.name = 'Quiz';
      this.type = 'quiz-from-the-summary'

      this.generarIDSeguro().then(generado => {
          this.idForQuiz = generado;
      });

      this.description = await this.generatedData.description(this.textForQuiz, 'quiz')
      this.quizData = await this.generatedData.quiz(this.textForQuiz, this.numQuestions, this.numSelecOption, []);
      const url = '/material/summarize/'+this.idSummarize+'/'+this.type+'/'+this.idForQuiz
      await this.localStorageServices.setNewMaterial(this.idForQuiz, this.quizData, this.type, this.textForQuiz, this.description, this.name, url); //Guardo la data del quiz
      await this.router.navigate([url]);
  }

  async generarIDSeguro(): Promise<string> {
    const aleatorio = crypto.getRandomValues(new Uint8Array(16));
    const timestamp = new TextEncoder().encode(Date.now().toString());
    const data = new Uint8Array([...timestamp, ...aleatorio]);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
  }
}
