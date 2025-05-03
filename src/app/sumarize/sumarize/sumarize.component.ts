import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { CloseComponent } from '../../shared/buttoms/close/close.component';

@Component({
  selector: 'app-sumarize',
  imports: [CommonModule, CloseComponent],
  templateUrl: './sumarize.component.html',
  styleUrls: ['./sumarize.component.css']
})
export class SumarizeComponent implements OnInit{

  constructor(
    private LocalStorageServices:LocalstorageService, 
    private route: ActivatedRoute, 
    private sideBarServices:SidebarService){}

  id:any;
  data:any;

  ngOnInit(): void {
    this.sideBarServices.sidebar_apply_minimize(true)
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getData();
  }

  async getData(){
    this.data = await this.LocalStorageServices.getDataSumarizeByID(this.id);
    this.data = this.data[0].data;
  }



  expandedItems: number[] = []; // Guarda los índices abiertos

  toggleDescription(index: number): void {
    if (this.expandedItems.includes(index)) {
      // Si ya está abierto, lo cerramos
      this.expandedItems = this.expandedItems.filter(i => i !== index);
    } else {
      // Si no está abierto, lo agregamos
      this.expandedItems.push(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedItems.includes(index);
  }
}
