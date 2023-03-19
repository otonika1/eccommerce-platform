import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(public auth:AuthService) {}
  carousel:any
  ngOnInit(): void {
    this.get();
  }
  get(){
    this.auth.getCarousel().subscribe(res => {
      this.carousel = res
      console.log(this.carousel);
      
    })
  }
}
