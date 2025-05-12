import { AfterContentInit, AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LocalstorageService } from '../../../../services/localstorage.service';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { CommonModule, Location } from '@angular/common';
import { ModalResultOfQuestionComponent } from './modal-result-of-question/modal-result-of-question.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../../sidebar/sidebar.component';
import { SidebarService } from '../../../../services-interfas/sidebar.service';
import { ModalChuletaComponent } from './modal-chuleta/modal-chuleta.component';
register();

interface Question {
  question: string;
  answer_correct: string;
  options: any[]; // Se generarán dinámicamente
  answered: boolean; // Controla si ya se respondió la pregunta
  selected_answer?: string;
  explanation:string;
}
@Component({
  selector: 'app-mode-studio-quiz',
  imports: [CommonModule, FormsModule, ModalResultOfQuestionComponent, RouterModule, ModalChuletaComponent],
  templateUrl: './mode-studio-quiz.component.html',
  styleUrl: './mode-studio-quiz.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModeStudioQuizComponent implements OnInit {

  constructor(private LocalStorageServices:LocalstorageService, private location:Location, private route: ActivatedRoute, private sideBarServices:SidebarService){}
  // deberia hacer la consulta a al materia de modo estudio y sacer el quiz 
  dataQuiz: any[] = [];
  questions:any
  id!:any
  progress = 0
  currentStep = 0;
  totalSteps = 0;
  currentIndex: number = 0;
  showModalResultOfQuiz:boolean=false
  showQuiz:boolean=true
  dataResultOfQuiz:any[] = []
  explanation:any;
   showModalChuleta:boolean=false;
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  ngOnInit() {
    this.sideBarServices.Display_None()
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
   
    this.getData()
  }






  async getData(){
    const materialData = await this.LocalStorageServices.getMaterialDataById(this.id)
    this.dataQuiz = materialData.data.quiz
    // this.data = await this.LocalStorageServices.getDataQuizByID(this.id)
    this.totalSteps = this.dataQuiz.length;
    this.currentStep=1;
    this.updateProgress();
    this.explanation = this.dataQuiz[this.currentIndex].explanation
    return 
  }



  goToNext() {
    if (this.swiperRef?.nativeElement?.swiper) {
      
      this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex + 1
      this.swiperRef.nativeElement.swiper.slideNext();
      this.explanation = this.dataQuiz[this.currentIndex].explanation
    }
    this.currentStep++;
    this.updateProgress()
  }
  
  goToPrevious() {
    this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex === 0 ? 1 : this.swiperRef?.nativeElement?.swiper.activeIndex - 1
    
    if (this.swiperRef?.nativeElement?.swiper) {
      this.swiperRef.nativeElement.swiper.slidePrev();
      this.explanation = this.dataQuiz[this.currentIndex].explanation
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
      
  };











  
  private async actualizarQuizRespondido(index: number, selectedOption: string): Promise<void> {
    const allMaterials = await this.LocalStorageServices.getMaterialsData();
    const UpdateData = allMaterials.map((material:any)=>{
      
      if(material.type === 'mode-studio' && material.id === this.id){
        material.data.quiz[index].selected_answer = selectedOption;
        material.data.quiz[index].answered = true
      }

      return material
    })

    await this.LocalStorageServices.saveMaterialsData(UpdateData);
  }
  
  









 toggleModalChuleta(){
    this.showModalChuleta = !this.showModalChuleta;
  }




  showModalResulOftQuiz() {
    this.showModalResultOfQuiz = true;
    this.showQuiz = false;
  
    let correctas = 0;
    let incorrectas = 0;
  
    this.dataQuiz.forEach((q: Question) => {
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
        numQuestions: this.dataQuiz.length,
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

