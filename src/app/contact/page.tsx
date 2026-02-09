'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import styles from './contact.module.css';

const offices = [
    { city: 'London', country: 'United Kingdom', address: '1 Canada Square, Canary Wharf', phone: '+44 20 1234 5678' },
    { city: 'Cyprus', country: 'Limassol', address: 'Spyrou Kyprianou Avenue 53', phone: '+357 25 123 456' },
    { city: 'Singapore', country: 'Singapore', address: 'Marina Bay Financial Centre', phone: '+65 6123 4567' },
    { city: 'Dubai', country: 'UAE', address: 'DIFC, Gate Building', phone: '+971 4 123 4567' },
];

const faqs = [
    { q: 'How do I open an account?', a: 'Click the "Register" button and follow the simple 3-step process. Verification typically takes under 2 hours.' },
    { q: 'What is the minimum deposit?', a: 'Standard accounts require just $10 minimum. Professional accounts start from $3,000.' },
    { q: 'How long do withdrawals take?', a: 'Most withdrawals are processed instantly. Bank transfers may take 1-3 business days.' },
    { q: 'Is my money safe?', a: 'Yes. Client funds are held in segregated accounts with top-tier banks and protected up to €20,000.' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>Contact Us</h1>
                    <p>We're here to help. Get in touch with our support team 24/7</p>
                    <div className={styles.quickContact}>
                        <div className={styles.contactMethod}>
                            <span>💬</span>
                            <div>
                                <strong>Live Chat</strong>
                                <p>Available 24/7</p>
                            </div>
                        </div>
                        <div className={styles.contactMethod}>
                            <span>📧</span>
                            <div>
                                <strong>support@exness.com</strong>
                                <p>Response within 2 hours</p>
                            </div>
                        </div>
                        <div className={styles.contactMethod}>
                            <span>📞</span>
                            <div>
                                <strong>+1 800 123 4567</strong>
                                <p>24/7 Support Line</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form & Offices */}
                <section className={styles.contactSection}>
                    <div className={styles.container}>
                        <div className={styles.grid}>
                            {/* Form */}
                            <div className={styles.formCard}>
                                <h2>Send a Message</h2>
                                {submitted ? (
                                    <div className={styles.successMsg}>
                                        <span>✓</span>
                                        <h3>Message Sent!</h3>
                                        <p>We'll get back to you within 2 hours</p>
                                        <button onClick={() => setSubmitted(false)}>
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.formRow}>
                                            <div className={styles.field}>
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className={styles.field}>
                                                <label>Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.field}>
                                            <label>Subject</label>
                                            <select
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="account">Account Issues</option>
                                                <option value="deposit">Deposits & Withdrawals</option>
                                                <option value="trading">Trading Questions</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="partnership">Partnership Inquiry</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className={styles.field}>
                                            <label>Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="How can we help you?"
                                            />
                                        </div>
                                        <button type="submit" className={styles.submitBtn}>
                                            Send Message
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Offices */}
                            <div className={styles.officesCard}>
                                <h2>Global Offices</h2>
                                <div className={styles.officesList}>
                                    {offices.map((office, idx) => (
                                        <div key={idx} className={styles.office}>
                                            <h4>{office.city}</h4>
                                            <p className={styles.country}>{office.country}</p>
                                            <p>{office.address}</p>
                                            <p className={styles.phone}>{office.phone}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className={styles.faqSection}>
                    <div className={styles.container}>
                        <h2>Frequently Asked Questions</h2>
                        <div className={styles.faqList}>
                            {faqs.map((faq, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.faqItem} ${openFaq === idx ? styles.open : ''}`}
                                >
                                    <button
                                        className={styles.faqQuestion}
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    >
                                        <span>{faq.q}</span>
                                        <span className={styles.faqIcon}>{openFaq === idx ? '−' : '+'}</span>
                                    </button>
                                    {openFaq === idx && (
                                        <div className={styles.faqAnswer}>
                                            <p>{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Ready to Start Trading?</h2>
                        <p>Join 800,000+ traders and experience the difference</p>
                        <Link href="/register" className={styles.ctaBtn}>
                            Open Free Account
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
