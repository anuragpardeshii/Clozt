export const SHOPPING_CHANGED_EVENT = "shopping:changed";

export function notifyShoppingChange() {
  window.dispatchEvent(new Event(SHOPPING_CHANGED_EVENT));
}
