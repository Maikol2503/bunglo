import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-mindmap',
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
  
//  @HostListener('touchmove', ['$event'])
//   onTouchMove(event: TouchEvent) {
//     event.preventDefault(); // Impide que se haga scroll en la página
//   }

  // @HostListener('touchstart', ['$event'])
  //   @HostListener('touchmove', ['$event'])
  //   onTouch(event: Event) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }



  ngAfterViewInit(): void {
     this.applyZoom();
    // setTimeout(() => {
    //   if (this.graph) {
    //     this.resetGraph();  // Llama a resetGraph para reiniciar la vista
    //   }
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      // Si los datos cambian, reinicia el gráfico y aplica el zoom
      this.resetGraph();
    }
    if (changes['size']) {
      // Si el tamaño cambia, ajusta el zoom y la posición si es necesario
      this.applyZoom();
    }
  }

  private resetGraph(): void {
    // Asegúrate de que los datos sean nuevos
    if (this.graph) {

      // // Restablece el zoom y centra el gráfico
      // this.zoomLevel = 1;
      // this.graph.zoom(this.zoomLevel);

      // this.graph.center();  // Centra el gráfico para una vista predeterminada

      // // Reorganiza y ajusta el layout
      this.adjustGraphLayout();

      // Fuerza la actualización del gráfico para reflejar los nuevos datos
      this.graph.update();
    }
  }

  private applyZoom(): void {
    if (this.graph) {
      this.graph.zoomToFit();  // Ajusta el zoom para que el gráfico se ajuste a la vista
    }
  }

  private adjustGraphLayout(): void {
    if (this.graph) {
      // Puedes cambiar el layout si es necesario
      this.graph.layout = 'dagreCluster';  // Cambia esto según tus necesidades de diseño
      this.graph.update();  // Fuerza el gráfico a actualizarse
    }
  }

  zoomIn() {
    this.zoomLevel += 0.1;
    if (this.graph) {
      this.graph.zoom(this.zoomLevel);  // Aplica el zoom en el gráfico
    }
  }

  zoomOut() {
    this.zoomLevel = Math.max(0.1, this.zoomLevel - 0.1);
    if (this.graph) {
      this.graph.zoom(this.zoomLevel);  // Aplica el zoom en el gráfico
    }
  }

  center() {
    if (this.graph) {
      this.graph.center();  // Centra el gráfico
    }
  }

  zoomToFit() {
    if (this.graph) {
      this.graph.zoomToFit(this.zoomLevel);  // Ajusta el zoom para que el gráfico se ajuste a la vista
    }
  }

  calculateNodeHeight(label: string): number {
    const lineHeight = 25;
    const lines = Math.ceil(label.length / 30);
    return lines * lineHeight;
  }
}
