import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { saveInquiryToDb } from '../lib/db';
import { validateDateTime, isDateAvailable, filterAvailableTimes } from '../lib/availability';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Inquiry() {
  const { showToast } = useCart();
  const [deposit, setDeposit] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const validation = validateDateTime(data.pickupDate, data.pickupTime);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    setIsSubmitting(true);

    const messageContent = `NEW INQUIRY
---------------------------
Customer: ${data.name}
Phone: ${data.phone || 'N/A'}
Email: ${data.email}

Occasion: ${data.occasion || 'N/A'}
Guest Count: ${data.guests || 'N/A'}
Pickup: ${data.pickupDate || 'N/A'} at ${data.pickupTime || 'N/A'}

Request Details:
${data.details || 'N/A'}

Allergies/Dietary:
${data.allergies || 'None'}

Special Instructions:
${data.special || 'None'}

Requested Payment Plan/Deposit: ${deposit || 'Not specified'}
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
          subject: `New Inquiry: ${data.name}`,
          from_name: "Anniis Cuisine Inquiries",
          replyto: data.email,
          message: messageContent,
        }),
      });
    } catch (error) {
      console.error("Submission failed", error);
    }

    saveInquiryToDb({
      customer: data.name,
      phone: data.phone,
      email: data.email,
      occasion: data.occasion,
      guests: data.guests,
      pickupDate: data.pickupDate,
      pickupTime: data.pickupTime,
      details: data.details,
      allergies: data.allergies,
      special: data.special,
      depositRequested: deposit
    });

    setSubmitted(true);
    setIsSubmitting(false);
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
                  <input type="text" id="inq-name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="inq-phone">Phone</label>
                  <input type="tel" id="inq-phone" name="phone" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-email">Email</label>
                  <input type="email" id="inq-email" name="email" required />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Event Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inq-occasion">Occasion</label>
                  <input type="text" id="inq-occasion" name="occasion" placeholder="Birthday, brunch, wedding..." />
                </div>
                <div className="form-group">
                  <label htmlFor="inq-guests">Guest Count</label>
                  <input type="number" id="inq-guests" name="guests" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-datetime">Pickup Date & Time</label>
                  <DatePicker
                    id="inq-datetime"
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const mins = String(date.getMinutes()).padStart(2, '0');
                        setDateStr(`${year}-${month}-${day}`);
                        setTimeStr(`${hours}:${mins}`);
                      } else {
                        setDateStr('');
                        setTimeStr('');
                      }
                    }}
                    filterDate={isDateAvailable}
                    filterTime={(time) => filterAvailableTimes(time, selectedDate || time)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="custom-datepicker-input"
                    placeholderText="Select available date and time..."
                    required
                  />
                  <input type="hidden" name="pickupDate" value={dateStr} />
                  <input type="hidden" name="pickupTime" value={timeStr} />
                </div>
              </div>
            </fieldset>

            <fieldset className="form-fieldset">
              <legend>Request Details</legend>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-details">What would you like? Dishes, pan sizes, proteins, flavors</label>
                  <textarea id="inq-details" name="details" rows="4"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-allergies">Allergies &amp; Dietary Restrictions</label>
                  <textarea id="inq-allergies" name="allergies" rows="3"></textarea>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full">
                  <label htmlFor="inq-special">Special Instructions &amp; Additional Information</label>
                  <textarea id="inq-special" name="special" rows="3"></textarea>
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
              <button type="submit" className="btn-gold" style={{ minWidth: '200px' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
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
