export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Initialize the array with some starting years
let years = [];
const startYear = 1995;
const currentYear = new Date().getFullYear();

// Populate the years array from the startYear to the currentYear
for (let year = startYear; year <= currentYear; year++) {
  years.push(year);
}

// Function to check and add a new year if the year has changed
function checkAndAddNewYear() {
  const newCurrentYear = new Date().getFullYear();
  if (years[years.length - 1] !== newCurrentYear) {
    years.push(newCurrentYear);
  }
}

// Example usage: Call this function at the start of the year
checkAndAddNewYear();

export default years;
