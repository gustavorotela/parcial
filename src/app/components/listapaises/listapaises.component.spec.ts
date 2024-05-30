import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapaisesComponent } from './listapaises.component';

describe('ListapaisesComponent', () => {
  let component: ListapaisesComponent;
  let fixture: ComponentFixture<ListapaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListapaisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListapaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
