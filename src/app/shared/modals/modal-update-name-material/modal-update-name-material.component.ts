import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-modal-update-name-material',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-update-name-material.component.html',
  styleUrl: './modal-update-name-material.component.css'
})
export class ModalUpdateNameMaterialComponent implements OnInit{

  constructor(private localStorageServices:LocalstorageService){}

  @Output() materialUpdated = new EventEmitter<any>();
  @Input() id?: string;
  name:string='';
  materialData:any;

  async ngOnInit() {
    this.materialData = await this.getDataMaterial(this.id);
    this.name = this.materialData.description
  }

  async getDataMaterial(id:any){
    const materialData = await this.localStorageServices.getMaterialDataById(id);
    return materialData
  }

  async editName(){
    const updateData = {
      ...this.materialData, description:this.name
    }

    await this.localStorageServices.setNewMaterial(
      updateData.id, 
      updateData.data, 
      updateData.type, 
      updateData.text, 
      updateData.description, 
      updateData.name);

      this.returDataMaterial(updateData)
  }

  returDataMaterial(data:any){
    this.materialUpdated.emit(data);
  }
}
