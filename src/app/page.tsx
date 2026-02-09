'use client';

import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { AnimatedBackground, FloatingElements } from '@/components/ui';
import { ACCOUNT_TYPES, TRADING_STATS } from '@/lib/constants';
import styles from './page.module.css';

// SVG Icons for features
const BoltIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const features = [
  { icon: <BoltIcon />, title: 'Ultra-fast Execution', text: 'Execute trades in milliseconds with our advanced trading infrastructure', color: '#FFCF00' },
  { icon: <ChartIcon />, title: 'Low Spreads', text: 'Trade with spreads from 0.0 pips on major currency pairs', color: '#22c55e' },
  { icon: <ShieldIcon />, title: 'Secure & Regulated', text: 'Your funds are protected with segregated accounts and top-tier security', color: '#3b82f6' },
  { icon: <TrendingIcon />, title: 'Unlimited Leverage', text: 'Access unlimited leverage on forex pairs to maximize trading potential', color: '#a855f7' },
  { icon: <CreditCardIcon />, title: 'Instant Withdrawals', text: 'Withdraw your funds instantly with multiple payment methods', color: '#ec4899' },
  { icon: <HeadphonesIcon />, title: '24/7 Support', text: 'Get help anytime with our round-the-clock multilingual support team', color: '#14b8a6' },
];

export default function Home() {
  const standardAccounts = ACCOUNT_TYPES.filter(a => a.category === 'standard');
  const proAccounts = ACCOUNT_TYPES.filter(a => a.category === 'professional');

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <AnimatedBackground />
          <FloatingElements />
          <div className={styles.heroGradient} />

          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Trusted by 800,000+ traders worldwide
            </div>
            <h1 className={styles.heroTitle}>
              Trade with the world's leading
              <span className={styles.highlight}> multi-asset broker</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Access global markets with ultra-low spreads, instant execution,
              and the most advanced trading platforms.
            </p>
            <div className={styles.heroCta}>
              <Link href="/register" className={styles.btnPrimary}>
                <span>Open Account</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/login" className={styles.btnOutline}>
                Sign In
              </Link>
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.trustItem}>
                <AwardIcon />
                <p>Best Broker 2024</p>
              </div>
              <div className={styles.trustItem}>
                <LockIcon />
                <p>FCA Regulated</p>
              </div>
              <div className={styles.trustItem}>
                <ZapIcon />
                <p>Instant Execution</p>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.tradingCard}>
              <div className={styles.cardGlow} />
              <div className={styles.cardHeader}>
                <span className={styles.pair}>EUR/USD</span>
                <span className={styles.change}>+0.12%</span>
              </div>
              <div className={styles.cardPrice}>1.0872</div>
              <div className={styles.cardSpread}>
                Spread: <strong>0.0 pips</strong>
              </div>
              <div className={styles.miniChart}>
                <svg viewBox="0 0 100 40" className={styles.chartLine}>
                  <path
                    d="M0 35 Q10 30, 20 32 T40 25 T60 28 T80 15 T100 20"
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#FFCF00" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className={styles.floatingCard} style={{ top: '10%', right: '-20px' }}>
              <span className={styles.floatingIcon}><ArrowUpIcon /></span>
              <div>
                <strong>+$2,450</strong>
                <p>Today's Profit</p>
              </div>
            </div>

            <div className={styles.floatingCard} style={{ bottom: '15%', left: '-30px' }}>
              <span className={styles.floatingIcon}><TrendingIcon /></span>
              <div>
                <strong>143 Trades</strong>
                <p>Executed Today</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsWrapper}>
            <div className={styles.statsGrid}>
              {TRADING_STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Why Choose Us</span>
            <h2 className={styles.sectionTitle}>Why trade with Nexness?</h2>
            <p className={styles.sectionSubtitle}>
              Experience the difference of trading with a globally trusted broker
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, i) => (
              <div key={i} className={styles.featureCard}>
                <div className={styles.featureIconWrapper} style={{ background: `${feature.color}20`, color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Account Types Section */}
        <section className={styles.accountTypes}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Trading Accounts</span>
            <h2 className={styles.sectionTitle}>Choose your account type</h2>
            <p className={styles.sectionSubtitle}>
              Select the trading account that best suits your trading style
            </p>
          </div>

          <div className={styles.accountCategory}>
            <h3 className={styles.categoryTitle}>Standard Accounts</h3>
            <div className={styles.accountGrid}>
              {standardAccounts.map((account) => (
                <div key={account.id} className={styles.accountCard}>
                  <h4 className={styles.accountName}>{account.name}</h4>
                  <p className={styles.accountDesc}>{account.description}</p>
                  <div className={styles.accountDetails}>
                    <div className={styles.detailRow}>
                      <span>Min Deposit</span>
                      <strong>${account.minDeposit}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Spread</span>
                      <strong>{account.spread}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Leverage</span>
                      <strong>{account.leverage}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Commission</span>
                      <strong>{account.commission}</strong>
                    </div>
                  </div>
                  <Link href="/register" className={styles.accountBtn}>
                    Open Account
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.accountCategory}>
            <h3 className={styles.categoryTitle}>Professional Accounts</h3>
            <div className={styles.accountGrid}>
              {proAccounts.map((account) => (
                <div key={account.id} className={`${styles.accountCard} ${styles.proPlan}`}>
                  <div className={styles.proBadge}>PRO</div>
                  <h4 className={styles.accountName}>{account.name}</h4>
                  <p className={styles.accountDesc}>{account.description}</p>
                  <div className={styles.accountDetails}>
                    <div className={styles.detailRow}>
                      <span>Min Deposit</span>
                      <strong>${account.minDeposit.toLocaleString()}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Spread</span>
                      <strong>{account.spread}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Leverage</span>
                      <strong>{account.leverage}</strong>
                    </div>
                    <div className={styles.detailRow}>
                      <span>Commission</span>
                      <strong>{account.commission}</strong>
                    </div>
                  </div>
                  <Link href="/register" className={styles.accountBtn}>
                    Open Account
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to start trading?</h2>
            <p className={styles.ctaText}>
              Join millions of traders worldwide and start your trading journey today
            </p>
            <Link href="/register" className={styles.ctaBtn}>
              Create Free Account
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
