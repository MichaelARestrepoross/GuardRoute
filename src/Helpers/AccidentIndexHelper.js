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

// Define the formatCrashTime function: brocken needs to be done again
export function formatCrashTime(timeString) {
    // Regex to match time in HH:MM AM/PM format
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(AM|PM)$/i;
    const match = timeString.match(timeRegex);
  
    if (!match) {
      throw new Error('Invalid time format. Please provide time in HH:MM AM/PM format.');
    }
  
    let hour = parseInt(match[1], 10);
    const minute = match[2];
    const period = match[3].toUpperCase();
  
    // Convert to 24-hour format
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
  
    // Ensure hour is formatted as two digits
    const formattedHour = hour.toString().padStart(2, '0');
  
    // Construct the formatted time string in HH:MM format
    const formattedTime = `${formattedHour}:${minute}`;
  
    return formattedTime;
}
  