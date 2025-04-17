import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MindmapComponent } from './mindmap/mindmap.component';
import { SumarizeComponent } from './sumarize/sumarize.component';
import { BtnBackComponent } from '../upload-text/btn-back/btn-back.component';
import { FlashCardComponent } from './flash-card/flash-card.component';
import { LocalstorageService } from '../services/localstorage.service';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services-interfas/sidebar.service';

@Component({
  selector: 'app-studio-mode-interface',
  standalone: true, // Agregar si es necesario
  imports: [CommonModule, MindmapComponent, SumarizeComponent, BtnBackComponent, FlashCardComponent, RouterModule],
  templateUrl: './studio-mode-interface.component.html',
  styleUrls: ['./studio-mode-interface.component.css'],
})
export class StudioModeInterfaceComponent implements OnInit, OnDestroy {

  id: string | null = null;
  mindMapData: any = null;
  sumarizeData: any = null;
  flashCardData: any = null;
  text: string | null = null;
  expandedIndex: number | null = null;
  enlargeMap: boolean = false;

  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private localStorageServices: LocalstorageService,
    private renderer: Renderer2,
    private sidebarServices:SidebarService
  ) {}

  ngOnInit(): void {
    this.sidebarServices.set_SideBar_State_Minimize(true);
    this.sidebarServices.show_SideBar()
    // Escuchar los cambios en el parámetro 'id' de la ruta
    this.routeSub = this.route.paramMap.subscribe(async params => {
      this.id = params.get('id'); // Obtener el 'id' de la URL
      await this.loadData();
    });
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
    const storedData: any = await this.localStorageServices.getData(); // Obtener datos del localStorage

    if (!Array.isArray(storedData)) {
      console.warn("Los datos en localStorage no son un array.");
      return;
    }

    const foundData = storedData.find((item: { id: string | null }) => item.id === this.id);

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
      this.renderer.addClass(document.body, 'no-scroll');  // Bloquear scroll
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');  // Restaurar scroll
    }
  
  }

}
