import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private storageKey_modeStude = 'modeStudeBumglo';
  private storageKey_quiz = 'quizBumglo';

  private storageKeyMatrials = 'materials'

  constructor() {}



  async setNewMaterial(id: string, data: any, type: string, text: string, description: string, name: string, url:string): Promise<void> {
    const existingData = await this.getMaterialsData();
    const index = existingData.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      existingData[index] = { id, data, type, text, description, name, url };
    } else {
      // Si no existe, lo agregamos
      existingData.push({ id, data, type, text, description, name, url });
    }
    localStorage.setItem(this.storageKeyMatrials, JSON.stringify(existingData));
  }
  
  async getMaterialsData(): Promise<any> {
    const storageData = localStorage.getItem(this.storageKeyMatrials);
    const data = storageData ? JSON.parse(storageData) : [];
    return data.reverse(); // <- esto invierte el orden
  }

  async getMaterialDataById(id:string): Promise<any>{
    const storageData = localStorage.getItem(this.storageKeyMatrials);
    if(storageData){
      const parsedData = JSON.parse(storageData);
      const item = parsedData.find((item: any) => item.id === id);
      return item || null;
    }
    return [];
  }

  async saveMaterialsData(data:any){
    localStorage.setItem(this.storageKeyMatrials, JSON.stringify(data));
  }

  async deleteMaterial(id:string){
    let dataLocalStorage = await this.getMaterialsData()
    let res = await dataLocalStorage.filter((item:any)=>{
      if(item.id !== id){
        return item
      }
    })

    await this.saveMaterialsData(res)
  }



  //QUIZ
  async getDataQuizAll(): Promise<any>{
    const storageData = await this.getMaterialsData();
    console.log(storageData)
    let res =  storageData.filter((item:any)=>{
      if(item.type === 'quiz' || item.type === 'quiz-from-the-summary'){
        return item
      }
    })
    return res;
  }

  async getDataQuizByID(id:string): Promise<any>{
   const quiz = await this.getDataQuizAll();
   
   let res =  quiz.filter((item:any)=>{
    if(item.id === id){
      return item
    }
  })
  return res
  }


  //MINDMAP
  async getDataMindMapAll():Promise<any>{
    const storageData = await this.getMaterialsData();
    let res =  storageData.filter((item:any)=>{
      if(item.type === 'mindmap'){
        return item
      }
    })
    return res;
  }

  async getDataMindMapByID(id:string): Promise<any[]>{
    const quiz = await this.getDataMindMapAll();
    let res =  quiz.filter((item:any)=>{
     if(item.id === id){
       return item
     }
   })
   return res
  }

  //SUMARIZE
  async getDataSumarizeAll():Promise<any>{
    const storageData = await this.getMaterialsData();
    let res =  storageData.filter((item:any)=>{
      if(item.type === 'sumarize'){
        return item
      }
    })
    return res;
  }

  async getDataSumarizeByID(id:string): Promise<any[]>{
    const quiz = await this.getDataSumarizeAll();
    let res =  quiz.filter((item:any)=>{
     if(item.id === id){
       return item
     }
   })
   return res
  }


  //MODE STUDIO
  async getDataModeStudioAll():Promise<any>{
    const storageData = await this.getMaterialsData();
    let res =  storageData.filter((item:any)=>{
      if(item.type === 'mode-studio'){
        return item
      }
    })
    return res;
  }

  async getDataModeStudioByID(id:string): Promise<any[]>{
    const quiz = await this.getDataModeStudioAll();
    let res =  quiz.filter((item:any)=>{
     if(item.id === id){
       return item
     }
   })
   return res
  }


  async deleteQuizOfTheModeStudio(id: string): Promise<void> {
    const material:any = await this.getDataModeStudioByID(id);

    const updatedMaterial = {
      ...material[0],
      data: {
        ...material[0].data,
        quiz: []
      }
    };

 
    await this.setNewMaterial(updatedMaterial.id, updatedMaterial.data, updatedMaterial.type, updatedMaterial.text, updatedMaterial.description, updatedMaterial.name, updatedMaterial.url);
  
  }





























  // async getData(): Promise<any[]> {
  //   const storageData = localStorage.getItem(this.storageKey_modeStude);
  //   return storageData ? JSON.parse(storageData) : [];
  // }

  // // saveMaterialsData(data:any){
  // //   
  // // }




  // async updateMaterial(id:string, newData:any){
  //   const existingData = await this.getData();
  //   let res =  existingData.filter((item:any)=>{
  //     if(item.id !== id){
  //       return item
  //     }
  //   })
    
  //   const editedMaterialData = [newData, ...res];
  //   localStorage.setItem(this.storageKey_modeStude, JSON.stringify(editedMaterialData));
  // }
  
  // async getDataById(id:any){
  //   let dataLocalstorage = await this.getData()
  //   if (!dataLocalstorage) return null;
  //   let result = dataLocalstorage.find((item:any) => item.id === id)
  //   return result
  // }


 
  





  // async getDataQuiz(): Promise<any[]> {
  //   const storageData = localStorage.getItem(this.storageKeyMatrials);
  //   return storageData ? JSON.parse(storageData) : [];
  // }

  // async setNewQuiz(id:string, questions:any):Promise<void>{
  //   // const existingData = await this.deleteQuiz(id) //si hay hubiese un quiz con el mismo id lo elimino

  //   let dataLocalStorage = await this.getDataQuiz()
  //   //si hay hubiese un quiz con el mismo id lo elimino
  //   let existingData =  dataLocalStorage.filter((item:any)=>{
  //     if(item.id !== id){
  //       return item
  //     }
  //   })

  //   const newData = [{ id, questions }, ...existingData];
  //   localStorage.setItem(this.storageKeyMatrials, JSON.stringify(newData));
  // }

  // async getDataQuizById(id:any){
  //   let dataLocalstorage = await this.getDataQuiz()
  //   if (!dataLocalstorage) return null;
  //   let result = dataLocalstorage.find((item:any) => item.id === id)
  //   return result
  // }

  // async saveQuizzesData(data: any[]): Promise<void> {
  //   localStorage.setItem(this.storageKeyMatrials, JSON.stringify(data));
  // }

  // // async deleteQuiz(id:string){
  // //   let dataLocalStorage = await this.getDataQuiz()
  // //   let res =  dataLocalStorage.filter((item:any)=>{
  // //     if(item.id !== id){
  // //       return item
  // //     }
  // //   })
  // //  this.saveQuizzesData(res)
  // // }

















































}
