import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebar') sidebar;

  constructor(){ }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toggleSideBar()
  }

  toggleSideBar(){
    this.sidebar.toggle()
  }

}
