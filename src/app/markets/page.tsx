'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, Footer } from '@/components/layout';
import styles from './markets.module.css';

const marketCategories = [
    { id: 'forex', name: 'Forex', icon: '💱', description: 'Trade 100+ currency pairs with tight spreads' },
    { id: 'metals', name: 'Metals', icon: '🥇', description: 'Gold, Silver, Platinum, and more' },
    { id: 'crypto', name: 'Crypto', icon: '₿', description: 'Bitcoin, Ethereum, and top altcoins' },
    { id: 'indices', name: 'Indices', icon: '📊', description: 'Major global stock indices' },
    { id: 'stocks', name: 'Stocks', icon: '📈', description: 'Trade shares of leading companies' },
    { id: 'energies', name: 'Energies', icon: '⛽', description: 'Oil, Natural Gas, and more' },
];

const instruments = {
    forex: [
        { symbol: 'EURUSD', name: 'Euro / US Dollar', spread: '0.1', change: 0.12 },
        { symbol: 'GBPUSD', name: 'British Pound / US Dollar', spread: '0.2', change: -0.08 },
        { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', spread: '0.1', change: 0.23 },
        { symbol: 'AUDUSD', name: 'Australian Dollar / US Dollar', spread: '0.2', change: 0.15 },
        { symbol: 'USDCAD', name: 'US Dollar / Canadian Dollar', spread: '0.3', change: -0.05 },
        { symbol: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', spread: '0.3', change: 0.18 },
        { symbol: 'USDCHF', name: 'US Dollar / Swiss Franc', spread: '0.2', change: -0.11 },
        { symbol: 'EURGBP', name: 'Euro / British Pound', spread: '0.2', change: 0.09 },
    ],
    metals: [
        { symbol: 'XAUUSD', name: 'Gold / US Dollar', spread: '1.5', change: 0.45 },
        { symbol: 'XAGUSD', name: 'Silver / US Dollar', spread: '2.0', change: 0.78 },
        { symbol: 'XPTUSD', name: 'Platinum / US Dollar', spread: '3.0', change: -0.32 },
        { symbol: 'XPDUSD', name: 'Palladium / US Dollar', spread: '5.0', change: 1.24 },
    ],
    crypto: [
        { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', spread: '15.0', change: 2.15 },
        { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', spread: '2.0', change: 1.85 },
        { symbol: 'LTCUSD', name: 'Litecoin / US Dollar', spread: '0.5', change: 3.21 },
        { symbol: 'XRPUSD', name: 'Ripple / US Dollar', spread: '0.01', change: -1.45 },
    ],
    indices: [
        { symbol: 'US500', name: 'S&P 500 Index', spread: '0.4', change: 0.32 },
        { symbol: 'US30', name: 'Dow Jones 30', spread: '1.0', change: 0.28 },
        { symbol: 'USTEC', name: 'Nasdaq 100', spread: '1.0', change: 0.67 },
        { symbol: 'UK100', name: 'FTSE 100', spread: '1.0', change: -0.15 },
        { symbol: 'DE40', name: 'DAX 40', spread: '1.0', change: 0.42 },
    ],
    stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', spread: '0.02', change: -0.54 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', spread: '0.50', change: 1.23 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', spread: '0.03', change: 0.89 },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', spread: '0.10', change: 0.45 },
        { symbol: 'TSLA', name: 'Tesla Inc.', spread: '0.10', change: 2.34 },
    ],
    energies: [
        { symbol: 'USOIL', name: 'US Crude Oil', spread: '0.03', change: 1.12 },
        { symbol: 'UKOIL', name: 'UK Brent Oil', spread: '0.03', change: 0.98 },
        { symbol: 'NGAS', name: 'Natural Gas', spread: '0.01', change: -2.15 },
    ],
};

export default function MarketsPage() {
    const [activeCategory, setActiveCategory] = useState('forex');

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero */}
                <section className={styles.hero}>
                    <h1>Trade Global Markets</h1>
                    <p>Access 200+ instruments across Forex, Metals, Crypto, Indices, and more</p>
                    <div className={styles.heroStats}>
                        <div className={styles.heroStat}>
                            <span>200+</span>
                            <p>Instruments</p>
                        </div>
                        <div className={styles.heroStat}>
                            <span>0.0</span>
                            <p>Spreads From</p>
                        </div>
                        <div className={styles.heroStat}>
                            <span>1:Unlimited</span>
                            <p>Leverage</p>
                        </div>
                    </div>
                </section>

                {/* Markets Grid */}
                <section className={styles.markets}>
                    <div className={styles.container}>
                        <h2>Explore Our Markets</h2>
                        <div className={styles.categoryGrid}>
                            {marketCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`${styles.categoryCard} ${activeCategory === cat.id ? styles.active : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <span className={styles.categoryIcon}>{cat.icon}</span>
                                    <h3>{cat.name}</h3>
                                    <p>{cat.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Instruments Table */}
                <section className={styles.instruments}>
                    <div className={styles.container}>
                        <div className={styles.tableHeader}>
                            <h2>{marketCategories.find(c => c.id === activeCategory)?.name} Instruments</h2>
                            <Link href="/register" className={styles.tradeBtn}>
                                Start Trading
                            </Link>
                        </div>
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Symbol</th>
                                        <th>Description</th>
                                        <th>Min Spread</th>
                                        <th>Change (24h)</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {instruments[activeCategory as keyof typeof instruments].map((inst, idx) => (
                                        <tr key={idx}>
                                            <td className={styles.symbolCell}>
                                                <strong>{inst.symbol}</strong>
                                            </td>
                                            <td>{inst.name}</td>
                                            <td>{inst.spread} pips</td>
                                            <td>
                                                <span className={inst.change >= 0 ? styles.positive : styles.negative}>
                                                    {inst.change >= 0 ? '+' : ''}{inst.change}%
                                                </span>
                                            </td>
                                            <td>
                                                <Link href="/register" className={styles.tradeBtnSm}>
                                                    Trade
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className={styles.features}>
                    <div className={styles.container}>
                        <h2>Why Trade With Us?</h2>
                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <span>⚡</span>
                                <h3>Ultra-Fast Execution</h3>
                                <p>Orders executed in milliseconds with no requotes</p>
                            </div>
                            <div className={styles.featureCard}>
                                <span>💰</span>
                                <h3>Tight Spreads</h3>
                                <p>Spreads starting from 0.0 pips on major pairs</p>
                            </div>
                            <div className={styles.featureCard}>
                                <span>📊</span>
                                <h3>Advanced Charts</h3>
                                <p>Professional charting with 80+ indicators</p>
                            </div>
                            <div className={styles.featureCard}>
                                <span>🔒</span>
                                <h3>Negative Balance Protection</h3>
                                <p>Never lose more than your deposit</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <div className={styles.container}>
                        <h2>Ready to Trade?</h2>
                        <p>Open an account in minutes and start trading today</p>
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
