import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTasklistComponent } from './admin-tasklist.component';

describe('AdminTasklistComponent', () => {
  let component: AdminTasklistComponent;
  let fixture: ComponentFixture<AdminTasklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminTasklistComponent]
    });
    fixture = TestBed.createComponent(AdminTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
