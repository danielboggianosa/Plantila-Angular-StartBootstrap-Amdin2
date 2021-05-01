import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  headers = {};
  url

  constructor(private http:HttpClient, private auth:AuthService) {
    this.headers = {headers: new HttpHeaders().set('token', sessionStorage.getItem('token'))};
    this.url = env.apiUrl + 'categoria/'
  }

  listar(query){
    const {page, size, order, value, field, empresaId, search } = query
    if(this.auth.isTokenValid()){
      return this.http.get(this.url + `${empresaId}?pagina=${page}&filas=${size}&orden_campo=${field}&orden_valor=${order}`, this.headers)
    }
  }

  ver(id){
    return this.http.get(this.url+id, this.headers)
  }
  
  crear(body){
    return this.http.post(this.url, body, this.headers)
  }

  actualizar(id, empresa){
    return this.http.put(this.url+id, empresa, this.headers)
  }

  borrar(id){
    return this.http.delete(this.url+id, this.headers)
  }
}