import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePlantComponent } from './admin-create-plant.component';

describe('AdminCreatePlantComponent', () => {
  let component: AdminCreatePlantComponent;
  let fixture: ComponentFixture<AdminCreatePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreatePlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreatePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
