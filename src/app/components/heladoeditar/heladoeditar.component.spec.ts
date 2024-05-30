import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeladoeditarComponent } from './heladoeditar.component';

describe('HeladoeditarComponent', () => {
  let component: HeladoeditarComponent;
  let fixture: ComponentFixture<HeladoeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeladoeditarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeladoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
