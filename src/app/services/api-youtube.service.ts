import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiYoutubeService {

  private apiKey = 'AIzaSyCy4ySHdGC0YE6pkuMc2q6AkGQNWmHyaM4';
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
