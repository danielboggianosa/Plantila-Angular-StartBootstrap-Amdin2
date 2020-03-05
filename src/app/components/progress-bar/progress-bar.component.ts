import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: []
})
export class ProgressBarComponent implements OnInit {
  @Input() bars=[
    {
      nombre: 'Barra 1',
      progreso: 75,
      color: '#e74a3b'
    },
    {
      nombre: 'Barra 2',
      progreso: 80,
      color: '#4e73df'      
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
