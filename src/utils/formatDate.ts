export function formatFullDate(dateInput?: string | Date): string {
  if (!dateInput) return "-";

  const date = new Date(dateInput);

  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" }); // Full month name
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatYearOnly(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.getFullYear().toString();
}
