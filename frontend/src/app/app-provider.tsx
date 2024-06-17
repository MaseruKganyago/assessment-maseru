'use client';

import { EmployeesProvider } from '@/providers/employees';
import { FC, PropsWithChildren } from 'react';
import { RestfulProvider } from 'restful-react';

export interface IAppProviderProps {}

export const AppProvider: FC<PropsWithChildren<IAppProviderProps>> = ({ children }) => {
  return (
    //@ts-ignore
    <RestfulProvider
      base={'https://localhost:44362'}
      onError={(error) => {
        console.log('Main error :>> ', error);
      }}
    >
      <EmployeesProvider>{children}</EmployeesProvider>
    </RestfulProvider>
  );
};
