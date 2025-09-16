export default function CalculatePrice({
  offer,
  discountValue,
  discountType,
  taxIncluded,
  isDiscounted,
  currency,
}) {
  let total = Number(offer) || 0;

  if (isDiscounted) {
    if (discountType === 1 && discountValue > 0) {
      // yüzde
      total = total - (total * discountValue) / 100;
    } else if (discountType === 2 && discountValue > 0) {
      // sabit tutar
      total = total - discountValue;
    }
  }

  // KDV
  if (!taxIncluded) {
    total = total * 1.2;
  }

  return total < 0 ? 0 : total; // eksiye düşmesin
}
