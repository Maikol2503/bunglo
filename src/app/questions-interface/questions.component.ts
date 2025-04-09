import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { LocalstorageService } from '../services/localstorage.service';
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
  selector: 'app-questions',
  imports: [CommonModule, FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionsComponent implements OnInit {

  constructor(private LocalStorageServices:LocalstorageService){}

  @Input() data!: any[];  
  questions:Question[]=[]
  @Input() id!: string; 
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  ngOnInit(): void {
    this.questions=this.data
  }

  currentIndex: number = 0;



  goToNext() {
    if (this.swiperRef?.nativeElement?.swiper) {
      
      this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex + 1
      this.swiperRef.nativeElement.swiper.slideNext();
     
    }
  }
  
  goToPrevious() {
    this.currentIndex = this.swiperRef?.nativeElement?.swiper.activeIndex === 0 ? 1 : this.swiperRef?.nativeElement?.swiper.activeIndex - 1
    
    if (this.swiperRef?.nativeElement?.swiper) {
      this.swiperRef.nativeElement.swiper.slidePrev();
    }
  }

  async seleccionarRespuesta(question: Question, option: string, index: number) {
    if (!question.answered) {
      question.selected_answer = option;
      question.answered = true;
    }
  
    if (this.swiperRef?.nativeElement?.swiper) {
      this.swiperRef.nativeElement.swiper.allowTouchMove = true;
    }
    await this.actualizarQuizRespondido(index, option);
  }
  
  private async actualizarQuizRespondido(index: number, selectedOption: string): Promise<void> {
    const allQuestionnaires = await this.LocalStorageServices.getDataQuiz();
    const updatedQuizzes = allQuestionnaires.map((quiz: any) => {
      if (quiz.id === this.id) {
        const updatedQuestions = quiz.questions.map((q: Question, i: number) => {
          if (i === index) {
            return {
              ...q,
              answered: true,
              selected_answer: selectedOption
            };
          }
          return q;
        });
  
        return {
          ...quiz,
          questions: updatedQuestions
        };
      }
      return quiz;
    });
  
    await this.LocalStorageServices.saveQuizzesData(updatedQuizzes);
  }
  
  
  
}
