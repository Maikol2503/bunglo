import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadContentService {

  private showModalUploadContent = new BehaviorSubject<boolean>(false);
  state$ = this.showModalUploadContent.asObservable();

  toggle() {
    const current = this.showModalUploadContent.value;
    this.showModalUploadContent.next(!current);
    console.log(this.state$)
  }

  updateState(state:boolean){
    this.showModalUploadContent.next(state);
  }
}
