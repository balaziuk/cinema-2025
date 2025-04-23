class BookingService {
  //всі бронювання, пов'язані з конкретним фільмом.
  static getBookingsByMovieId(movieId) {
    try {
      const bookings = localStorage.getItem(`bookings_${movieId}`);
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error("Error getting bookings:", error);
      return [];
    }
  }

  static saveBooking(movieId, booking) {
    try {
      const existingBookings = this.getBookingsByMovieId(movieId);
      const updatedBookings = [...existingBookings, booking];
      localStorage.setItem(`bookings_${movieId}`, JSON.stringify(updatedBookings));
      return true;
    } catch (error) {
      console.error("Error saving booking:", error);
      return false;
    }
  }
  //Повертає всі зайняті місця для певного фільму
  static getOccupiedSeatsByMovieId(movieId) {
    const bookings = this.getBookingsByMovieId(movieId);
    return bookings.reduce((seats, booking) => {
      return [...seats, ...booking.seats];
    }, []);
  }
}

export default BookingService;