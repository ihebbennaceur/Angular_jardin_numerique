import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPropositionsComponent } from './admin-propositions.component';

describe('AdminPropositionsComponent', () => {
  let component: AdminPropositionsComponent;
  let fixture: ComponentFixture<AdminPropositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPropositionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPropositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
