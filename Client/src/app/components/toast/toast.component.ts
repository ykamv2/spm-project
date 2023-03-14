import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
declare var bootstrap: any;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @Output() closeHit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() title: any;
  @Input() message: any;
  @Input() date:any;
  
  constructor(
    private generalService: GeneralService
  ) { }
  sessionData:any;

  ngOnInit(): void {
  this.sessionData = this.generalService.getSessionData();
    // var toastElist = [].slice.call(document.querySelectorAll('.toast'))
    // toastElist.map(function(toastEl){
    //   return new bootstrap.Toast(toastEl,{})
    // })
  }

}
