export default function getDays() {
  const days = [0, 1, 2].map((item) => {
    let today = new Date();
    return new Date(today.setDate(today.getDate() + item))
      .toISOString()
      .split("T")[0];
  });
  return days;
}
