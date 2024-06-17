import { EmployeeDto, UseGetAllEmployeesQueryParams } from '@/api/employees';
import { createContext } from 'react';

export interface IEmployeesStateContext {
  employees?: EmployeeDto[];
  isFetchingAllEmployees?: boolean;
  error?: any;
}

export interface IEmployeesActionsContext {
  getAllEmployees: (filters?: UseGetAllEmployeesQueryParams) => void;
}

export const EMPLOYEES_CONTEXT_INITIAL_STATE: IEmployeesStateContext = {};

export const EmployeesStateContext = createContext<IEmployeesStateContext>(EMPLOYEES_CONTEXT_INITIAL_STATE);

export const EmployeesActionsContext = createContext<IEmployeesActionsContext>(undefined);
