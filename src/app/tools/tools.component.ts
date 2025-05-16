import { Component } from '@angular/core';
import { TOOLS, Tool } from '../shared/tools.data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalUploadContentService } from '../services-interfas/modal-upload-content.service';
import { ToolsService } from '../services-interfas/tools.service';


@Component({
  selector: 'app-tools',
  imports: [CommonModule, RouterModule],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.css'
})
export class ToolsComponent {
  tools: (Tool & { safeSvg: SafeHtml })[];
  modoActivate:string='estudio'
  
  constructor(
    private sanitizer: DomSanitizer, 
    private modalService: ModalUploadContentService,
    private toolServices: ToolsService,
    ){
    this.tools = TOOLS.map(tool => ({
      ...tool,
      safeSvg: this.sanitizer.bypassSecurityTrustHtml(tool.svg)
    }));
  }

  updateSelectedTool(selected:string){
    this.toolServices.updateSelectedTool(selected)
  }

  // toggleModal() {
  //   this.modalService.toggle();
  // }
}
