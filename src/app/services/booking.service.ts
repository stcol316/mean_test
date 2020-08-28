import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  getBookings(){
    const restApi='api_get_bookings';

    return this.http.get<any>(restApi);
  }

  addBooking(bookingData){
    const restApi = 'api_add_booking';
    const params = new HttpParams().set('bookingParams', JSON.stringify(bookingData));

    return this.http.post<any>(restApi,params);
  }

  deleteBooking(bookingId){
    const restApi = 'api_delete_booking';

    return this.http.delete<any>(restApi, {params: bookingId});
  }

  updateBooking(bookingData){
    const restApi = 'api_update_booking';

    return this.http.put<any>(restApi, bookingData);
  }
}
