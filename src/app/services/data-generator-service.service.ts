import { Injectable } from '@angular/core';
import { ApiModelo } from './api-modelo1.service';
import { PromptService } from './prompt.service';

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
  constructor(private prompt: PromptService, private modelo: ApiModelo) {}

  async generateData(type: 'mindMap' | 'summarize' | 'flashCard', trimmedText: string): Promise<any | null> {
    const promptMap = {
      mindMap: this.prompt.getConceptMap(trimmedText),
      summarize: this.prompt.getSumarizePrompt(trimmedText),
      flashCard: this.prompt.getFlashCardPrompt(trimmedText)
    };

    const prompt = promptMap[type];
    return new Promise((resolve, reject) => {
      this.modelo.getCompletion(prompt).subscribe(
        (response: any) => {
          try {
            console.log(`Response ${type}:`, response);
            let rawData = this.extraerJSON(response.choices[0].message.content.trim());
            let parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            console.log(`Parsed Data ${type}:`, parsedData);
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
