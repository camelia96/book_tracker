

export function formatDate(date: Date) {
  const dateString = date.toLocaleDateString();
  /* const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0"); */

  return `${dateString}`;
}



