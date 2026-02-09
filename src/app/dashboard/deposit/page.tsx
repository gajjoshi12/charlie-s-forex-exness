'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAccounts } from '@/context';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import styles from './deposit.module.css';

export default function DepositPage() {
    const { accounts, selectedAccount } = useAccounts();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const handleDeposit = () => {
        // Simulate deposit
        setStep(3);
    };

    if (accounts.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>💳</span>
                    <h2>No trading accounts</h2>
                    <p>Create a trading account first to make a deposit</p>
                    <Link href="/dashboard/accounts/new" className={styles.createBtn}>
                        Open Trading Account
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Deposit Funds</h1>
                <p className={styles.subtitle}>Add funds to your trading account</p>
            </div>

            {step === 1 && (
                <>
                    <div className={styles.accountSelect}>
                        <label className={styles.label}>Select Account</label>
                        <div className={styles.accountCard}>
                            <div className={styles.accountInfo}>
                                <span className={styles.accountType}>
                                    {selectedAccount?.type.replace('-', ' ').toUpperCase()}
                                </span>
                                <span className={styles.accountNumber}>
                                    #{selectedAccount?.accountNumber}
                                </span>
                            </div>
                            <span className={styles.accountBalance}>
                                {formatCurrency(selectedAccount?.balance || 0)}
                            </span>
                        </div>
                    </div>

                    <div className={styles.methods}>
                        <label className={styles.label}>Select Payment Method</label>
                        <div className={styles.methodsGrid}>
                            {PAYMENT_METHODS.map((method) => (
                                <label
                                    key={method.id}
                                    className={`${styles.methodCard} ${selectedMethod === method.id ? styles.selected : ''
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method.id}
                                        checked={selectedMethod === method.id}
                                        onChange={() => setSelectedMethod(method.id)}
                                    />
                                    <span className={styles.methodIcon}>{method.icon}</span>
                                    <span className={styles.methodName}>{method.name}</span>
                                    <div className={styles.methodDetails}>
                                        <span>Min: ${method.minAmount}</span>
                                        <span>Fee: {method.fee}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        className={styles.continueBtn}
                        onClick={() => setStep(2)}
                        disabled={!selectedMethod}
                    >
                        Continue
                    </button>
                </>
            )}

            {step === 2 && (
                <div className={styles.amountStep}>
                    <div className={styles.selectedMethod}>
                        <span>Payment Method:</span>
                        <strong>
                            {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                        </strong>
                    </div>

                    <div className={styles.amountField}>
                        <label className={styles.label}>Enter Amount (USD)</label>
                        <div className={styles.amountInput}>
                            <span className={styles.currency}>$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                min="10"
                            />
                        </div>
                    </div>

                    <div className={styles.quickAmounts}>
                        {[100, 500, 1000, 5000].map((amt) => (
                            <button
                                key={amt}
                                className={styles.quickBtn}
                                onClick={() => setAmount(amt.toString())}
                            >
                                ${amt}
                            </button>
                        ))}
                    </div>

                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span>Deposit Amount</span>
                            <span>${amount || '0.00'}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Processing Fee</span>
                            <span>$0.00</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${amount || '0.00'}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className={styles.backBtn}
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                        <button
                            className={styles.depositBtn}
                            onClick={handleDeposit}
                            disabled={!amount || parseFloat(amount) < 10}
                        >
                            Deposit Now
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className={styles.success}>
                    <div className={styles.successIcon}>✓</div>
                    <h2>Deposit Initiated!</h2>
                    <p>Your deposit of ${amount} is being processed</p>
                    <div className={styles.successDetails}>
                        <div className={styles.detailRow}>
                            <span>Amount</span>
                            <strong>${amount}</strong>
                        </div>
                        <div className={styles.detailRow}>
                            <span>Method</span>
                            <strong>
                                {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                            </strong>
                        </div>
                        <div className={styles.detailRow}>
                            <span>Status</span>
                            <strong className={styles.pending}>Processing</strong>
                        </div>
                    </div>
                    <Link href="/dashboard" className={styles.doneBtn}>
                        Back to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
}
