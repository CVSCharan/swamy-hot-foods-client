const checkTimeStatus = (shopStatus, mockDate) => {
  const now = mockDate || new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes; // Current time in minutes
  const day = now.getDay(); // Sunday is 0

  // Define time intervals
  const morningClosingSoon = 10 * 60 + 45; // 10:45 AM
  const morningClosed = 11 * 60; // 11:00 AM
  const afternoonOpening = 16 * 60 + 30; // 4:30 PM
  const eveningClosingSoon = 20 * 60 + 45; // 8:45 PM
  const eveningClosed = 21 * 60; // 9:00 PM
  const eod = 23 * 60 + 45; // 11:45 PM

  if (day === 0 || (day === 6 && time >= eveningClosed)) {
    return "";
  }

  if (time >= eod && time < morningClosingSoon) {
    return "";
  }

  if (shopStatus) {
    if (time >= morningClosingSoon && time < afternoonOpening) {
      return "We are Closing soon..!";
    } else if (time >= eveningClosingSoon && time < eod) {
      return "We are Closing soon..!";
    }
  } else {
    if (time >= morningClosed && time < afternoonOpening) {
      return "Shop opens at 4:30 P.M.";
    } else if (time >= eveningClosed && time < eod) {
      return "Shop opens at 5:30 A.M.";
    }
  }

  return "";
};

module.exports = checkTimeStatus; // Ensure this is exported correctly
