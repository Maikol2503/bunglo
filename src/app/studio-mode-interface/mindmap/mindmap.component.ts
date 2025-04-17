import { CommonModule } from '@angular/common';
import { Component, Input} from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-mindmap',
  imports: [NgxGraphModule, CommonModule],
  templateUrl: './mindmap.component.html',
  styleUrl: './mindmap.component.css',
  providers: [provideAnimations()]
})
export class MindmapComponent {

  @Input() data?:any; 

  calculateNodeHeight(label: string): number {
    const lineHeight = 25; // Establece la altura de línea según tu fuente
    const lines = Math.ceil(label.length / 30); // Aproximación del número de líneas
    return lines * lineHeight;
  }
}
