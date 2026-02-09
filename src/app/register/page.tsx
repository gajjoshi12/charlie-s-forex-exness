'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { COUNTRIES } from '@/lib/constants';
import { isValidEmail, validatePassword } from '@/lib/utils';
import styles from './register.module.css';

type Step = 1 | 2 | 3;

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading } = useAuth();
    const [step, setStep] = useState<Step>(1);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        agreeToTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const updateField = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const validateStep1 = () => {
        if (!formData.email) {
            setError('Email is required');
            return false;
        }
        if (!isValidEmail(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        const validation = validatePassword(formData.password);
        if (!validation.isValid) {
            setError(validation.errors[0]);
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const validateStep3 = () => {
        if (!formData.firstName || !formData.lastName) {
            setError('Please enter your full name');
            return false;
        }
        if (!formData.country) {
            setError('Please select your country');
            return false;
        }
        if (!formData.agreeToTerms) {
            setError('You must agree to the terms and conditions');
            return false;
        }
        return true;
    };

    const handleNextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateStep3()) return;

        const success = await register(formData);
        if (success) {
            router.push('/dashboard');
        } else {
            setError('An account with this email already exists');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link href="/" className={styles.logo}>
                    nNexness
                </Link>
                <div className={styles.content}>
                    <div className={styles.steps}>
                        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>
                            <span className={styles.stepNumber}>1</span>
                            <span className={styles.stepLabel}>Email</span>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>
                            <span className={styles.stepNumber}>2</span>
                            <span className={styles.stepLabel}>Password</span>
                        </div>
                        <div className={styles.stepLine}></div>
                        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
                            <span className={styles.stepNumber}>3</span>
                            <span className={styles.stepLabel}>Profile</span>
                        </div>
                    </div>

                    <h1 className={styles.title}>
                        {step === 1 && 'Create your account'}
                        {step === 2 && 'Set your password'}
                        {step === 3 && 'Complete your profile'}
                    </h1>
                    <p className={styles.subtitle}>
                        {step === 1 && 'Enter your email to get started'}
                        {step === 2 && 'Choose a secure password'}
                        {step === 3 && 'Tell us a bit about yourself'}
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}

                        {step === 1 && (
                            <div className={styles.field}>
                                <label className={styles.label}>Email address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    className={styles.input}
                                    placeholder="Enter your email"
                                    autoFocus
                                />
                            </div>
                        )}

                        {step === 2 && (
                            <>
                                <div className={styles.field}>
                                    <label className={styles.label}>Password</label>
                                    <div className={styles.passwordField}>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => updateField('password', e.target.value)}
                                            className={styles.input}
                                            placeholder="Create a password"
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            className={styles.togglePassword}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? '🙈' : '👁️'}
                                        </button>
                                    </div>
                                    <p className={styles.hint}>
                                        At least 8 characters with uppercase, lowercase, and number
                                    </p>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Confirm password</label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                                        className={styles.input}
                                        placeholder="Confirm your password"
                                    />
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>First name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                            className={styles.input}
                                            placeholder="First name"
                                            autoFocus
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Last name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => updateField('lastName', e.target.value)}
                                            className={styles.input}
                                            placeholder="Last name"
                                        />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Phone number (optional)</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField('phone', e.target.value)}
                                        className={styles.input}
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.label}>Country of residence</label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => updateField('country', e.target.value)}
                                        className={styles.select}
                                    >
                                        <option value="">Select your country</option>
                                        {COUNTRIES.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={formData.agreeToTerms}
                                        onChange={(e) => updateField('agreeToTerms', e.target.checked)}
                                    />
                                    <span>
                                        I agree to the{' '}
                                        <Link href="/terms">Terms of Service</Link> and{' '}
                                        <Link href="/privacy">Privacy Policy</Link>
                                    </span>
                                </label>
                            </>
                        )}

                        <div className={styles.buttons}>
                            {step > 1 && (
                                <button
                                    type="button"
                                    className={styles.backBtn}
                                    onClick={() => setStep((step - 1) as Step)}
                                >
                                    Back
                                </button>
                            )}

                            {step < 3 ? (
                                <button
                                    type="button"
                                    className={styles.nextBtn}
                                    onClick={handleNextStep}
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </button>
                            )}
                        </div>
                    </form>

                    <p className={styles.login}>
                        Already have an account?{' '}
                        <Link href="/login" className={styles.loginLink}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.visual}>
                    <div className={styles.badge}>🎉 Welcome Bonus</div>
                    <h2>Start trading in minutes</h2>
                    <p>Create your free account and access global markets instantly</p>
                    <ul className={styles.benefits}>
                        <li>✓ Low spreads from 0.0 pips</li>
                        <li>✓ Unlimited leverage available</li>
                        <li>✓ Instant deposits & withdrawals</li>
                        <li>✓ 24/7 customer support</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
