'use client';

import React, { createContext, useContext } from 'react';

import { UserData } from '@/types/database';


interface UserDataProviderProps {
  data: UserData | null;
  children: React.ReactNode;
}
const UserDataContext = createContext<UserData | null>(null);

export const UserDataProvider = ({ children, data }: UserDataProviderProps) => {

  return <UserDataContext.Provider value={data}>{children}</UserDataContext.Provider>;
};

export const UseUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
