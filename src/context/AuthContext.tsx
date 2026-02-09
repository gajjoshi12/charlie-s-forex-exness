'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, RegisterFormData, AuthContextType } from '@/types';
import { storage, generateId, delay } from '@/lib/utils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'nNexness_auth';
const USERS_STORAGE_KEY = 'nNexness_users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from storage on mount
    useEffect(() => {
        const loadUser = () => {
            const storedAuth = storage.get<{ userId: string }>(AUTH_STORAGE_KEY);
            if (storedAuth?.userId) {
                const users = storage.get<User[]>(USERS_STORAGE_KEY) || [];
                const foundUser = users.find(u => u.id === storedAuth.userId);
                if (foundUser) {
                    setUser(foundUser);
                }
            }
            setIsLoading(false);
        };
        loadUser();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        await delay(800); // Simulate API call

        const users = storage.get<(User & { password: string })[]>(USERS_STORAGE_KEY) || [];
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            storage.set(AUTH_STORAGE_KEY, { userId: foundUser.id });
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    }, []);

    const register = useCallback(async (data: RegisterFormData): Promise<boolean> => {
        setIsLoading(true);
        await delay(1000); // Simulate API call

        const users = storage.get<(User & { password: string })[]>(USERS_STORAGE_KEY) || [];

        // Check if email already exists
        if (users.some(u => u.email === data.email)) {
            setIsLoading(false);
            return false;
        }

        const newUser: User & { password: string } = {
            id: generateId(),
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            country: data.country,
            isVerified: false,
            createdAt: new Date().toISOString(),
        };

        users.push(newUser);
        storage.set(USERS_STORAGE_KEY, users);

        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        storage.set(AUTH_STORAGE_KEY, { userId: newUser.id });

        setIsLoading(false);
        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        storage.remove(AUTH_STORAGE_KEY);
    }, []);

    const updateUser = useCallback((data: Partial<User>) => {
        if (!user) return;

        const updatedUser = { ...user, ...data };
        setUser(updatedUser);

        // Also update in storage
        const users = storage.get<User[]>(USERS_STORAGE_KEY) || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...data };
            storage.set(USERS_STORAGE_KEY, users);
        }
    }, [user]);

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
