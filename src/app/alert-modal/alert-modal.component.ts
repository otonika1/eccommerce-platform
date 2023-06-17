import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  @Input() error: string | undefined;
  @Input() img: string | undefined;
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
    this.router.navigateByUrl('/').then(()=> {
      window.location.reload()
    })
  }
}
