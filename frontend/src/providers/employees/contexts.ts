import { EmployeeDto, UseGetAllEmployeesQueryParams } from '@/api/employees';
import { createContext } from 'react';

export type FiltersDrawer = 'open' | 'closed';
export type InterActiveMode = 'create' | 'edit';

export interface IEmployeesStateContext {
  employees?: EmployeeDto[];
  isFetchingAllEmployees?: boolean;
  error?: any;
  filterSettings?: UseGetAllEmployeesQueryParams;
  drawerState?: FiltersDrawer;
  interactiveMode?: InterActiveMode;
}

export interface IEmployeesActionsContext {
  getAllEmployees: (filters?: UseGetAllEmployeesQueryParams) => void;
  openCloseFiltersDrawer: (drawerState: FiltersDrawer) => void;
  clearFilterSettings: () => void;
  setInteractiveMode: (interactiveMode: InterActiveMode) => void;
  storeFilterSettings: (filters: UseGetAllEmployeesQueryParams) => void;
}

export const EMPLOYEES_CONTEXT_INITIAL_STATE: IEmployeesStateContext = {};

export const EmployeesStateContext = createContext<IEmployeesStateContext>(EMPLOYEES_CONTEXT_INITIAL_STATE);

export const EmployeesActionsContext = createContext<IEmployeesActionsContext>(undefined);
