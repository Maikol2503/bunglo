import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileUploadOptionsComponent } from '../../file-upload-options/file-upload-options.component';
import { Loader1Component } from '../../../../loader1/loader1.component';
import { DataGeneratorServiceService } from '../../services/data-generator-service.service';
import { ModalUploadContentService } from '../../services-interfas/modal-upload-content.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../services-interfas/sidebar.service';

@Component({
  selector: 'app-studio-mode-setup',
  imports: [CommonModule, FileUploadOptionsComponent, Loader1Component],
  templateUrl: './studio-mode-setup.component.html',
  styleUrl: './studio-mode-setup.component.css'
})
export class StudioModeSetupComponent implements OnInit {
  constructor(
    private sidebarServices:SidebarService, 
    private generateData:DataGeneratorServiceService, 
    private modalUploadOptionServices:ModalUploadContentService, 
    private localStorageServices:LocalstorageService, 
    private router: Router){}
  
  textToGenerateModeStudio:string = '';
  id:string = '';
  dataModeStudio:any;
  titulo:string = '';
  showModalUlploadOptions!:boolean
  showLoader1:boolean = false;
  
  
  
  ngOnInit(): void {
    this.sidebarServices.Display_None();
    this.modalUploadOptionServices.state$.subscribe((state: boolean) => {
      this.showModalUlploadOptions = state;
    });
    this.modalUploadOptionServices.updateState(true)
  }

  async recivedTextToGenerateModeStudio(data:any){
    this.textToGenerateModeStudio = await data;
    this.generateModeStudio();
  }

  async generateModeStudio(){
    this.showLoader1=true;
    const mindMapData = await this.generateData.MindMap(this.textToGenerateModeStudio);
    const sumarizeData = await this.generateData.sumarize(this.textToGenerateModeStudio);
    const flashCardData = await this.generateData.flashCard(this.textToGenerateModeStudio);
    this.dataModeStudio = {
      'mindmap':mindMapData,
      'sumarize':sumarizeData,
      'flashcard':flashCardData
    } 
    this.saveDataLocalStorage()
  }

  async saveDataLocalStorage(){
    this.id = await this.generarIDSeguro()
    this.titulo = await this.generateData.titulo(this.textToGenerateModeStudio, 'mode-studio')
    await this.localStorageServices.setNewMaterial(this.id, this.dataModeStudio, 'mode-studio', this.textToGenerateModeStudio, this.titulo); //Guardo la data del quiz
    await this.router.navigate(['/mode-studio/',this.id]);
  }


  async generarIDSeguro(): Promise<string> {
    const aleatorio = crypto.getRandomValues(new Uint8Array(16));
    const timestamp = new TextEncoder().encode(Date.now().toString());
    const data = new Uint8Array([...timestamp, ...aleatorio]);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
  }
}
