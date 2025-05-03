import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef, OnInit, HostListener } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LocalstorageService } from '../../services/localstorage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { audit } from 'rxjs';
import { CloseComponent } from '../../shared/buttoms/close/close.component';

@Component({
  selector: 'app-mindmap',
  imports: [NgxGraphModule, CommonModule, CloseComponent],
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css'],
  providers: [provideAnimations()]
})
export class MindmapComponent implements OnInit , AfterViewInit{

  data!: any;
  size: any ;
  @ViewChild('graph') graph!: any;
  dataMindMap!:any
  zoomLevel: number = 1;
  id!:any;

  constructor(
    private cdr: ChangeDetectorRef, 
    private localStorageServices:LocalstorageService, 
    private route: ActivatedRoute, 
    private sideBarServices:SidebarService) {}
  
  
  async ngOnInit(): Promise<any> {
    this.setGraphSize();
    this.sideBarServices.Display_None();
    this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id');
      this.dataMindMap = await this.localStorageServices.getDataMindMapByID(this.id);
  
      if (this.dataMindMap && this.dataMindMap.length > 0) {
        this.data = this.dataMindMap[0].data;
      } else {
        console.error('No se encontró el mapa mental con el ID proporcionado');
        this.data = { nodes: [], links: [] }; // opción por defecto para evitar más errores
      }
    });
  }
  
  
  ngAfterViewInit(): void {
    // this.setGraphSize();
    setTimeout(() => this.zoomToFit(), 100); // Espera para asegurar que el gráfico esté renderizado
  }


  @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.setGraphSize();
  }

  setGraphSize() {
    this.size = [window.innerWidth, window.innerHeight];
    this.cdr.detectChanges();
  }

  zoomToFit() {
    if (this.graph) {
      this.graph.zoomToFit();  // Ajusta el zoom para que el gráfico se ajuste a la vista
    }
  }

  calculateNodeHeight(label: string): number {
    const lineHeight = 25;
    const lines = Math.ceil(label.length / 30);
    return lines * lineHeight;
  }
}
