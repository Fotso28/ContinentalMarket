export const whatsappNumber = "237698579865";

export const whatsappDisplay = "+237 698 57 98 65";

export function whatsappLink(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
