import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSearchService {

 private apiKey = 'AIzaSyDpp4Eh1D1RsZIxDqeMEF9-8F-KStUIY8M';
   //  AIzaSyDetOqX5UvDvSdbc7ZPao1gTqDJQQWz2d8 -> mgarrido2503
  // AIzaSyDpp4Eh1D1RsZIxDqeMEF9-8F-KStUIY8M -> bungloeducacion
  private cx = '3599f32b9a848469a';   
  private baseUrl = 'https://www.googleapis.com/customsearch/v1';

  constructor(private http: HttpClient) {}

  buscarImagenes(resumen: string): Observable<any> {
  const query = `site:pinterest.com ${resumen}`;
  const url = `${this.baseUrl}?key=${this.apiKey}&cx=${this.cx}&q=${encodeURIComponent(query)}&searchType=image&num=1&lr=lang_es`;

    return new Observable(observer => {
      this.http.get<any>(url).subscribe({
        next: data => {
          console.log(data)
          const primeraImagen = data.items && data.items.length > 0 ? data.items[0].link : null;
          observer.next(primeraImagen);
          observer.complete();
        },
        error: err => {
          console.error('Error en la búsqueda de imágenes:', err);
          observer.error(err);
        }
      });
    });
  }

  
}
