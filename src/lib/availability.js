// Reference date: Monday, August 17, 2026 (Start of the "busy weekend" week)
const REF_DATE = new Date('2026-08-17T00:00:00');

export function isDateAvailable(date) {
  if (!date) return true;
  
  const dayOfWeek = date.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat

  // Check weekends (every other week logic)
  if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
    // Calculate difference in weeks, normalizing to midnight local time to avoid boundary issues
    const normalizedSelected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const normalizedRef = new Date(REF_DATE.getFullYear(), REF_DATE.getMonth(), REF_DATE.getDate());
    
    const diffTime = normalizedSelected.getTime() - normalizedRef.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    // If diffWeeks is even (0, 2, 4...), it's a busy weekend (working, so unavailable)
    if (diffWeeks % 2 === 0) {
      return false;
    }
  }

  // All other dates (Mon, Tue, Wed, Thu, and off-weekends) are available
  return true;
}

export function filterAvailableTimes(time, selectedDate) {
  if (!selectedDate) return true;

  const dayOfWeek = selectedDate.getDay();
  const hour = time.getHours();
  const minute = time.getMinutes();

  // Mon (1), Wed (3), Thu (4) strictly 6 PM - 10 PM
  if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 4) {
    if (hour < 18 || hour > 22 || (hour === 22 && minute > 0)) {
      return false; // Disable times outside 6 PM - 10 PM
    }
  }

  // Tue, Fri, Sat, Sun are fully open (assuming date is available)
  return true;
}

// Keep this for backend/validation just in case
export function validateDateTime(dateString, timeString) {
  if (!dateString) return { valid: true };
  
  const selectedDate = new Date(dateString + 'T00:00:00');
  
  if (!isDateAvailable(selectedDate)) {
    return { 
      valid: false, 
      message: "We are unavailable for pickup on this specific weekend. Please choose another date." 
    };
  }

  if (timeString) {
    const [hourStr, minStr] = timeString.split(':');
    const timeObj = new Date();
    timeObj.setHours(Number(hourStr), Number(minStr), 0, 0);
    
    if (!filterAvailableTimes(timeObj, selectedDate)) {
      return { 
        valid: false, 
        message: "Pickup on Mon, Wed, and Thu is only available between 6:00 PM and 10:00 PM." 
      };
    }
  }

  return { valid: true };
}
