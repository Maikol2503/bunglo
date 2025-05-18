import { Component } from '@angular/core';
import { SidebarService } from '../services-interfas/sidebar.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialsComponent } from './materials/materials.component';
import { SearchComponent } from './search/search.component';
import { ToolsComponent } from '../tools/tools.component';
import { GoogleSearchService } from '../services/google-search.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports:[CommonModule, SidebarComponent, MaterialsComponent, SearchComponent, ToolsComponent, ]
})
export class HomeComponent  {
 
  constructor(
    private sidebarService: SidebarService,
    private imageService: GoogleSearchService 
  ) {}

  ngOnInit(): void {
    this.sidebarService.show_SideBar()
    // Asegúrate de que el sidebar esté desplegado cuando entras en Home
    this.sidebarService.set_SideBar_State_Minimize(false);
    this.buscar()
  }


   consulta = 'corpúsculo renal anatomía diagrama';
   imagenes: any[] = [];

    buscar() {
        const consultaLimpia = this.consulta.trim();
        if (!consultaLimpia) { 
        console.warn("La búsqueda está va cía.");
          return;
        }


        this.imageService.buscarImagenes(consultaLimpia).subscribe(
          data => {
            this.imagenes = data.items || [];
            console.log(data.items)
          },
          error => {
            console.error("Error al buscar imágenes:", error);
          }
        );
    }


   

  }

