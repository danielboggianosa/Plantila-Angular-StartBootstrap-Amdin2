import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filter-columns',
  templateUrl: './filter-columns.component.html',
  styles: []
})
export class FilterColumnsComponent implements OnInit {
  @Input() columns;

  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
  }

  open(content){
    this.modal.open(content, {size:'sm', centered:false});
  }
  close(){
    this.modal.dismissAll();
  }

}
