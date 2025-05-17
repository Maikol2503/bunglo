import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-mindmap',
  standalone: true,
  imports: [NgxGraphModule, CommonModule],
  templateUrl: './mindmap.component.html',
  styleUrls: ['./mindmap.component.css'],
  providers: [provideAnimations()]
})
export class MindmapComponent implements AfterViewInit, OnChanges {
  @Input() data?: any;
  @Input() size?: any;
  @ViewChild('graph') graph!: any;

  zoomLevel: number = 2;
  private initialTouchDistance: number | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  // Calcula la distancia entre dos dedos
  private getTouchDistance(touches: TouchList): number {
    const [touch1, touch2] = [touches[0], touches[1]];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  onTouchStart(event: TouchEvent) {
    if (event.touches.length === 2) {
      this.initialTouchDistance = this.getTouchDistance(event.touches);
    }
  }

  onTouchMove(event: TouchEvent) {
    if (event.touches.length === 2 && this.initialTouchDistance) {
      const newDistance = this.getTouchDistance(event.touches);
      const delta = newDistance - this.initialTouchDistance;

      if (Math.abs(delta) > 5) { // Umbral para evitar saltos pequeños
        const zoomFactor = delta > 0 ? 1.05 : 0.95;
        this.zoomLevel *= zoomFactor;
        this.zoomLevel = Math.max(0.1, Math.min(this.zoomLevel, 10)); // Límite de zoom

        if (this.graph) {
          this.graph.zoom(this.zoomLevel);
        }

        this.initialTouchDistance = newDistance;
      }

      event.preventDefault(); // Previene el scroll
    }
  }

  ngAfterViewInit(): void {
    this.applyZoom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.resetGraph();
    }
    if (changes['size']) {
      this.applyZoom();
    }
  }

  private resetGraph(): void {
    if (this.graph) {
      this.adjustGraphLayout();
      this.graph.update();
    }
  }

  private applyZoom(): void {
    if (this.graph) {
      this.graph.zoomToFit();
    }
  }

  private adjustGraphLayout(): void {
    if (this.graph) {
      this.graph.layout = 'dagreCluster';
      this.graph.update();
    }
  }

  zoomIn() {
    this.zoomLevel += 0.1;
    if (this.graph) {
      this.graph.zoom(this.zoomLevel);
    }
  }

  zoomOut() {
    this.zoomLevel = Math.max(0.1, this.zoomLevel - 0.1);
    if (this.graph) {
      this.graph.zoom(this.zoomLevel);
    }
  }

  center() {
    if (this.graph) {
      this.graph.center();
    }
  }

  zoomToFit() {
    if (this.graph) {
      this.graph.zoomToFit(this.zoomLevel);
    }
  }

  calculateNodeHeight(label: string): number {
    const lineHeight = 25;
    const lines = Math.ceil(label.length / 30);
    return lines * lineHeight;
  }
}
