// Seat grid generation and interaction
const seatContainer = document.getElementById("seat-container")
const seatStatus = ["available", "reserved", "occupied"]
const seatEmojis = ["🟩", "🟨", "🟥"]

function createSeatGrid(rows, cols) {
  for (let i = 0; i < rows * cols; i++) {
    const seat = document.createElement("div")
    seat.className = "seat available"
    seat.textContent = seatEmojis[0]
    seat.addEventListener("click", toggleSeatStatus)
    seatContainer.appendChild(seat)
  }
}

function toggleSeatStatus(event) {
  const seat = event.target
  const currentStatus = seatStatus.indexOf(seat.classList[1])
  const newStatus = (currentStatus + 1) % 3
  seat.className = `seat ${seatStatus[newStatus]}`
  seat.textContent = seatEmojis[newStatus]
}

createSeatGrid(5, 4)

// Fare estimation
const fareForm = document.getElementById("fare-form")
const fareAmount = document.getElementById("fare-amount")
const travelTime = document.getElementById("travel-time")

fareForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const start = document.getElementById("start").value
  const destination = document.getElementById("destination").value
  const travelClass = document.getElementById("class").value

  // Simulate fare calculation (replace with actual logic)
  const baseFare = Math.random() * 50 + 10
  const classMultiplier = travelClass === "economy" ? 1 : travelClass === "business" ? 1.5 : 2
  const calculatedFare = baseFare * classMultiplier

  // Simulate travel time calculation (replace with actual logic)
  const estimatedTime = Math.floor(Math.random() * 120 + 30)

  fareAmount.textContent = `$${calculatedFare.toFixed(2)}`
  travelTime.textContent = `${estimatedTime} min`
})

// Dark mode toggle
const modeToggle = document.getElementById("mode-toggle")
const body = document.body

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
})

// Simulated live updates
function simulateLiveUpdates() {
  const seats = document.querySelectorAll(".seat")
  const randomSeat = seats[Math.floor(Math.random() * seats.length)]
  randomSeat.click()
}

setInterval(simulateLiveUpdates, 5000)

