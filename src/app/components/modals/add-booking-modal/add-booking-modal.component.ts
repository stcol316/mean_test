import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Booking } from '../../../_models/booking';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

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
  datetime;

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
      phoneNumber:['', [Validators.pattern(/^[0-9]\d*$/), Validators.minLength(6), Validators.maxLength(20)]],
      partySize:['', [Validators.pattern(/^[0-9]\d*$/)]]
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
