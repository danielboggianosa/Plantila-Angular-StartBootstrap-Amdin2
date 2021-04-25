import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SubSink } from 'subsink';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  subs = new SubSink;
  usuario={
    correo:null,
    password:null,
  }
  @ViewChild('loginForm',{static:false}) loginForm;
  loginMessage: string;

  constructor(protected authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  login(){
    console.log('validando');
    this.subs.sink = this.authService.login(this.usuario).subscribe(
      res=>{
        console.log(res)
        if(res['success']){
          sessionStorage.setItem('user.nombre', res['data'].first_name)
          sessionStorage.setItem('user.apellido', res['data'].last_name)
          sessionStorage.setItem('user.nickname', res['data'].nickname)
          sessionStorage.setItem('user.level', res['data'].wp_user_level)
          sessionStorage.setItem('token', res['token'])
          if(sessionStorage.getItem('token'))
            this.router.navigateByUrl('/dashboard');
        } 
        else
          this.loginMessage = res['msg'];

      }
    )
    this.loginForm.nativeElement.reset();
  }

}
