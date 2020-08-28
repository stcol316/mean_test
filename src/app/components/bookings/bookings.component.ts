import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from '../../_models/booking';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BookingService } from '../../services/booking.service';
import { AddBookingModalComponent } from '../modals/add-booking-modal/add-booking-modal.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})

export class BookingsComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  book1:Booking = new Booking('steve', 'collins', '3/1/1/1', '12:03', '1234', 3); 
  book2:Booking = new Booking('frankie', 'stanley', '2/1/1/2', '12:00', '5234', 2); 
  book3:Booking = new Booking('stephanie', 'crup', '1/1/1/2', '11:00', '134', 3); 

  isLoading = false;
  bookingsList: Booking[] = [this.book1, this.book2, this.book3];
  sortedData: Booking[];
  dataSource = new MatTableDataSource(this.bookingsList);
  displayedColumns = [
    'firstName',
    'lastName',
    'bookingDate', 
    'bookingTime', 
    'phoneNumber', 
    'partySize', 
    'editBooking'
  ];

  constructor(
    private bookingSvc: BookingService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.getBookings();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getBookings(){
    this.isLoading = true;
    this.bookingSvc.getBookings().subscribe(
      result => {
        if(result != null && result.bookings != null){
          this.bookingsList = result.bookings;
        }
      }, error =>{
        console.log('Error getting bookings')
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  onNewClick(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '700px';
    dialogConfig.maxWidth = '70vw';

    dialogConfig.data = {
      firstName: '',
      lastName:'',
      bookingDate:'',
      bookingTime:'',
      phoneNumber:'',
      partySize:''
    }

    const dialogRef = this.dialog.open(AddBookingModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result =>{
      if(result != null){
        this.bookingSvc.addBooking(result).subscribe(
          result => {
            if(result != null && result.bookings != null){
              this.bookingsList = result.bookings;
            }
          }, error =>{
            console.log('Error adding booking')
          }
        );
      }
    })
  }

  onEditClick(element){
    this.isLoading = true;
    this.bookingSvc.updateBooking(element).subscribe(
      result => {
        if(result != null){

        }
      }, error =>{
        console.log('Error updating booking')
      }
    ).add(() => {
      this.isLoading = false;
    });
  }

  onDeleteClick(element){
    this.isLoading = true;
    this.bookingSvc.deleteBooking(element).subscribe(
      result => {
        if(result != null){

        }
      }, error =>{
        console.log('Error deleting booking')
      }
    ).add(() => {
      this.isLoading = false;
    });
  }
}

