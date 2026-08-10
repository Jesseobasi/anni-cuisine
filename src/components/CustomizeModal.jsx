import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getCategoryLabel } from '../data/menuData';

const STEPS = ['ITEM', 'SIZE', 'ADD-ONS', 'REVIEW'];

export default function CustomizeModal({ dish, onClose, editItem }) {
  const { addItem, updateItem } = useCart();
  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState(editItem?.sizeId || dish.sizes[0]?.id || '');
  const [selectedAddOns, setSelectedAddOns] = useState(
    editItem?.addOns?.map(a => a.id) || []
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const sizeObj = dish.sizes.find(s => s.id === selectedSize);
  const addOnObjs = selectedAddOns.map(id => dish.addOns.find(a => a.id === id)).filter(Boolean);
  const addOnTotal = addOnObjs.reduce((sum, a) => sum + a.price, 0);
  const total = dish.basePrice + (sizeObj?.price || 0) + addOnTotal;

  function toggleAddOn(id) {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  }

  function handleNext() {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      if (dish.addOns.length > 0) {
        setStep(2);
      } else {
        setStep(3);
      }
    } else if (step === 2) {
      setStep(3);
    }
  }

  function handleBack() {
    if (step === 3 && dish.addOns.length === 0) {
      setStep(1);
    } else {
      setStep(prev => Math.max(0, prev - 1));
    }
  }

  function handleAddToCart() {
    if (editItem) {
      updateItem(editItem.id, dish, selectedSize, selectedAddOns);
    } else {
      addItem(dish, selectedSize, selectedAddOns);
    }
    onClose();
  }

  const visibleSteps = dish.addOns.length > 0
    ? STEPS
    : STEPS.filter(s => s !== 'ADD-ONS');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-category">{getCategoryLabel(dish.category)}</div>
        <h2 className="modal-title">{dish.name}</h2>

        <div className="step-breadcrumb">
          {visibleSteps.map((s, i) => (
            <span key={s}>
              {i > 0 && <span className="separator"> › </span>}
              <span className={
                (dish.addOns.length > 0 ? step === i : (i === 0 ? step === 0 : i === 1 ? step === 1 : step === 3))
                  ? 'active' : ''
              }>{s}</span>
            </span>
          ))}
        </div>

        {/* Step 0: Item info */}
        {step === 0 && (
          <>
            <p className="modal-desc">{dish.description}</p>
            <div className="modal-price-label">FROM</div>
            <div className="modal-price">${dish.basePrice}</div>
          </>
        )}

        {/* Step 1: Size selection */}
        {step === 1 && (
          <>
            <p className="modal-desc">Choose a size:</p>
            <div className="option-list">
              {dish.sizes.map(size => (
                <div
                  key={size.id}
                  className={`option-item ${selectedSize === size.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size.id)}
                >
                  <span className="option-label">{size.label}</span>
                  <span className="option-price">
                    ${dish.basePrice + size.price}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Add-ons */}
        {step === 2 && (
          <>
            <p className="modal-desc">Add a protein (optional):</p>
            <div className="option-list">
              {dish.addOns.map(addon => (
                <div
                  key={addon.id}
                  className={`option-item ${selectedAddOns.includes(addon.id) ? 'selected' : ''}`}
                  onClick={() => toggleAddOn(addon.id)}
                >
                  <span className="option-label">{addon.label}</span>
                  <span className="option-price">+${addon.price}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <>
            <div className="review-summary">
              <div className="review-line">
                <span className="review-label">{dish.name}</span>
                <span>${dish.basePrice}</span>
              </div>
              {sizeObj && (
                <div className="review-line">
                  <span>{sizeObj.label}</span>
                  <span>{sizeObj.price > 0 ? `+$${sizeObj.price}` : 'Included'}</span>
                </div>
              )}
              {addOnObjs.map(a => (
                <div key={a.id} className="review-line">
                  <span>{a.label}</span>
                  <span>+${a.price}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="modal-footer">
          <div>
            <div className="modal-total-label">TOTAL</div>
            <div className="modal-total-price">${total}</div>
          </div>

          {step < 3 ? (
            <button className="btn-gold" onClick={handleNext}>
              Next <span style={{ fontSize: '0.8em' }}>›</span>
            </button>
          ) : (
            <button className="btn-gold" onClick={handleAddToCart}>
              {editItem ? 'Update' : 'Add to Cart'} <span style={{ fontSize: '0.8em' }}>✓</span>
            </button>
          )}
        </div>

        {step > 0 && (
          <button
            className="btn-text"
            onClick={handleBack}
            style={{ marginTop: '8px', display: 'block', width: '100%', textAlign: 'center' }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
