import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacardsComponent } from './datacards.component';

describe('DatacardsComponent', () => {
  let component: DatacardsComponent;
  let fixture: ComponentFixture<DatacardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
