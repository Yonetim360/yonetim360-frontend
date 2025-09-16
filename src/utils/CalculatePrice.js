export default function CalculatePrice({
  isDiscounted = 0,
  discountValue = 0,
  discountType = 0,
  vatIncluded = 0,
  offer,
}) {
  let calculatedTotal = Number.parseFloat(offer) || 0;

  // İndirim hesaplama
  if (
    isDiscounted &&
    discountValue &&
    !isNaN(Number.parseFloat(discountValue))
  ) {
    const discount = Number.parseFloat(discountValue);

    if (discountType === 0) {
      // Yüzde indirimi
      calculatedTotal = offer * (1 - discount / 100);
    } else if (discountType === 1) {
      // Sabit tutar indirimi
      calculatedTotal = offer - discount;
    }
  }

  // KDV hesaplama (KDV dahil değilse %20 ekle)
  if (!vatIncluded) {
    calculatedTotal = calculatedTotal * 1.2;
  }

  // Negatif değerleri önle
  if (calculatedTotal < 0) {
    calculatedTotal = 0;
  }

  return calculatedTotal;
}
