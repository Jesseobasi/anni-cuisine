import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="page-wrapper">
      <section className="confirmation-page">
        <div className="container">
          <div className="confirmation-card">
            <div className="confirmation-icon">✓</div>
            <h2 className="script-heading" style={{ fontSize: '3rem' }}>Order confirmed</h2>
            <div className="confirmation-ref">Reference {order.reference}</div>

            <div className="confirmation-items">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.quantity}x {item.name} — {item.size}
                  {item.addOns?.length > 0 && ` (${item.addOns.map(a => a.label).join(', ')})`}
                  {' '}— ${item.unitPrice * item.quantity}
                </p>
              ))}
            </div>

            <div className="confirmation-total">
              <span className="label">Total</span>
              <span className="amount">${order.total}</span>
            </div>

            <p className="confirmation-note">
              Chef Anni will contact you to confirm details and send payment instructions. Your order is not confirmed until payment or an approved 50% deposit is received.
            </p>

            <div className="confirmation-buttons">
              <Link to="/menu" className="btn-gold">Back to Menu</Link>
              <Link to="/policy" className="btn-outline">Read the Policy</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
