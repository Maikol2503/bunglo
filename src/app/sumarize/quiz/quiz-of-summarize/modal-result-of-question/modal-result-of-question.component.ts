import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-modal-result-of-question',
  imports: [CommonModule],
  templateUrl: './modal-result-of-question.component.html',
  styleUrl: './modal-result-of-question.component.css'
})
export class ModalResultOfQuestionComponent implements OnInit {

  constructor(
    private location:Location, 
    private localStorageServices:LocalstorageService, 
    private router:Router,
    private route:ActivatedRoute
  ){}

  idSummarize:any

  @Input() data?:any; 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idSummarize = params.get('idsummarize');
    });
    
  }

  async generarNuevoQuiz() {
    this.router.navigate(['/quiz-setup/'+this.data[0].idQuiz])
    
  }

  back(){
    this.router.navigate(['/home'])
    // console.log(this.idSummarize)
    // if(this.idSummarize){
    //   this.router.navigate(['/material/summarize/'+this.idSummarize])
    // }
    // this.router.navigate(['/quiz-setup/'+this.data[0].idQuiz])
  }

  getPorcentage(numQuestions: number, numAnsweraCorrect: number): number {
    let result = (numAnsweraCorrect / numQuestions) * 100;
    return Math.round(result);
  }
}
