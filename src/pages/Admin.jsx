import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Loader2 } from 'lucide-react';
import './PageStyles.css';

const Admin = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === import.meta.env.VITE_ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Incorrect passcode");
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: resData, error: resError } = await supabase
        .from('reservations')
        .select('*')
        .order('createdAt', { ascending: false });
      if (resError) throw resError;
      setReservations(resData || []);

      const { data: contactData, error: contactError } = await supabase
        .from('contacts')
        .select('*')
        .order('createdAt', { ascending: false });
      if (contactError) throw contactError;
      setContacts(contactData || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%', padding: '2rem', margin: '0 auto' }}>
          <h2 className="text-display mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Passcode</label>
              <input 
                type="password" 
                className="form-control" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container" style={{ paddingBottom: '5rem', paddingTop: '2rem' }}>
        <h1 className="text-display mb-4">Admin Dashboard</h1>
        
        <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'reservations' ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservations ({reservations.length})
          </button>
          <button 
            className={`btn ${activeTab === 'contacts' ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setActiveTab('contacts')}
          >
            Messages ({contacts.length})
          </button>
          <button className="btn btn-outline-dark" style={{ marginLeft: 'auto' }} onClick={fetchData}>
            Refresh Data
          </button>
        </div>

        {isLoading ? (
          <div className="text-center p-5">
            <Loader2 className="animate-spin inline" size={40} color="var(--accent)" />
          </div>
        ) : (
          <div className="card" style={{ padding: '2rem', overflowX: 'auto' }}>
            {activeTab === 'reservations' && (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Time</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Guests</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Phone</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Requests</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(res => (
                    <tr key={res.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.date}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.time}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.name}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.guests}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.phone}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{res.requests || '-'}</td>
                    </tr>
                  ))}
                  {reservations.length === 0 && (
                    <tr><td colSpan="6" style={{ padding: '2rem', textAlign: 'center' }}>No reservations found.</td></tr>
                  )}
                </tbody>
              </table>
            )}

            {activeTab === 'contacts' && (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '1rem 0.5rem' }}>Date</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Name</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Email</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Subject</th>
                    <th style={{ padding: '1rem 0.5rem' }}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(msg => (
                    <tr key={msg.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '1rem 0.5rem' }}>{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{msg.name}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{msg.email}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{msg.subject}</td>
                      <td style={{ padding: '1rem 0.5rem' }}>{msg.message}</td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>No messages found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
