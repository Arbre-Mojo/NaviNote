export function generateRandomString(length: number): string {
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function generateRandomToken(): string {
  return generateRandomString(150);
}

export function makeRandomNumber(lengthOfCode: number): number {
  return Math.floor(Math.random() * Math.pow(10, lengthOfCode));
}

export function getDateTime(dateTime: string) {
  let date = new Date(dateTime);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at
  ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
}

export function getDateString(date: Date) {
  return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}/${date.getMonth() < 10 ? '0' : ''}${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function getTimeString(date: Date) {
  return `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
}

export function getDateTimeDifference(dateTimeStart: string, dateTimeEnd: string) {
  let dateStart: Date = new Date(dateTimeStart);
  let dateEnd: Date = new Date(dateTimeEnd);
  let milliDiff = dateEnd.getTime() - dateStart.getTime();

  const totalSeconds = Math.floor(milliDiff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const remSeconds = totalSeconds % 60;
  const remMinutes = totalMinutes % 60;

  return {hours: totalHours, minutes: remMinutes, seconds: remSeconds};
}

export function getGcd(a: number, b: number): number {
  if (a === b) {
    return a
  }

  if (a > b) {
    return getGcd(a - b, b)
  }

  return getGcd(a, b - a)
}

export function getFormattedTime(timeInMinutes: number) {
  let hours = Math.floor(timeInMinutes / 60);
  let minutes = timeInMinutes % 60;
  return {hours: hours, minutes: minutes};
}

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCurrentDate(): string {
  return new Date().toISOString().slice(0, 10).replace('T', ' ');
}

export function getCurrentTimeStamp(): string {
  return new Date().toISOString();
}

export function createRange(number: number) {
  return new Array(number).fill(0)
    .map((n, index) => index + 1);
}
