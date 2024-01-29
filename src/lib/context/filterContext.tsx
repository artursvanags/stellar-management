'use client';
import React, { createContext, useContext } from 'react';
import { Tags } from '@prisma/client';

interface FilterContext {
  tags: Tags[];
}

interface FilterProviderProps {
  data: FilterContext;
  children?: React.ReactNode;
}

const FilterContext = createContext<FilterContext | null>(null);

export const FilterProvider = ({ children, data }: FilterProviderProps) => {
  return (
    <FilterContext.Provider value={data}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterProvider = () => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error('useFilterProvider must be used within a FilterProvider');
  }
  return context;
};
