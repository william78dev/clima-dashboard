export function formatDay(dateString: string, index: number): string {
  if (index === 0) return "Hoje";

  return new Date(dateString + "T12:00:00")
    .toLocaleDateString("pt-BR", {
      weekday: "short",
    })
    .replace(".", "")
    .replace("-feira", "");
}
