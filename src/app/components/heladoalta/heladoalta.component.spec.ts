import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoaltaComponent } from './heladoalta.component';

describe('HeladoaltaComponent', () => {
  let component: HeladoaltaComponent;
  let fixture: ComponentFixture<HeladoaltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoaltaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeladoaltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
