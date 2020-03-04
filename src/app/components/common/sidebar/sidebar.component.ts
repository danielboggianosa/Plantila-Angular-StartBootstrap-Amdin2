import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  webTitle='NG Admin';
  webTitleSup="1"
  @ViewChild('accordionSidebar', {static:true}) accordionSidebar;
  // MENU EXAMPLE STRUCTURE DATA
  menuGroups=[
    {id: 1, title: '', permission:'', menu:[
      {id:1, title: 'Dashboard', icon:'fas fa-fw fa-tachometer-alt', link: '/dashboard', permission:'', subtitle: '', submenu:[]},
    ]},
    {id: 2, title: 'Interface', permission:'', menu:[
      {id:1, title: 'Components', icon:'fas fa-fw fa-cog', link: '', permission:'', subtitle: 'Custom Components', submenu:[
        {id:2, title:'Buttons', link:'buttons', permission:''},
        {id:3, title:'Cards', link:'cards', permission:'' },
      ]},
      {id:3, title: 'Utilitis', icon:'fas fa-fw fa-wrench', link: '', permission:'', subtitle: 'Custom Utilities', submenu:[
        {id:5, title:'Colors', link:'colors', permission:'' },
        {id:6, title:'Borders', link:'borders', permission:'' },
        {id:7, title:'Animations', link:'animations', permission:'' },
        {id:8, title:'Other', link:'other', permission:'' },
      ]},
    ]},
    {id: 3, title: 'Addons', permission:'', menu:[
      {id:9, title: 'Pages', icon:'fas fa-fw fa-folder', link: '', permission:'', subtitle: 'Custom Components', submenu:[
        {id:10, title:'Login', link:'/login', permission:'' },
        {id:11, title:'Register', link:'/register', permission:'' },
        {id:12, title:'Forgot Password', link:'/recover', permission:'' },
        {id:12, title:'Profile', link:'profile', permission:'' },
        {id:13, title:'404 Page', link:'unknown', permission:'' },
        {id:14, title:'Blank Page', link:'blank', permission:'' },
      ]},
      {id:15, title: 'Charts', icon:'fas fa-fw fa-chart-area', link: 'charts', permission:'', subtitle: '', submenu:[]},
      {id:16, title: 'Tables', icon:'fas fa-fw fa-table', link: 'table', permission:'', subtitle: '', submenu:[]},
      {id:17, title: 'Forms', icon:'fas fa-fw fa-table', link: 'forms', permission:'', subtitle: '', submenu:[]},
    ]},
  ]
  activeSubmenu: string;
  group: any;
  menu: any;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(){
    this.accordionSidebar.nativeElement.classList.toggle('toggled');
  }

  toggleSubmenu(g1, m1){
    let g0 = this.group;
    let m0 = this.menu;
    this.accordionSidebar.nativeElement.children['group_'+g1].children['item_'+m1].children['menu_'+m1].children['submenu_'+m1].classList.toggle('show');

    if(m0 && m0!=m1){
        this.accordionSidebar.nativeElement.children['group_'+g0].children['item_'+m0].children['menu_'+m0].children['submenu_'+m0].classList.remove('show');
    }
    this.group = g1;
    this.menu = m1;
  }

}
