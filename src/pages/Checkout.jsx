import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, getSubtotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    pickupDate: '', pickupTime: '',
    paymentMethod: '',
  });

  const subtotal = getSubtotal();

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    const orderDetails = items.map(item => {
      let desc = `${item.quantity}x ${item.name} (${item.size})`;
      if (item.addOns.length > 0) {
        desc += `\nAdd-ons: ${item.addOns.map(a => a.label).join(', ')}`;
      }
      desc += `\nPrice: $${item.unitPrice * item.quantity}`;
      return desc;
    }).join('\n\n');

    const messageContent = `NEW ORDER
---------------------------
Customer: ${form.name}
Phone: ${form.phone || 'N/A'}
Email: ${form.email}

Pickup: ${form.pickupDate || 'N/A'} at ${form.pickupTime || 'N/A'}
Payment Method: ${form.paymentMethod || 'N/A'}

Order Total: $${subtotal}

Items:
${orderDetails}
---------------------------`;

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "30218111-15fe-4095-859a-533a0eeba4cf",
          subject: `New Catering Order: ${form.name}`,
          from_name: "Anniis Cuisine Orders",
          replyto: form.email,
          message: messageContent,
        }),
      });
    } catch (error) {
      console.error("Submission failed", error);
    }

    const order = placeOrder(form);
    setIsSubmitting(false);
    navigate('/order-confirmed', { state: { order } });
  }

  if (items.length === 0) {
    return (
      <div className="page-wrapper">
        <section className="checkout-page">
          <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
            <h1 className="script-heading" style={{ fontSize: '3rem' }}>Checkout</h1>
            <p style={{ color: 'var(--text-muted)', margin: '20px 0' }}>Your cart is empty.</p>
            <Link to="/menu" className="btn-gold">Browse Menu</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="checkout-page">
        <div className="section-header">
          <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Checkout</h1>
          <p className="subtitle-text">Confirm your order</p>
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div>
            <fieldset className="form-fieldset">
              <legend>Customer Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkout-name">Full Name</label>
                  <input type="text" id="checkout-name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="checkout-phone">Phone</label>
                  <input type="tel" id="checkout-phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="checkout-email">Email</label>
                  <input type="email" id="checkout-email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Pickup</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkout-date">Pickup Date</label>
                  <input type="date" id="checkout-date" name="pickupDate" value={form.pickupDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="checkout-time">Pickup Time</label>
                  <input type="time" id="checkout-time" name="pickupTime" value={form.pickupTime} onChange={handleChange} />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Payment</legend>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Payment is arranged directly with Chef Anni. Choose how you'd like to pay and she will send instructions to confirm your order.
              </p>
              <div className="form-group">
                <label htmlFor="checkout-payment">Preferred Payment Method</label>
                <select id="checkout-payment" name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                  <option value="">Select...</option>
                  <option value="zelle">Zelle</option>
                  <option value="cashapp">Cash App</option>
                  <option value="venmo">Venmo</option>
                  <option value="cash">Cash at Pickup</option>
                </select>
              </div>
            </fieldset>
          </div>

          <div>
            <div className="order-summary-card">
              <h3>Order summary</h3>

              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="item-info">
                    <div className="item-name">{item.quantity}x {item.name}</div>
                    <div className="item-details">{item.size}</div>
                    {item.addOns.map(a => (
                      <div key={a.id} className="item-details">{a.label}</div>
                    ))}
                  </div>
                  <div className="item-price">${item.unitPrice * item.quantity}</div>
                </div>
              ))}

              <hr className="summary-divider" />

              <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">${subtotal}</span>
              </div>
              <div className="summary-row">
                <span className="summary-label">Fees</span>
                <span className="summary-value">None — pickup only</span>
              </div>

              <hr className="summary-divider" />

              <div className="summary-total">
                <span className="summary-label">Total</span>
                <span className="summary-amount">${subtotal}</span>
              </div>

              <div className="summary-actions">
                <button type="submit" className="btn-gold" disabled={isSubmitting}>
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
                <Link to="/cart" className="btn-text">Back to Cart</Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
