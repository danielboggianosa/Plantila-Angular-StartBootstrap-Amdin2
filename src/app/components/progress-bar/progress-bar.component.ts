import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: []
})
export class ProgressBarComponent implements OnInit {
  @Input() bars=[
    {
      nombre: 'Server Migration',
      progreso: 20,
      color: '#e74a3b' //bg-danger
    },
    {
      nombre: 'Sales tracking',
      progreso: 40,
      color: '#f6c23e' //bg-warning   
    },
    {
      nombre: 'Customer Database',
      progreso: 60,
      color: '#4e73df' //bg-primary   
    },
    {
      nombre: 'Payout Details',
      progreso: 80,
      color: '#36b9cc' //bg-primary   
    },
    {
      nombre: 'Account Setup',
      progreso: 100,
      color: '#1cc88a' //bg-primary   
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
