import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './_shared/material/material.module';
import { AddBookingModalComponent } from './components/modals/add-booking-modal/add-booking-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BookingsComponent,
    AddBookingModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
