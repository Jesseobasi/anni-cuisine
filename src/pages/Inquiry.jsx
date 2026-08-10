import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Inquiry() {
  const { showToast } = useCart();
  const [deposit, setDeposit] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    showToast('Inquiry submitted ✓');
  }

  if (submitted) {
    return (
      <div className="page-wrapper">
        <section className="inquiry-page">
          <div className="container" style={{ textAlign: 'center', paddingTop: '60px' }}>
            <div className="confirmation-icon">✓</div>
            <h2 className="script-heading" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Inquiry sent</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Chef Anni will review your request and get back to you soon.
            </p>
            <Link to="/menu" className="btn-gold">Back to Menu</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="inquiry-page">
        <div className="container">
          <div className="section-header">
            <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Inquiry</h1>
            <p className="subtitle-text">Questions &amp; custom requests</p>
          </div>

          <p className="inquiry-intro">
            Planning something custom, or have a question? Send the details below. Be as specific as possible — dishes, quantities or pan sizes, protein choices and pickup time. Large orders should be placed at least 2 weeks in advance.
          </p>
          <div className="inquiry-link">
            Ready to order standard menu items instead? <Link to="/menu">Add them to your cart</Link>.
          </div>

          <form className="inquiry-form-container" onSubmit={handleSubmit}>
            <fieldset className="form-fieldset">
              <legend>Contact Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inq-name">Full Name</label>
                  <input type="text" id="inq-name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="inq-phone">Phone</label>
                  <input type="tel" id="inq-phone" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-email">Email</label>
                  <input type="email" id="inq-email" required />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Event Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inq-occasion">Occasion</label>
                  <input type="text" id="inq-occasion" placeholder="Birthday, brunch, wedding..." />
                </div>
                <div className="form-group">
                  <label htmlFor="inq-guests">Guest Count</label>
                  <input type="number" id="inq-guests" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inq-date">Pickup Date</label>
                  <input type="date" id="inq-date" />
                </div>
                <div className="form-group">
                  <label htmlFor="inq-time">Pickup Time</label>
                  <input type="time" id="inq-time" />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Request Details</legend>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-details">What would you like? Dishes, pan sizes, proteins, flavors</label>
                  <textarea id="inq-details" rows="4"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-allergies">Allergies &amp; Dietary Restrictions</label>
                  <textarea id="inq-allergies" rows="3"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-special">Special Instructions &amp; Additional Information</label>
                  <textarea id="inq-special" rows="3"></textarea>
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Deposit (Optional)</legend>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Would you like to request a payment plan / deposit?
              </p>
              <div className="deposit-options">
                <button
                  type="button"
                  className={`deposit-option ${deposit === 'yes' ? 'selected' : ''}`}
                  onClick={() => setDeposit('yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`deposit-option ${deposit === 'no' ? 'selected' : ''}`}
                  onClick={() => setDeposit('no')}
                >
                  No
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                This is optional — you can submit your inquiry either way.
              </p>
            </fieldset>

            <div className="inquiry-submit">
              <button type="submit" className="btn-gold" style={{ minWidth: '200px' }}>
                Submit Inquiry
              </button>
            </div>

            <div className="inquiry-policy-link">
              <Link to="/policy">ordering &amp; catering policy</Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
