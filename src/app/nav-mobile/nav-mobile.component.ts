import { Component } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-mobile',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.css'
})
export class NavMobileComponent {
  materialsData:any[]=[]
  view_materials_is_active = false
  minimize_sidebar_active = false
  desplegableVisible:boolean = false
  isModeStude:boolean=false;
  
  constructor(
    private localStorageservices:LocalstorageService){
  }

  async ngOnInit(): Promise<any>  {
    this.materialsData = await this.localStorageservices.getMaterialsData()
  }

  toggleMaterials() {
    this.view_materials_is_active = !this.view_materials_is_active;
  }
  
}
