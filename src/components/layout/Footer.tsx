import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoText}>nNexness</span>
                        </Link>
                        <p className={styles.description}>
                            nNexness is a global multi-asset broker with offices around the world.
                            We provide access to global markets and intuitive trading platforms.
                        </p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Trading</h4>
                            <ul className={styles.linkList}>
                                {FOOTER_LINKS.trading.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Platforms</h4>
                            <ul className={styles.linkList}>
                                {FOOTER_LINKS.platforms.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Company</h4>
                            <ul className={styles.linkList}>
                                {FOOTER_LINKS.company.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.linkGroup}>
                            <h4 className={styles.linkTitle}>Legal</h4>
                            <ul className={styles.linkList}>
                                {FOOTER_LINKS.legal.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.disclaimer}>
                        <p>
                            <strong>Risk Warning:</strong> CFDs are leveraged products. Trading in CFDs carries a high level of risk
                            thus may not be appropriate for all investors. The investment value can both increase and decrease and
                            the investors may lose all their invested capital. Under no circumstances shall the Company have any
                            liability to any person or entity for any loss or damage in whole or part caused by, resulting from,
                            or relating to any transactions related to CFDs.
                        </p>
                    </div>

                    <div className={styles.legal}>
                        <p>© 2024 nNexness Clone. All rights reserved.</p>
                        <div className={styles.legalLinks}>
                            <Link href="/privacy">Privacy Agreement</Link>
                            <Link href="/risk-disclosure">Risk Disclosure</Link>
                            <Link href="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
