'use client';

import Link from 'next/link';
import { useAuth } from '@/context';
import styles from './Header.module.css';

export default function Header() {
    const { isAuthenticated } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>exness</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/markets" className={styles.navLink}>Markets</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/partnership" className={styles.navLink}>Partnership</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                </nav>

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <Link href="/dashboard" className={styles.btnPrimary}>
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className={styles.btnOutline}>
                                Sign In
                            </Link>
                            <Link href="/register" className={styles.btnPrimary}>
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <button className={styles.mobileMenu} aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
