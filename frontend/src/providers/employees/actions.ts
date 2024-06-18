import { createAction } from 'redux-actions';
import { FiltersDrawer, IEmployeesStateContext, InterActiveMode } from './contexts';
import { EmployeeDto } from '@/api/employees';

export enum EmployeesActionEnums {
  GetAllEmployees = 'GET_ALL_EMPLOYEES',
  GetAllEmployeesSuccess = 'GET_ALL_EMPLOYEES_SUCCESS',
  GetAllEmployeesError = 'GET_ALL_EMPLOYEES_ERROR',
  OpenCloseFiltersDrawer = 'OPEN_CLOSE_FILTERS_DRAWER',
  SetInteractiveMode = 'SET_INTERACTIVE_MODE',
  StoreEmployeeId = 'STORE_EMPLOYEE_ID',
}

export const getAllEmployeesAction = createAction<IEmployeesStateContext>(
  EmployeesActionEnums.GetAllEmployees,
  () => ({})
);

export const getAllEmployeesSuccessAction = createAction<IEmployeesStateContext, EmployeeDto[]>(
  EmployeesActionEnums.GetAllEmployeesSuccess,
  (employees: EmployeeDto[]) => ({ employees })
);

export const getAllEmployeesErrorAction = createAction<IEmployeesStateContext, any>(
  EmployeesActionEnums.GetAllEmployeesError,
  (error: any) => ({ error })
);

export const openCloseFiltersDrawerAction = createAction<IEmployeesStateContext, FiltersDrawer>(
  EmployeesActionEnums.OpenCloseFiltersDrawer,
  (drawerState: FiltersDrawer) => ({ drawerState })
);

export const setInteractiveModeAction = createAction<IEmployeesStateContext, InterActiveMode>(
  EmployeesActionEnums.SetInteractiveMode,
  (interactiveMode: InterActiveMode) => ({ interactiveMode })
);

export const storeEmployeeIdAction = createAction<IEmployeesStateContext, string>(
  EmployeesActionEnums.StoreEmployeeId,
  (employeeId: string) => ({ employeeId })
);
