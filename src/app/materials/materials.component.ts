import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { RouterModule } from '@angular/router';
import { ModalUpdateNameMaterialComponent } from '../shared/modals/modal-update-name-material/modal-update-name-material.component';

@Component({
    selector: 'app-materials',
    imports: [CommonModule, RouterModule, ModalUpdateNameMaterialComponent],
    templateUrl: './materials.component.html',
    styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit{
constructor( private localStorageservices:LocalstorageService, private eRef: ElementRef){}
    materialsData:any[]=[]
    activeModalId: string | null = null;
    idMaterialSelect!:string;
    updatedMaterialData!:any;
    showModaleditNameMaterial:boolean=false;

    async ngOnInit(): Promise<any> {
        this.loadMaterials()
    }

    async loadMaterials(){
        this.materialsData = await this.localStorageservices.getMaterialsData()
    }

    openModalUpdateName(id:string){
        this.idMaterialSelect=id;
        this.showModaleditNameMaterial=true;
    }

    closeModalUpdateName(){
        this.idMaterialSelect='';
        this.showModaleditNameMaterial=false;
    }

    onMaterialUpdated(data: any) {
        const index = this.materialsData.findIndex((material:any)=> material.id === data.id);
        if (index !== -1){
            this.materialsData[index] = data;
        }
        this.closeModalUpdateName();
        this.activeModalId = null;
        // Aquí puedes actualizar listas, cerrar el modal, etc.
    }

    // Detectar clic fuera
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        const clickedInside = this.eRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.activeModalId = null;
        }
    }

    toggleModal(id: string): void {
        this.activeModalId = this.activeModalId === id ? null : id;
    }

    async delete(id:string){
        if(confirm('¿Seguro que desea eliminar este material?')){
            await this.localStorageservices.deleteMaterial(id);
            await this.loadMaterials()
        }
        this.activeModalId = null;
    }
}
