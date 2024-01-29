'use client';
import React, { createContext, useContext } from 'react';
import { UserSettings, User } from '@prisma/client';

interface UserData extends User {
  settings: UserSettings | null;
}
const UserDataContext = createContext<{
  user: User;
  settings: UserSettings;
} | null>(null);

interface UserSettingsProviderProps {
  data: UserData;
  children?: React.ReactNode;
}

export const UserDataProvider = ({
  children,
  data,
}: UserSettingsProviderProps) => {
  let { settings, ...user } = data;
  if (settings === null) {
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
