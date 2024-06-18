'use client';

import { EmployeesProvider } from '@/providers/employees';
import { FC, PropsWithChildren } from 'react';
import { RestfulProvider } from 'restful-react';

export interface IAppProviderProps {
  baseUrl: string;
}

export const AppProvider: FC<PropsWithChildren<IAppProviderProps>> = ({ children, baseUrl }) => {
  return (
    //@ts-ignore
    <RestfulProvider
      base={baseUrl}
      onError={(error) => {
        console.log('Main error :>> ', error);
      }}
    >
      <EmployeesProvider>{children}</EmployeesProvider>
    </RestfulProvider>
  );
};
