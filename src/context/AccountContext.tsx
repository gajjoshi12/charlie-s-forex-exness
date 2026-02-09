'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TradingAccount, AccountType, Platform, Currency, AccountContextType } from '@/types';
import { storage, generateId, generateAccountNumber, delay } from '@/lib/utils';
import { useAuth } from './AuthContext';

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const ACCOUNTS_STORAGE_KEY = 'exness_accounts';

export function AccountProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [accounts, setAccounts] = useState<TradingAccount[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<TradingAccount | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load accounts from storage
    useEffect(() => {
        const loadAccounts = () => {
            if (!user) {
                setAccounts([]);
                setSelectedAccount(null);
                setIsLoading(false);
                return;
            }

            const allAccounts = storage.get<Record<string, TradingAccount[]>>(ACCOUNTS_STORAGE_KEY) || {};
            const userAccounts = allAccounts[user.id] || [];
            setAccounts(userAccounts);

            if (userAccounts.length > 0 && !selectedAccount) {
                setSelectedAccount(userAccounts[0]);
            }

            setIsLoading(false);
        };
        loadAccounts();
    }, [user, selectedAccount]);

    const createAccount = useCallback(async (
        type: AccountType,
        platform: Platform,
        currency: Currency,
        isDemo: boolean
    ): Promise<TradingAccount> => {
        if (!user) throw new Error('User must be logged in');

        setIsLoading(true);
        await delay(1000); // Simulate API call

        const serverPrefix = platform === 'mt4' ? 'MT4' : 'MT5';
        const serverType = isDemo ? 'Demo' : 'Real';

        const newAccount: TradingAccount = {
            id: generateId(),
            accountNumber: generateAccountNumber(),
            type,
            platform,
            currency,
            balance: isDemo ? 10000 : 0,
            leverage: '1:Unlimited',
            server: `Exness-${serverPrefix}-${serverType}`,
            createdAt: new Date().toISOString(),
            isDemo,
        };

        const allAccounts = storage.get<Record<string, TradingAccount[]>>(ACCOUNTS_STORAGE_KEY) || {};
        const userAccounts = allAccounts[user.id] || [];
        userAccounts.push(newAccount);
        allAccounts[user.id] = userAccounts;
        storage.set(ACCOUNTS_STORAGE_KEY, allAccounts);

        setAccounts(userAccounts);
        setSelectedAccount(newAccount);
        setIsLoading(false);

        return newAccount;
    }, [user]);

    const selectAccount = useCallback((accountId: string) => {
        const account = accounts.find(a => a.id === accountId);
        if (account) {
            setSelectedAccount(account);
        }
    }, [accounts]);

    const getAccountById = useCallback((accountId: string): TradingAccount | undefined => {
        return accounts.find(a => a.id === accountId);
    }, [accounts]);

    const value: AccountContextType = {
        accounts,
        selectedAccount,
        isLoading,
        createAccount,
        selectAccount,
        getAccountById,
    };

    return (
        <AccountContext.Provider value={value}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccounts(): AccountContextType {
    const context = useContext(AccountContext);
    if (context === undefined) {
        throw new Error('useAccounts must be used within an AccountProvider');
    }
    return context;
}
