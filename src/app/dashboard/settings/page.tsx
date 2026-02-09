'use client';

import { useState } from 'react';
import { useAuth } from '@/context';
import { COUNTRIES } from '@/lib/constants';
import styles from './settings.module.css';

export default function SettingsPage() {
    const { user, updateUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        country: user?.country || '',
    });

    const handleSave = async () => {
        setIsSaving(true);
        setMessage('');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        updateUser(formData);
        setMessage('Profile updated successfully!');
        setIsSaving(false);

        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Settings</h1>
                <p className={styles.subtitle}>Manage your account settings and preferences</p>
            </div>

            <div className={styles.layout}>
                <nav className={styles.sidebar}>
                    <button
                        className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                        onClick={() => setActiveTab('profile')}
                    >
                        👤 Profile
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        🔐 Security
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'verification' ? styles.active : ''}`}
                        onClick={() => setActiveTab('verification')}
                    >
                        ✓ Verification
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'preferences' ? styles.active : ''}`}
                        onClick={() => setActiveTab('preferences')}
                    >
                        ⚙️ Preferences
                    </button>
                </nav>

                <div className={styles.content}>
                    {activeTab === 'profile' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Personal Information</h2>

                            {message && (
                                <div className={styles.successMessage}>{message}</div>
                            )}

                            <div className={styles.form}>
                                <div className={styles.row}>
                                    <div className={styles.field}>
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className={styles.field}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        disabled
                                    />
                                    <span className={styles.hint}>Email cannot be changed</span>
                                </div>

                                <div className={styles.field}>
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>

                                <div className={styles.field}>
                                    <label>Country</label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                                    >
                                        <option value="">Select country</option>
                                        {COUNTRIES.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    className={styles.saveBtn}
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Security Settings</h2>

                            <div className={styles.securityItem}>
                                <div className={styles.securityInfo}>
                                    <h3>Password</h3>
                                    <p>Change your account password</p>
                                </div>
                                <button className={styles.actionBtn}>Change Password</button>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.securityInfo}>
                                    <h3>Two-Factor Authentication</h3>
                                    <p>Add an extra layer of security to your account</p>
                                </div>
                                <button className={styles.actionBtn}>Enable 2FA</button>
                            </div>

                            <div className={styles.securityItem}>
                                <div className={styles.securityInfo}>
                                    <h3>Active Sessions</h3>
                                    <p>Manage devices where you're logged in</p>
                                </div>
                                <button className={styles.actionBtn}>View Sessions</button>
                            </div>

                            <div className={styles.dangerZone}>
                                <h3>Danger Zone</h3>
                                <button className={styles.logoutBtn} onClick={logout}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'verification' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Account Verification</h2>

                            <div className={styles.verificationStatus}>
                                <span className={styles.statusIcon}>
                                    {user?.isVerified ? '✓' : '⏳'}
                                </span>
                                <span className={styles.statusText}>
                                    {user?.isVerified ? 'Verified' : 'Pending Verification'}
                                </span>
                            </div>

                            <div className={styles.verificationSteps}>
                                <div className={`${styles.verifyStep} ${styles.completed}`}>
                                    <span className={styles.stepIcon}>✓</span>
                                    <div className={styles.stepContent}>
                                        <h4>Email Verification</h4>
                                        <p>Your email has been verified</p>
                                    </div>
                                </div>

                                <div className={styles.verifyStep}>
                                    <span className={styles.stepIcon}>2</span>
                                    <div className={styles.stepContent}>
                                        <h4>Identity Verification</h4>
                                        <p>Upload your ID document</p>
                                        <button className={styles.uploadBtn}>Upload Document</button>
                                    </div>
                                </div>

                                <div className={styles.verifyStep}>
                                    <span className={styles.stepIcon}>3</span>
                                    <div className={styles.stepContent}>
                                        <h4>Address Verification</h4>
                                        <p>Upload proof of address</p>
                                        <button className={styles.uploadBtn}>Upload Document</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className={styles.section}>
                            <h2 className={styles.sectionTitle}>Preferences</h2>

                            <div className={styles.preference}>
                                <div className={styles.prefInfo}>
                                    <h3>Email Notifications</h3>
                                    <p>Receive important updates via email</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>

                            <div className={styles.preference}>
                                <div className={styles.prefInfo}>
                                    <h3>Trading Alerts</h3>
                                    <p>Get notified about market movements</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>

                            <div className={styles.preference}>
                                <div className={styles.prefInfo}>
                                    <h3>Marketing Communications</h3>
                                    <p>Receive promotional offers and news</p>
                                </div>
                                <label className={styles.toggle}>
                                    <input type="checkbox" />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
