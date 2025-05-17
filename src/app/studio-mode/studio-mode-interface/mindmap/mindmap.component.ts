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

  constructor(private cdr: ChangeDetectorRef) {}


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
