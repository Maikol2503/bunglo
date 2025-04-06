import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebar_Minimize = new BehaviorSubject<boolean>(false)
  private sidebar_Display_None = new BehaviorSubject<boolean>(false)
  constructor() { }

  get_SideBar_State_Minimize():Observable<boolean>{
    return this.sidebar_Minimize.asObservable()
  }

  toggle_SideBar_State_Minimize(){
    this.sidebar_Minimize.next(!this.sidebar_Minimize.value);
  }

  sidebar_apply_minimize(boolean:boolean){
    this.sidebar_Minimize.next(boolean);
  }


  get_SideBar_State_Display_None():Observable<boolean>{
    return this.sidebar_Display_None.asObservable()
  }

  show_SideBar() {
    this.sidebar_Display_None.next(false);
  }

  Display_None(){
    this.sidebar_Display_None.next(true);
  }

  set_SideBar_State_Minimize(minimized: boolean) {
    this.sidebar_Minimize.next(minimized); // Establece directamente el estado a minimizado o no
  }

}
