import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../services-interfas/sidebar.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { ModalGenerateNewMaterialService } from '../services-interfas/modal-generate-new-material.service';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  materialsData:any[]=[]
  view_materials_is_active = false
  minimize_sidebar_active = false
  // activeItem:any = 'home';
  isModeStude:boolean=false;
  
  constructor(
    private sidebar_services:SidebarService, 
    private route: ActivatedRoute, 
    private router: Router,
    private localStorageservices:LocalstorageService,
    private modalGanerateNewMaterialServices:ModalGenerateNewMaterialService
  ){
    this.sidebar_services.get_SideBar_State_Minimize().subscribe((state: boolean) => {
      this.minimize_sidebar_active = state;
    });
  }

  async ngOnInit(): Promise<any>  {
    this.materialsData = await this.localStorageservices.getMaterialsData()
    this.materialsData = this.materialsData
    this.checkIfInModeStude();
  }

   // Función para verificar si estamos en la ruta 'mode-stude'
   private checkIfInModeStude(): void {
    this.router.events.subscribe(() => {
      if (this.router.url.startsWith('/mode-stude')) {
        this.isModeStude = true;
      } else {
        this.isModeStude = false;
      }
    });
  }

  showModalGenerateNewMaterial(){
    this.modalGanerateNewMaterialServices.updateState(true)
    console.log()
  }

  toggleMinimizeSidebar(){
    this.sidebar_services.toggle_SideBar_State_Minimize()
  }

  toggleActiveItem(item: string): void {
    // this.activeItem = item;
  }

  toggleMaterials() {
    this.view_materials_is_active = !this.view_materials_is_active;
  }
  
}


  


