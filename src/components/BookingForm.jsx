import React, { useState } from "react";

function BookingForm({ onSubmit, onCancel, selectedSeats }) {
    const [userData, setUserData] = useState({
        name: "",
        phone: "",
        email: ""
    });
    const [errors, setErrors] = useState({});
    //для зніни зачень
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!userData.name.trim()) {
            newErrors.name = "Ім'я обов'язкове";
        }
        
        if (!userData.phone.trim()) {
            newErrors.phone = "Телефон обов'язковий";
        } else if (!/^\+?\d{10,15}$/.test(userData.phone)) {
            newErrors.phone = "Введіть коректний номер телефону";
        }
        
        if (!userData.email.trim()) {
            newErrors.email = "Email обов'язковий";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(userData.email)) {
            newErrors.email = "Введіть коректний email";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        onSubmit(userData);
    };
    
    const formatSelectedSeats = () => {
        return selectedSeats.map(seat => `Ряд ${seat.row}, Місце ${seat.seat}`).join(", ");
    };
    
    return (
        <div className="booking-form-overlay">
            <div className="booking-form-container">
                <h3>Бронювання квитків</h3>
                <p>
                    Ви бронюєте {selectedSeats.length} {getSeatsText(selectedSeats.length)}: 
                    <br />
                    <strong>{formatSelectedSeats()}</strong>
                </p>
                
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="name">Ваше ім'я:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            placeholder="Введіть ваше ім'я"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефону:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                            placeholder="+380123456789"
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    
                    <div className="form-actions">
                        <button type="submit" className="save-booking-button">
                            Підтвердити
                        </button>
                        <button
                            type="button"
                            className="cancel-booking-button"
                            onClick={onCancel}
                        >
                            Скасувати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function getSeatsText(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return "місце";
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return "місця";
    } else {
        return "місць";
    }
}

export default BookingForm;