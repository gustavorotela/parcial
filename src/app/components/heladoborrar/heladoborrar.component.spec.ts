import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoborrarComponent } from './heladoborrar.component';

describe('HeladoborrarComponent', () => {
  let component: HeladoborrarComponent;
  let fixture: ComponentFixture<HeladoborrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoborrarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeladoborrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
