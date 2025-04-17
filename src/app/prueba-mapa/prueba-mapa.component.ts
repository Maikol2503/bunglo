import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-prueba-mapa',
  imports: [NgxGraphModule, CommonModule, RouterModule],
  templateUrl: './prueba-mapa.component.html',
  styleUrl: './prueba-mapa.component.css',
  providers: [provideAnimations()]
})
export class PruebaMapaComponent {
  








data = {
  links: [
    { source: 'start', target: '1' },
    { source: 'start', target: '2' },
    { source: '1', target: '3' },
    { source: '2', target: '4' },
    { source: '4', target: '6' },
    { source: '3', target: '5' }
  ],
  nodes: [
    {
      id: 'start',
      label: 'procesos en el nefron y regulacion del PH',
      color: '#000000'
    },
    {
      id: '1',
      label: '1. transporte de sustancias al torrente sanguineo',
      rank: 'first',
      color: '#33FF57'
    },
    {
      id: '2',
      label: 'regulacion acido base',
      rank: 'first',
      color: '#3357FF'
    },
    {
      id: '3',
      label: 'Secrecion tubular',
      color: '#33FF57'
    },
    {
      id: '4',
      label: 'acidosis metabolica',
      color: '#3357FF'
    },
    {
      id: '5',
      label: 'Durante este proceso se añaden cationes y aniones organicos al filtrado urinario',
      color: '#33FF57'
    },
    {
      id: '6',
      label: 'Se produce una disminucion del PH en el organismo lo que lleva al riñon a aumentar la excrecion de h+ y reabsorber bicarbonato',
      color: '#3357FF'
    }
  ]
}




  calculateNodeHeight(label: string): number {
    const lineHeight = 20; // Establece la altura de línea según tu fuente
    const lines = Math.ceil(label.length / 30); // Aproximación del número de líneas
    return lines * lineHeight;
  }

}






















