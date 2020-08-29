export class Booking {
    _id:string;
    firstName:string;
    lastName:string;
    bookingDate:string;
    bookingTime:string;
    phoneNumber:string;
    partySize:number;

    constructor(
        _id?: '',
        firstName:string = '',
        lastName:string = '',
        bookingDate:string = '',
        bookingTime:string = '',
        phoneNumber:string = '',
        partySize:number = 0
        ){
            this._id = _id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.bookingDate = bookingDate;
            this.bookingTime = bookingTime;
            this.phoneNumber = phoneNumber;
            this.partySize = partySize;
    }
}