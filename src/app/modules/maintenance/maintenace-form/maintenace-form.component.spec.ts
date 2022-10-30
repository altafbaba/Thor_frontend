import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenaceFormComponent } from './maintenace-form.component';

describe('MaintenaceFormComponent', () => {
  let component: MaintenaceFormComponent;
  let fixture: ComponentFixture<MaintenaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenaceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
