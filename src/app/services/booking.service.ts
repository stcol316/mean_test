import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Booking} from '../_models/booking'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(){
    const restApi = 'http://localhost:8080/api/booking/bookings';

    return this.http.get<any>(restApi);
  }

  addBooking(bookingData){
    const restApi = 'http://localhost:8080/api/booking/bookings';
    const params = new HttpParams().set('bookingParams', JSON.stringify(bookingData));

    return this.http.post<any>(restApi,params);
  }

  deleteBooking(bookingId){
    const restApi = `http://localhost:8080/api/booking/bookings/${bookingId}`;

    return this.http.delete<any>(restApi, {params: bookingId});
  }

  updateBooking(bookingData:Booking){
    const restApi = `/api/booking/bookings/${bookingData.id}`;

    return this.http.put<any>(restApi, bookingData);
  }
}
