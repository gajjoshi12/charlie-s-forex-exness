'use client';

import Link from 'next/link';
import { useAuth, useAccounts } from '@/context';
import { formatCurrency } from '@/lib/utils';
import styles from './dashboard.module.css';

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
                    Welcome back, {user?.firstName || 'Trader'}! 👋
                </h1>
                <p className={styles.subtitle}>
                    Here's an overview of your trading activity
                </p>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Total Balance</span>
                        <span className={styles.statValue}>{formatCurrency(totalBalance)}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Real Accounts</span>
                        <span className={styles.statValue}>{realAccounts.length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🎮</div>
                    <div className={styles.statContent}>
                        <span className={styles.statLabel}>Demo Accounts</span>
                        <span className={styles.statValue}>{demoAccounts.length}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>⚡</div>
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
                        <span className={styles.actionIcon}>➕</span>
                        <span className={styles.actionLabel}>Open Account</span>
                    </Link>
                    <Link href="/dashboard/deposit" className={styles.actionCard}>
                        <span className={styles.actionIcon}>💳</span>
                        <span className={styles.actionLabel}>Deposit</span>
                    </Link>
                    <Link href="/dashboard/withdraw" className={styles.actionCard}>
                        <span className={styles.actionIcon}>🏦</span>
                        <span className={styles.actionLabel}>Withdraw</span>
                    </Link>
                    <Link href="/dashboard/platforms" className={styles.actionCard}>
                        <span className={styles.actionIcon}>💻</span>
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
                        <span className={styles.emptyIcon}>📂</span>
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
                                        <span className={styles.accountBadge}>
                                            {account.isDemo ? '🎮 Demo' : '💼 Real'}
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
