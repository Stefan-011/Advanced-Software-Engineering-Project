export function calculateBedtimes(
  wakeUpTime: string,
  isPmAm: boolean,
  cycleMinutes: number = 90,
  TimeToSleep: number = 15,
) {
  return isPmAm
    ? calculateBedtimes12(wakeUpTime, cycleMinutes, TimeToSleep)
    : calculateBedtimes24(wakeUpTime, cycleMinutes, TimeToSleep);
}

function calculateBedtimes24(
  wakeUpTime: string,
  sleepCycle: number,
  timeToFallAsleep: number,
): string[] {
  const numBedtimes = 10;

  const toMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const toHHMM = (minutes: number): string => {
    minutes = (minutes + 24 * 60) % (24 * 60); // wrap around midnight
    const hh = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const mm = (minutes % 60).toString().padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const wakeMinutes = toMinutes(wakeUpTime);
  const bedtimes: string[] = [];

  for (let i = 1; i <= numBedtimes; i++) {
    const bedtime = wakeMinutes - (i * sleepCycle + timeToFallAsleep);
    bedtimes.push(toHHMM(bedtime));
  }

  return bedtimes;
}

function calculateBedtimes12(
  wakeUpTime: string,
  sleepCycle: number,
  timeToFallAsleep: number,
): string[] {
  const numBedtimes = 10;

  const toMinutes = (time: string): number => {
    const [timePart, meridiem] = time.split(" ");
    const [hoursPart, minutesPart] = timePart.split(":").map(Number);

    let hours = hoursPart;
    const minutes = minutesPart;

    if (meridiem.toUpperCase() === "PM" && hours !== 12) hours += 12;
    if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const to12HourFormat = (minutes: number): string => {
    minutes = (minutes + 24 * 60) % (24 * 60); // wrap around midnight
    let hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 === 0 ? 12 : hours % 12;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")} ${meridiem}`;
  };

  const wakeMinutes = toMinutes(wakeUpTime);
  const bedtimes: string[] = [];

  for (let i = 1; i <= numBedtimes; i++) {
    const bedtime = wakeMinutes - (i * sleepCycle + timeToFallAsleep);
    bedtimes.push(to12HourFormat(bedtime));
  }

  return bedtimes;
}
