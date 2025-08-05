import { formatCurrency } from "@/utils/currency";

export default function CurrencyFormatter(
  amount,
  currency = "TL",
  options = {}
) {
  return formatCurrency(amount, currency, options);
}
