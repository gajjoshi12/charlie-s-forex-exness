'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccounts } from '@/context';
import { ACCOUNT_TYPES, PLATFORMS, CURRENCIES } from '@/lib/constants';
import { AccountType, Platform, Currency } from '@/types';
import styles from './new.module.css';

export default function NewAccountPage() {
    const router = useRouter();
    const { createAccount, isLoading } = useAccounts();

    const [selectedType, setSelectedType] = useState<AccountType | null>(null);
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('mt5');
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');
    const [isDemo, setIsDemo] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);

    const standardAccounts = ACCOUNT_TYPES.filter(a => a.category === 'standard');
    const proAccounts = ACCOUNT_TYPES.filter(a => a.category === 'professional');

    const handleContinue = () => {
        if (selectedType) {
            setStep(2);
        }
    };

    const handleCreate = async () => {
        if (!selectedType) return;

        await createAccount(selectedType, selectedPlatform, selectedCurrency, isDemo);
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/dashboard" className={styles.backBtn}>
                    ← Back
                </Link>
                <h1 className={styles.title}>Open account</h1>
                <Link href="/contract-specifications" className={styles.specLink}>
                    Contract specifications ↗
                </Link>
            </div>

            {step === 1 && (
                <>
                    {/* Standard Accounts */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Standard accounts</h2>
                            <div className={styles.columnHeaders}>
                                <span>Min deposit</span>
                                <span>Min spread</span>
                                <span>Max leverage</span>
                                <span>Commission</span>
                            </div>
                        </div>

                        <div className={styles.accountList}>
                            {standardAccounts.map((account) => (
                                <label
                                    key={account.id}
                                    className={`${styles.accountRow} ${selectedType === account.id ? styles.selected : ''
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value={account.id}
                                        checked={selectedType === account.id}
                                        onChange={() => setSelectedType(account.id)}
                                        className={styles.radio}
                                    />
                                    <div className={styles.accountInfo}>
                                        <span className={styles.accountIcon}>{account.icon}</span>
                                        <div className={styles.accountDetails}>
                                            <span className={styles.accountName}>{account.name}</span>
                                            <span className={styles.accountDesc}>{account.description}</span>
                                        </div>
                                    </div>
                                    <div className={styles.accountSpecs}>
                                        <span>{account.minDeposit} USD</span>
                                        <span>{account.spread}</span>
                                        <span>{account.leverage}</span>
                                        <span>{account.commission}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Professional Accounts */}
                    <div className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Professional accounts</h2>
                            <div className={styles.columnHeaders}>
                                <span>Min deposit</span>
                                <span>Min spread</span>
                                <span>Max leverage</span>
                                <span>Commission</span>
                            </div>
                        </div>

                        <div className={styles.accountList}>
                            {proAccounts.map((account) => (
                                <label
                                    key={account.id}
                                    className={`${styles.accountRow} ${selectedType === account.id ? styles.selected : ''
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="accountType"
                                        value={account.id}
                                        checked={selectedType === account.id}
                                        onChange={() => setSelectedType(account.id)}
                                        className={styles.radio}
                                    />
                                    <div className={styles.accountInfo}>
                                        <span className={styles.accountIcon}>{account.icon}</span>
                                        <div className={styles.accountDetails}>
                                            <span className={styles.accountName}>{account.name}</span>
                                            <span className={styles.accountDesc}>{account.description}</span>
                                        </div>
                                    </div>
                                    <div className={styles.accountSpecs}>
                                        <span>{account.minDeposit.toLocaleString()} USD</span>
                                        <span>{account.spread}</span>
                                        <span>{account.leverage}</span>
                                        <span>{account.commission}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        className={styles.continueBtn}
                        onClick={handleContinue}
                        disabled={!selectedType}
                    >
                        Continue
                    </button>
                </>
            )}

            {step === 2 && (
                <div className={styles.step2}>
                    <div className={styles.configSection}>
                        <h2 className={styles.configTitle}>Configure your account</h2>

                        <div className={styles.configGroup}>
                            <label className={styles.configLabel}>Trading Platform</label>
                            <div className={styles.platformOptions}>
                                {PLATFORMS.map((platform) => (
                                    <label
                                        key={platform.id}
                                        className={`${styles.platformOption} ${selectedPlatform === platform.id ? styles.selected : ''
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="platform"
                                            value={platform.id}
                                            checked={selectedPlatform === platform.id}
                                            onChange={() => setSelectedPlatform(platform.id as Platform)}
                                        />
                                        <span className={styles.platformName}>{platform.name}</span>
                                        <span className={styles.platformDesc}>{platform.description}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.configGroup}>
                            <label className={styles.configLabel}>Account Currency</label>
                            <div className={styles.currencyOptions}>
                                {CURRENCIES.map((currency) => (
                                    <label
                                        key={currency}
                                        className={`${styles.currencyOption} ${selectedCurrency === currency ? styles.selected : ''
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="currency"
                                            value={currency}
                                            checked={selectedCurrency === currency}
                                            onChange={() => setSelectedCurrency(currency as Currency)}
                                        />
                                        <span>{currency}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.configGroup}>
                            <label className={styles.demoToggle}>
                                <input
                                    type="checkbox"
                                    checked={isDemo}
                                    onChange={(e) => setIsDemo(e.target.checked)}
                                />
                                <span className={styles.toggleTrack}>
                                    <span className={styles.toggleThumb}></span>
                                </span>
                                <span>Create as Demo Account</span>
                            </label>
                            <p className={styles.demoHint}>
                                Demo accounts come with $10,000 virtual funds for practice
                            </p>
                        </div>
                    </div>

                    <div className={styles.step2Actions}>
                        <button
                            className={styles.backStepBtn}
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                        <button
                            className={styles.createBtn}
                            onClick={handleCreate}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating...' : 'Create Account'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
