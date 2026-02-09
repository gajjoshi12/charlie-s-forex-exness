'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAccounts } from '@/context';
import { PAYMENT_METHODS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import styles from './withdraw.module.css';

export default function WithdrawPage() {
    const { accounts, selectedAccount } = useAccounts();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const availableBalance = selectedAccount?.balance || 0;

    const handleWithdraw = () => {
        setStep(3);
    };

    if (accounts.length === 0) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <span className={styles.emptyIcon}>🏦</span>
                    <h2>No trading accounts</h2>
                    <p>Create a trading account first to make a withdrawal</p>
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
                <h1 className={styles.title}>Withdraw Funds</h1>
                <p className={styles.subtitle}>Transfer funds from your trading account</p>
            </div>

            {step === 1 && (
                <>
                    <div className={styles.accountSelect}>
                        <label className={styles.label}>Withdraw From</label>
                        <div className={styles.accountCard}>
                            <div className={styles.accountInfo}>
                                <span className={styles.accountType}>
                                    {selectedAccount?.type.replace('-', ' ').toUpperCase()}
                                </span>
                                <span className={styles.accountNumber}>
                                    #{selectedAccount?.accountNumber}
                                </span>
                            </div>
                            <div className={styles.balanceInfo}>
                                <span className={styles.balanceLabel}>Available</span>
                                <span className={styles.accountBalance}>
                                    {formatCurrency(availableBalance)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.methods}>
                        <label className={styles.label}>Withdrawal Method</label>
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
                                    <span className={styles.methodTime}>{method.processingTime}</span>
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
                        <span>Withdrawal Method:</span>
                        <strong>
                            {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}
                        </strong>
                    </div>

                    <div className={styles.balanceDisplay}>
                        <span>Available Balance:</span>
                        <strong>{formatCurrency(availableBalance)}</strong>
                    </div>

                    <div className={styles.amountField}>
                        <label className={styles.label}>Withdrawal Amount (USD)</label>
                        <div className={styles.amountInput}>
                            <span className={styles.currency}>$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                min="10"
                                max={availableBalance}
                            />
                        </div>
                        {parseFloat(amount) > availableBalance && (
                            <p className={styles.errorText}>
                                Amount exceeds available balance
                            </p>
                        )}
                    </div>

                    <button
                        className={styles.maxBtn}
                        onClick={() => setAmount(availableBalance.toString())}
                    >
                        Withdraw All ({formatCurrency(availableBalance)})
                    </button>

                    <div className={styles.summary}>
                        <div className={styles.summaryRow}>
                            <span>Withdrawal Amount</span>
                            <span>${amount || '0.00'}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Processing Fee</span>
                            <span>$0.00</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>You will receive</span>
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
                            className={styles.withdrawBtn}
                            onClick={handleWithdraw}
                            disabled={!amount || parseFloat(amount) < 10 || parseFloat(amount) > availableBalance}
                        >
                            Withdraw Now
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className={styles.success}>
                    <div className={styles.successIcon}>✓</div>
                    <h2>Withdrawal Requested!</h2>
                    <p>Your withdrawal of ${amount} is being processed</p>
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
                            <span>Processing Time</span>
                            <strong>
                                {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.processingTime}
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
