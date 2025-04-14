import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

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
    await this.localStorageServices.deleteQuiz(this.data[0].idQuiz)
    location.reload();
    
  }

  back(){
    this.location.back()
  }

  getPorcentage(numQuestions: number, numAnsweraCorrect: number): number {
    let result = (numAnsweraCorrect / numQuestions) * 100;
    return Math.round(result);
  }
}
