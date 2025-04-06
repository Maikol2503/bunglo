import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './services-interfas/sidebar.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bunglo';
  isTrue = false;
  minimize_sidebar_active = false
  displayNone_sidebar_active = false
  
  constructor(private sidebar_services:SidebarService, private cdRef: ChangeDetectorRef){}
  
  ngAfterViewInit(): void {
    // Ahora suscribimos a los cambios después de la inicialización de la vista
    this.sidebar_services.get_SideBar_State_Minimize().subscribe(state => {
      this.minimize_sidebar_active = state;
      // Forzar la detección de cambios después de la actualización
      this.cdRef.detectChanges();
    });

    this.sidebar_services.get_SideBar_State_Display_None().subscribe(state=>{
      this.displayNone_sidebar_active = state
      this.cdRef.detectChanges();
    })
  }
}
