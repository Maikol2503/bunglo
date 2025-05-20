import { Component, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MindmapComponent } from './mindmap/mindmap.component';
import { SumarizeComponent } from './sumarize/sumarize.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { LocalstorageService } from '../../services/localstorage.service';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { CloseComponent } from '../../shared/buttoms/close/close.component';

@Component({
  selector: 'app-studio-mode-interface',
  standalone: true, // Agregar si es necesario
  imports: [CommonModule, CloseComponent, MindmapComponent, SumarizeComponent, FlashCardComponent, RouterModule],
  templateUrl: './studio-mode-interface.component.html',
  styleUrls: ['./studio-mode-interface.component.css'],
})
export class StudioModeInterfaceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mindmap') mindMapContainer!: ElementRef<HTMLDivElement>;
  id: any;
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
    private router:Router,
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
    console.log(this.id)
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
    // const materialData = await this.getDataMaterial()
    // this.localStorageServices.updateMaterial(this.id ?? '', materialData)
    // this.title = newName
    // this.showModalUpdateNamematerial=false
  }

  initializeView(): void {
    // Obtiene el tamaño del contenedor del gráfico y ajusta la vista
    const element = this.mindMapContainer.nativeElement;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    this.view = [width, height];
    console.log(this.view)
  }

  async getDataMaterial(): Promise<any> {
    let storedData = await this.localStorageServices.getDataModeStudioByID(this.id); // Obtener datos del localStorage
    storedData = storedData[0];
  
    const isArray = Array.isArray(storedData);
    const isPlainObject = storedData !== null && typeof storedData === 'object' && !isArray;
  
    if (!isArray && !isPlainObject) {
      console.warn("Los datos en localStorage no son un array ni un diccionario (objeto plano) válido.");
      return;
    }
  
    return storedData;
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
    console.log(foundData.data.sumarize.resumenes)
    this.title = foundData.description
    if (foundData?.data) {
      const { mindmap, sumarize, flashcard } = foundData.data;
      this.mindMapData = mindmap || null;
      this.sumarizeData = sumarize || null;
      this.flashCardData = flashcard || null;
      console.log(this.sumarizeData)
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
      this.view = [2000, 2000]
      this.renderer.addClass(document.body, 'no-scroll');  // Bloquear scroll
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');  // Restaurar scroll
    }
  
  }

  redirectQuiz(id:any){
    this.router.navigate(['material/mode-studio/quiz-setup/'+id])
  }

}
