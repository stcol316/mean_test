export class Booking {

    firstName:string;
    lastName:string;
    bookingDate:string;
    bookingTime:string;
    phoneNumber:string;
    partySize:number;

    constructor(
        firstName:string = '',
        lastName:string = '',
        bookingDate:string = '',
        bookingTime:string = '',
        phoneNumber:string = '',
        partySize:number = 0
        ){
            this.firstName = firstName;
            this.lastName = lastName;
            this.bookingDate = bookingDate;
            this.bookingTime = bookingTime;
            this.phoneNumber = phoneNumber;
            this.partySize = partySize;
    }
}