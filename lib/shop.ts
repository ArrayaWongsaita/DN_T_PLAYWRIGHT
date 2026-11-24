import { useSyncExternalStore } from "react";

export { products, type Product } from "./products";

export type CartItem = { id: number; qty: number };

const KEY = "cart";
const EVENT = "cart-change";

function readRaw(): string {
  return window.localStorage.getItem(KEY) ?? "[]";
}

export function readCart(): CartItem[] {
  return JSON.parse(readRaw()) as CartItem[];
}

export function addToCart(id: number): void {
  const cart = readCart();
  const found = cart.find((c) => c.id === id);
  if (found) found.qty += 1;
  else cart.push({ id, qty: 1 });
  window.localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(EVENT));
}

export function clearCart(): void {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** อ่านตะกร้าแบบ reactive (ฝั่ง server ได้ตะกร้าว่าง) */
export function useCart(): CartItem[] {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  return JSON.parse(raw) as CartItem[];
}

/** false ตอน server render, true หลังจาก React พร้อมใช้งานฝั่ง browser (ใช้ disable ปุ่มกันคลิกก่อน hydrate) */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
