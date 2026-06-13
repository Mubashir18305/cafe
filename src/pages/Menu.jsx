import React from 'react';
import './PageStyles.css';

const Menu = () => {
  const menuCategories = [
    {
      title: "All-Day Breakfast",
      img: "/yogurt.png",
      items: [
        { name: "Yogurt & Granola", desc: "Fresh fruits, organic honey, house-made granola.", price: "₹360" },
        { name: "Guacamole on Toast", desc: "Smashed avocado, cherry tomatoes, sourdough.", price: "₹390" },
        { name: "Classic French Toast", desc: "Brioche, maple syrup, berries.", price: "₹390" },
        { name: "Hazelnut Chocolate French Toast", desc: "Nutella, crushed hazelnuts, vanilla bean ice cream.", price: "₹430" },
        { name: "Sweet & Savory Crepes", desc: "Choice of filling: berries & cream or spinach & feta.", price: "₹380+" }
      ]
    },
    {
      title: "Bagels & Croissants",
      img: "/bagel.png",
      items: [
        { name: "Garlic Bagel", desc: "Toasted with garlic butter and herbs.", price: "₹180" },
        { name: "Paneer Tikka Bagel", desc: "Spiced paneer, mint chutney, pickled onions.", price: "₹410" },
        { name: "Smoked Salmon & Cream Cheese Bagel", desc: "Capers, dill, red onion.", price: "₹560" },
        { name: "Butter Croissant", desc: "Flaky, buttery, baked fresh daily.", price: "₹160" },
        { name: "Caprese Croissant", desc: "Mozzarella, tomato, basil pesto.", price: "₹360" }
      ]
    },
    {
      title: "Burgers & Pasta",
      img: "/burger.png",
      items: [
        { name: "Theory Signature Burger", desc: "Double patty, truffle mayo, caramelized onions.", price: "₹550" },
        { name: "Crunchy Chicken Burger", desc: "Crispy fried chicken, spicy slaw, brioche bun.", price: "₹480" },
        { name: "Pesto Pasta", desc: "Basil pesto, pine nuts, parmesan, spaghetti.", price: "₹410" },
        { name: "Mushroom Risotto", desc: "Arborio rice, wild mushrooms, truffle oil.", price: "₹460" },
        { name: "Classic Lasagna", desc: "Layered with rich meat sauce and mozzarella.", price: "₹430+" }
      ]
    },
    {
      title: "Beverages",
      img: "/matcha.png",
      items: [
        { name: "Passion Fruit Iced Tea", desc: "Refreshing black tea with passion fruit puree.", price: "₹250" },
        { name: "Matcha Latte", desc: "Premium ceremonial grade matcha, steamed milk.", price: "₹310" },
        { name: "Espresso", desc: "Single or double shot of our house blend.", price: "₹150" },
        { name: "Cappuccino", desc: "Equal parts espresso, steamed milk, and foam.", price: "₹220" },
        { name: "Lavender Honey Latte", desc: "A soothing blend of floral notes and espresso.", price: "₹280" }
      ]
    }
  ];

  return (
    <div className="page-container" style={{ backgroundColor: '#F9F9F9' }}>
      <div className="page-header text-center" style={{ backgroundColor: '#F9F9F9', paddingBottom: '2rem' }}>
        <h1 className="text-display" style={{ fontSize: '4rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Menu</h1>
        <p className="text-body" style={{ fontStyle: 'italic', opacity: 0.8 }}>Crafted fresh, served with love.</p>
      </div>

      <div className="container" style={{ paddingBottom: '8rem' }}>
        {menuCategories.map((category, idx) => (
          <div key={idx} className="menu-section" style={{ marginBottom: '6rem' }}>
            <h2 className="text-display section-title text-center" style={{ 
              fontSize: '2rem', 
              textTransform: 'uppercase', 
              letterSpacing: '3px',
              borderBottom: 'none',
              marginBottom: '3rem'
            }}>
              {category.title}
            </h2>
            
            <div className={`menu-layout-grid has-image ${idx % 2 === 0 ? 'image-left' : 'image-right'}`}>
              <div className="menu-image-container">
                <img src={category.img} alt={category.title} className="menu-side-image" />
              </div>
              
              <div className="menu-items-column" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {category.items.map((item, i) => (
                  <div key={i} className="menu-item-row" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="flex justify-between items-baseline" style={{ borderBottom: '1px solid #E0E0E0', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <h3 className="text-ui" style={{ fontSize: '1.1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                        {item.name}
                      </h3>
                      <div className="menu-item-price text-ui" style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
                        {item.price}
                      </div>
                    </div>
                    <p className="text-body" style={{ fontSize: '0.95rem', opacity: 0.7, margin: 0, fontStyle: 'italic' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
