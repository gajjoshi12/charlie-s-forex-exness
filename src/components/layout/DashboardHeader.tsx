'use client';

import Link from 'next/link';
import { useAuth, useAccounts } from '@/context';
import { formatCurrency } from '@/lib/utils';
import styles from './DashboardHeader.module.css';

// SVG Icons
const WalletIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14" />
        <path d="M21 12a2 2 0 0 0-2-2h-5a2 2 0 0 0 0 4h5a2 2 0 0 0 2-2z" />
    </svg>
);

const GlobeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
);

const HelpIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
);

const BellIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const InfoIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
);

export default function DashboardHeader() {
    const { user, logout } = useAuth();
    const { selectedAccount, accounts } = useAccounts();

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>nexness</span>
                </Link>

                <div className={styles.banner}>
                    <span className={styles.bannerIcon}><InfoIcon /></span>
                    <span className={styles.bannerText}>
                        Complete your profile to make your first deposit
                    </span>
                    <Link href="/dashboard/settings" className={styles.bannerBtn}>
                        Complete profile
                    </Link>
                </div>

                <div className={styles.actions}>
                    <div className={styles.balance}>
                        <span className={styles.balanceIcon}><WalletIcon /></span>
                        <span className={styles.balanceAmount}>{formatCurrency(totalBalance)}</span>
                    </div>

                    <button className={styles.iconBtn} title="Language">
                        <GlobeIcon />
                    </button>

                    <button className={styles.iconBtn} title="Help">
                        <HelpIcon />
                    </button>

                    <button className={styles.iconBtn} title="Notifications">
                        <BellIcon />
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
