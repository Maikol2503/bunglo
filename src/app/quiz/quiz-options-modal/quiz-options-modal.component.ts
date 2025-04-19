import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-quiz-options-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-options-modal.component.html',
  styleUrl: './quiz-options-modal.component.css'
})
export class QuizOptionsModalComponent {
  constructor(private location:Location, private eRef: ElementRef){}
  numQuestions:number=2;
  numSelectedOption:number = 4;
  openModalNumQuestions:boolean = false;
  openModalNumOption:boolean = false;

  @Output() dataPersonaliceQuestions = new EventEmitter<any>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    this.openModalNumQuestions = false;
    this.openModalNumOption = false;
  }
  

  generateQuiz(){
    const data = {
      'numQuestions':this.numQuestions,
      'numSelecOption':this.numSelectedOption
    }
    this.dataPersonaliceQuestions.emit(data)
  }

  applyNumQuestions(num:number){
    this.numQuestions = num
    this.openModalNumQuestions = false
  }

  applyNumSelectedOption(num:number){
    this.numSelectedOption = num
    this.openModalNumOption = false

  }

  togleModalSelectedOption(){
    this.openModalNumOption = this.openModalNumOption ? false : true 
    this.openModalNumQuestions = false
  }

  togleModalNumQuestion(){
    this.openModalNumQuestions = this.openModalNumQuestions ? false : true
    this.openModalNumOption = false
  }


  back(){
    this.location.back()
  }
}
