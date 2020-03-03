import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink;
  usuario={
    email:null,
    password:null,
  }
  @ViewChild('loginForm',{static:false}) loginForm;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  login(){
    console.log('validando');
    this.subs.sink = this.userService.login(this.usuario).subscribe(
      res=>{
        alert(res['message']);
        this.router.navigateByUrl('/dashboard');
      }
    )
    this.loginForm.nativeElement.reset();
  }

}
