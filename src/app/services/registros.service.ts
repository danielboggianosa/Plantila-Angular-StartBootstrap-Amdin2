import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment as env } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  headers = {};
  url

  constructor(private http:HttpClient, private auth:AuthService) {
    this.headers = {headers: new HttpHeaders().set('token', sessionStorage.getItem('token'))};
    this.url = env.apiUrl + 'registro/'
  }

  listar(body){
    const {page, size, order, value, field, cuentaId, search } = body
    if(this.auth.isTokenValid()){
      return this.http.get(this.url + `${cuentaId}?pagina=${page}&filas=${size}&busqueda_campo=${search}&busqueda_valor=${value}&orden_campo=${field}&orden_valor=${order}&cuenta_id=${cuentaId}`, this.headers)
    }
  }

  ver(id){
    return this.http.get(this.url+id, this.headers)
  }

  actualizar(id, cuenta){
    return this.http.put(this.url+id, cuenta, this.headers)
  }

  borrar(id){
    return this.http.delete(this.url+id, this.headers)
  }
}
