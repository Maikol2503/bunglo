import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../../services-interfas/sidebar.service';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';
import { CloseComponent } from '../../shared/buttoms/close/close.component';
import { ApiYoutubeService } from '../../services/api-youtube.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
    private sideBarServices:SidebarService,
    private youTubeService:ApiYoutubeService,
    private sanitizer: DomSanitizer
  ){}

  id:any;
  data:any;
  expandedItems: number[] = []; // Guarda los índices abiertos
  videos: any[] = [];

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
    console.log(this.data)
  
  }


   getSafeYoutubeUrl(videoUrl: string): SafeResourceUrl {
    const videoId = this.getVideoId(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  getVideoId(url: string): string {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  }
  

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
