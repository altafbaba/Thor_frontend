import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuelFormComponent } from './refuel-form.component';

describe('RefuelFormComponent', () => {
  let component: RefuelFormComponent;
  let fixture: ComponentFixture<RefuelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefuelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefuelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
