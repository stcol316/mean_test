import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingModalComponent } from './add-booking-modal.component';

describe('AddBookingModalComponent', () => {
  let component: AddBookingModalComponent;
  let fixture: ComponentFixture<AddBookingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
