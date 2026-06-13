import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './PageStyles.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { supabase } = await import('../supabase');
      const { error } = await supabase
        .from('contacts')
        .insert([
          { ...formData }
        ]);
        
      if (error) throw error;
      
      if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_SERVICE_ID !== "your-service-id") {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            type: 'Contact Message',
            name: formData.name,
            email: formData.email,
            message: `Subject: ${formData.subject}\n\n${formData.message}`
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      }
      
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
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
        <h1 className="text-display">Get in Touch</h1>
        <p className="text-body">We'd love to hear from you.</p>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className="grid grid-cols-2 gap-8" style={{ marginBottom: '4rem' }}>
          <div>
            <h2 className="text-display mb-4">Contact Information</h2>
            <div className="contact-info-list flex-col gap-4">
              <div className="flex gap-4 items-start" style={{ marginBottom: '1.5rem' }}>
                <MapPin color="var(--accent-alt)" size={24} />
                <div>
                  <h4 className="text-ui">Address</h4>
                  <p className="text-body">{import.meta.env.VITE_LOCATION}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start" style={{ marginBottom: '1.5rem' }}>
                <Phone color="var(--accent-alt)" size={24} />
                <div>
                  <h4 className="text-ui">Phone</h4>
                  <p className="text-body">{import.meta.env.VITE_WHATSAPP_NUMBER}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start" style={{ marginBottom: '1.5rem' }}>
                <Mail color="var(--accent-alt)" size={24} />
                <div>
                  <h4 className="text-ui">Email</h4>
                  <p className="text-body">hello@cafe.in</p>
                </div>
              </div>
              <div className="flex gap-4 items-start" style={{ marginBottom: '1.5rem' }}>
                <Clock color="var(--accent-alt)" size={24} />
                <div>
                  <h4 className="text-ui">Operating Hours</h4>
                  <p className="text-body">Monday–Friday: 8:00 AM – 10:00 PM<br/>Saturday–Sunday: 9:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            {submitted ? (
              <div className="text-center">
                <h3 className="text-display mb-4" style={{ color: 'var(--accent)' }}>Message Sent!</h3>
                <p className="text-body">Thank you for reaching out. We will get back to you shortly.</p>
                <button className="btn btn-outline-dark mt-4" onClick={() => setSubmitted(false)}>Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-display mb-4">Send us a Message</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-control" required placeholder="How can we help?" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="5" required placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                  {isLoading ? <><Loader2 className="animate-spin inline" size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} /> Sending...</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="map-container" style={{ borderRadius: '12px', overflow: 'hidden', height: '400px' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121825.2635398246!2d78.33083041640623!3d17.43003050000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c0024923e3%3A0x86b0daef6bd7d21c!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1715783456789!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
