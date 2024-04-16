// Function to calculate the percentage difference between two numbers
export function percentDifference(a, b) {
  // Calculate the absolute difference between a and b
  const diff = Math.abs(a - b);

  // Calculate the average of a and b
  const avg = (a + b) / 2;

  // Calculate the percentage difference by multiplying the ratio of the difference to the average by 100
  const percentDiff = +(100 * (diff / avg)).toFixed(2);

  // Return the percentage difference
  return percentDiff;
}

// Function to capitalize the first letter of a string
export function capitalize(str) {
  // Return the string with the first letter converted to uppercase and the rest of the string unchanged
  return str.charAt(0).toUpperCase() + str.substr(1);
}