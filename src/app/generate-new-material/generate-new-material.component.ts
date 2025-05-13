import { Component } from '@angular/core';
import { ToolsComponent } from '../tools/tools.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalUploadContentService } from '../services-interfas/modal-upload-content.service';
import { ToolsService } from '../services-interfas/tools.service';
import { TOOLS, Tool } from '../shared/tools.data';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ModalGenerateNewMaterialService } from '../services-interfas/modal-generate-new-material.service';
import { CloseComponent } from '../shared/buttoms/close/close.component';

@Component({
  selector: 'app-generate-new-material',
  imports: [ToolsComponent, CommonModule, RouterModule, CloseComponent],
  templateUrl: './generate-new-material.component.html',
  styleUrl: './generate-new-material.component.css'
})
export class GenerateNewMaterialComponent {
tools: (Tool & { safeSvg: SafeHtml })[];
  modoActivate:string='estudio'
  
  constructor(
    private sanitizer: DomSanitizer, 
    private modalService: ModalUploadContentService,
    private toolServices: ToolsService,
    private modalGanerateNewMaterialServices:ModalGenerateNewMaterialService,
    private router:Router
    ){
    this.tools = TOOLS.map(tool => ({
      ...tool,
      safeSvg: this.sanitizer.bypassSecurityTrustHtml(tool.svg)
    }));
  }

  updateSelectedTool(selected:string){
    this.toolServices.updateSelectedTool(selected)
  }

  closeModalGenerateNewMaterial(){
    this.modalGanerateNewMaterialServices.updateState(false)
    this.router.navigate(['/home'])
  }

  toggleModal() {
    this.modalService.toggle();
  }
}
