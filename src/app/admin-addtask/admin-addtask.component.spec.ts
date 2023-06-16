import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddtaskComponent } from './admin-addtask.component';

describe('AdminAddtaskComponent', () => {
  let component: AdminAddtaskComponent;
  let fixture: ComponentFixture<AdminAddtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddtaskComponent]
    });
    fixture = TestBed.createComponent(AdminAddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
