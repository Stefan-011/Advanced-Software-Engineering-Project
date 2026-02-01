function CalculateWakeUpTime(
  currentTime: string,
  isAmPm: boolean,
  cycleMinutes: number = 90,
  TimeToSleep: number = 15,
) {
  return isAmPm
    ? calculateSleepTimes12h(currentTime, cycleMinutes, TimeToSleep)
    : calculateSleepTimes24(currentTime, cycleMinutes, TimeToSleep);
}

// 24-hour format
function calculateSleepTimes24(
  bedtime: string,
  cycleMinutes: number,
  TimeToSleep: number,
): string[] {
  // Convert bedtime string "HH:MM" to Date object (today's date)
  const [hours, minutes] = bedtime.split(":").map(Number);
  const bedtimeDate = new Date();
  bedtimeDate.setHours(hours, minutes, 0, 0);

  // Time to fall asleep (15 minutes)
  const sleepStart = new Date(bedtimeDate.getTime() + TimeToSleep * 60 * 1000);

  const wakeUpTimes: string[] = [];

  // Calculate wake-up times for 4 to 10 cycles
  for (let cycles = 1; cycles <= 10; cycles++) {
    const wakeTime = new Date(
      sleepStart.getTime() + cycles * cycleMinutes * 60 * 1000,
    );
    const hh = wakeTime.getHours().toString().padStart(2, "0");
    const mm = wakeTime.getMinutes().toString().padStart(2, "0");
    wakeUpTimes.push(`${hh}:${mm}`);
  }

  return wakeUpTimes;
}

// 12-hour format
function calculateSleepTimes12h(
  bedtime: string,
  cycleMinutes: number,
  TimeToSleep: number,
): string[] {
  // Convert bedtime string "HH:MM" to Date object (today's date)
  const [hours, minutes] = bedtime.split(":").map(Number);
  const bedtimeDate = new Date();
  bedtimeDate.setHours(hours, minutes, 0, 0);

  // Time to fall asleep (15 minutes)
  const sleepStart = new Date(bedtimeDate.getTime() + TimeToSleep * 60 * 1000);

  const wakeUpTimes: string[] = [];

  // Helper to format in 12-hour format
  function format12h(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    if (hours === 0) hours = 12; // midnight or noon
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

  // Calculate wake-up times for 4 to 10 cycles
  for (let cycles = 1; cycles <= 10; cycles++) {
    const wakeTime = new Date(
      sleepStart.getTime() + cycles * cycleMinutes * 60 * 1000,
    );
    wakeUpTimes.push(format12h(wakeTime));
  }

  return wakeUpTimes;
}

export default CalculateWakeUpTime;
