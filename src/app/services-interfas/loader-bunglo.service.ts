import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderBungloService {

  private progressSource = new BehaviorSubject<number>(0);
  progress$ = this.progressSource.asObservable();

  updateProgress(value: number) {
    this.progressSource.next(value);
  }

  resetProgress() {
    this.progressSource.next(0);
  }
}
