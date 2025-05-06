import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../../../services/localstorage.service';

@Component({
  selector: 'app-modal-result-of-question',
  imports: [CommonModule],
  templateUrl: './modal-result-of-question.component.html',
  styleUrl: './modal-result-of-question.component.css'
})
export class ModalResultOfQuestionComponent implements OnInit {

  constructor(private location:Location, private localStorageServices:LocalstorageService, private router:Router){}

  @Input() data?:any; 
  ngOnInit(): void {
    console.log(this.data)
  }

  async generarNuevoQuiz() {
    this.router.navigate(['material/mode-studio/quiz-setup/'+this.data[0].idQuiz])
    // eliminar el qiz del material mode- estudio
    this.deleteQuizFromTheMaterialModeStudio(this.data[0].idQuiz)
  }

  back(){
    this.location.back()
  }

  async deleteQuizFromTheMaterialModeStudio(id:string){
    await this.localStorageServices.deleteQuizOfTheModeStudio(id)
  }

  getPorcentage(numQuestions: number, numAnsweraCorrect: number): number {
    let result = (numAnsweraCorrect / numQuestions) * 100;
    return Math.round(result);
  }
}
