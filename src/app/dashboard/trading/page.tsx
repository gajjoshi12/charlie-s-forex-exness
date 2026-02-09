'use client';

import { useState, useEffect } from 'react';
import { useAccounts } from '@/context';
import styles from './trading.module.css';

const instruments = [
    { symbol: 'EURUSD', name: 'Euro / US Dollar', category: 'forex', price: 1.0856, change: 0.12 },
    { symbol: 'GBPUSD', name: 'British Pound / US Dollar', category: 'forex', price: 1.2648, change: -0.08 },
    { symbol: 'USDJPY', name: 'US Dollar / Japanese Yen', category: 'forex', price: 149.52, change: 0.23 },
    { symbol: 'XAUUSD', name: 'Gold / US Dollar', category: 'metals', price: 2024.50, change: 0.45 },
    { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', category: 'crypto', price: 45678.00, change: 2.15 },
    { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', category: 'crypto', price: 2456.80, change: 1.85 },
    { symbol: 'US500', name: 'S&P 500 Index', category: 'indices', price: 4892.50, change: 0.32 },
    { symbol: 'AAPL', name: 'Apple Inc.', category: 'stocks', price: 189.45, change: -0.54 },
];

const chartData = [
    45, 52, 48, 56, 55, 60, 58, 65, 62, 68, 72, 70, 75, 78, 74, 80, 82, 79, 85, 88
];

export default function TradingPage() {
    const { selectedAccount } = useAccounts();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedInstrument, setSelectedInstrument] = useState(instruments[0]);
    const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
    const [volume, setVolume] = useState('0.01');
    const [isAnimating, setIsAnimating] = useState(false);

    // Simulate price changes
    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 300);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const categories = ['all', 'forex', 'metals', 'crypto', 'indices', 'stocks'];

    const filteredInstruments = instruments.filter(i =>
        activeCategory === 'all' ? true : i.category === activeCategory
    );

    const spread = 0.0001;
    const buyPrice = selectedInstrument.price + spread;
    const sellPrice = selectedInstrument.price - spread;

    const handleTrade = () => {
        alert(`${orderType.toUpperCase()} order placed!\n\nInstrument: ${selectedInstrument.symbol}\nVolume: ${volume} lots\nPrice: ${orderType === 'buy' ? buyPrice.toFixed(5) : sellPrice.toFixed(5)}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Trading Terminal</h1>
                    <p className={styles.subtitle}>
                        Account: #{selectedAccount?.accountNumber || 'Select an account'} •
                        Balance: ${selectedAccount?.balance.toLocaleString() || '0.00'}
                    </p>
                </div>
            </div>

            <div className={styles.layout}>
                {/* Left - Instrument List */}
                <div className={styles.instrumentsPanel}>
                    <div className={styles.categoryTabs}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className={styles.instrumentList}>
                        {filteredInstruments.map(instrument => (
                            <div
                                key={instrument.symbol}
                                className={`${styles.instrumentItem} ${selectedInstrument.symbol === instrument.symbol ? styles.selected : ''}`}
                                onClick={() => setSelectedInstrument(instrument)}
                            >
                                <div className={styles.instrumentInfo}>
                                    <span className={styles.symbol}>{instrument.symbol}</span>
                                    <span className={styles.instrumentName}>{instrument.name}</span>
                                </div>
                                <div className={styles.instrumentPrice}>
                                    <span className={`${styles.price} ${isAnimating ? styles.flash : ''}`}>
                                        {instrument.price.toFixed(instrument.category === 'forex' ? 5 : 2)}
                                    </span>
                                    <span className={`${styles.change} ${instrument.change >= 0 ? styles.positive : styles.negative}`}>
                                        {instrument.change >= 0 ? '+' : ''}{instrument.change.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Center - Chart */}
                <div className={styles.chartPanel}>
                    <div className={styles.chartHeader}>
                        <div className={styles.chartTitle}>
                            <span className={styles.chartSymbol}>{selectedInstrument.symbol}</span>
                            <span className={styles.chartName}>{selectedInstrument.name}</span>
                        </div>
                        <div className={styles.timeframes}>
                            {['1M', '5M', '15M', '1H', '4H', '1D'].map(tf => (
                                <button key={tf} className={styles.tfBtn}>{tf}</button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.chart}>
                        <svg className={styles.chartSvg} viewBox="0 0 400 200">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(255, 207, 0, 0.3)" />
                                    <stop offset="100%" stopColor="rgba(255, 207, 0, 0)" />
                                </linearGradient>
                            </defs>
                            <path
                                d={`M 0 ${200 - chartData[0] * 2} ${chartData.map((d, i) => `L ${i * 21} ${200 - d * 2}`).join(' ')} L 399 200 L 0 200 Z`}
                                fill="url(#chartGradient)"
                            />
                            <path
                                d={`M 0 ${200 - chartData[0] * 2} ${chartData.map((d, i) => `L ${i * 21} ${200 - d * 2}`).join(' ')}`}
                                fill="none"
                                stroke="var(--primary-yellow)"
                                strokeWidth="2"
                            />
                        </svg>
                        <div className={styles.chartOverlay}>
                            <span className={styles.currentPrice}>
                                {selectedInstrument.price.toFixed(selectedInstrument.category === 'forex' ? 5 : 2)}
                            </span>
                        </div>
                    </div>

                    <div className={styles.priceBar}>
                        <div className={styles.priceItem}>
                            <span className={styles.priceLabel}>Open</span>
                            <span>{(selectedInstrument.price * 0.998).toFixed(4)}</span>
                        </div>
                        <div className={styles.priceItem}>
                            <span className={styles.priceLabel}>High</span>
                            <span>{(selectedInstrument.price * 1.002).toFixed(4)}</span>
                        </div>
                        <div className={styles.priceItem}>
                            <span className={styles.priceLabel}>Low</span>
                            <span>{(selectedInstrument.price * 0.996).toFixed(4)}</span>
                        </div>
                        <div className={styles.priceItem}>
                            <span className={styles.priceLabel}>Spread</span>
                            <span>{(spread * 10000).toFixed(1)} pips</span>
                        </div>
                    </div>
                </div>

                {/* Right - Order Panel */}
                <div className={styles.orderPanel}>
                    <h3 className={styles.orderTitle}>New Order</h3>

                    <div className={styles.orderTabs}>
                        <button
                            className={`${styles.orderTab} ${styles.buyTab} ${orderType === 'buy' ? styles.active : ''}`}
                            onClick={() => setOrderType('buy')}
                        >
                            BUY
                        </button>
                        <button
                            className={`${styles.orderTab} ${styles.sellTab} ${orderType === 'sell' ? styles.active : ''}`}
                            onClick={() => setOrderType('sell')}
                        >
                            SELL
                        </button>
                    </div>

                    <div className={styles.priceDisplay}>
                        <div className={styles.bidAsk}>
                            <div className={styles.bid}>
                                <span className={styles.bidAskLabel}>Sell</span>
                                <span className={styles.bidAskPrice}>{sellPrice.toFixed(5)}</span>
                            </div>
                            <div className={styles.spreadDisplay}>
                                <span>{(spread * 10000).toFixed(1)}</span>
                            </div>
                            <div className={styles.ask}>
                                <span className={styles.bidAskLabel}>Buy</span>
                                <span className={styles.bidAskPrice}>{buyPrice.toFixed(5)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.orderField}>
                        <label>Volume (Lots)</label>
                        <div className={styles.volumeInput}>
                            <button onClick={() => setVolume(Math.max(0.01, parseFloat(volume) - 0.01).toFixed(2))}>−</button>
                            <input
                                type="text"
                                value={volume}
                                onChange={(e) => setVolume(e.target.value)}
                            />
                            <button onClick={() => setVolume((parseFloat(volume) + 0.01).toFixed(2))}>+</button>
                        </div>
                        <div className={styles.volumePresets}>
                            {['0.01', '0.1', '0.5', '1.0'].map(v => (
                                <button key={v} onClick={() => setVolume(v)}>{v}</button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.orderSummary}>
                        <div className={styles.summaryRow}>
                            <span>Margin Required</span>
                            <span>${(parseFloat(volume) * 1000).toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Pip Value</span>
                            <span>${(parseFloat(volume) * 10).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className={`${styles.executeBtn} ${orderType === 'buy' ? styles.buyBtn : styles.sellBtn}`}
                        onClick={handleTrade}
                        disabled={!selectedAccount}
                    >
                        {orderType === 'buy' ? 'BUY' : 'SELL'} {selectedInstrument.symbol}
                    </button>

                    {!selectedAccount && (
                        <p className={styles.warning}>Please select or create an account first</p>
                    )}
                </div>
            </div>
        </div>
    );
}
