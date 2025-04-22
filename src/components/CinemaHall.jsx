import React, { useState, useEffect } from "react";
import BookingService from "../services/BookingService";
import BookingForm from "./BookingForm";

function CinemaHall({ movieId, movieTitle }) {
    const rows = 8;
    const seatsPerRow = 10;
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    
    useEffect(() => {
        const generateInitialSeats = () => {
            const seats = [];
            const occupiedSeats = BookingService.getOccupiedSeatsByMovieId(movieId);
            
            for (let row = 1; row <= rows; row++) {
            for (let seat = 1; seat <= seatsPerRow; seat++) {
                const isOccupied = occupiedSeats.some(
                (occupied) => occupied.row === row && occupied.seat === seat
                );
                
                seats.push({
                id: `${row}-${seat}`,
                row,
                seat,
                status: isOccupied ? 'occupied' : 'available',
                });
            }
            }
            return seats;
        };
        
        setSeats(generateInitialSeats());
    }, [movieId, rows, seatsPerRow]);



    const toggleSeatSelection = (seatId) => {
      const updatedSeats = seats.map((seat) => {
        if (seat.id === seatId && seat.status !== 'occupied') {
          const newStatus = seat.status === 'available' ? 'selected' : 'available';

          if (newStatus === 'selected') {
            setSelectedSeats(prev => [...prev, seat]);
          } else {
            setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
          }

          return { ...seat, status: newStatus };
        }
        return seat;
      });

      setSeats(updatedSeats);
    };

    const confirmBooking = () => {
      if (selectedSeats.length === 0) {
        alert("Будь ласка, виберіть хоча б одне місце для бронювання.");
        return;
      }
      setShowBookingForm(true);
    };

    const cancelSelection = () => {
      const updatedSeats = seats.map(seat => {
        if (seat.status === 'selected') {
          return { ...seat, status: 'available' };
        }
        return seat;
      });

      setSeats(updatedSeats);
      setSelectedSeats([]);
    };

    const handleBookingSubmit = (userData) => {
      const booking = {
        seats: selectedSeats,
        userData,
        date: new Date().toISOString(),
      };

      const success = BookingService.saveBooking(movieId, booking);

      if (success) {
        alert("Бронювання успішно збережено!");
        
        const updatedSeats = seats.map(seat => {
          if (seat.status === 'selected') {
            return { ...seat, status: 'occupied' };
          }
          return seat;
        });

        setSeats(updatedSeats);
        setSelectedSeats([]);
        setShowBookingForm(false);
      } else {
        alert("Помилка під час збереження бронювання.");
      }
    };
  
    const handleBookingCancel = () => {
      setShowBookingForm(false);
    };
    
    return (
        <div className="cinema-hall">
            <h2 className="hall-title">Вибір місць для фільму "{movieTitle}"</h2>
            
            <div className="screen-container">
                <div className="screen">Екран</div>
            </div>
            
            <div className="legend">
                <div className="legend-item">
                    <div className="seat available"></div>
                    <span>Доступне</span>
                </div>
                <div className="legend-item">
                    <div className="seat selected"></div>
                    <span>Вибране</span>
                </div>
                <div className="legend-item">
                    <div className="seat occupied"></div>
                    <span>Зайняте</span>
                </div>
            </div>
            
             <div className="seats-container">
                {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={`row-${rowIndex + 1}`} className="seat-row">
                    <div className="row-number">{rowIndex + 1}</div>
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                    const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
                    const seat = seats.find(s => s.id === seatId);
                    
                    return (
                        <div
                        key={`seat-${seatId}`}
                        className={`seat ${seat?.status || 'available'}`}
                        onClick={() => toggleSeatSelection(seatId)}
                        title={`Ряд ${rowIndex + 1}, Місце ${seatIndex + 1}`}
                        >
                        {seatIndex + 1}
                        </div>
                    );
                    })}
                </div>
                ))}
            </div>
            
            <div className="booking-summary">
                <h3>Вибрані місця:</h3>
                {selectedSeats.length > 0 ? (
                <ul>
                    {selectedSeats.map(seat => (
                    <li key={seat.id}>Ряд {seat.row}, Місце {seat.seat}</li>
                    ))}
                </ul>
                ) : (
                <p>Не вибрано жодного місця</p>
                )}
                
                <div className="booking-actions">
                <button
                    className="confirm-booking-button"
                    onClick={confirmBooking}
                    disabled={selectedSeats.length === 0}
                >
                    Забронювати
                </button>
                <button
                    className="cancel-selection-button"
                    onClick={cancelSelection}
                    disabled={selectedSeats.length === 0}
                >
                    Скасувати вибір
                </button>
                </div>
            </div>
            
            {showBookingForm && (
                <BookingForm
                onSubmit={handleBookingSubmit}
                onCancel={handleBookingCancel}
                selectedSeats={selectedSeats}
                />
            )}
            </div>
        );
        }

        export default CinemaHall;