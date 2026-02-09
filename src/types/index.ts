// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  country?: string;
  isVerified: boolean;
  createdAt: string;
}

// Account Types
export type AccountType = 'standard' | 'standard-cent' | 'pro' | 'raw-spread' | 'zero';
export type Platform = 'mt4' | 'mt5';
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface TradingAccount {
  id: string;
  accountNumber: string;
  type: AccountType;
  platform: Platform;
  currency: Currency;
  balance: number;
  leverage: string;
  server: string;
  createdAt: string;
  isDemo: boolean;
}

export interface AccountTypeInfo {
  id: AccountType;
  name: string;
  description: string;
  minDeposit: number;
  spread: string;
  leverage: string;
  commission: string;
  category: 'standard' | 'professional';
  icon: string;
}

// Transaction Types
export type TransactionType = 'deposit' | 'withdrawal' | 'transfer';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: Currency;
  status: TransactionStatus;
  paymentMethod: string;
  accountId: string;
  createdAt: string;
  completedAt?: string;
}

// Payment Methods
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  fee: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  agreeToTerms: boolean;
}

// Auth Context Types
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Account Context Types
export interface AccountContextType {
  accounts: TradingAccount[];
  selectedAccount: TradingAccount | null;
  isLoading: boolean;
  createAccount: (type: AccountType, platform: Platform, currency: Currency, isDemo: boolean) => Promise<TradingAccount>;
  selectAccount: (accountId: string) => void;
  getAccountById: (accountId: string) => TradingAccount | undefined;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}
