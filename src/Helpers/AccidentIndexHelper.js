import React from 'react';

// Export the formatCrashDate function
export function formatCrashDate(dateString) {
  try {
    // Ensure dateString is not empty
    if (!dateString) {
      throw new Error('Empty date string');
    }

    // Parse the input date string into a Date object
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }

    // Format the date to the machine's current timezone and locale
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('default', options).format(date);

    return formattedDate;
  } catch (error) {
    console.error('Error formatting crash date:', error);
    return 'Unknown Date'; // Return a default value in case of error
  }
}


  