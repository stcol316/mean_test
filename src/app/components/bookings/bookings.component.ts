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
  
  // book1:Booking = new Booking('steve', 'collins', '3/1/1/1', '12:03', '1234', 3); 
  // book2:Booking = new Booking('frankie', 'stanley', '2/1/1/2', '12:00', '5234', 2); 
  // book3:Booking = new Booking('stephanie', 'crup', '1/1/1/2', '11:00', '134', 3); 

  isLoading = false;
  bookingsList: Booking[] = [];//[this.book1, this.book2, this.book3];
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
    this.getBookings();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  getBookings(){
    this.isLoading = true;
    this.bookingsList = [];
    this.bookingSvc.getBookings().subscribe(
      result => {
        if(result != null && result.data != null){
          result.data.forEach(bookingString => {
            const booking = new Booking(
              bookingString._id,
              bookingString.firstName,
              bookingString.lastName,
              bookingString.bookingDate,
              bookingString.bookingTime,
              bookingString.phoneNumber,
              bookingString.partySize);

              this.bookingsList.push(booking);
          });
          this.dataSource = new MatTableDataSource(this.bookingsList);
        }
      }, error =>{
        console.log('Error getting bookings: ', error);
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
        this.bookingSvc.addBooking(result.booking).subscribe(
          result => {
            if(result != null){
              this.getBookings();
            }
          }, error =>{
            console.log('Error adding booking: ', error)
          }
        );
      }
    })
  }

  onEditClick(element){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '700px';
    dialogConfig.maxWidth = '70vw';
    dialogConfig.data = {booking: element};

    const dialogRef = this.dialog.open(AddBookingModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result =>{
      if(result != null){
        this.isLoading = true;
        this.bookingSvc.updateBooking(result.booking).subscribe(
          result => {
            if(result != null){
              this.getBookings();
            }
          }, error =>{
            console.log('Error updating booking:', error)
          }
        ).add(() => {
          this.isLoading = false;
        });
      }
    });
  }

  onDeleteClick(element:Booking){
    this.isLoading = true;
    this.bookingSvc.deleteBooking(element._id).subscribe(
      result => {
        if(result != null){
          this.getBookings();
        }
      }, error =>{
        console.log('Error deleting booking: ', error)
      }
    ).add(() => {
      this.isLoading = false;
    });
  }
}

