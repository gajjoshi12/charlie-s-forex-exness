import { AccountTypeInfo, PaymentMethod } from '@/types';

export const ACCOUNT_TYPES: AccountTypeInfo[] = [
    {
        id: 'standard',
        name: 'Standard',
        description: 'Low minimum deposit with no commission. Made for all traders.',
        minDeposit: 10,
        spread: '0.20 pips',
        leverage: '1:Unlimited',
        commission: 'No commission',
        category: 'standard',
        icon: '📊',
    },
    {
        id: 'standard-cent',
        name: 'Standard Cent',
        description: 'Smaller lots, lower risk. Great for practicing.',
        minDeposit: 10,
        spread: '0.30 pips',
        leverage: '1:Unlimited',
        commission: 'No commission',
        category: 'standard',
        icon: '💰',
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'Instant or market execution with tighter spreads and no commission.',
        minDeposit: 3000,
        spread: '0.10 pips',
        leverage: '1:Unlimited',
        commission: 'No commission',
        category: 'professional',
        icon: '⚡',
    },
    {
        id: 'raw-spread',
        name: 'Raw Spread',
        description: 'Direct market pricing with fixed commission. Designed for experienced traders.',
        minDeposit: 3000,
        spread: '0.00 pips',
        leverage: '1:Unlimited',
        commission: 'Up to 3.50 USD per lot/side',
        category: 'professional',
        icon: '📈',
    },
    {
        id: 'zero',
        name: 'Zero',
        description: 'Spreads from 0 pips on top instruments.',
        minDeposit: 3000,
        spread: '0.00 pips',
        leverage: '1:Unlimited',
        commission: 'From 0.05 USD per lot/side',
        category: 'professional',
        icon: '🎯',
    },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
    {
        id: 'bank-card',
        name: 'Bank Card',
        icon: '💳',
        minAmount: 10,
        maxAmount: 10000,
        processingTime: 'Instant',
        fee: 'Free',
    },
    {
        id: 'bank-transfer',
        name: 'Bank Transfer',
        icon: '🏦',
        minAmount: 50,
        maxAmount: 100000,
        processingTime: '1-3 business days',
        fee: 'Free',
    },
    {
        id: 'skrill',
        name: 'Skrill',
        icon: '💸',
        minAmount: 10,
        maxAmount: 50000,
        processingTime: 'Instant',
        fee: 'Free',
    },
    {
        id: 'neteller',
        name: 'Neteller',
        icon: '💵',
        minAmount: 10,
        maxAmount: 50000,
        processingTime: 'Instant',
        fee: 'Free',
    },
    {
        id: 'bitcoin',
        name: 'Bitcoin',
        icon: '₿',
        minAmount: 10,
        maxAmount: 100000,
        processingTime: 'Up to 72 hours',
        fee: 'Free',
    },
    {
        id: 'usdt',
        name: 'Tether (USDT)',
        icon: '🪙',
        minAmount: 10,
        maxAmount: 100000,
        processingTime: 'Instant',
        fee: 'Free',
    },
];

export const CURRENCIES = ['USD', 'EUR', 'GBP'] as const;

export const PLATFORMS = [
    { id: 'mt4', name: 'MetaTrader 4', description: 'Classic trading platform' },
    { id: 'mt5', name: 'MetaTrader 5', description: 'Next-gen trading platform' },
] as const;

export const COUNTRIES = [
    'United States',
    'United Kingdom',
    'India',
    'Germany',
    'France',
    'Australia',
    'Canada',
    'Japan',
    'Singapore',
    'United Arab Emirates',
    'South Africa',
    'Brazil',
    'Mexico',
    'Indonesia',
    'Malaysia',
    'Thailand',
    'Vietnam',
    'Philippines',
    'Nigeria',
    'Kenya',
];

export const NAV_ITEMS = [
    { label: 'Trading', href: '/trading' },
    { label: 'Platforms', href: '/platforms' },
    { label: 'Tools', href: '/tools' },
    { label: 'Partnership', href: '/partnership' },
    { label: 'About', href: '/about' },
];

export const FOOTER_LINKS = {
    trading: [
        { label: 'Account Types', href: '/accounts' },
        { label: 'Spreads', href: '/spreads' },
        { label: 'Leverage', href: '/leverage' },
        { label: 'Trading Hours', href: '/trading-hours' },
    ],
    platforms: [
        { label: 'MetaTrader 4', href: '/mt4' },
        { label: 'MetaTrader 5', href: '/mt5' },
        { label: 'Web Terminal', href: '/web-terminal' },
        { label: 'Mobile Trading', href: '/mobile' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/careers' },
        { label: 'News', href: '/news' },
    ],
    legal: [
        { label: 'Privacy Agreement', href: '/privacy' },
        { label: 'Risk Disclosure', href: '/risk-disclosure' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Legal Documents', href: '/legal' },
    ],
};

export const TRADING_STATS = [
    { value: '800K+', label: 'Active Traders' },
    { value: '$4T+', label: 'Monthly Volume' },
    { value: '13', label: 'Years of Excellence' },
    { value: '24/7', label: 'Customer Support' },
];
