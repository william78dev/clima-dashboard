export function formatDay(dateString: string, index: number): string {
  if (index === 0) return "Hoje";

  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

  const date = new Date(dateString);

  return days[date.getDay()];
}
