import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidordetalleComponent } from './repartidordetalle.component';

describe('RepartidordetalleComponent', () => {
  let component: RepartidordetalleComponent;
  let fixture: ComponentFixture<RepartidordetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartidordetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepartidordetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
