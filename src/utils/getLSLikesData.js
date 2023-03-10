export default function getLSLikeData() {
  const items = JSON.parse(localStorage.getItem("likes"));
  return items;
}
