import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import { ACCOUNT_TYPES, TRADING_STATS } from '@/lib/constants';
import styles from './page.module.css';

export default function Home() {
  const standardAccounts = ACCOUNT_TYPES.filter(a => a.category === 'standard');
  const proAccounts = ACCOUNT_TYPES.filter(a => a.category === 'professional');

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
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
                Open Account
              </Link>
              <Link href="/login" className={styles.btnOutline}>
                Sign In
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.tradingCard}>
              <div className={styles.cardHeader}>
                <span className={styles.pair}>EUR/USD</span>
                <span className={styles.change}>+0.12%</span>
              </div>
              <div className={styles.cardPrice}>1.0872</div>
              <div className={styles.cardSpread}>
                Spread: <strong>0.0 pips</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            {TRADING_STATS.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why trade with Exness?</h2>
            <p className={styles.sectionSubtitle}>
              Experience the difference of trading with a globally trusted broker
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Ultra-fast Execution</h3>
              <p className={styles.featureText}>
                Execute trades in milliseconds with our advanced trading infrastructure
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>Low Spreads</h3>
              <p className={styles.featureText}>
                Trade with spreads from 0.0 pips on major currency pairs
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔐</div>
              <h3 className={styles.featureTitle}>Secure & Regulated</h3>
              <p className={styles.featureText}>
                Your funds are protected with segregated accounts and top-tier security
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💱</div>
              <h3 className={styles.featureTitle}>Unlimited Leverage</h3>
              <p className={styles.featureText}>
                Access unlimited leverage on forex pairs to maximize your trading potential
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💳</div>
              <h3 className={styles.featureTitle}>Instant Withdrawals</h3>
              <p className={styles.featureText}>
                Withdraw your funds instantly with multiple payment methods
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌐</div>
              <h3 className={styles.featureTitle}>24/7 Support</h3>
              <p className={styles.featureText}>
                Get help anytime with our round-the-clock multilingual support team
              </p>
            </div>
          </div>
        </section>

        {/* Account Types Section */}
        <section className={styles.accountTypes}>
          <div className={styles.sectionHeader}>
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
                  <div className={styles.accountIcon}>{account.icon}</div>
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
                  <div className={styles.accountIcon}>{account.icon}</div>
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
          <h2 className={styles.ctaTitle}>Ready to start trading?</h2>
          <p className={styles.ctaText}>
            Join millions of traders worldwide and start your trading journey today
          </p>
          <Link href="/register" className={styles.ctaBtn}>
            Create Free Account
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
