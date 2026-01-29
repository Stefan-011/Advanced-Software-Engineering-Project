/* eslint-disable prefer-const */
function findTimeDifference(
  startTime: string,
  endTime: string,
  isAmPm: boolean,
) {
  if (startTime == "" || endTime == "") return;
  return isAmPm
    ? timeDifference12(startTime, endTime)
    : timeDifference24(startTime, endTime);
}

function timeDifference24(startTime: string, endTime: string) {
  // Parse hours and minutes from "HH:MM" format
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  // Convert times to minutes
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  // Calculate difference (handles overnight times)
  let diff = endTotal - startTotal;
  if (diff < 0) diff += 24 * 60; // wrap around midnight

  // Convert back to hours and minutes
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
}

function timeDifference12(startTime: string, endTime: string) {
  console.log(startTime);
  // Parse hours and minutes from "hh:mm AM/PM" format
  const [startPart, startMeridiem] = startTime.split(" ");
  const [endPart, endMeridiem] = endTime.split(" ");

  let [startH, startM] = startPart.split(":").map(Number);
  let [endH, endM] = endPart.split(":").map(Number);

  // Convert to 24-hour format
  if (startMeridiem.toUpperCase() === "PM" && startH !== 12) startH += 12;
  if (startMeridiem.toUpperCase() === "AM" && startH === 12) startH = 0;

  if (endMeridiem.toUpperCase() === "PM" && endH !== 12) endH += 12;
  if (endMeridiem.toUpperCase() === "AM" && endH === 12) endH = 0;

  // Convert times to minutes
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;

  // Calculate difference (handles overnight)
  let diff = endTotal - startTotal;
  if (diff < 0) diff += 24 * 60; // wrap around midnight

  // Convert back to hours and minutes
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours}h ${minutes}m`;
}

export default findTimeDifference;
