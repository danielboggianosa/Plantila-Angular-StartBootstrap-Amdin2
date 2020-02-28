import { Component, OnInit, OnDestroy } from '@angular/core';
import {SubSink} from 'subsink'
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  subs = new SubSink;

  usuario={
    nombre:null,
    apellido:null,
    email:null,
    password:null
  }

  constructor(protected userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subs.unsubscribe();
  }

  register(){
    console.log('registrando', this.usuario);
    this.subs.sink = this.userService.registraUsuario(this.usuario).subscribe(
      res=>{
        alert(res['message']);
        this.router.navigateByUrl('/login');
      }
    )
  }

}
