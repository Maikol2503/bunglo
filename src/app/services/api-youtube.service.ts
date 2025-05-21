import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiYoutubeService {

  private apiKey = 'AIzaSyDpp4Eh1D1RsZIxDqeMEF9-8F-KStUIY8M';
  //  AIzaSyDetOqX5UvDvSdbc7ZPao1gTqDJQQWz2d8 -> bungloeducacion
  private apiUrl = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  buscarVideos(query: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', '10')
      .set('key', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}
