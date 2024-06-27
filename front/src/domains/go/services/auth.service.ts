export function getCsrfToken(): string | null {
  const cookie = document.cookie.split("; ").find((row) => row.startsWith("csrftoken"));
  return cookie ? cookie.split("=")[1] : null;
}
