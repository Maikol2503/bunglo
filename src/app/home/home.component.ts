import { Component } from '@angular/core';
import { SidebarService } from '../services-interfas/sidebar.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MaterialsComponent } from './materials/materials.component';
import { SearchComponent } from './search/search.component';
import { ToolsComponent } from '../tools/tools.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports:[CommonModule, SidebarComponent, MaterialsComponent, SearchComponent, ToolsComponent]
})
export class HomeComponent  {
 
  constructor(
    private sidebarService: SidebarService, 
  ) {}

  ngOnInit(): void {
    this.sidebarService.show_SideBar()
    // Asegúrate de que el sidebar esté desplegado cuando entras en Home
    this.sidebarService.set_SideBar_State_Minimize(false);
  }
}
