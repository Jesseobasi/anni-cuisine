export function validateDateTime(dateString, timeString) {
  if (!dateString) return { valid: true };
  
  // Use local time instead of UTC to avoid off-by-one errors with timezones
  const selectedDate = new Date(dateString + 'T00:00:00');
  const dayOfWeek = selectedDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat

  // Check weekends (every other week logic)
  if (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6) {
    // Reference date: Monday, August 17, 2026 (Start of the "busy weekend" week)
    const refDate = new Date('2026-08-17T00:00:00');
    
    // Calculate difference in weeks
    const diffTime = selectedDate.getTime() - refDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    // If diffWeeks is even (0, 2, 4...), it's a busy weekend (working, so unavailable)
    if (diffWeeks % 2 === 0) {
      return { 
        valid: false, 
        message: "We are unavailable for pickup on this specific weekend. Please choose another date." 
      };
    }
  }

  // Check Mon, Wed, Thu times (6 PM - 10 PM)
  if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 4) {
    if (timeString) {
      const [hour, minute] = timeString.split(':').map(Number);
      // Valid range: 18:00 to 22:00
      if (hour < 18 || hour > 22 || (hour === 22 && minute > 0)) {
        return { 
          valid: false, 
          message: "Pickup on Mon, Wed, and Thu is only available between 6:00 PM and 10:00 PM." 
        };
      }
    } else {
        // If they only selected the date and haven't selected a time yet, we can't fully validate the time, 
        // but we should warn them or just wait until they submit.
    }
  }

  return { valid: true };
}
