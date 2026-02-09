'use client';

import { useState } from 'react';
import styles from './history.module.css';

const mockTransactions = [
    { id: 1, type: 'deposit', amount: 1000, status: 'completed', method: 'Bank Card', date: '2024-02-09T10:30:00', account: '12345678' },
    { id: 2, type: 'withdrawal', amount: 500, status: 'completed', method: 'Bank Transfer', date: '2024-02-08T14:20:00', account: '12345678' },
    { id: 3, type: 'deposit', amount: 2500, status: 'pending', method: 'Bitcoin', date: '2024-02-07T09:15:00', account: '87654321' },
    { id: 4, type: 'withdrawal', amount: 750, status: 'completed', method: 'Skrill', date: '2024-02-06T16:45:00', account: '12345678' },
    { id: 5, type: 'deposit', amount: 5000, status: 'completed', method: 'Bank Transfer', date: '2024-02-05T11:00:00', account: '87654321' },
    { id: 6, type: 'transfer', amount: 200, status: 'completed', method: 'Internal', date: '2024-02-04T08:30:00', account: '12345678' },
    { id: 7, type: 'deposit', amount: 300, status: 'failed', method: 'Bank Card', date: '2024-02-03T13:20:00', account: '12345678' },
    { id: 8, type: 'withdrawal', amount: 1500, status: 'completed', method: 'USDT', date: '2024-02-02T10:00:00', account: '87654321' },
];

type FilterType = 'all' | 'deposit' | 'withdrawal' | 'transfer';

export default function HistoryPage() {
    const [filter, setFilter] = useState<FilterType>('all');
    const [dateRange, setDateRange] = useState('7days');

    const filteredTransactions = mockTransactions.filter(t =>
        filter === 'all' ? true : t.type === filter
    );

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'completed': return styles.completed;
            case 'pending': return styles.pending;
            case 'failed': return styles.failed;
            default: return '';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'deposit': return '↓';
            case 'withdrawal': return '↑';
            case 'transfer': return '↔';
            default: return '•';
        }
    };

    const totalDeposits = mockTransactions.filter(t => t.type === 'deposit' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = mockTransactions.filter(t => t.type === 'withdrawal' && t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Transaction History</h1>
                <p className={styles.subtitle}>View all your deposits, withdrawals, and transfers</p>
            </div>

            {/* Summary Cards */}
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryIcon}>↓</span>
                    <div className={styles.summaryContent}>
                        <span className={styles.summaryLabel}>Total Deposits</span>
                        <span className={`${styles.summaryValue} ${styles.green}`}>${totalDeposits.toLocaleString()}</span>
                    </div>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryIcon}>↑</span>
                    <div className={styles.summaryContent}>
                        <span className={styles.summaryLabel}>Total Withdrawals</span>
                        <span className={`${styles.summaryValue} ${styles.red}`}>${totalWithdrawals.toLocaleString()}</span>
                    </div>
                </div>
                <div className={styles.summaryCard}>
                    <span className={styles.summaryIcon}>📊</span>
                    <div className={styles.summaryContent}>
                        <span className={styles.summaryLabel}>Net Balance Change</span>
                        <span className={`${styles.summaryValue} ${totalDeposits - totalWithdrawals >= 0 ? styles.green : styles.red}`}>
                            ${(totalDeposits - totalWithdrawals).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.filterGroup}>
                    <button
                        className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'deposit' ? styles.active : ''}`}
                        onClick={() => setFilter('deposit')}
                    >
                        Deposits
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'withdrawal' ? styles.active : ''}`}
                        onClick={() => setFilter('withdrawal')}
                    >
                        Withdrawals
                    </button>
                    <button
                        className={`${styles.filterBtn} ${filter === 'transfer' ? styles.active : ''}`}
                        onClick={() => setFilter('transfer')}
                    >
                        Transfers
                    </button>
                </div>
                <select
                    className={styles.dateSelect}
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                    <option value="all">All time</option>
                </select>
            </div>

            {/* Transactions Table */}
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Account</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>
                                    <div className={styles.typeCell}>
                                        <span className={`${styles.typeIcon} ${styles[transaction.type]}`}>
                                            {getTypeIcon(transaction.type)}
                                        </span>
                                        <span className={styles.typeName}>
                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span className={transaction.type === 'deposit' ? styles.green : transaction.type === 'withdrawal' ? styles.red : ''}>
                                        {transaction.type === 'deposit' ? '+' : transaction.type === 'withdrawal' ? '-' : ''}
                                        ${transaction.amount.toLocaleString()}
                                    </span>
                                </td>
                                <td>{transaction.method}</td>
                                <td>#{transaction.account}</td>
                                <td>{formatDate(transaction.date)}</td>
                                <td>
                                    <span className={`${styles.status} ${getStatusClass(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredTransactions.length === 0 && (
                <div className={styles.empty}>
                    <span>📭</span>
                    <p>No transactions found</p>
                </div>
            )}
        </div>
    );
}
