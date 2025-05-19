import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sumarize',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sumarize.component.html',
  styleUrls: ['./sumarize.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SumarizeComponent implements OnInit{

  constructor(private sanitizer: DomSanitizer){}
  @Input() data?: any;
  ngOnInit(): void {
    console.log(this.data)
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

     getSafeYoutubeUrl(videoUrl: string): SafeResourceUrl {
    const videoId = this.getVideoId(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  getVideoId(url: string): string {
    const match = url.match(/v=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  }

  isExpanded(index: number): boolean {
    return this.expandedItems.includes(index);
  }
}
