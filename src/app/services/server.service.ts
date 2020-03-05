import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  public API_URI = "http://138.197.196.196:3000/api/";

  constructor() { }
}
