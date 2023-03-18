export default function calculatePriceAndCount(state) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    let discount = obj.price - (obj.price / 100) * obj.discount;
    return sum + discount * obj.count;
  }, 0);
  state.totalCount = state.items.length;
}
