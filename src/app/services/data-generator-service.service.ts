import { Injectable } from '@angular/core';
import { ApiModelo } from './api-modelo1.service';
import { PromptService } from './prompt.service';
import { ApiYoutubeService } from './api-youtube.service';
import { GoogleSearchService } from './google-search.service';

interface Question {
  id: string;
  questions: {
    pregunta: string;
    respuesta: string;
    options?: any;
    answered: number;
    selectedAnswer?: string;
  }[];
}

export interface Link {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface Node {
  id: string;
  label: string;
}

export interface MindMap {
  links: Link[];
  nodes: Node[];
}

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorServiceService {
  constructor(
    private prompt: PromptService, 
    private modelo: ApiModelo, 
    private youTubeService:ApiYoutubeService,
    private googleSearchService: GoogleSearchService ) {}

  async generateDataModeStudio(type: 'mindMap' | 'summarize' | 'flashCard', trimmedText: string): Promise<any | null> {

    const promptMap = {
      mindMap: this.prompt.getConceptMap(trimmedText),
      summarize: this.prompt.getSumarizePrompt(trimmedText),
      flashCard: this.prompt.getFlashCardPrompt(trimmedText),
    };

    const prompt = promptMap[type];
    return new Promise((resolve, reject) => {
      this.modelo.getCompletion(prompt).subscribe(
        (response: any) => {
          try {
            // console.log(`Response ${type}:`, response);
            let rawData = this.extraerJSON(response.choices[0].message.content.trim());
            let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            // console.log(`Parsed Data ${type}:`, parsedData);
            resolve(parsedData);
          } catch (error) {
            console.error(`Error parsing JSON for ${type}:`, error);
            reject(null);
          }
        },
        (error) => {
          console.error(`API Error for ${type}:`, error);
          reject(null);
        }
      );
    });
  }

  

  // Quiz
  async quiz(trimmedText: string, numQuestion:number, numOptions:number, questionsAlreadyGenerated:any):Promise<any>{
    let allPreguntas: any[] = [];
  
    while (allPreguntas.length < numQuestion) {
      let faltan = Math.abs(allPreguntas.length - numQuestion);
      const prompt = this.prompt.getQuizPrompt(trimmedText, faltan, numOptions, questionsAlreadyGenerated);

      const response: any = await new Promise((resolve) => {
        this.modelo.getCompletion(prompt).subscribe(resolve);
      });

      const data = response.choices[0].message.content;

      const nuevasPreguntas = this.extraerJSON(data) || [];
      console.log(nuevasPreguntas)
      // Eliminar duplicadas por texto de pregunta
      const nuevasFiltradas = nuevasPreguntas.filter((p:any) =>
        !allPreguntas.some(prev => prev.pregunta === p.pregunta)
      );

      allPreguntas.push(...nuevasFiltradas);

      // Si se pasaron, cortamos el exceso
      allPreguntas = allPreguntas.slice(0, numQuestion);

    }

    // formateo la data
    let dataFormateada = await this.formatQuestion(allPreguntas);
    return dataFormateada;
    
    // this.modelo.getCompletion(prompt).subscribe(
    //   (response: any) => {
    //     let rawData = this.extraerJSON(response.choices[0].message.content.trim());
    //     let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
    //     return parsedData
    //   })
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


  // mapa mental
  async MindMap(text:string){
    const prompt = this.prompt.getConceptMap(text);
    return new Promise((resolve, reject) => {
      this.modelo.getCompletion(prompt).subscribe(
        (response: any) => {
          try {
            // console.log(`Response ${type}:`, response);
            let rawData = this.extraerJSON(response.choices[0].message.content.trim());
            let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            // console.log(`Parsed Data ${type}:`, parsedData);
            resolve(parsedData);
          } catch (error) {
            console.error(`Error parsing JSON for MindMap:`, error);
            reject(null);
          }
        },
        (error) => {
          console.error(`API Error for MindMap:`, error);
          reject(null);
        }
      );
    });
  }


  // resumen
async sumarize(text: string) {
  const prompt = this.prompt.getSumarizePrompt(text);

  return new Promise((resolve, reject) => {
    this.modelo.getCompletion(prompt).subscribe(
      async (response: any) => {
        try {
          console.log(response)
          let rawData = this.extraerJSON(response.choices[0].message.content.trim());
          let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

          // 🔽 Agregar links de YouTube y de imágenes a cada punto clave
          await Promise.all(parsedData.resumenes.map(async (resumen: any) => {
            // YouTube
            try {
              const result = await this.youTubeService.buscarVideos(resumen.busqueda_youtube).toPromise();
              const items = result?.items;
              resumen.video_url = items && items.length > 0 ? `https://www.youtube.com/watch?v=${items[0].id.videoId}` : null;
            } catch (err) {
              console.error('Error al buscar video de YouTube:', err);
              resumen.video_url = null;
            }

            // Imagen individual por punto
            // try {
            //   const imagenUrl = await this.googleSearchService.buscarImagenes(resumen.busqueda_imagenes).toPromise();
            //   resumen.image_url = imagenUrl;
            // } catch (err) {
            //   console.error('Error al buscar imagen individual:', err);
            //   resumen.image_url = null;
            // }
          }));

          // 🔼 Buscar imágenes para el carrusel general
          parsedData.imagenes_carrusel = [];

          if (Array.isArray(parsedData.frases_busqueda_imagenes_resumen)) {
            await Promise.all(parsedData.frases_busqueda_imagenes_resumen.map(async (frase: string) => {
              try {
                const imagenUrl = await this.googleSearchService.buscarImagenes(frase).toPromise();
                if (imagenUrl) {
                  parsedData.imagenes_carrusel.push(imagenUrl);
                }
              } catch (err) {
                console.error('Error al buscar imagen para carrusel:', err);
              }
            }));
          }

          resolve(parsedData);
        } catch (error) {
          console.error(`Error parsing JSON for Sumariz:`, error);
          reject(null);
        }
      },
      (error) => {
        console.error(`API Error for Sumariz:`, error);
        reject(null);
      }
    );
  });
}




  // Flas Cards
  async flashCard(text:string){
    const prompt = this.prompt.getFlashCardPrompt(text);
    return new Promise((resolve, reject) => {
      this.modelo.getCompletion(prompt).subscribe(
        (response: any) => {
          try {
            // console.log(`Response ${type}:`, response);
            let rawData = this.extraerJSON(response.choices[0].message.content.trim());
            let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            // console.log(`Parsed Data ${type}:`, parsedData);
            resolve(parsedData);
          } catch (error) {
            console.error(`Error parsing JSON for FlashCard:`, error);
            reject(null);
          }
        },
        (error) => {
          console.error(`API Error for FlashCard:`, error);
          reject(null);
        }
      );
    });
  }

 
  // description
  async description(text:string, type:string):Promise<string>{
    const prompt = this.prompt.getTitutloPrompt(text, type);
    const response: any = await new Promise((resolve) => {
      this.modelo.getCompletion(prompt).subscribe(resolve);
    });
    const data = response.choices[0].message.content;
    const titulo = this.extraerJSON(data) || [];
    return titulo.title
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
  
}
