import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import styles from './partnership.module.css';

const partnerTypes = [
    {
        id: 'ib',
        icon: '🤝',
        title: 'Introducing Broker (IB)',
        description: 'Earn commissions by referring traders to our platform',
        benefits: [
            'Up to $15 per lot traded',
            'Real-time tracking dashboard',
            'Marketing materials provided',
            'Dedicated account manager',
            'Weekly payments',
        ],
        cta: 'Become an IB',
    },
    {
        id: 'affiliate',
        icon: '🔗',
        title: 'Affiliate Program',
        description: 'Monetize your traffic with our industry-leading commissions',
        benefits: [
            'Up to $1,850 per client',
            'Cookie duration: 90 days',
            'High-converting landing pages',
            'Comprehensive tracking',
            'Multi-tier commissions',
        ],
        cta: 'Join Affiliates',
    },
    {
        id: 'whitelabel',
        icon: '🏷️',
        title: 'White Label Solution',
        description: 'Launch your own brokerage with our technology',
        benefits: [
            'Your own branded platform',
            'Full technical support',
            'Liquidity provision',
            'Risk management tools',
            'Regulatory guidance',
        ],
        cta: 'Learn More',
    },
];

const stats = [
    { value: '$500M+', label: 'Paid to Partners' },
    { value: '50,000+', label: 'Active Partners' },
    { value: '180+', label: 'Countries' },
    { value: '24/7', label: 'Support' },
];

const testimonials = [
    {
        name: 'James Miller',
        role: 'IB Partner, UK',
        quote: 'The transparency and reliability of Exness partnership program is unmatched. My earnings have tripled in the past year.',
    },
    {
        name: 'Maria Santos',
        role: 'Affiliate, Brazil',
        quote: 'The marketing materials and support provided helped me scale my affiliate business significantly.',
    },
    {
        name: 'Ahmed Hassan',
        role: 'IB Partner, UAE',
        quote: 'Weekly payments and real-time tracking make it easy to manage and grow my referral network.',
    },
];

export default function PartnershipPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>Partnership Programs</h1>
                    <p>Join 50,000+ partners earning industry-leading commissions</p>
                    <div className={styles.heroStats}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className={styles.stat}>
                                <span>{stat.value}</span>
                                <p>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Partner Types */}
                <section className={styles.partnerTypes}>
                    <div className={styles.container}>
                        <h2>Choose Your Path</h2>
                        <div className={styles.typesGrid}>
                            {partnerTypes.map((type) => (
                                <div key={type.id} className={styles.typeCard}>
                                    <span className={styles.typeIcon}>{type.icon}</span>
                                    <h3>{type.title}</h3>
                                    <p className={styles.typeDesc}>{type.description}</p>
                                    <ul className={styles.benefitsList}>
                                        {type.benefits.map((benefit, idx) => (
                                            <li key={idx}>✓ {benefit}</li>
                                        ))}
                                    </ul>
                                    <Link href="/register" className={styles.typeBtn}>
                                        {type.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className={styles.howItWorks}>
                    <div className={styles.container}>
                        <h2>How It Works</h2>
                        <div className={styles.stepsGrid}>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>1</div>
                                <h3>Register</h3>
                                <p>Sign up for our partnership program in minutes</p>
                            </div>
                            <div className={styles.stepArrow}>→</div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>2</div>
                                <h3>Promote</h3>
                                <p>Share your unique referral link with your audience</p>
                            </div>
                            <div className={styles.stepArrow}>→</div>
                            <div className={styles.step}>
                                <div className={styles.stepNumber}>3</div>
                                <h3>Earn</h3>
                                <p>Receive commissions for every successful referral</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className={styles.testimonials}>
                    <div className={styles.container}>
                        <h2>Partner Success Stories</h2>
                        <div className={styles.testimonialsGrid}>
                            {testimonials.map((testimonial, idx) => (
                                <div key={idx} className={styles.testimonialCard}>
                                    <p className={styles.quote}>"{testimonial.quote}"</p>
                                    <div className={styles.author}>
                                        <div className={styles.avatar}>{testimonial.name[0]}</div>
                                        <div>
                                            <strong>{testimonial.name}</strong>
                                            <span>{testimonial.role}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commission Calculator */}
                <section className={styles.calculator}>
                    <div className={styles.container}>
                        <div className={styles.calcCard}>
                            <h2>Earnings Potential</h2>
                            <p>See how much you could earn as a partner</p>
                            <div className={styles.calcGrid}>
                                <div className={styles.calcItem}>
                                    <span className={styles.calcLabel}>10 Referrals</span>
                                    <span className={styles.calcValue}>$3,000/mo</span>
                                </div>
                                <div className={styles.calcItem}>
                                    <span className={styles.calcLabel}>50 Referrals</span>
                                    <span className={styles.calcValue}>$15,000/mo</span>
                                </div>
                                <div className={styles.calcItem}>
                                    <span className={styles.calcLabel}>100 Referrals</span>
                                    <span className={styles.calcValue}>$30,000/mo</span>
                                </div>
                            </div>
                            <small>*Based on average trader activity</small>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Start Earning Today</h2>
                        <p>Join our partnership program and unlock your earning potential</p>
                        <Link href="/register" className={styles.ctaBtn}>
                            Become a Partner
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
