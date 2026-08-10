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

        {/* Price List Section */}
        <div className="price-section">
          <div className="section-header">
            <h2 className="script-heading">Full price list</h2>
            <p className="subtitle-text">By the pan &amp; tray</p>
          </div>
          <div className="price-tables">
            {/* Rice & Pasta */}
            <div className="price-table-group">
              <h3>Rice &amp; Pasta</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Dish</th><th>Half Pan</th><th>Full Pan</th></tr>
                </thead>
                <tbody>
                  <tr><td>Fried Rice</td><td>$60</td><td>$80</td></tr>
                  <tr><td>Rasta Pasta</td><td>$70</td><td>$90</td></tr>
                  <tr><td>Creamy Alfredo</td><td>$65</td><td>$85</td></tr>
                  <tr><td>Spaghetti Sauté</td><td>$60</td><td>$80</td></tr>
                </tbody>
              </table>
            </div>

            {/* Seafood */}
            <div className="price-table-group">
              <h3>Seafood Specials</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Dish</th><th>Half Tray</th><th>Full Tray</th></tr>
                </thead>
                <tbody>
                  <tr><td>Salmon</td><td>$95</td><td>$150</td></tr>
                  <tr><td>Whole Fish</td><td>$100</td><td>$160</td></tr>
                </tbody>
              </table>
            </div>

            {/* Traditional */}
            <div className="price-table-group">
              <h3>Traditional Dishes</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Dish</th><th>Half Pan</th><th>Full Pan</th></tr>
                </thead>
                <tbody>
                  <tr><td>Ragoût de Pommes de Terre</td><td>$80</td><td>$110</td></tr>
                  <tr><td>Poulet DG</td><td>$85</td><td>$120</td></tr>
                  <tr><td>Bongo Tchobi</td><td>$95</td><td>$130</td></tr>
                  <tr><td>Cornchaff</td><td>$70</td><td>$95</td></tr>
                  <tr><td>Kondres</td><td>$85</td><td>$120</td></tr>
                  <tr><td>Egusi Soup</td><td>$65</td><td>$95</td></tr>
                </tbody>
              </table>
            </div>

            {/* Proteins */}
            <div className="price-table-group">
              <h3>Proteins</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Dish</th><th>Half Pan</th><th>Full Pan</th></tr>
                </thead>
                <tbody>
                  <tr><td>Chicken Drumsticks</td><td>$65</td><td>$95</td></tr>
                  <tr><td>Honey Wings</td><td>$70</td><td>$100</td></tr>
                  <tr><td>Southern-Style Meatballs</td><td>$65</td><td>$95</td></tr>
                  <tr><td>Jerk Chicken</td><td>$60</td><td>$120</td></tr>
                  <tr><td>Steak with Rice</td><td>$100</td><td>$140</td></tr>
                  <tr><td>Oxtail</td><td>$180</td><td>$290</td></tr>
                  <tr><td>Braised Short Rib</td><td>$180</td><td>$290</td></tr>
                  <tr><td>Stews</td><td>$85</td><td>$120</td></tr>
                </tbody>
              </table>
              <br />
              <h4>Jerk Whole Wings (cut or uncut)</h4>
              <table className="price-table">
                <thead>
                  <tr><th>Quantity</th><th>Price</th></tr>
                </thead>
                <tbody>
                  <tr><td>20 Wings</td><td>$70</td></tr>
                  <tr><td>40 Wings</td><td>$125</td></tr>
                  <tr><td>60 Wings</td><td>$180</td></tr>
                  <tr><td>100 Wings</td><td>$275</td></tr>
                </tbody>
              </table>
            </div>

            {/* Sides */}
            <div className="price-table-group">
              <h3>Sides</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Dish</th><th>Half Pan</th><th>Full Pan</th></tr>
                </thead>
                <tbody>
                  <tr><td>Fried Plantains</td><td>$45</td><td>$65</td></tr>
                  <tr><td>Mashed Potatoes</td><td>$45</td><td>$65</td></tr>
                  <tr><td>Candied Yams</td><td>$50</td><td>$70</td></tr>
                  <tr><td>Sautéed Cabbage</td><td>$40</td><td>$55</td></tr>
                  <tr><td>Mac &amp; Cheese</td><td>$60</td><td>$112</td></tr>
                </tbody>
              </table>
            </div>

            {/* Brunch */}
            <div className="price-table-group">
              <h3>Breakfast &amp; Brunch Combos</h3>
              <table className="price-table">
                <thead>
                  <tr><th>Package</th><th>Price</th></tr>
                </thead>
                <tbody>
                  <tr><td>Small (10–15 guests)</td><td>$120</td></tr>
                  <tr><td>Large (20–30 guests)</td><td>$200</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="price-note">
            Prices may vary with portion size, protein choice and custom requests. Have a custom request?{' '}
            <Link to="/inquiry">Submit an inquiry</Link>.
          </p>
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
