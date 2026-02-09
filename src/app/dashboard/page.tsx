'use client';

import Link from 'next/link';
import { useAuth, useAccounts } from '@/context';
import { formatCurrency } from '@/lib/utils';
import styles from './dashboard.module.css';

// SVG Icons
const WalletIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
        <path d="M21 12a2 2 0 0 0-2-2h-5a2 2 0 0 0 0 4h5a2 2 0 0 0 2-2z" />
    </svg>
);

const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const TestIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const BoltIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const CreditCardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

const BankIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18" />
        <path d="M5 21V7l8-4v18" />
        <path d="M19 21V11l-6-4" />
        <path d="M9 9v2" />
        <path d="M9 13v2" />
    </svg>
);

const MonitorIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
);

const FolderIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
);

export default function DashboardPage() {
    const { user } = useAuth();
    const { accounts, selectedAccount } = useAccounts();

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const realAccounts = accounts.filter(a => !a.isDemo);
    const demoAccounts = accounts.filter(a => a.isDemo);

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Welcome back, {user?.firstName || 'Trader'}
                </h1>
                <p className={styles.subtitle}>
                    Here's an overview of your trading activity
                </p>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><WalletIcon /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Balance</span>
                        <span className={styles.statValue}>{formatCurrency(totalBalance)}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><ChartIcon /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Real Accounts</span>
                        <span className={styles.statValue}>{realAccounts.length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><TestIcon /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Demo Accounts</span>
                        <span className={styles.statValue}>{demoAccounts.length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}><BoltIcon /></div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Leverage</span>
                        <span className={styles.statValue}>1:Unlimited</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.actions}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.actionsGrid}>
                    <Link href="/dashboard/accounts/new" className={styles.actionCard}>
                        <span className={styles.actionIcon}><PlusIcon /></span>
                        <span className={styles.actionLabel}>Open Account</span>
                    </Link>
                    <Link href="/dashboard/deposit" className={styles.actionCard}>
                        <span className={styles.actionIcon}><CreditCardIcon /></span>
                        <span className={styles.actionLabel}>Deposit</span>
                    </Link>
                    <Link href="/dashboard/withdraw" className={styles.actionCard}>
                        <span className={styles.actionIcon}><BankIcon /></span>
                        <span className={styles.actionLabel}>Withdraw</span>
                    </Link>
                    <Link href="/dashboard/platforms" className={styles.actionCard}>
                        <span className={styles.actionIcon}><MonitorIcon /></span>
                        <span className={styles.actionLabel}>Platforms</span>
                    </Link>
                </div>
            </div>

            {/* Accounts List */}
            <div className={styles.accountsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Your Trading Accounts</h2>
                    <Link href="/dashboard/accounts/new" className={styles.addBtn}>
                        + New Account
                    </Link>
                </div>

                {accounts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <span className={styles.emptyIcon}><FolderIcon /></span>
                        <h3>No trading accounts yet</h3>
                        <p>Create your first trading account to start trading</p>
                        <Link href="/dashboard/accounts/new" className={styles.createBtn}>
                            Open Trading Account
                        </Link>
                    </div>
                ) : (
                    <div className={styles.accountsList}>
                        {accounts.map((account) => (
                            <div
                                key={account.id}
                                className={`${styles.accountCard} ${selectedAccount?.id === account.id ? styles.selected : ''
                                    }`}
                            >
                                <div className={styles.accountHeader}>
                                    <div className={styles.accountType}>
                                        <span className={`${styles.accountBadge} ${account.isDemo ? styles.demoBadge : styles.realBadge}`}>
                                            {account.isDemo ? 'DEMO' : 'REAL'}
                                        </span>
                                        <span className={styles.accountName}>
                                            {account.type.replace('-', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    <span className={styles.platform}>{account.platform.toUpperCase()}</span>
                                </div>
                                <div className={styles.accountBody}>
                                    <div className={styles.accountNumber}>#{account.accountNumber}</div>
                                    <div className={styles.accountBalance}>
                                        {formatCurrency(account.balance, account.currency)}
                                    </div>
                                </div>
                                <div className={styles.accountFooter}>
                                    <span className={styles.server}>{account.server}</span>
                                    <span className={styles.leverage}>{account.leverage}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Market Overview */}
            <div className={styles.marketSection}>
                <h2 className={styles.sectionTitle}>Market Overview</h2>
                <div className={styles.marketGrid}>
                    <div className={styles.marketCard}>
                        <div className={styles.marketPair}>EUR/USD</div>
                        <div className={styles.marketPrice}>1.0872</div>
                        <div className={`${styles.marketChange} ${styles.positive}`}>+0.12%</div>
                    </div>
                    <div className={styles.marketCard}>
                        <div className={styles.marketPair}>GBP/USD</div>
                        <div className={styles.marketPrice}>1.2634</div>
                        <div className={`${styles.marketChange} ${styles.positive}`}>+0.08%</div>
                    </div>
                    <div className={styles.marketCard}>
                        <div className={styles.marketPair}>USD/JPY</div>
                        <div className={styles.marketPrice}>149.45</div>
                        <div className={`${styles.marketChange} ${styles.negative}`}>-0.15%</div>
                    </div>
                    <div className={styles.marketCard}>
                        <div className={styles.marketPair}>XAU/USD</div>
                        <div className={styles.marketPrice}>2024.50</div>
                        <div className={`${styles.marketChange} ${styles.positive}`}>+0.42%</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
