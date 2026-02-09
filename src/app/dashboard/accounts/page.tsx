'use client';

import Link from 'next/link';
import { useAccounts } from '@/context';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ACCOUNT_TYPES } from '@/lib/constants';
import styles from './accounts.module.css';

export default function AccountsPage() {
    const { accounts, selectedAccount, selectAccount } = useAccounts();

    const realAccounts = accounts.filter(a => !a.isDemo);
    const demoAccounts = accounts.filter(a => a.isDemo);

    const getAccountInfo = (type: string) => {
        return ACCOUNT_TYPES.find(a => a.id === type);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>My Accounts</h1>
                    <p className={styles.subtitle}>Manage all your trading accounts</p>
                </div>
                <Link href="/dashboard/accounts/new" className={styles.newBtn}>
                    + Open New Account
                </Link>
            </div>

            {accounts.length === 0 ? (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>💼</div>
                    <h2>No Trading Accounts</h2>
                    <p>Create your first trading account to start trading on global markets</p>
                    <Link href="/dashboard/accounts/new" className={styles.createBtn}>
                        Open Trading Account
                    </Link>
                </div>
            ) : (
                <>
                    {/* Real Accounts */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Real Accounts</h2>
                            <span className={styles.count}>{realAccounts.length} account(s)</span>
                        </div>

                        {realAccounts.length === 0 ? (
                            <div className={styles.noAccounts}>
                                <p>No real accounts yet. <Link href="/dashboard/accounts/new">Create one</Link></p>
                            </div>
                        ) : (
                            <div className={styles.accountsGrid}>
                                {realAccounts.map((account) => {
                                    const info = getAccountInfo(account.type);
                                    return (
                                        <div
                                            key={account.id}
                                            className={`${styles.accountCard} ${selectedAccount?.id === account.id ? styles.selected : ''}`}
                                            onClick={() => selectAccount(account.id)}
                                        >
                                            <div className={styles.cardTop}>
                                                <div className={styles.accountType}>
                                                    <span className={styles.typeIcon}>{info?.icon || '💼'}</span>
                                                    <div>
                                                        <span className={styles.typeName}>{info?.name}</span>
                                                        <span className={styles.platform}>{account.platform.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                {selectedAccount?.id === account.id && (
                                                    <span className={styles.activeBadge}>Active</span>
                                                )}
                                            </div>

                                            <div className={styles.cardBalance}>
                                                <span className={styles.balanceLabel}>Balance</span>
                                                <span className={styles.balanceValue}>
                                                    {formatCurrency(account.balance, account.currency)}
                                                </span>
                                            </div>

                                            <div className={styles.cardDetails}>
                                                <div className={styles.detail}>
                                                    <span>Account</span>
                                                    <strong>#{account.accountNumber}</strong>
                                                </div>
                                                <div className={styles.detail}>
                                                    <span>Server</span>
                                                    <strong>{account.server}</strong>
                                                </div>
                                                <div className={styles.detail}>
                                                    <span>Leverage</span>
                                                    <strong>{account.leverage}</strong>
                                                </div>
                                                <div className={styles.detail}>
                                                    <span>Created</span>
                                                    <strong>{formatDate(account.createdAt)}</strong>
                                                </div>
                                            </div>

                                            <div className={styles.cardActions}>
                                                <Link href="/dashboard/deposit" className={styles.depositBtn}>
                                                    Deposit
                                                </Link>
                                                <Link href="/dashboard/withdraw" className={styles.withdrawBtn}>
                                                    Withdraw
                                                </Link>
                                                <button className={styles.tradeBtn}>Trade</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Demo Accounts */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Demo Accounts</h2>
                            <span className={styles.count}>{demoAccounts.length} account(s)</span>
                        </div>

                        {demoAccounts.length === 0 ? (
                            <div className={styles.noAccounts}>
                                <p>No demo accounts. <Link href="/dashboard/accounts/new">Create one</Link> to practice</p>
                            </div>
                        ) : (
                            <div className={styles.accountsGrid}>
                                {demoAccounts.map((account) => {
                                    const info = getAccountInfo(account.type);
                                    return (
                                        <div
                                            key={account.id}
                                            className={`${styles.accountCard} ${styles.demoCard} ${selectedAccount?.id === account.id ? styles.selected : ''}`}
                                            onClick={() => selectAccount(account.id)}
                                        >
                                            <div className={styles.demoBadge}>🎮 Demo</div>
                                            <div className={styles.cardTop}>
                                                <div className={styles.accountType}>
                                                    <span className={styles.typeIcon}>{info?.icon || '🎮'}</span>
                                                    <div>
                                                        <span className={styles.typeName}>{info?.name}</span>
                                                        <span className={styles.platform}>{account.platform.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.cardBalance}>
                                                <span className={styles.balanceLabel}>Virtual Balance</span>
                                                <span className={styles.balanceValue}>
                                                    {formatCurrency(account.balance, account.currency)}
                                                </span>
                                            </div>

                                            <div className={styles.cardDetails}>
                                                <div className={styles.detail}>
                                                    <span>Account</span>
                                                    <strong>#{account.accountNumber}</strong>
                                                </div>
                                                <div className={styles.detail}>
                                                    <span>Server</span>
                                                    <strong>{account.server}</strong>
                                                </div>
                                            </div>

                                            <div className={styles.cardActions}>
                                                <button className={styles.tradeBtn} style={{ flex: 1 }}>Practice Trading</button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}
