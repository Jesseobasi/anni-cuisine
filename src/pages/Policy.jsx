import { Link } from 'react-router-dom';

export default function Policy() {
  return (
    <div className="page-wrapper">
      <section className="policy-page">
        <div className="container">
          <div className="section-header">
            <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Ordering &amp; Catering</h1>
            <p className="subtitle-text">Booking Policies</p>
          </div>

          <p className="policy-intro">
            Thank you for choosing us for your order. Please review the following before booking.
          </p>

          <div className="policy-grid">
            <div className="policy-card">
              <h3>Allergies &amp; Dietary Restrictions</h3>
              <p>
                Please let me know about any food allergies or dietary restrictions when placing your order so they can be discussed and accommodated when possible.
              </p>
            </div>
            <div className="policy-card">
              <h3>Advance Notice</h3>
              <p>
                Large catering orders should be placed at least 2 weeks in advance. Smaller orders are subject to availability, so ordering ahead is always recommended.
              </p>
            </div>
            <div className="policy-card">
              <h3>Payment</h3>
              <p>
                Full payment is due at the time of booking to secure your order and date. A payment plan may be available upon request and prior agreement. If approved, a 50% deposit is required to secure your order, with the remaining 50% due at pickup. Your order is not confirmed until the required payment or deposit has been received.
              </p>
            </div>
            <div className="policy-card">
              <h3>Order Details</h3>
              <p>
                Please be as specific as possible: the dishes you would like, quantities or pan sizes, protein choices, flavors, pickup date and time, and any special requests. Review your order details carefully before confirming.
              </p>
            </div>
            <div className="policy-card">
              <h3>Changes to Orders</h3>
              <p>
                Any changes should be requested as early as possible. Last-minute changes may not be available once ingredients have been purchased or preparation has started. Additional items or changes may result in an additional charge.
              </p>
            </div>
            <div className="policy-card">
              <h3>Pickup</h3>
              <p>
                Please arrive on time for your scheduled pickup. If you are running late, communicate as soon as possible. Pickup times are scheduled so every customer's order is prepared and ready at the right time.
              </p>
            </div>
            <div className="policy-card">
              <h3>Cancellations &amp; Refunds</h3>
              <p>
                Because ingredients and supplies may be purchased specifically for your order, cancellations should be made as early as possible. Deposits are non-refundable once ingredients have been purchased or preparation has begun.
              </p>
            </div>
            <div className="policy-card">
              <h3>Pricing</h3>
              <p>
                Prices may vary depending on portion size, protein selection, custom requests, or changes in ingredient costs. Any price changes will be discussed with you before your order is confirmed.
              </p>
            </div>
            <div className="policy-card">
              <h3>Final Confirmation</h3>
              <p>
                By submitting payment or a deposit, you confirm that you have reviewed and agreed to your order details, total price, pickup information, and ordering policies.
              </p>
            </div>
          </div>

          <div className="policy-cta">
            <p>Thank you for your understanding and for supporting my business.</p>
            <Link to="/menu" className="btn-gold">Place an order</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
