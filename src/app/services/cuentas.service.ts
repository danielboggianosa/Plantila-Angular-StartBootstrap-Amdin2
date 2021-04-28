import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {
  headers = {};
  url

  constructor(private http:HttpClient, private auth:AuthService) {
    this.headers = {headers: new HttpHeaders().set('token', sessionStorage.getItem('token'))};
    this.url = env.apiUrl + 'cuenta/'
  }

  listar(body){
    const {page, size, order, value, field, empresaId, search } = body
    if(this.auth.isTokenValid()){
      return this.http.get(this.url + `?pagina=${page}&filas=${size}&busqueda_campo=${search}&busqueda_valor=${value}&orden_campo=${field}&orden_valor=${order}&empresa_id=${empresaId}`, this.headers)
    }
  }

  ver(id){
    return this.http.get(this.url+id, this.headers)
  }

  actualizar(id, empresa){
    return this.http.put(this.url+id, empresa, this.headers)
  }

  borrar(id){
    return this.http.delete(this.url+id, this.headers)
  }

}
