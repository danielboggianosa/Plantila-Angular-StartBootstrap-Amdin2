import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styles: []
})
export class RecoverComponent implements OnInit {
  subs = new SubSink
  correo;
  successMessage: any;
  failMessage: any;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.subs.sink = this.authService.recover(this.correo).subscribe(res=>{
      if(res['success']){
        delete this.failMessage;
        this.successMessage = res['msg'];
      }
      else{
        delete this.successMessage;
        this.failMessage = res['msg']
      }
    })
  }

}
