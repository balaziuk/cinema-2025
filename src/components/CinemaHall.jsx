import React,{useState} from "react";
function CinemaHall({ id, movieTitle }) {
    const rows = 9;
    const seatsPerRow = 12;

    const generateInitialSeats = () => {
        const seats = [];
        for (let row = 1; row <= rows; row++) {
            for (let seat = 1; seat <= seatsPerRow; seat++) {
                
                const isOccupied = Math.random() < 0.3; // 30% шанс, що місце зайняте
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

    const [seats, setSeats] = useState(generateInitialSeats());
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeatSelection = (seatId) => { 
        const updatedSeats = seats.map((seat) => { 
            if (seat.id === seatId && seat.status !== 'occupied') {
            const newStatus = seat.status === 'available' ? 'selected' : 'available';
            
            // Оновлюємо список вибраних місць
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
        const updatedSeats = seats.map(seat => {
            if (seat.status === 'selected') {
                return { ...seat, status: 'occupied' };
            }
            return seat;
        });
        
        setSeats(updatedSeats);
        setSelectedSeats([]);

        alert(`Бронювання підтверджено для фільму "${movieTitle}" на місця: ${selectedSeats.map(seat => seat.id).join(', ')}`);
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

    return (
        <div className="cinema-hall-container">
            <h2>Вибір місць для фільму "{movieTitle}"</h2>
            
            <div className="screen-container">
                <div className="screen">Екран</div>
            </div>
            
            <div className="seats-legend">
                <div className="legend-item">
                    <div className="seat-example available"></div>
                    <span>Доступне</span>
                </div>
                <div className="legend-item">
                    <div className="seat-example selected"></div>
                    <span>Вибране</span>
                </div>
                <div className="legend-item">
                    <div className="seat-example occupied"></div>
                    <span>Зайняте</span>
                </div>
            </div>

            <div className="seats-grid">
                {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={`row-${rowIndex + 1}`} className="seat-row">
                    <div className="row-number">{rowIndex + 1}</div>
                    <div className="seats">
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => {
                        const seatId = `${rowIndex + 1}-${seatIndex + 1}`;
                        const seat = seats.find(s => s.id === seatId);
                        
                        return (
                        <div 
                            key={`seat-${seatId}`} 
                            className={`seat ${seat.status}`}
                            onClick={() => toggleSeatSelection(seatId)}
                            title={`Ряд ${rowIndex + 1}, Місце ${seatIndex + 1}`}
                        >
                            {seatIndex + 1}
                        </div>
                        );
                    })}
                    </div>
                </div>
                ))}
            </div>


        <div className="selected-seats-info">
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
            className="confirm-button" 
            onClick={confirmBooking}
            disabled={selectedSeats.length === 0}
          >
            Підтвердити бронювання
          </button>
          <button 
            className="cancel-button" 
            onClick={cancelSelection}
            disabled={selectedSeats.length === 0}
          >
            Скасувати вибір
          </button>
        </div>
      </div>
    </div>
  );
}

export default CinemaHall;