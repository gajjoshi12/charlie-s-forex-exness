'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context';
import styles from './Header.module.css';

export default function Header() {
    const { isAuthenticated } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMenu = () => setMobileMenuOpen(false);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>nNexness</span>
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

                    <button
                        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}
                        aria-label="Menu"
                        onClick={toggleMenu}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`${styles.mobileOverlay} ${mobileMenuOpen ? styles.show : ''}`}
                onClick={closeMenu}
            />

            {/* Mobile Menu Drawer */}
            <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.open : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link href="/markets" className={styles.mobileNavLink} onClick={closeMenu}>
                        Markets
                    </Link>
                    <Link href="/about" className={styles.mobileNavLink} onClick={closeMenu}>
                        About
                    </Link>
                    <Link href="/partnership" className={styles.mobileNavLink} onClick={closeMenu}>
                        Partnership
                    </Link>
                    <Link href="/contact" className={styles.mobileNavLink} onClick={closeMenu}>
                        Contact
                    </Link>
                </nav>

                <div className={styles.mobileActions}>
                    {isAuthenticated ? (
                        <Link href="/dashboard" className={styles.mobileBtnPrimary} onClick={closeMenu}>
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className={styles.mobileBtnOutline} onClick={closeMenu}>
                                Sign In
                            </Link>
                            <Link href="/register" className={styles.mobileBtnPrimary} onClick={closeMenu}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
