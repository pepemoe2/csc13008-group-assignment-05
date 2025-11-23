import { useCallback } from "react";

const STORAGE_KEY = "shipping_orders";

// Read orders from local storage
function readRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error : reading shipping data from localStorage", e);
    return [];
  }
}

// Write new order to list
function writeRaw(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error("Error : failed to write new order");
    return false;
  }
}

// Generate unique id for each order
function generateId() {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

export default function useOrders() {
  const getOrders = useCallback(() => {
    return readRaw();
  }, []);

  const addOrder = useCallback((order) => {
    try {
      const list = readRaw();
      const id = generateId();
      const new_order = {
        id,
        createdAt: new Date().toISOString(),
        ...order,
      };
      list.unshift(new_order);

      const success = writeRaw(list);
      return success ? new_order : null;
    } catch (e) {
      console.error("Error : failed to add new order");
      return null;
    }
  }, []);

  const deleteOrder = useCallback((id) => {
    try {
      const list = readRaw();
      const after_delete = list.filter((o) => o.id !== id);
      const removed = after_delete.length < list.length;
      const success = writeRaw(after_delete);
      return success && removed;
    } catch (e) {
      console.error("Error : failed to delete order from list");
      return false;
    }
  }, []);

  return { getOrders, addOrder, deleteOrder };
}
