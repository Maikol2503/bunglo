import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ModalUploadContentService } from '../services-interfas/modal-upload-content.service';
import { TextInputComponent } from '../shared/inputs/text-input/text-input.component';
import { PdfComponent } from '../shared/inputs/pdf/pdf.component';
import { CloseComponent } from '../shared/buttoms/close/close.component';

@Component({
    selector: 'app-file-upload-options',
    imports: [CommonModule, RouterLink, RouterModule, TextInputComponent, PdfComponent, CloseComponent],
    templateUrl: './file-upload-options.component.html',
    styleUrl: './file-upload-options.component.css'
})
export class FileUploadOptionsComponent {
    @Output() sendDataEvent = new EventEmitter<string>();
    // emitir el texto al padre
  
    constructor( private modalService: ModalUploadContentService){
        
    }

    showInput:string = '';
    showUploadOptions:boolean=true;
    showInputs:boolean = false;
    text:string = '';

    closeUploadOptions(){
        this.showUploadOptions=false
    }

    openInput(tipo:string){
        this.showInputs=true;
        this.showInput=tipo
    }

    handleSendData(data:any){
        this.showInputs=false
        this.text = data
        this.sendDataEvent.emit(this.text)
    }

    toggleModal(){
        this.modalService.toggle()
    }
}
