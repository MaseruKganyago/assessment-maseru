import { createAction } from 'redux-actions';
import { FiltersDrawer, IEmployeesStateContext } from './contexts';
import { EmployeeDto } from '@/api/employees';

export enum EmployeesActionEnums {
  GetAllEmployees = 'GET_ALL_EMPLOYEES',
  GetAllEmployeesSuccess = 'GET_ALL_EMPLOYEES_SUCCESS',
  GetAllEmployeesError = 'GET_ALL_EMPLOYEES_ERROR',
  OpenCloseFiltersDrawer = 'OPEN_CLOSE_FILTERS_DRAWER',
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
