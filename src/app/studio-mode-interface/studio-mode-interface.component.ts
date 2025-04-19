import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MindmapComponent } from './mindmap/mindmap.component';
import { SumarizeComponent } from './sumarize/sumarize.component';
import { BtnBackComponent } from '../upload-text/btn-back/btn-back.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { LocalstorageService } from '../services/localstorage.service';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services-interfas/sidebar.service';
import { ModalUpdateNameMaterialComponent } from './modal-update-name-material/modal-update-name-material.component';

@Component({
  selector: 'app-studio-mode-interface',
  standalone: true, // Agregar si es necesario
  imports: [CommonModule, MindmapComponent, SumarizeComponent, BtnBackComponent, FlashCardComponent, RouterModule, ModalUpdateNameMaterialComponent],
  templateUrl: './studio-mode-interface.component.html',
  styleUrls: ['./studio-mode-interface.component.css'],
})
export class StudioModeInterfaceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mindmap') mindMapContainer!: ElementRef<HTMLDivElement>;
  id: string | null = null;
  mindMapData: any = null;
  sumarizeData: any = null;
  flashCardData: any = null;
  text: string | null = null;
  expandedIndex: number | null = null;
  enlargeMap: boolean = false;
  showModalUpdateNamematerial:boolean = false
  view: [number, number] = [100, 100];
  private routeSub: Subscription | null = null;
  title:string = '';

  constructor(
    private route: ActivatedRoute,
    private localStorageServices: LocalstorageService,
    private renderer: Renderer2,
    private sidebarServices:SidebarService,
    
  ) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    this.showModalUpdateNamematerial=false;
  } 

  
  ngOnInit(): void {
    this.sidebarServices.set_SideBar_State_Minimize(true);
    this.sidebarServices.show_SideBar()
    // Escuchar los cambios en el parámetro 'id' de la ruta
    this.routeSub = this.route.paramMap.subscribe(async params => {
      this.id = params.get('id'); // Obtener el 'id' de la URL
      await this.loadData();
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeView()
    });
  }

  recivedNewName(newName:string){
    this.updateNameMaterial(newName)
  }

  async updateNameMaterial(newName:string){
    const materialData = await this.getDataMaterial()
    materialData.data.dataSummarize.titulo_general = newName
    this.localStorageServices.updateMaterial(this.id ?? '', materialData)
    this.title = newName
    this.showModalUpdateNamematerial=false
  }

  initializeView(): void {
    // Obtiene el tamaño del contenedor del gráfico y ajusta la vista
    const element = this.mindMapContainer.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    this.view = [width, height];
    console.log("View initialized:", this.view);
  }

  async getDataMaterial(){
    const storedData: any = await this.localStorageServices.getData(); // Obtener datos del localStorage

    if (!Array.isArray(storedData)) {
      console.warn("Los datos en localStorage no son un array.");
      return;
    }

    return storedData.find((item: { id: string | null }) => item.id === this.id);
  }


  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll')
    // Limpiar la suscripción cuando el componente se destruya
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // Función para cargar los datos desde el localStorage
  private async loadData(): Promise<void> {
   
    const foundData = await this.getDataMaterial()

    this.title = foundData.data.dataSummarize.titulo_general
    if (foundData?.data) {
      const { dataMindMap, dataSummarize, dataFlashCard } = foundData.data;
      this.mindMapData = dataMindMap || null;
      this.sumarizeData = dataSummarize || null;
      this.flashCardData = dataFlashCard || null;
    } else {
      console.warn("No se encontró el dato con este ID.");
    }
  }

  toggleDescription(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  toggleMap(){
   
    this.enlargeMap = !this.enlargeMap;

    if (this.enlargeMap) {
      this.view = [1000, 1000]
      this.renderer.addClass(document.body, 'no-scroll');  // Bloquear scroll
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');  // Restaurar scroll
    }
  
  }

}
