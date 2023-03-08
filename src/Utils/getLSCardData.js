export default function getLSCardData() {
  const items = JSON.parse(localStorage.getItem("cart"));
  const totalPrice = JSON.parse(localStorage.getItem("price"));
  const totalCount = JSON.parse(localStorage.getItem("count"));
  return {
    items,
    totalPrice,
    totalCount,
  };
}
