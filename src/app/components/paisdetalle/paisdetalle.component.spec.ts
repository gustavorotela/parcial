import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisdetalleComponent } from './paisdetalle.component';

describe('PaisdetalleComponent', () => {
  let component: PaisdetalleComponent;
  let fixture: ComponentFixture<PaisdetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisdetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaisdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
