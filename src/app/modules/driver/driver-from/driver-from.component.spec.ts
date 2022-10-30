import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFromComponent } from './driver-from.component';

describe('DriverFromComponent', () => {
  let component: DriverFromComponent;
  let fixture: ComponentFixture<DriverFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
