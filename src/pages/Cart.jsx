import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { dishes } from '../data/menuData';
import CustomizeModal from '../components/CustomizeModal';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCart();
  const navigate = useNavigate();
  const [editingItem, setEditingItem] = useState(null);

  const subtotal = getSubtotal();

  function handleEdit(item) {
    const dish = dishes.find(d => d.id === item.dishId);
    if (dish) {
      setEditingItem({ item, dish });
    }
  }

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <section className="cart-page">
          <div className="container">
            <div className="section-header">
              <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Your cart</h1>
              <p className="subtitle-text">0 items</p>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              Your cart is empty.
            </p>
            <div style={{ textAlign: 'center' }}>
              <Link to="/menu" className="btn-gold">Browse Menu</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="cart-page">
        <div className="container">
          <div className="section-header">
            <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Your cart</h1>
            <p className="subtitle-text">{items.reduce((s, i) => s + i.quantity, 0)} items</p>
          </div>

          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-size">{item.size}</div>
                {item.addOns.map(a => (
                  <div key={a.id} className="cart-item-addon">+ {a.label} (${a.price})</div>
                ))}
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                    <div className="qty-value">{item.quantity}</div>
                    <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <button className="cart-edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="cart-remove-btn" onClick={() => removeItem(item.id)}>
                    🗑 Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                <div className="price">${item.unitPrice * item.quantity}</div>
                {item.quantity > 1 && <div className="each">${item.unitPrice} each</div>}
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="cart-subtotal">
              <span className="label">Subtotal</span>
              <span className="amount">${subtotal}</span>
            </div>
            <div className="cart-buttons">
              <button className="btn-gold" onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
              <Link to="/menu" className="btn-outline">Continue Shopping</Link>
            </div>
            <button className="btn-text empty-cart-btn" onClick={clearCart}>
              Empty Cart
            </button>
          </div>
        </div>
      </section>

      {editingItem && (
        <CustomizeModal
          dish={editingItem.dish}
          editItem={editingItem.item}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}
