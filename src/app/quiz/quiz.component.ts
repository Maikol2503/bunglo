import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuizOptionsModalComponent } from './quiz-options-modal/quiz-options-modal.component';
import { Loader1Component } from './loader1/loader1.component';
import { QuestionsComponent } from '../questions-interface/questions.component';
import { ApiModelo } from '../services/api-modelo1.service';
import { PromptService } from '../services/prompt.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { SidebarService } from '../services-interfas/sidebar.service';
import { QuizSessionModalComponent } from './quiz-session-modal/quiz-session-modal.component';

@Component({
  selector: 'app-quiz',
  imports: [QuizOptionsModalComponent, CommonModule, Loader1Component, QuestionsComponent, QuizSessionModalComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  constructor(private sidebarServices:SidebarService ,
              private modelservices:ApiModelo, 
              private promptServices:PromptService, 
              private localStorageServices:LocalstorageService, 
              private route: ActivatedRoute){}
  
  showModalPersonaliceQuiz:boolean = false;
  showLoader1:boolean = false;
  showModalSession:boolean = false;
  showQuesions:boolean = false;
  id!:any
  quizData:any[]=[]
  numQuestions:number=2
  
  ngOnInit(): void {
    this.sidebarServices.set_SideBar_State_Minimize(true);
    this.sidebarServices.Display_None()
    // Escuchar los cambios en el parámetro 'id' de la ruta
    this.route.paramMap.subscribe(async params => {
      this.id = params.get('id'); // Obtener el 'id' de la URL
    });

    this.initQuiz()
  }

  async initQuiz(){
    this.quizData = await this.loadQuiz()
    if(this.quizData){
      this.showModalSession=true;
    } else {
      this.showModalSession=false;
      this.showModalPersonaliceQuiz=true;
    }
  }

  sessionQuiz(data:any){
    this.showModalSession=false
    if(data === 'nuevo'){
      
      this.showModalPersonaliceQuiz=true
      return
    }
    this.showQuesions=true
  }


  async loadQuiz() {
    let res = await this.localStorageServices.getDataQuizById(this.id);
    if(!res){
      return null
    }
    return this.quizData = res.questions;
  }
  

  async recivedDataPerzonaliceQuestions(dataConfigQuestions:any){
    let data = await this.deleteQuiz(this.id)
    this.sidebarServices.Display_None()
    this.showModalPersonaliceQuiz=false;
    this.showLoader1=true;
    this.numQuestions = dataConfigQuestions.numQuestions
    this.senToApi()
  }

  async getText(id:string){
    let data = await this.localStorageServices.getDataById(id)
    let text = data.data.text
    return text
  }

  async senToApi() {
    let allPreguntas: any[] = [];
    let text = await this.getText(this.id);
  
    this.showLoader1 = true;
  
    while (allPreguntas.length < this.numQuestions) {
      console.log('entro el el wile')
      console.log(allPreguntas.length, 'preguntas generadas')
      let faltan = Math.abs(allPreguntas.length - this.numQuestions);
      const prompt = this.promptServices.getQuizPrompt(text, faltan, allPreguntas);
      console.log(prompt)
      const response: any = await new Promise((resolve) => {
        this.modelservices.getCompletion(prompt).subscribe(resolve);
      });
  
      const data = response.choices[0].message.content;
      const nuevasPreguntas = this.extraerJSON(data) || [];
    
      // Eliminar duplicadas por texto de pregunta
      const nuevasFiltradas = nuevasPreguntas.filter((p:any) =>
        !allPreguntas.some(prev => prev.pregunta === p.pregunta)
      );
  
      allPreguntas.push(...nuevasFiltradas);
    }
  
    // Si se pasaron, cortamos el exceso
    allPreguntas = allPreguntas.slice(0, this.numQuestions);
  
    // Formatear y guardar
    this.quizData = this.formatQuestion(allPreguntas);
    this.localStorageServices.setNewQuiz(this.id, this.quizData);
    this.showLoader1 = false;
    this.showQuesions = true;
  }
  


  extraerJSON(texto: string): any {
    // Buscar JSON encerrado en triple comillas invertidas con o sin 'json'
    const match = texto.match(/```(?:json\n)?([\s\S]*?)\n```/);
    let jsonStr = match ? match[1] : texto.trim(); // Si hay coincidencia, usar el contenido, sino usar el texto completo
    try {
      // Verifica si ya es un JSON válido
      if (jsonStr.startsWith("{") || jsonStr.startsWith("[")) {
        return JSON.parse(jsonStr);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
    return texto; // Si no cumple con los formatos esperados
  }


  formatQuestion(questions: any[]): any[] {
    return questions.map(data => ({
      question: data.pregunta,
      options: this.shuffle([...data.respuestas_incorrectas || [], data.respuesta_correcta]), // Evita errores si es undefined
      explanation: data.explicacion || '',
      answer_correct: data.respuesta_correcta,
      answered: false,
      selected_answer: ''
    }));
  }
  

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }


  async deleteQuiz(id:string){
    
    let dataLocalStorage = await this.localStorageServices.getDataQuiz()
    let res =  dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })
    
    return res
  }

}
