import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml  } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-sumarize',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sumarize.component.html',
  styleUrls: ['./sumarize.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class SumarizeComponent implements OnChanges{

  constructor(private sanitizer: DomSanitizer){}
  
 
  @Input() data?: any;


  async ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.data && this.data.resumenes) {
      console.log('Data recibida:', this.data);

      const transformed = await Promise.all(
        this.data.resumenes.map(async (item: any) => {
          const html = await marked.parse(item.descripcion || '');
          return {
            ...item,
            descripcion: this.sanitizer.bypassSecurityTrustHtml(html)
          };
        })
      );

      this.data = {
        ...this.data,
        resumenes: transformed
      };

      console.log('Data procesada:', this.data);
    }
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
