import { Component, OnInit } from '@angular/core';
import { FileUploadOptionsComponent } from '../../file-upload-options/file-upload-options.component';
import { DataGeneratorServiceService } from '../../services/data-generator-service.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { identity } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalUploadContentService } from '../../services-interfas/modal-upload-content.service';
import { Loader1Component } from '../../shared/loaders/loader1/loader1.component';
import { SidebarService } from '../../services-interfas/sidebar.service';

@Component({
  selector: 'app-mind-map-setup',
  imports: [FileUploadOptionsComponent, CommonModule, Loader1Component],
  templateUrl: './mind-map-setup.component.html',
  styleUrl: './mind-map-setup.component.css'
})
export class MindMapSetupComponent implements OnInit{

  constructor(
    private generateData:DataGeneratorServiceService,
     private modalUploadOptionServices:ModalUploadContentService, 
     private localStorageServices:LocalstorageService, 
     private router: Router,
    private sideBarServices:SidebarService){}
  
  textToGenerateMindMap:string = '';
  id:string = '';
  dataMindMap:any;
  description:string = '';
  showModalUlploadOptions!:boolean
  showLoader1:boolean = false;
  type!:string;
  name!:string;

  ngOnInit(): void {
    this.sideBarServices.Display_None()
    this.modalUploadOptionServices.state$.subscribe((state: boolean) => {
      this.showModalUlploadOptions = state;
    });
    this.modalUploadOptionServices.updateState(true) 
  }

  async recivedTextToGenerateQuiz(data:any){
    this.textToGenerateMindMap = await data;
    this.generateMindMap();
  }

  async generateMindMap(){
    this.showLoader1=true;
    this.dataMindMap = await this.generateData.MindMap(this.textToGenerateMindMap);
    this.saveDataLocalStorage()
  }

  async saveDataLocalStorage(){
    this.id = await this.generarIDSeguro()
    this.type = 'mindmap';
    this.name = 'Mapa Mental';
    const url = '/material/'+this.type+'/'+this.id
    this.description = await this.generateData.description(this.textToGenerateMindMap, this.type)
    await this.localStorageServices.setNewMaterial(this.id, this.dataMindMap, this.type, this.textToGenerateMindMap, this.description, this.name, url); //Guardo la data del quiz
    await this.router.navigate(['/material/mindmap/',this.id]);
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
