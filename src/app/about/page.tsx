import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import styles from './about.module.css';

const stats = [
    { value: '800K+', label: 'Active Traders' },
    { value: '$4.8T', label: 'Monthly Volume' },
    { value: '180+', label: 'Countries' },
    { value: '13+', label: 'Years Experience' },
];

const values = [
    {
        icon: '🎯',
        title: 'Transparency',
        description: 'We believe in clear, honest communication. What you see is what you get – no hidden fees, no surprises.'
    },
    {
        icon: '🔒',
        title: 'Security',
        description: 'Your funds are protected with industry-leading security measures and strict regulatory compliance.'
    },
    {
        icon: '⚡',
        title: 'Speed',
        description: 'Lightning-fast execution and instant withdrawals. Your time matters, and we respect it.'
    },
    {
        icon: '🌍',
        title: 'Accessibility',
        description: 'Trading should be accessible to everyone. Low barriers, multiple languages, global reach.'
    },
];

const milestones = [
    { year: '2008', event: 'Company Founded', description: 'Started with a vision to make trading accessible' },
    { year: '2012', event: 'Global Expansion', description: 'Opened offices in 10+ countries' },
    { year: '2016', event: '1M Users', description: 'Reached 1 million registered users' },
    { year: '2020', event: 'Technology Leader', description: 'Launched next-gen trading platform' },
    { year: '2024', event: 'Industry Pioneer', description: 'Continuing to innovate and lead' },
];

const team = [
    { name: 'Michael Chen', role: 'Chief Executive Officer', image: '👨‍💼' },
    { name: 'Sarah Williams', role: 'Chief Technology Officer', image: '👩‍💻' },
    { name: 'David Kumar', role: 'Chief Financial Officer', image: '👨‍💼' },
    { name: 'Elena Rodriguez', role: 'Head of Trading', image: '👩‍💼' },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>About Exness</h1>
                        <p>
                            We're on a mission to make professional trading accessible to everyone,
                            everywhere. Since 2008, we've been building the most reliable and
                            transparent trading environment.
                        </p>
                    </div>
                    <div className={styles.heroStats}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className={styles.stat}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission Section */}
                <section className={styles.mission}>
                    <div className={styles.container}>
                        <div className={styles.missionContent}>
                            <h2>Our Mission</h2>
                            <p>
                                To empower traders with state-of-the-art technology, transparent
                                pricing, and the best possible trading conditions. We believe that
                                everyone deserves access to global financial markets.
                            </p>
                        </div>
                        <div className={styles.missionVideo}>
                            <div className={styles.videoPlaceholder}>
                                <span>▶</span>
                                <p>Watch Our Story</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className={styles.values}>
                    <div className={styles.container}>
                        <h2>Our Values</h2>
                        <div className={styles.valuesGrid}>
                            {values.map((value, idx) => (
                                <div key={idx} className={styles.valueCard}>
                                    <span className={styles.valueIcon}>{value.icon}</span>
                                    <h3>{value.title}</h3>
                                    <p>{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline Section */}
                <section className={styles.timeline}>
                    <div className={styles.container}>
                        <h2>Our Journey</h2>
                        <div className={styles.timelineTrack}>
                            {milestones.map((milestone, idx) => (
                                <div key={idx} className={styles.milestone}>
                                    <div className={styles.milestoneYear}>{milestone.year}</div>
                                    <div className={styles.milestoneDot} />
                                    <div className={styles.milestoneContent}>
                                        <h4>{milestone.event}</h4>
                                        <p>{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership Section */}
                <section className={styles.leadership}>
                    <div className={styles.container}>
                        <h2>Leadership Team</h2>
                        <div className={styles.teamGrid}>
                            {team.map((member, idx) => (
                                <div key={idx} className={styles.teamCard}>
                                    <div className={styles.teamImage}>{member.image}</div>
                                    <h4>{member.name}</h4>
                                    <p>{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Regulation Section */}
                <section className={styles.regulation}>
                    <div className={styles.container}>
                        <h2>Regulated & Trusted</h2>
                        <p>
                            We operate under strict regulatory oversight to ensure the highest
                            standards of security and transparency.
                        </p>
                        <div className={styles.licenses}>
                            <div className={styles.license}>
                                <span>🇬🇧</span>
                                <strong>FCA</strong>
                                <p>UK Financial Conduct Authority</p>
                            </div>
                            <div className={styles.license}>
                                <span>🇨🇾</span>
                                <strong>CySEC</strong>
                                <p>Cyprus Securities Commission</p>
                            </div>
                            <div className={styles.license}>
                                <span>🇦🇺</span>
                                <strong>ASIC</strong>
                                <p>Australian Securities Commission</p>
                            </div>
                            <div className={styles.license}>
                                <span>🌍</span>
                                <strong>FSA</strong>
                                <p>Seychelles Financial Authority</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Join 800,000+ Traders Worldwide</h2>
                        <p>Start your trading journey with us today</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/register" className={styles.primaryBtn}>
                                Open Account
                            </Link>
                            <Link href="/contact" className={styles.secondaryBtn}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
