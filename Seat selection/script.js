document.addEventListener('DOMContentLoaded', () => {
    const seatContainer = document.querySelector('.seat-container');
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const nextButton = document.getElementById('nextButton');
    const totalSeats = 500;

    // Create seats
    for (let i = 1; i <= totalSeats; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.dataset.seatNumber = i;
        seat.addEventListener('click', toggleSeatSelection);
        seatContainer.appendChild(seat);
    }

    // Toggle seat selection
    function toggleSeatSelection(event) {
        const seat = event.target;
        if (!seat.classList.contains('occupied')) {
            seat.classList.toggle('selected');
            updateSelectedSeats();
        }
    }

    // Update the list of selected seats
    function updateSelectedSeats() {
        const selectedSeats = document.querySelectorAll('.seat.selected');
        selectedSeatsList.innerHTML = '';

        selectedSeats.forEach(seat => {
            const seatNumber = seat.dataset.seatNumber;
            const listItem = document.createElement('li');
            listItem.textContent = `Seat ${seatNumber}`;
            selectedSeatsList.appendChild(listItem);
        });
    }

    // Next button functionality
    nextButton.addEventListener('click', () => {
        const selectedSeats = Array.from(document.querySelectorAll('.seat.selected')).map(seat => seat.dataset.seatNumber);

        if (selectedSeats.length > 0) {
            // Send selected seats to the PHP server
            fetch('http://localhost/seat_selection/save_seats.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ seats: selectedSeats })
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Response from server
                window.location.href = "confirmation.html"; // Redirect to confirmation page
            })
            .catch(err => {
                console.error('Error:', err);
            });
        } else {
            alert('SELECT SEAT FIRST.');
        }
    });
});
