//We must create a formatter which takes in: 2024-04-15 21:21:14.676787 +0200 CEST m=+22055.186811376
//And converts it into a readable format
//Such as
//Today at XX:XX AM/PM
//Yesterday at XX:XX AM/PM
//Date at XX:XX AM/PM

const timeFormatter = (time: string): string => {
  const date = new Date(time);
  const currentDate = new Date();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Add leading zero if minutes < 10
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  };

  if (date.toDateString() === currentDate.toDateString()) {
    return `Today at ${formatTime(date)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday at ${formatTime(date)}`;
  } else {
    return `${date.toLocaleDateString()} at ${formatTime(date)}`;
  }
};

export default timeFormatter;
