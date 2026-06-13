import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './PageStyles.css';

const Reserve = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', date: '', time: '', guests: '', requests: '' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { supabase } = await import('../supabase');
      const { error } = await supabase
        .from('reservations')
        .insert([
          { ...formData }
        ]);
        
      if (error) throw error;

      if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_SERVICE_ID !== "your-service-id") {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            type: 'Table Reservation',
            name: formData.name,
            email: formData.email,
            message: `Phone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}\nRequests: ${formData.requests}`
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '', requests: '' });
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Failed to submit form. Check your Supabase configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <h1 className="text-display">Reserve Your Table</h1>
        <p className="text-body">We'd love to have you. Book in advance for the best experience.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem', maxWidth: '800px' }}>
        {submitted ? (
          <div className="text-center p-5 card">
            <h2 className="text-display" style={{ color: 'var(--accent)' }}>Reservation Confirmed!</h2>
            <p className="text-body mt-4">We have received your request and will see you soon.</p>
            <button className="btn btn-outline-dark mt-4" onClick={() => setSubmitted(false)}>Make another booking</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="Jane Doe" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" required placeholder="+91 98765 43210" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="jane@example.com" />
              </div>
              <div className="form-group">
                <label>Date of Visit</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Time Slot</label>
                <select name="time" value={formData.time} onChange={handleChange} className="form-control" required>
                  <option value="">Select a time</option>
                  <option>9:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>3:00 PM</option>
                  <option>5:00 PM</option>
                  <option>7:00 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input type="number" name="guests" value={formData.guests} onChange={handleChange} min="1" max="20" className="form-control" required />
              </div>
            </div>
            <div className="form-group">
              <label>Special Requests</label>
              <textarea name="requests" value={formData.requests} onChange={handleChange} className="form-control" rows="4" placeholder="Any dietary preferences or occasions?"></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
              {isLoading ? <><Loader2 className="animate-spin inline" size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Confirming...</> : 'Confirm Reservation'}
            </button>
          </form>
        )}

        <div className="policies-strip text-center mt-4" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
          <p>Reservations are held for 15 minutes past the booking time.</p>
          <p>For tables larger than 8, a deposit may be required.</p>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
