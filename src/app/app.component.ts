import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarService } from './services-interfas/sidebar.service';
import { NavMobileComponent } from './nav-mobile/nav-mobile.component';
import { FileUploadOptionsComponent } from "./file-upload-options/file-upload-options.component";
import { ModalUploadContentService } from './services-interfas/modal-upload-content.service';
import { GenerateNewMaterialComponent } from './generate-new-material/generate-new-material.component';
import { FlashCardComponent } from "./studio-mode/studio-mode-interface/flash-card/flash-card.component";
import { ModalGenerateNewMaterialService } from './services-interfas/modal-generate-new-material.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavMobileComponent,
    FileUploadOptionsComponent,
    GenerateNewMaterialComponent,
    FlashCardComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'bunglo';
  isTrue = false;
  minimize_sidebar_active = false;
  displayNone_sidebar_active = false;
  showModalUploadContent: boolean = false;
  showModalGenerateNewMaterial:boolean = false;

  constructor(
    private sidebar_services: SidebarService,
    private cdRef: ChangeDetectorRef,
    private modalService: ModalUploadContentService,
    private modalGanerateNewMaterialServices:ModalGenerateNewMaterialService
  ) {}

  ngOnInit(): void {
    
    this.modalGanerateNewMaterialServices.state$.subscribe(state=>{
      this.showModalGenerateNewMaterial = state
      this.cdRef.detectChanges();
    })

    this.modalService.state$.subscribe(state => {
      this.showModalUploadContent = state;
      this.cdRef.detectChanges(); // importante para forzar la actualización del DOM si es necesario
    });
  }

  ngAfterViewInit(): void {
    this.sidebar_services.get_SideBar_State_Minimize().subscribe(state => {
      this.minimize_sidebar_active = state;
      this.cdRef.detectChanges();
    });

    this.sidebar_services.get_SideBar_State_Display_None().subscribe(state => {
      this.displayNone_sidebar_active = state;
      this.cdRef.detectChanges();
    });
  }
}
