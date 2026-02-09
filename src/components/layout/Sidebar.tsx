'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const sidebarItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', href: '/dashboard' },
    { id: 'trading', icon: '📈', label: 'Trading', href: '/dashboard/trading' },
    { id: 'accounts', icon: '💼', label: 'Accounts', href: '/dashboard/accounts' },
    { id: 'deposit', icon: '💳', label: 'Deposit', href: '/dashboard/deposit' },
    { id: 'withdraw', icon: '🏦', label: 'Withdraw', href: '/dashboard/withdraw' },
    { id: 'history', icon: '📜', label: 'History', href: '/dashboard/history' },
    { id: 'platforms', icon: '💻', label: 'Platforms', href: '/dashboard/platforms' },
    { id: 'settings', icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {sidebarItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
                        title={item.label}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
