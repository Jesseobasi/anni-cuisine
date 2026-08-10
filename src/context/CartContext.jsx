import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

function loadCart() {
  try {
    const saved = localStorage.getItem('anniis-cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function loadOrders() {
  try {
    const saved = localStorage.getItem('anniis-orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);
  const [orders, setOrders] = useState(loadOrders);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('anniis-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('anniis-orders', JSON.stringify(orders));
  }, [orders]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  function addItem(dish, size, addOns) {
    const sizeObj = dish.sizes.find(s => s.id === size);
    const selectedAddOns = addOns.map(aId => dish.addOns.find(a => a.id === aId)).filter(Boolean);
    const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = dish.basePrice + (sizeObj?.price || 0) + addOnTotal;

    const newItem = {
      id: Date.now().toString(),
      dishId: dish.id,
      name: dish.name,
      category: dish.category,
      size: sizeObj?.label || '',
      sizeId: size,
      addOns: selectedAddOns.map(a => ({ id: a.id, label: a.label, price: a.price })),
      unitPrice,
      quantity: 1,
    };

    setItems(prev => [...prev, newItem]);
    showToast(`${dish.name} added to cart`);
  }

  function removeItem(itemId) {
    setItems(prev => prev.filter(i => i.id !== itemId));
  }

  function updateQuantity(itemId, delta) {
    setItems(prev =>
      prev.map(i => {
        if (i.id === itemId) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  }

  function updateItem(itemId, dish, size, addOns) {
    const sizeObj = dish.sizes.find(s => s.id === size);
    const selectedAddOns = addOns.map(aId => dish.addOns.find(a => a.id === aId)).filter(Boolean);
    const addOnTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = dish.basePrice + (sizeObj?.price || 0) + addOnTotal;

    setItems(prev =>
      prev.map(i => {
        if (i.id === itemId) {
          return {
            ...i,
            size: sizeObj?.label || '',
            sizeId: size,
            addOns: selectedAddOns.map(a => ({ id: a.id, label: a.label, price: a.price })),
            unitPrice,
          };
        }
        return i;
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  function getSubtotal() {
    return items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  }

  function getItemCount() {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }

  function generateRef() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'AC-';
    for (let i = 0; i < 7; i++) {
      ref += chars[Math.floor(Math.random() * chars.length)];
    }
    return ref;
  }

  function placeOrder(customerInfo) {
    const order = {
      id: Date.now().toString(),
      reference: generateRef(),
      date: new Date().toISOString().split('T')[0],
      pickupDate: customerInfo.pickupDate || '',
      pickupTime: customerInfo.pickupTime || '',
      customer: {
        name: customerInfo.name,
        phone: customerInfo.phone,
        email: customerInfo.email,
        paymentMethod: customerInfo.paymentMethod,
      },
      items: items.map(i => ({
        name: i.name,
        size: i.size,
        addOns: i.addOns,
        unitPrice: i.unitPrice,
        quantity: i.quantity,
      })),
      total: getSubtotal(),
    };

    setOrders(prev => [order, ...prev]);
    clearCart();
    return order;
  }

  function clearOrders() {
    setOrders([]);
  }

  const value = {
    items,
    orders,
    toast,
    addItem,
    removeItem,
    updateQuantity,
    updateItem,
    clearCart,
    getSubtotal,
    getItemCount,
    placeOrder,
    clearOrders,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
