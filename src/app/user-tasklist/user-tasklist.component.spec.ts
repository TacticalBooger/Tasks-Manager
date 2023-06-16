import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTasklistComponent } from './user-tasklist.component';

describe('UserTasklistComponent', () => {
  let component: UserTasklistComponent;
  let fixture: ComponentFixture<UserTasklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTasklistComponent]
    });
    fixture = TestBed.createComponent(UserTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
