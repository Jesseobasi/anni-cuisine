import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { dishes, categories, getCategoryLabel } from '../data/menuData';
import CustomizeModal from '../components/CustomizeModal';

export default function Menu() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [modalDish, setModalDish] = useState(null);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) setActiveFilter(filter);
  }, [searchParams]);

  const filtered = activeFilter === 'all'
    ? dishes
    : dishes.filter(d => d.filterCategories.includes(activeFilter));

  return (
    <div className="page-wrapper">
      <section className="menu-page">
        <div className="section-header">
          <h1 className="script-heading" style={{ fontSize: '3.5rem' }}>The Menu</h1>
          <p className="subtitle-text">Order by the pan or tray</p>
        </div>

        <div className="container">
          <div className="allergy-notice">
            <h4>Food Allergy Notice</h4>
            <p>
              Please inform us of any food allergies or dietary restrictions before placing your order. Some items may contain milk, eggs, wheat, soy, peanuts, tree nuts, fish, shellfish or sesame. We take allergies seriously and will do our best to accommodate when notified in advance.
            </p>
          </div>
        </div>

        <div className="filter-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-tab ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="dish-count">Showing {filtered.length} dishes</p>

        <div className="menu-grid">
          {filtered.map(dish => (
            <div key={dish.id} className="menu-card">
              <div className="card-category">{getCategoryLabel(dish.category)}</div>
              <h3 className="card-name">{dish.name}</h3>
              <p className="card-desc">{dish.description}</p>
              <div className="card-footer">
                <div className="card-price">
                  <span>From </span>${dish.basePrice}
                </div>
                <button
                  className="customize-btn"
                  onClick={() => setModalDish(dish)}
                >
                  Customize + Add
                </button>
              </div>
            </div>
          ))}
        </div>


      </section>

      {modalDish && (
        <CustomizeModal
          dish={modalDish}
          onClose={() => setModalDish(null)}
        />
      )}
    </div>
  );
}
