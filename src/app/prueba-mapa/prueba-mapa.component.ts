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
    {
      source: 'start',
      target: '1'
  }, {
      source: 'start',
      target: '2'
  }, {
      source: '1',
      target: '3'
  }, {
      source: '2',
      target: '4'
  }, {
      source: '2',
      target: '6'
  }, {
      source: '3',
      target: '5'
  }
  ],
  nodes: [
    {
      id: 'start',
      label: 'start'
    }, {
        id: '1',
        label: 'id 1',
        rank: 'first'
    }, {
        id: '2',
        label: 'Query XForce',
        rank: 'first'
    }, {
        id: '3',
        label: 'Format Results'
    }, {
        id: '4',
        label: 'Search Splunk'
    }, {
        id: '5',
        label: 'Block LDAP'
    }, {
        id: '6',
        label: 'Email Results'
    }
  ]
}
}
