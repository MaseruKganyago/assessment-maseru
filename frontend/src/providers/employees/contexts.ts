import { EmployeeDto, UseEmployeesGetAllQueryParams } from '@/api/employees';
import { createContext } from 'react';

export type FiltersDrawer = 'open' | 'closed';
export type InterActiveMode = 'create' | 'edit';

export interface IEmployeesStateContext {
  employees?: EmployeeDto[];
  isFetchingAllEmployees?: boolean;
  error?: any;
  filterSettings?: UseEmployeesGetAllQueryParams;
  drawerState?: FiltersDrawer;
  interactiveMode?: InterActiveMode;
  employeeId?: string;
}

export interface IEmployeesActionsContext {
  getAllEmployees: (filters?: UseEmployeesGetAllQueryParams) => void;
  openCloseFiltersDrawer: (drawerState: FiltersDrawer) => void;
  clearFilterSettings: () => void;
  setInteractiveMode: (interactiveMode?: InterActiveMode) => void;
  storeFilterSettings: (filters: UseEmployeesGetAllQueryParams) => void;
  storeEmployeeId: (employeeId: string) => void;
}

export const EMPLOYEES_CONTEXT_INITIAL_STATE: IEmployeesStateContext = {
  filterSettings: {},
};

export const EmployeesStateContext = createContext<IEmployeesStateContext>(EMPLOYEES_CONTEXT_INITIAL_STATE);

export const EmployeesActionsContext = createContext<IEmployeesActionsContext>(undefined);
