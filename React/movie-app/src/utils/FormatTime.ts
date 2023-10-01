// Format int to time format function

export default function fancyTimeFormat(duration: number): string {
  const hrs: number = ~~(duration / 3600);
  const mins: number = ~~((duration % 3600) / 60);
  const secs: number = ~~duration % 60;
  let result = "";
  if (hrs > 0) {
    result += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  result += "" + mins + ":" + (secs < 10 ? "0" : "");
  result += "" + secs;
  return result;
}
