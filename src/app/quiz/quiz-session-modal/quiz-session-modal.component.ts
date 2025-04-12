import { Component, EventEmitter, Output } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-quiz-session-modal',
  imports: [],
  templateUrl: './quiz-session-modal.component.html',
  styleUrl: './quiz-session-modal.component.css'
})
export class QuizSessionModalComponent {

  constructor(private location:Location){}
 
  @Output() dataSession = new EventEmitter<any>();

  sessionQuiz(session:string){
    const data:any = session
    this.dataSession.emit(data)
  }

  back(){
    this.location.back()
  }

  
}
