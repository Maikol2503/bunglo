import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { PdfComponent } from "./pdf/pdf.component";
import { ImageComponent } from "./image/image.component";
import { UrlComponent } from "./url/url.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TextComponent } from './text/text.component';
import { SidebarService } from '../services-interfas/sidebar.service';
import { DataGeneratorServiceService } from '../services/data-generator-service.service';
import { LocalstorageService } from '../services/localstorage.service';
import { LoaderBungloService } from '../services-interfas/loader-bunglo.service';
import { LoaderBungloComponent } from './loader-bunglo/loader-bunglo.component';

@Component({
    selector: 'app-upload-text',
    imports: [CommonModule, PdfComponent, ImageComponent, UrlComponent, TextComponent, RouterModule, LoaderBungloComponent],
    templateUrl: './upload-text.component.html',
    styleUrl: './upload-text.component.css'
})
export class UploadTextComponent implements OnInit {
  
  tipe_upload:any = 'text'
  text:string ='';
  id!: string;
  showLoading:boolean = false
  
constructor(private router: Router, 
  private route: ActivatedRoute, 
  private localStorageServices:LocalstorageService, 
  private sidebarServices:SidebarService,
  private DataGeneradorServices:DataGeneratorServiceService,
  private loaderBungloServices:LoaderBungloService,
) {}

ngOnInit() {
  this.sidebarServices.set_SideBar_State_Minimize(true);
  this.route.paramMap.subscribe(params => {
    this.tipe_upload = params.get('type');
  });
}

handleSendData(data:string):void{
  this.text=data
  this.generateModeStude(data)
}

generateUniqueId(): string {
  const timestamp = Math.floor(Date.now() / 1000); // Segundos desde 1970
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase(); // 4 letras aleatorias
  return `${timestamp}-${randomChars}`;
}


async generateModeStude(text: string) {
  try {
    console.log('Generando datos...');
    this.showLoading=true
    this.loaderBungloServices.updateProgress(0); // Inicializa el progreso

    const totalSteps = 4; // Cantidad de procesos
    let currentStep = 0;

    const updateProgress = () => {
      currentStep++;
      const progress = (currentStep / totalSteps) * 100;
      this.loaderBungloServices.updateProgress(progress);
    };

    setTimeout(()=>{
      updateProgress()
    },0)

    const [mindMap, summarize, flashCard] = await Promise.all([
      this.DataGeneradorServices.generateData('mindMap', text).then(result => {
        updateProgress();
        console.log(result)
        return result;
      }),
      this.DataGeneradorServices.generateData('summarize', text).then(result => {
        updateProgress();
        return result;
      }),
      this.DataGeneradorServices.generateData('flashCard', text).then(result => {
        updateProgress();
        return result;
      }),
    ]);

    if (mindMap && summarize) {
      this.id = this.generateUniqueId();
      await this.localStorageServices.setData(this.id, {
        dataMindMap: mindMap,
        dataSummarize: summarize,
        dataFlashCard: flashCard,
        text:this.text
      });
      this.showLoading=false
      this.router.navigate(['mode-stude/' + this.id]);
    } else {
      this.showLoading=false
      console.error('Error al obtener los datos del mapa mental o resumen.');
    }
  } catch (error) {
    this.showLoading=false
    console.error('Error en la generación de datos:', error);
  }
}

}

 

