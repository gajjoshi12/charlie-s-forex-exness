'use client';

import Link from 'next/link';
import styles from './platforms.module.css';

const platforms = [
    {
        id: 'mt5',
        name: 'MetaTrader 5',
        description: 'The next generation of trading platforms with advanced features',
        features: [
            'Multi-asset trading',
            'Advanced charting',
            '80+ technical indicators',
            'Economic calendar',
            'Automated trading (Expert Advisors)',
        ],
        downloads: [
            { os: 'Windows', icon: '🪟', url: '#' },
            { os: 'macOS', icon: '🍎', url: '#' },
            { os: 'Android', icon: '🤖', url: '#' },
            { os: 'iOS', icon: '📱', url: '#' },
        ],
    },
    {
        id: 'mt4',
        name: 'MetaTrader 4',
        description: 'The classic trading platform trusted by millions of traders',
        features: [
            'Forex and CFD trading',
            'User-friendly interface',
            '30+ technical indicators',
            'Real-time quotes',
            'Expert Advisors support',
        ],
        downloads: [
            { os: 'Windows', icon: '🪟', url: '#' },
            { os: 'macOS', icon: '🍎', url: '#' },
            { os: 'Android', icon: '🤖', url: '#' },
            { os: 'iOS', icon: '📱', url: '#' },
        ],
    },
    {
        id: 'web',
        name: 'Web Terminal',
        description: 'Trade directly from your browser without any downloads',
        features: [
            'No installation required',
            'Cross-platform compatibility',
            'Real-time trading',
            'Secure connection',
            'Full trading functionality',
        ],
        downloads: [
            { os: 'Open Web Terminal', icon: '🌐', url: '#' },
        ],
    },
];

export default function PlatformsPage() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Trading Platforms</h1>
                <p className={styles.subtitle}>
                    Download and access our powerful trading platforms
                </p>
            </div>

            <div className={styles.platformsGrid}>
                {platforms.map((platform) => (
                    <div key={platform.id} className={styles.platformCard}>
                        <div className={styles.platformHeader}>
                            <h2 className={styles.platformName}>{platform.name}</h2>
                            <p className={styles.platformDesc}>{platform.description}</p>
                        </div>

                        <div className={styles.features}>
                            <h3 className={styles.featuresTitle}>Key Features</h3>
                            <ul className={styles.featuresList}>
                                {platform.features.map((feature, idx) => (
                                    <li key={idx}>✓ {feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.downloads}>
                            <h3 className={styles.downloadsTitle}>Download</h3>
                            <div className={styles.downloadBtns}>
                                {platform.downloads.map((dl) => (
                                    <Link
                                        key={dl.os}
                                        href={dl.url}
                                        className={styles.downloadBtn}
                                    >
                                        <span>{dl.icon}</span>
                                        <span>{dl.os}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.helpSection}>
                <h2>Need help getting started?</h2>
                <p>Our support team is available 24/7 to help you set up your trading platform</p>
                <Link href="/contact" className={styles.contactBtn}>
                    Contact Support
                </Link>
            </div>
        </div>
    );
}
