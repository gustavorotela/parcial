import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarepartidorComponent } from './listarepartidor.component';

describe('ListarepartidorComponent', () => {
  let component: ListarepartidorComponent;
  let fixture: ComponentFixture<ListarepartidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarepartidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
