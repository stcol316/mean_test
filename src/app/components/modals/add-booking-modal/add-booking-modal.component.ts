import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Booking } from '../../../_models/booking';
import { FormGroup, FormBuilder } from '@angular/forms';
import { throws } from 'assert';

@Component({
  selector: 'app-add-booking-modal',
  templateUrl: './add-booking-modal.component.html',
  styleUrls: ['./add-booking-modal.component.scss']
})
export class AddBookingModalComponent implements OnInit {

  booking: Booking;
  isEdit = false;
  bookingForm: FormGroup;
  formInvalid = true;

  constructor(
    public dialogRef: MatDialogRef<AddBookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) { 

    if(this.data.booking){
      this.booking = {...data.booking};
      this.isEdit = true;
    }
    else{
      this.booking = new Booking();
      this.isEdit = false;
    }
    this.bookingForm = this.fb.group({
      firstName:'',
      lastName:'',
      bookingDate:'',
      bookingTime:'',
      phoneNumber:'',
      partySize:''
    })
  }

  ngOnInit(): void {
  }

  onSaveClick() {

    this.dialogRef.close({
      booking: this.booking,
      isEdit: this.isEdit
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
