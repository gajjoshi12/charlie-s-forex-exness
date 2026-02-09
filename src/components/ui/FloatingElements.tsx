'use client';

import styles from './FloatingElements.module.css';

const forexSymbols = ['$', '€', '£', '¥', '₿', '📈', '📊', '💹'];
const currencies = ['USD', 'EUR', 'GBP', 'BTC', 'JPY'];

export default function FloatingElements() {
    return (
        <div className={styles.container}>
            {/* Floating currency symbols */}
            {forexSymbols.map((symbol, i) => (
                <div
                    key={i}
                    className={styles.floatingSymbol}
                    style={{
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${15 + i * 2}s`,
                    }}
                >
                    {symbol}
                </div>
            ))}

            {/* Glowing orbs */}
            <div className={styles.orb} style={{ top: '20%', left: '10%' }} />
            <div className={styles.orb} style={{ top: '60%', right: '15%' }} />
            <div className={styles.orb} style={{ bottom: '30%', left: '20%' }} />

            {/* Grid lines */}
            <div className={styles.gridOverlay} />

            {/* Animated globe wireframe */}
            <div className={styles.globeContainer}>
                <div className={styles.globe}>
                    <div className={styles.globeInner}>
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className={styles.globeLine}
                                style={{ transform: `rotateY(${i * 22.5}deg)` }}
                            />
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`h-${i}`}
                                className={styles.globeLineH}
                                style={{ top: `${20 + i * 15}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating price tickers */}
            <div className={styles.tickerFloat} style={{ top: '25%', right: '8%' }}>
                <span className={styles.tickerPair}>BTC/USD</span>
                <span className={styles.tickerPrice}>45,678.00</span>
                <span className={styles.tickerUp}>+2.34%</span>
            </div>
            <div className={styles.tickerFloat} style={{ top: '45%', left: '5%' }}>
                <span className={styles.tickerPair}>XAU/USD</span>
                <span className={styles.tickerPrice}>2,024.50</span>
                <span className={styles.tickerUp}>+0.45%</span>
            </div>
            <div className={styles.tickerFloat} style={{ bottom: '35%', right: '12%' }}>
                <span className={styles.tickerPair}>GBP/JPY</span>
                <span className={styles.tickerPrice}>188.92</span>
                <span className={styles.tickerDown}>-0.18%</span>
            </div>
        </div>
    );
}
