import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private toolSelect = new BehaviorSubject<string>('');
  currentlySelectedTool$ = this.toolSelect.asObservable();

  updateSelectedTool(selected:string){
    this.toolSelect.next(selected)
  }

}
