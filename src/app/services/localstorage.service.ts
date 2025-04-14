import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private storageKey_modeStude = 'modeStudeBumglo';
  private storageKey_quiz = 'quizBumglo';

  constructor() {}

  async getData(): Promise<any[]> {
    const storageData = localStorage.getItem(this.storageKey_modeStude);
    return storageData ? JSON.parse(storageData) : [];
  }

  saveMaterialsData(data:any){
    localStorage.setItem(this.storageKey_modeStude, JSON.stringify(data));
  }

  async setNewMaterial(id: string, data: any): Promise<void> {
    const existingData = await this.getData();
    const newData = [{ id, data }, ...existingData];
    localStorage.setItem(this.storageKey_modeStude, JSON.stringify(newData));
  }
  
  async getDataById(id:any){
    let dataLocalstorage = await this.getData()
    if (!dataLocalstorage) return null;
    let result = dataLocalstorage.find((item:any) => item.id === id)
    return result
  }


  async deleteMaterial(id:string){
    let dataLocalStorage = await this.getData()
    let res =  dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })
    return res
  }
  





  async getDataQuiz(): Promise<any[]> {
    const storageData = localStorage.getItem(this.storageKey_quiz);
    return storageData ? JSON.parse(storageData) : [];
  }


  async setNewQuiz(id:string, questions:any):Promise<void>{
    // const existingData = await this.deleteQuiz(id) //si hay hubiese un quiz con el mismo id lo elimino

    let dataLocalStorage = await this.getDataQuiz()
    //si hay hubiese un quiz con el mismo id lo elimino
    let existingData =  dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })

    const newData = [{ id, questions }, ...existingData];
    localStorage.setItem(this.storageKey_quiz, JSON.stringify(newData));
  }

  async getDataQuizById(id:any){
    let dataLocalstorage = await this.getDataQuiz()
    if (!dataLocalstorage) return null;
    let result = dataLocalstorage.find((item:any) => item.id === id)
    return result
  }

  async saveQuizzesData(data: any[]): Promise<void> {
    localStorage.setItem(this.storageKey_quiz, JSON.stringify(data));
  }

  async deleteQuiz(id:string){
    let dataLocalStorage = await this.getDataQuiz()
    let res =  dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })
   this.saveQuizzesData(res)
  }
}
