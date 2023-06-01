import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Carousel } from './carousel';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(public auth:AuthService) {}
  carousel:Carousel[] = []
  ngOnInit(): void {
    this.get();
  }
  get(){
    this.auth.getCarousel().subscribe((res:Carousel[]) => {
      this.carousel = res
      console.log(this.carousel);
      
    })
  }
}
