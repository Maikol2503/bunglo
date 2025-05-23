import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FileUploadOptionsComponent } from '../../file-upload-options/file-upload-options.component';
import { Loader1Component } from '../../../../loader1/loader1.component';
import { DataGeneratorServiceService } from '../../services/data-generator-service.service';
import { ModalUploadContentService } from '../../services-interfas/modal-upload-content.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { Router } from '@angular/router';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { ApiYoutubeService } from '../../services/api-youtube.service';
import { ModalSummaryStyleComponent } from '../../shared/modals/modal-summary-style/modal-summary-style.component';

@Component({
  selector: 'app-sumarize-setup',
  imports: [CommonModule, FileUploadOptionsComponent, Loader1Component, ModalSummaryStyleComponent],
  templateUrl: './sumarize-setup.component.html',
  styleUrl: './sumarize-setup.component.css'
})
export class SumarizeSetupComponent implements OnInit {
  constructor(
    private sidebarServices:SidebarService,
    private generateData:DataGeneratorServiceService, 
    private modalUploadOptionServices:ModalUploadContentService, 
    private localStorageServices:LocalstorageService, 
    private youTubeService:ApiYoutubeService,
    private router: Router,
  ){}
  
  textToGenerateSumarize:string = '';
  id:string = '';
  dataSumarize:any;
  description:string = '';
  showModalUlploadOptions!:boolean;
  styleSummarize:string = 'clasico';
  showLoader1:boolean = false;
  showModalSummaryStyle:boolean=false;
  type!:string;
  name!:string;
  
  
  ngOnInit(): void {
    this.sidebarServices.Display_None()
    this.modalUploadOptionServices.state$.subscribe((state: boolean) => {
      this.showModalUlploadOptions = state;
    });
    this.modalUploadOptionServices.updateState(true) 
  }

  async recivedTextToGenerateSumarize(data:any){
    this.textToGenerateSumarize = await data;
    this.showModalSummaryStyle = true;
  }

async recivedDataToModalSummarizeStyle(style:any){
  this.styleSummarize = await style;
  this.showModalSummaryStyle = false;
  this.generateSumarize();
}

  async generateSumarize(){
    this.showLoader1=true;
    this.dataSumarize = await this.generateData.sumarize(this.textToGenerateSumarize, this.styleSummarize);
    await this.saveDataLocalStorage()
  }

  async agregarLinksYoutube() {
    const resumenes = this.dataSumarize.resumenes;

    for (let resumen of resumenes) {
      try {
        const response = await this.youTubeService.buscarVideos(resumen.busqueda_youtube).toPromise();
        const items = response.items;

        if (items && items.length > 0) {
          const videoId = items[0].id.videoId;
          resumen.video_url = `https://www.youtube.com/watch?v=${videoId}`;
        } else {
          resumen.video_url = null;
        }
      } catch (error) {
        console.error('Error al buscar video de YouTube:', error);
        resumen.video_url = null;
      }
    }
  }

  async saveDataLocalStorage(){
    this.id = await this.generarIDSeguro()
    this.name = 'Resumen';
    this.type = 'sumarize';
    this.description = await this.generateData.description(this.textToGenerateSumarize, this.type);
    const url = '/material/summarize/'+this.id
    await this.localStorageServices.setNewMaterial(this.id, this.dataSumarize, this.type, this.textToGenerateSumarize, this.description, this.name, url); //Guardo la data del quiz
    await this.router.navigate([url]);
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
