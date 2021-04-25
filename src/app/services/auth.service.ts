import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

interface tokenPayLoad{
  iss:String,
  iat:Number,
  ext:BigInteger,
  sub:Number,
  user:String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url;

  headers = {headers: new HttpHeaders().set('Content-Type', 'application/json').set('token', sessionStorage.getItem('token'))};

  constructor(private http:HttpClient, private router:Router) {
    this.api_url = env.apiUrl;
  }
  
  login(usuario){
    let header = { headers: new HttpHeaders().set('Authorization', `Basic ${btoa(usuario.correo + ':' + usuario.password)}`) }
    return this.http.get(this.api_url+"login", header );
  }

  register(usuario){
    return this.http.post(this.api_url+"register", usuario, this.headers);
  }

  recover(correo){
    return this.http.post(this.api_url+"recover", correo, this.headers);
  }

  reset(usuario){
    return this.http.post(this.api_url+"reset", usuario, this.headers);
  }

  isTokenValid():boolean {
    const token = sessionStorage.getItem('token')
    const tokenPayLoad:tokenPayLoad = decode(token)
    let now = new Date().getTime()
    let ext = new Date(tokenPayLoad.ext * 1000).getTime()
    if(sessionStorage.getItem('user.nickname') && now < ext)
      return true
    else{
      this.sessionDestroy()
      return false
    }
  }

  sessionDestroy(){
    localStorage.clear();
    sessionStorage.clear();    
    this.router.navigate(['/login']);
  }

}
