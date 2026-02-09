'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import styles from './login.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const success = await login(email, password);
        if (success) {
            router.push('/dashboard');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link href="/" className={styles.logo}>
                    exness
                </Link>
                <div className={styles.content}>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Sign in to access your trading dashboard</p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}

                        <div className={styles.field}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.passwordField}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.options}>
                            <label className={styles.remember}>
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link href="/forgot-password" className={styles.forgot}>
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className={styles.register}>
                        Don't have an account?{' '}
                        <Link href="/register" className={styles.registerLink}>
                            Register now
                        </Link>
                    </p>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.visual}>
                    <h2>Trade with confidence</h2>
                    <p>Access global markets with ultra-low spreads and fast execution</p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>800K+</span>
                            <span className={styles.statLabel}>Active Traders</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>$4T+</span>
                            <span className={styles.statLabel}>Monthly Volume</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
