import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerService } from './server.service';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_url

  constructor(private api:ServerService, private http:HttpClient) {
    this.api_url = env.apiUrl + 'users';
  }

  registraUsuario(usuario){
    return this.http.post(this.api_url, usuario);
  }

  login(usuario){
    return this.http.post(this.api_url+"/authenticate", usuario);
  }

  getUsers(body){
    return this.http.post(this.api_url+'/get',body)
  }

  getFiltered(body){
    return this.http.post(this.api_url+'/filtered',body)
  }

  deleteUser(id){
    return this.http.delete(this.api_url+'/'+id);
  }

}
