import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div>
            <div className="hero-label">Welcome to my cooking page</div>
            <h1 className="hero-title">Anniis</h1>
            <div className="hero-subtitle">Cuisine</div>
            <p className="hero-description">
              Cameroonian dishes, soul food and seafood, cooked with the flavors of love and memory. Serving Towson, MD and New Jersey.
            </p>
            <div className="hero-buttons">
              <Link to="/menu" className="btn-gold">Explore Menu</Link>
              <Link to="/inquiry" className="btn-outline">Submit an Inquiry</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero.jpeg" alt="Chef Annelle holding a food platter" />
          </div>
        </div>
      </section>

      {/* Meet Annelle */}
      <section className="section">
        <div className="section-header">
          <h2 className="script-heading">Meet Annelle</h2>
        </div>
        <div className="meet-content">
          <div className="meet-image">
            <img src="/images/portrait.jpeg" alt="Chef Annelle" />
          </div>
          <div className="meet-text">
            Welcome to my cooking page! 🍽️✨ "Anni" is a name deeply personal to me, inspired by the nickname my mother gave me. Cooking was a passion we both shared, and over time, that passion has grown into something bigger, more meaningful, and more fulfilling than I could have imagined. In her absence, cooking has become one of the ways I continue to feel connected to her while also creating something of my own. It has brought me comfort during stressful moments and has given me an outlet to express myself. Most importantly, I've found so much joy in cooking for others and seeing people enjoy the food I create. What began as something personal has grown into something I'm proud to share with others. As I continue to grow, learn, and explore new flavors, I hope to create food that brings people together and leaves them wanting to come back for more. Welcome to Anni's cuisine. 🤍🍽️
          </div>
        </div>
      </section>

      {/* Most Popular */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="section-header" style={{ marginBottom: '24px' }}>
          <h2 className="script-heading">Most Popular Items</h2>
        </div>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            Jerk Wings · Oxtail · Mac &amp; Cheese · Short Ribs · Peppered Steak and Rice · Honey Wings
          </p>
        </div>
      </section>

      {/* Dishes Offered */}
      <section className="section">
        <div className="section-header">
          <h2 className="script-heading">Dishes offered</h2>
        </div>
        <div className="dishes-grid">
          <Link to="/menu?filter=cameroonian" className="dish-card">
            <h3 className="script-heading">Cameroonian</h3>
            <p>Poulet DG, Kondres, Bongo Tchobi, Egusi, Cornchaff.</p>
            <span className="view-link">View dishes →</span>
          </Link>
          <Link to="/menu?filter=island-soul-fusion" className="dish-card">
            <h3 className="script-heading">Island &amp; Soul Fusion</h3>
            <p>Honey wings, candied yams, mac &amp; cheese, cabbage.</p>
            <span className="view-link">View dishes →</span>
          </Link>
          <Link to="/menu?filter=main-dishes" className="dish-card">
            <h3 className="script-heading">Main Dishes</h3>
            <p>Oxtail, braised short rib, steak with rice, jerk chicken.</p>
            <span className="view-link">View dishes →</span>
          </Link>
          <Link to="/menu?filter=sides" className="dish-card">
            <h3 className="script-heading">Sides</h3>
            <p>Fried plantains, yams, cabbage and more by the pan.</p>
            <span className="view-link">View dishes →</span>
          </Link>
        </div>
        <div className="full-menu-link">
          <Link to="/menu">See the full catering menu</Link>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="section-header">
          <h2 className="script-heading">Services offered by Chef Anni</h2>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <h3>Catering</h3>
            <p>Trays and party pans for gatherings of any size.</p>
          </div>
          <div className="service-card">
            <h3>Private Dining / Event</h3>
            <p>A full menu cooked and served for your table (perfect for a dinner for two).</p>
          </div>
          <div className="service-card">
            <h3>Pop-Up Events</h3>
            <p>Seasonal pop-ups around Maryland and Jersey.</p>
          </div>
          <div className="service-card">
            <h3>Meal Prep / Plates</h3>
            <p>Weekly plates portioned and ready to heat.</p>
          </div>
          <div className="service-card">
            <h3>Brunch</h3>
            <p>Eggs, pancakes, French toast, potatoes and fruit.</p>
          </div>
          <div className="service-card">
            <h3>The Chef's Invite</h3>
            <p>An intimate tasting menu by request.</p>
          </div>
        </div>
      </section>

      {/* Tag Me */}
      <section className="tag-section">
        <div className="tag-content">
          <div className="tag-image">
            <img src="/images/food.jpeg" alt="Food platter" />
          </div>
          <div className="tag-text">
            <h2 className="script-heading">Tag me</h2>
            <p className="subtitle-text">Selfie-love · get featured</p>
            <p className="handles">@anniiscuisine · @Therealannelle</p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="section-header">
          <h2 className="script-heading">Reviews</h2>
          <p className="subtitle-text">Customer</p>
        </div>
        <div className="reviews-grid">
          <div className="review-card">
            <blockquote>
              "The food was so good, I couldn't stop dancing after the first bite!"
            </blockquote>
            <div className="reviewer">Ian</div>
          </div>
          <div className="review-card">
            <blockquote>
              "The mac and cheese was so good, I had to give Chef Anni a hug!"
            </blockquote>
            <div className="reviewer">Konwelee</div>
          </div>
          <div className="review-card">
            <blockquote>
              "The Poulet DG brought me right back home. For a moment, I felt like I was back in Cameroon!"
            </blockquote>
            <div className="reviewer">Sara</div>
          </div>
          <div className="review-card">
            <blockquote>
              "Chef Anni's food was so good, I started planning an event just so I could have her cook for it!"
            </blockquote>
            <div className="reviewer">Reine</div>
          </div>
          <div className="review-card">
            <blockquote>
              "I almost cried eating the oxtail. It was THAT good!"
            </blockquote>
            <div className="reviewer">Camron</div>
          </div>
        </div>
      </section>
    </div>
  );
}
