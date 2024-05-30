import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidoraltaComponent } from './repartidoralta.component';

describe('RepartidoraltaComponent', () => {
  let component: RepartidoraltaComponent;
  let fixture: ComponentFixture<RepartidoraltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartidoraltaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepartidoraltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
