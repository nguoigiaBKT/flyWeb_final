// Global state to track booking information
let bookingState = {
    outbound: { flight: "Lufthansa LH772", price: 850 },
    return: { flight: "Qantas QF5", price: 875 },
    meal: { option: "Standard Meal", price: 0 },
    luggage: { option: "Standard Allowance", price: 0 },
    seat: { option: "Random Assignment", price: 0 },
    seats: [],
    totalPrice: 0
};

// Function to show a specific page and hide others
function showPage(pageNumber) {
    // Hide all pages
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'none';

    // Show the requested page
    document.getElementById('page' + pageNumber).style.display = 'block';

    // Update content when switching to specific pages
    if (pageNumber === 2) {
        updateFlightSummary();
        calculateTotal();
    } else if (pageNumber === 3) {
        updatePaymentSummary();
    }
}

// Function to update flight selection summary
function updateFlightSummary() {
    // Update the flight summary section on page 2
    const flightSummary = document.querySelector('#page2 .flight-summary');
    if (flightSummary) {
        // The summary is already created in HTML, no need to update
    }
}

// Function to calculate total price
function calculateTotal() {
    // Base price is outbound and return flights for 2 passengers
    let basePrice = (bookingState.outbound.price + bookingState.return.price) * 2;

    // Add meal price for 2 passengers
    let mealPrice = bookingState.meal.price * 2;

    // Add luggage price for 2 passengers
    let luggagePrice = bookingState.luggage.price * 2;

    // Add seat selection price for 2 passengers
    let seatPrice = bookingState.seat.price * 2;

    // Add individual seat prices if specific seats were selected
    let specificSeatPrice = bookingState.seats.reduce((total, seat) => {
        // Premium seats (A and F) cost €10 extra
        const seatColumn = seat.id.slice(-1);
        const isPremium = (seatColumn === 'A' || seatColumn === 'F');
        return total + (isPremium ? 10 : 0);
    }, 0);

    // Fixed taxes and fees
    const taxesAndFees = 250;

    // Sum up all prices
    bookingState.totalPrice = basePrice + mealPrice + luggagePrice + seatPrice + specificSeatPrice + taxesAndFees;

    // Update total price display
    document.getElementById('total-price').textContent = `Total Price: €${bookingState.totalPrice}`;
}

// Function to update payment summary on page 3
function updatePaymentSummary() {
    // Get payment summary container
    const paymentSummary = document.querySelector('.payment-summary');
    if (!paymentSummary) return;

    // Clear existing content
    paymentSummary.innerHTML = '';

    // Number of passengers
    const passengers = 2;

    // Add outbound flight
    const outboundItem = document.createElement('div');
    outboundItem.className = 'payment-item';
    outboundItem.innerHTML = `
    <span>${bookingState.outbound.flight} (Outbound)</span>
    <span>€${bookingState.outbound.price} × ${passengers}</span>
  `;
    paymentSummary.appendChild(outboundItem);

    // Add return flight
    const returnItem = document.createElement('div');
    returnItem.className = 'payment-item';
    returnItem.innerHTML = `
    <span>${bookingState.return.flight} (Return)</span>
    <span>€${bookingState.return.price} × ${passengers}</span>
  `;
    paymentSummary.appendChild(returnItem);

    // Add meal option
    const mealItem = document.createElement('div');
    mealItem.className = 'payment-item';
    mealItem.innerHTML = `
    <span>${bookingState.meal.option}</span>
    <span>${bookingState.meal.price > 0 ? '€' + bookingState.meal.price + ' × ' + passengers : 'Included'}</span>
  `;
    paymentSummary.appendChild(mealItem);

    // Add luggage option
    const luggageItem = document.createElement('div');
    luggageItem.className = 'payment-item';
    luggageItem.innerHTML = `
    <span>${bookingState.luggage.option}</span>
    <span>${bookingState.luggage.price > 0 ? '€' + bookingState.luggage.price + ' × ' + passengers : 'Included'}</span>
  `;
    paymentSummary.appendChild(luggageItem);

    // Add seat option
    const seatItem = document.createElement('div');
    seatItem.className = 'payment-item';
    seatItem.innerHTML = `
    <span>${bookingState.seat.option}</span>
    <span>${bookingState.seat.price > 0 ? '€' + bookingState.seat.price + ' × ' + passengers : 'Included'}</span>
  `;
    paymentSummary.appendChild(seatItem);

    // Add selected seats if any
    if (bookingState.seats.length > 0) {
        const selectedSeatsItem = document.createElement('div');
        selectedSeatsItem.className = 'payment-item';
        const seatList = bookingState.seats.map(seat => seat.id).join(', ');
        selectedSeatsItem.innerHTML = `
      <span>Selected Seats: ${seatList}</span>
      <span>€${bookingState.seats.reduce((total, seat) => total + (seat.isPremium ? 10 : 0), 0)}</span>
    `;
        paymentSummary.appendChild(selectedSeatsItem);
    }

    // Add taxes and fees
    const taxesItem = document.createElement('div');
    taxesItem.className = 'payment-item';
    taxesItem.innerHTML = `
    <span>Taxes and Fees</span>
    <span>€250</span>
  `;
    paymentSummary.appendChild(taxesItem);

    // Add total
    const totalItem = document.createElement('div');
    totalItem.className = 'payment-item payment-total';
    totalItem.innerHTML = `
    <span>Total Amount</span>
    <span>€${bookingState.totalPrice.toLocaleString()}</span>
  `;
    paymentSummary.appendChild(totalItem);
}

// Function to store form data
function storeFormData() {
    const formData = {
        title: document.getElementById('title')?.value,
        firstname: document.getElementById('firstname')?.value,
        lastname: document.getElementById('lastname')?.value,
        dob: document.getElementById('dob')?.value,
        nationality: document.getElementById('nationality')?.value,
        passport: document.getElementById('passport')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        payment: document.getElementById('payment')?.value,
        terms: document.getElementById('terms')?.checked,
        bookingState: bookingState
    };
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Function to load form data
function loadFormData() {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        if (document.getElementById('title')) document.getElementById('title').value = formData.title || '';
        if (document.getElementById('firstname')) document.getElementById('firstname').value = formData.firstname || '';
        if (document.getElementById('lastname')) document.getElementById('lastname').value = formData.lastname || '';
        if (document.getElementById('dob')) document.getElementById('dob').value = formData.dob || '';
        if (document.getElementById('nationality')) document.getElementById('nationality').value = formData.nationality || '';
        if (document.getElementById('passport')) document.getElementById('passport').value = formData.passport || '';
        if (document.getElementById('email')) document.getElementById('email').value = formData.email || '';
        if (document.getElementById('phone')) document.getElementById('phone').value = formData.phone || '';
        if (document.getElementById('payment')) document.getElementById('payment').value = formData.payment || '';
        if (document.getElementById('terms')) document.getElementById('terms').checked = formData.terms || false;

        // Restore booking state if available
        if (formData.bookingState) {
            bookingState = formData.bookingState;
        }
    }
}

// Initialize seat selection functionality
function initializeSeatSelection() {
    const seats = document.querySelectorAll('.seat:not(.occupied)');

    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            seat.classList.toggle('selected');

            // Update bookingState.seats
            if (seat.classList.contains('selected')) {
                const seatId = seat.textContent;
                const seatColumn = seatId.slice(-1);
                const isPremium = (seatColumn === 'A' || seatColumn === 'F');

                bookingState.seats.push({
                    id: seatId,
                    isPremium: isPremium
                });
            } else {
                // Remove seat from selected seats
                const seatId = seat.textContent;
                bookingState.seats = bookingState.seats.filter(s => s.id !== seatId);
            }

            // Update total price
            calculateTotal();
        });
    });
}

// Handle flight selection
function handleFlightSelection() {
    // Outbound flight selection
    const outboundRadios = document.querySelectorAll('input[name="outbound"]');
    outboundRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Get flight info based on index
                if (index === 0) {
                    bookingState.outbound = { flight: "Lufthansa LH772", price: 850 };
                } else if (index === 1) {
                    bookingState.outbound = { flight: "Singapore Airlines SQ326", price: 795 };
                } else if (index === 2) {
                    bookingState.outbound = { flight: "Emirates EK46", price: 805 };
                }
                calculateTotal();
            }
        });
    });

    // Return flight selection
    const returnRadios = document.querySelectorAll('input[name="return"]');
    returnRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Get flight info based on index
                if (index === 0) {
                    bookingState.return = { flight: "Qantas QF5", price: 875 };
                } else if (index === 1) {
                    bookingState.return = { flight: "Singapore Airlines SQ212", price: 810 };
                } else if (index === 2) {
                    bookingState.return = { flight: "Emirates EK412", price: 790 };
                }
                calculateTotal();
            }
        });
    });
}

// Handle meal selection
function handleMealSelection() {
    const mealRadios = document.querySelectorAll('input[name="meal"]');
    mealRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Get meal info based on index
                if (index === 0) {
                    bookingState.meal = { option: "Standard Meal", price: 0 };
                } else if (index === 1) {
                    bookingState.meal = { option: "Premium Meal", price: 35 };
                } else if (index === 2) {
                    bookingState.meal = { option: "Special Diet Meal", price: 15 };
                }
                calculateTotal();
            }
        });
    });
}

// Handle luggage selection
function handleLuggageSelection() {
    const luggageRadios = document.querySelectorAll('input[name="luggage"]');
    luggageRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Get luggage info based on index
                if (index === 0) {
                    bookingState.luggage = { option: "Standard Allowance", price: 0 };
                } else if (index === 1) {
                    bookingState.luggage = { option: "Extra Checked Bag", price: 60 };
                } else if (index === 2) {
                    bookingState.luggage = { option: "Extra Weight", price: 40 };
                }
                calculateTotal();
            }
        });
    });
}

// Handle seat type selection
function handleSeatTypeSelection() {
    const seatRadios = document.querySelectorAll('input[name="seat"]');
    seatRadios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            if (radio.checked) {
                // Get seat info based on index
                if (index === 0) {
                    bookingState.seat = { option: "Random Assignment", price: 0 };
                } else if (index === 1) {
                    bookingState.seat = { option: "Standard Seat Selection", price: 25 };
                } else if (index === 2) {
                    bookingState.seat = { option: "Extra Legroom", price: 55 };
                }
                calculateTotal();
            }
        });
    });
}

// Function to submit booking
function submitBooking() {
    const completeButton = document.querySelector('#page3 .btn:last-child');
    if (!completeButton) return;

    completeButton.addEventListener('click', () => {
        // Validate form fields
        const firstname = document.getElementById('firstname')?.value;
        const lastname = document.getElementById('lastname')?.value;
        const email = document.getElementById('email')?.value;
        const terms = document.getElementById('terms')?.checked;

        if (!firstname || !lastname || !email || !terms) {
            alert('Please fill in all required fields and accept the terms and conditions.');
            return;
        }

        // Save final booking data
        storeFormData();

        // Show confirmation (can be replaced with actual booking submission)
        alert('Booking completed successfully! Your confirmation has been sent to your email.');

        // Clear form data and reset state
        localStorage.removeItem('formData');
        bookingState = {
            outbound: { flight: "Lufthansa LH772", price: 850 },
            return: { flight: "Qantas QF5", price: 875 },
            meal: { option: "Standard Meal", price: 0 },
            luggage: { option: "Standard Allowance", price: 0 },
            seat: { option: "Random Assignment", price: 0 },
            seats: [],
            totalPrice: 0
        };

        // Go back to page 1
        showPage(1);
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show page 1 by default
    showPage(1);

    // Load saved form data if exists
    loadFormData();

    // Initialize all event handlers
    handleFlightSelection();
    handleMealSelection();
    handleLuggageSelection();
    handleSeatTypeSelection();
    initializeSeatSelection();
    submitBooking();

    // Store form data when navigating between pages
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', storeFormData);
    });
});