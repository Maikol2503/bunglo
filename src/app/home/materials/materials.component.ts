import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../../services/localstorage.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-materials',
    imports: [CommonModule, RouterModule],
    templateUrl: './materials.component.html',
    styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit{
constructor( private localStorageservices:LocalstorageService){}
    materialsData:any[]=[]
    async ngOnInit(): Promise<any> {
        this.loadMaterials()
    }

    async loadMaterials(){
        this.materialsData = await this.localStorageservices.getMaterialsData()
        console.log(this.materialsData)
    }

    async delete(id:string){
        if(confirm('¿Seguro que desea eliminar este material?')){
            await this.localStorageservices.deleteMaterial(id);
            await this.loadMaterials()
        }
    }
}
