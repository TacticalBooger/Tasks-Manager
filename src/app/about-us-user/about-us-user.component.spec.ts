import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsUserComponent } from './about-us-user.component';

describe('AboutUsUserComponent', () => {
  let component: AboutUsUserComponent;
  let fixture: ComponentFixture<AboutUsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsUserComponent]
    });
    fixture = TestBed.createComponent(AboutUsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
