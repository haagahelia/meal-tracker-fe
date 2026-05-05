export function calculateNutrientPerAmount(
  valuePer100: number,
  amount: number
) {
  return (valuePer100 * amount) / 100;
}