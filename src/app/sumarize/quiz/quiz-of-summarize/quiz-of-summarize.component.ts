import { AfterContentInit, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';
import { SidebarService } from '../../../services-interfas/sidebar.service';
import { ModalUploadContentService } from '../../../services-interfas/modal-upload-content.service';
import { DataGeneratorServiceService } from '../../../services/data-generator-service.service';
import { register } from 'swiper/element/bundle';
import { ModalChuletaComponent } from './modal-chuleta/modal-chuleta.component';
import { ModalResultOfQuestionComponent } from './modal-result-of-question/modal-result-of-question.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
register();

// Modelo para las preguntas
interface Question {
  question: string;
  answer_correct: string;
  options: any[]; // Se generarán dinámicamente
  answered: boolean; // Controla si ya se respondió la pregunta
  selected_answer?: string;
  explanation:string;
}




@Component({
  selector: 'app-quiz-of-summarize',
  imports: [CommonModule, FormsModule, ModalResultOfQuestionComponent, RouterModule, ModalChuletaComponent],
  templateUrl: './quiz-of-summarize.component.html',
  styleUrl: './quiz-of-summarize.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuizOfSummarizeComponent { 
  
      constructor(
                    private route: ActivatedRoute,
                    private localStorageServices:LocalstorageService,
                    private sidebarServices:SidebarService ,
                    private modalUploadOptionServices:ModalUploadContentService, 
                    private generatedData:DataGeneratorServiceService,
                    private router: Router,
                    private location:Location
      ){}

      // @Input() data!: any[];  
  data!:any
  questions:Question[]=[]
  id!:any
  progress = 0
  currentStep = 0;
  totalSteps = 0;
  currentIndex: number = 0;
  showModalResultOfQuiz:boolean=false
  showQuiz:boolean=true
  dataResultOfQuiz:any[] = [];
  explanation:any;
  showModalChuleta:boolean=false;
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  ngOnInit() {
    this.sidebarServices.Display_None()
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });


   
    this.getData()
  }

  async getData(){
    this.data = await this.localStorageServices.getDataQuizByID(this.id)
    this.data = this.data[0].data
    this.totalSteps = this.data.length;
    this.currentStep=1;
    this.updateProgress();
    this.explanation = this.data[this.currentIndex].explanation
    return this.data
  }



  goToNext() {
    if (this.swiperRef?.nativeElement?.swiper) {
      
      this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex + 1
      this.explanation = this.data[this.currentIndex].explanation
      this.swiperRef.nativeElement.swiper.slideNext();
     
    }
    this.currentStep++;
    this.updateProgress()
  }
  
  goToPrevious() {
    this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex === 0 ? 1 : this.swiperRef?.nativeElement?.swiper.activeIndex - 1
    
    if (this.swiperRef?.nativeElement?.swiper) {
      this.explanation = this.data[this.currentIndex].explanation
      console.log(this.explanation)
      this.swiperRef.nativeElement.swiper.slidePrev();
    }
    this.currentStep--;
    this.updateProgress()


  }

  async seleccionarRespuesta(question: Question, option: string, index: number) {
    if (!question.answered) {
      question.selected_answer = option;
      question.answered = true;
    }
  
    await this.actualizarQuizRespondido(index, option);

  

  
  }



 

  updateProgress = () => {
    this.progress = (this.currentStep / this.totalSteps) * 100;
    console.log(this.progress)
  };











  
  private async actualizarQuizRespondido(index: number, selectedOption: string): Promise<void> {
    const allMaterials = await this.localStorageServices.getMaterialsData();
    const UpdateData = allMaterials.map((material:any)=>{
      
      if(material.type === 'quiz-from-the-summary' && material.id === this.id){
        material.data[index].selected_answer = selectedOption;
        material.data[index].answered = true
      }

      return material
    })

    await this.localStorageServices.saveMaterialsData(UpdateData);
  }
  
  



  toggleModalChuleta(){
    this.showModalChuleta = !this.showModalChuleta;
  }










  showModalResulOftQuiz() {
    this.showModalResultOfQuiz = true;
    this.showQuiz = false;
  
    let correctas = 0;
    let incorrectas = 0;
  
    this.data.forEach((q: Question) => {
      if (q.answered && q.selected_answer) {
        if (q.selected_answer === q.answer_correct) {
          correctas++;
        } else {
          incorrectas++;
        }
      }
    });
  
    this.dataResultOfQuiz = [
      {
        idQuiz:this.id,
        numQuestions: this.data.length,
        correctas: correctas,
        incorrectas: incorrectas
      }
    ];

    console.log(this.dataResultOfQuiz)
  }
  

  back(){
    this.location.back()
  }
  
}
