import React from 'react';
import './PageStyles.css';

const Gallery = () => {
  const images = [
    { src: '/yogurt.png', alt: 'Yogurt & Granola' },
    { src: '/bagel.png', alt: 'Smoked Salmon Bagel' },
    { src: '/burger.png', alt: 'Signature Burger' },
    { src: '/matcha.png', alt: 'Matcha Latte' },
    { src: '/cake.png', alt: 'Chocolate Truffle Cake' },
    { src: '/iced_coffee.png', alt: 'Iced Caramel Macchiato' },
    { src: '/coffee.png', alt: 'Hot Coffee' },
    { src: '/about.png', alt: 'Cafe Ambiance' },
    { src: '/hero.png', alt: 'Cafe Interior' },
  ];

  return (
    <div className="page-container" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <div className="page-header text-center" style={{ backgroundColor: '#000000', paddingBottom: '2rem' }}>
        <h1 className="text-display" style={{ fontSize: '4rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#ffffff' }}>Gallery</h1>
        <p className="text-body" style={{ fontStyle: 'italic', opacity: 0.8, color: '#ffffff' }}>A visual journey through Cafe.</p>
      </div>

      <div className="container" style={{ paddingBottom: '8rem' }}>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div key={idx} className="gallery-card">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="gallery-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
