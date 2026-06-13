import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const Events = () => {
  const eventsList = [
    {
      title: "Jazz & Brew Night",
      date: "Friday, 8:00 PM",
      desc: "Live jazz performance with specialty evening brews.",
      price: "₹500 cover",
      tag: "Live Music"
    },
    {
      title: "Sunday Book Club",
      date: "Sunday, 11:00 AM",
      desc: "Discussing 'The Midnight Library'. Coffee included.",
      price: "Free entry",
      tag: "Community"
    },
    {
      title: "Latte Art Workshop",
      date: "Next Wednesday, 4:00 PM",
      desc: "Learn the basics of pouring beautiful latte art.",
      price: "₹1200",
      tag: "Workshop"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="text-display">Happening at Theory</h1>
        <p className="text-body">Join our community for evenings of art, music, and learning.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="grid grid-cols-3 gap-8 mb-4">
          {eventsList.map((evt, idx) => (
            <div key={idx} className="card" style={{ padding: '2rem' }}>
              <span className="item-tag mb-4" style={{ display: 'inline-block', marginLeft: 0 }}>{evt.tag}</span>
              <h3 className="text-display mb-2">{evt.title}</h3>
              <p className="text-ui mb-2" style={{ color: 'var(--accent-alt)', fontWeight: '500' }}>{evt.date}</p>
              <p className="text-body mb-4" style={{ fontSize: '0.9rem' }}>{evt.desc}</p>
              <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <span className="text-ui" style={{ fontWeight: '600' }}>{evt.price}</span>
                <Link to="/reserve" className="btn btn-outline-dark" style={{ padding: '0.5rem 1rem' }}>RSVP</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center card mt-4" style={{ padding: '4rem 2rem', backgroundColor: 'var(--text-dark)', color: 'var(--text-light)' }}>
          <h2 className="text-display mb-4">Planning Something Special?</h2>
          <p className="text-body mb-4 max-w-md mx-auto" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
            Host your private event, workshop, or meeting at Cafe. We offer catering, projector setups, and private room bookings.
          </p>
          <Link to="/contact" className="btn btn-primary">Enquire for Private Booking</Link>
        </div>
      </div>
    </div>
  );
};

export default Events;
