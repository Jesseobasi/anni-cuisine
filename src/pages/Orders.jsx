import { useCart } from '../context/CartContext';

export default function Orders() {
  const { orders, clearOrders } = useCart();

  return (
    <div className="page-wrapper">
      <section className="orders-page">
        <div className="container">
          <div className="section-header">
            <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>My orders</h1>
            <p className="subtitle-text">Saved on this device</p>
          </div>

          <p className="orders-intro">
            These are kept in your browser so you can come back to them any time, even without a connection.
          </p>

          {orders.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              No orders yet.
            </p>
          ) : (
            <>
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-card-header">
                    <div>
                      <div className="order-ref">Reference {order.reference}</div>
                    </div>
                    <div className="order-date">{order.date}</div>
                  </div>
                  {order.pickupDate && (
                    <div className="order-pickup">Pickup {order.pickupDate}</div>
                  )}
                  <div className="order-items">
                    {order.items.map((item, i) => (
                      <p key={i}>
                        {item.quantity}x {item.name} — {item.size}
                        {item.addOns?.length > 0 && ` (${item.addOns.map(a => a.label).join(', ')})`}
                        {' '}— ${item.unitPrice * item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="order-total">
                    <span className="label">Total</span>
                    <span className="amount">${order.total}</span>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button className="btn-text" onClick={clearOrders}>
                  Clear saved orders
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
