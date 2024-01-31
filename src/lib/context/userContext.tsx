'use client';
import React, { createContext, useContext } from 'react';
import { UserSettings, User } from '@prisma/client';
import { getUser } from '../actions/get-data-actions';

type UserData = Awaited<ReturnType<typeof getUser>>;

const UserDataContext = createContext<{
  user: User;
  settings: UserSettings;
} | null>(null);

interface UserSettingsProviderProps {
  data: UserData | null;
  children?: React.ReactNode;
}

export const UserDataProvider = ({
  children,
  data,
}: UserSettingsProviderProps) => {
  if (!data) {
    throw new Error('UserDataProvider requires a valid data object');
  }
  let { settings, ...user } = data;
  if (!settings) {
    settings = {} as UserSettings;
  }
  return (
    <UserDataContext.Provider value={{ user, settings }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === null) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
