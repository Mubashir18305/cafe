import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const NotFound = () => {
  return (
    <div className="page-container flex flex-col items-center justify-center text-center" style={{ minHeight: '60vh', padding: '4rem 2rem' }}>
      <h1 className="text-display" style={{ fontSize: '6rem', color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1 }}>404</h1>
      <h2 className="text-display" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Page Not Found</h2>
      <p className="text-body" style={{ opacity: 0.8, maxWidth: '500px', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        We couldn't find the page you were looking for. It might have been moved or the link might be broken.
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;
