'use client';

import Link from 'next/link';
import { useAuth, useAccounts } from '@/context';
import { formatCurrency } from '@/lib/utils';
import styles from './DashboardHeader.module.css';

export default function DashboardHeader() {
    const { user, logout } = useAuth();
    const { selectedAccount, accounts } = useAccounts();

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>nNexness</span>
                </Link>

                <div className={styles.banner}>
                    <span className={styles.bannerIcon}>👋</span>
                    <span className={styles.bannerText}>
                        Hello. Fill in your account details to make your first deposit
                    </span>
                    <Link href="/dashboard/settings" className={styles.bannerLink}>
                        Learn more
                    </Link>
                    <Link href="/dashboard/settings" className={styles.bannerBtn}>
                        Complete profile
                    </Link>
                </div>

                <div className={styles.actions}>
                    <div className={styles.balance}>
                        <span className={styles.balanceIcon}>💰</span>
                        <span className={styles.balanceAmount}>{formatCurrency(totalBalance)}</span>
                    </div>

                    <button className={styles.iconBtn} title="Language">
                        🌐
                    </button>

                    <button className={styles.iconBtn} title="Help">
                        ❓
                    </button>

                    <button className={styles.iconBtn} title="Notifications">
                        🔔
                    </button>

                    <div className={styles.profile}>
                        <button className={styles.profileBtn} onClick={logout} title={user?.email}>
                            <span className={styles.avatar}>
                                {user?.firstName?.charAt(0) || 'U'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
