import { Component } from '@angular/core';
import { LoaderBungloService } from '../../services-interfas/loader-bunglo.service';

@Component({
  selector: 'app-loader-bunglo',
  imports: [],
  templateUrl: './loader-bunglo.component.html',
  styleUrl: './loader-bunglo.component.css'
})
export class LoaderBungloComponent {
  progress:number=0
  constructor(private loaderBungloServices:LoaderBungloService){
    loaderBungloServices.progress$.subscribe(num=>{
      this.progress = num
      console.log(this.progress)
    })
  }
}
