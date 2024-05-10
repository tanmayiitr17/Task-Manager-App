/**
 * formatDate function formats a date string into a human-readable format.
 * @param {any} dateString - The date string to be formatted.
 * @returns {string} - The formatted date string.
 */
const formatDate = (dateString: any): string => {
  // Array of month names
  const months: string[] = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Create a Date object from the provided date string
  const date: Date = new Date(dateString);

  // Extract day, month index, and year from the Date object
  const day: number = date.getDate();
  const monthIndex: number = date.getMonth();
  const year: number = date.getFullYear();

  // Format the date string with day, month name, and year
  const formattedDate: string = `${day} ${months[monthIndex]}, ${year}`;

  // Return the formatted date string
  return formattedDate;
};

// Export the formatDate function
export { formatDate };
