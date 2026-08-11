import { useState, useEffect } from 'react';
import { getAllOrdersAndInquiries, updateAdminNote } from '../lib/db';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [data, setData] = useState({ orders: [], inquiries: [] });

  useEffect(() => {
    if (isLoggedIn) {
      setData(getAllOrdersAndInquiries());
    }
  }, [isLoggedIn]);

  function handleLogin(e) {
    e.preventDefault();
    if (email.toLowerCase() === 'anniiscuisine@gmail.com') {
      setIsLoggedIn(true);
    } else {
      alert('Access denied. Unauthorized email.');
    }
  }

  function handleNoteChange(type, id, note) {
    updateAdminNote(type, id, note);
    setData(getAllOrdersAndInquiries());
  }

  function getUrgencyLevel(pickupDate) {
    if (!pickupDate) return { color: 'var(--text-secondary)', label: 'No Date' };
    
    const today = new Date();
    const target = new Date(pickupDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { color: 'var(--text-muted)', label: 'Past' };
    if (diffDays <= 3) return { color: '#e74c3c', label: 'High Urgency (🔴 <3 days)' };
    if (diffDays <= 7) return { color: '#f39c12', label: 'Med Urgency (🟡 <7 days)' };
    return { color: '#2ecc71', label: 'Low Urgency (🟢 >7 days)' };
  }

  function getRecommendedPrepDays(items) {
    if (!items || items.length === 0) return 3;
    let totalQuantity = 0;
    items.forEach(item => totalQuantity += item.quantity);
    
    // Simple heuristic: large orders need more prep time
    if (totalQuantity > 10) return 14; // 2 weeks for very large orders
    if (totalQuantity > 5) return 7;   // 1 week for medium-large orders
    return 3; // 3 days for standard orders
  }

  if (!isLoggedIn) {
    return (
      <div className="page-wrapper">
        <section className="section" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="script-heading" style={{ fontSize: '3rem', marginBottom: '24px' }}>Admin Login</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Please enter your authorized email to access the dashboard. (anniiscuisine@gmail.com)
          </p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Email address"
              style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', 
                padding: '12px', borderRadius: '6px', color: 'var(--text-primary)'
              }}
              required
            />
            <button type="submit" className="btn-gold">Access Dashboard</button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <section className="section" style={{ padding: '40px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
          <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>Dashboard</h1>
          <p className="subtitle-text">Manage Orders &amp; Inquiries</p>
        </div>

        <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          
          {/* Orders Column */}
          <div>
            <h2 className="script-heading" style={{ fontSize: '2.5rem', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              Orders ({data.orders.length})
            </h2>
            {data.orders.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No orders yet.</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {data.orders.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate)).map(order => {
                const urgency = getUrgencyLevel(order.pickupDate);
                const prepDays = getRecommendedPrepDays(order.items);
                
                return (
                  <div key={order.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>{order.customer}</h3>
                      <span style={{ color: urgency.color, fontSize: '0.8rem', fontWeight: 'bold' }}>{urgency.label}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      <p><strong>Pickup:</strong> {order.pickupDate} at {order.pickupTime}</p>
                      <p><strong>Contact:</strong> {order.email} / {order.phone}</p>
                      <p><strong>Total:</strong> ${order.total} ({order.paymentMethod})</p>
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                      <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', letterSpacing: '0.1em' }}>Recommended Action</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Start prep <strong>{prepDays} days</strong> in advance.</p>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '8px' }}>Items:</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ paddingLeft: '8px', borderLeft: '2px solid var(--border-subtle)', marginBottom: '8px' }}>
                          {item.quantity}x {item.name} ({item.size})
                          {item.addOns.length > 0 && <span style={{ color: 'var(--text-muted)' }}> + {item.addOns.join(', ')}</span>}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', letterSpacing: '0.1em' }}>Admin Notes &amp; Reminders</label>
                      <textarea 
                        value={order.adminNotes}
                        onChange={(e) => handleNoteChange('order', order.id, e.target.value)}
                        placeholder="Add reminders here..."
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', minHeight: '80px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inquiries Column */}
          <div>
            <h2 className="script-heading" style={{ fontSize: '2.5rem', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              Inquiries ({data.inquiries.length})
            </h2>
            {data.inquiries.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No inquiries yet.</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {data.inquiries.sort((a, b) => new Date(a.pickupDate) - new Date(b.pickupDate)).map(inq => {
                const urgency = getUrgencyLevel(inq.pickupDate);
                
                return (
                  <div key={inq.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--white)' }}>{inq.customer}</h3>
                      <span style={{ color: urgency.color, fontSize: '0.8rem', fontWeight: 'bold' }}>{urgency.label}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      <p><strong>Event Date:</strong> {inq.pickupDate} at {inq.pickupTime}</p>
                      <p><strong>Occasion:</strong> {inq.occasion} ({inq.guests} guests)</p>
                      <p><strong>Contact:</strong> {inq.email} / {inq.phone}</p>
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                      <p style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>Request:</p>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{inq.details}</p>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px', letterSpacing: '0.1em' }}>Admin Notes &amp; Reminders</label>
                      <textarea 
                        value={inq.adminNotes}
                        onChange={(e) => handleNoteChange('inquiry', inq.id, e.target.value)}
                        placeholder="Add reminders here..."
                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '10px', color: 'var(--text-primary)', minHeight: '80px', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
