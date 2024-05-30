import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepartidormainComponent } from './repartidormain.component';

describe('RepartidormainComponent', () => {
  let component: RepartidormainComponent;
  let fixture: ComponentFixture<RepartidormainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepartidormainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepartidormainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
