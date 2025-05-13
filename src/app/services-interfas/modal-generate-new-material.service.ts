import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalGenerateNewMaterialService {

  private showModalGenerateNewMaterial = new BehaviorSubject<boolean>(false);
    state$ = this.showModalGenerateNewMaterial.asObservable();
  
    toggle() {
      const current = this.showModalGenerateNewMaterial.value;
      this.showModalGenerateNewMaterial.next(!current);
      console.log(this.state$)
    }
  
    updateState(state:boolean){
      this.showModalGenerateNewMaterial.next(state);
    }
}
