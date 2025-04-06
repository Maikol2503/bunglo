import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-options-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-options-modal.component.html',
  styleUrl: './quiz-options-modal.component.css'
})
export class QuizOptionsModalComponent {

  numQuestions:number=2
  @Output() dataPersonaliceQuestions = new EventEmitter<any>();

  generateQuiz(){
    const data = {
      'numQuestions':this.numQuestions
    }
    this.dataPersonaliceQuestions.emit(data)
  }

}
