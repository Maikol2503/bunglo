import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiModelo {
  private readonly baseURL = 'https://openrouter.ai/api/v1';
  private readonly apiKey = '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';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://github.com/OpenRouterTeam/openrouter-examples',
    });
  }

  // Aquí el parámetro 'prompt' ahora es dinámico.
  getCompletion(prompt: string, model: string = "google/gemini-2.0-flash-exp:free"): Observable<any> {
    const body = {
      model,
      messages: [{ role: 'user', content: prompt }],
    };
  
    return this.http.post(`${this.baseURL}/chat/completions`, body, { headers: this.getHeaders() });
  }


}






