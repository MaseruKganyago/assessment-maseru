'use client';

import { FC, PropsWithChildren, use, useContext, useEffect, useReducer } from 'react';
import { employeesReducer } from './reducer';
import {
  EMPLOYEES_CONTEXT_INITIAL_STATE,
  EmployeesActionsContext,
  EmployeesStateContext,
  FiltersDrawer,
} from './contexts';
import { UseGetAllEmployeesQueryParams, useGetAllEmployees } from '@/api/employees';
import { getAllEmployeesErrorAction, getAllEmployeesSuccessAction, openCloseFiltersDrawerAction } from './actions';
import { useLocalStorage } from '@/hooks';

export const FILTERS_SETTIGNS_ID = 'FILTERS_SETTIGNS_ID';

const EmployeesProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, EMPLOYEES_CONTEXT_INITIAL_STATE);

  const [filterSettings, setFilterSettings] = useLocalStorage<UseGetAllEmployeesQueryParams>(FILTERS_SETTIGNS_ID, null);

  //#region GetAllEmployees http request
  const {
    refetch: getAllEmployeesHttp,
    data,
    loading: isFetchingAllEmployees,
    error,
  } = useGetAllEmployees({ lazy: true });

  useEffect(() => {
    if (!isFetchingAllEmployees && data) {
      dispatch(getAllEmployeesSuccessAction(data.result));
    } else if (!isFetchingAllEmployees && error) {
      dispatch(getAllEmployeesErrorAction(error));
    }
  }, [isFetchingAllEmployees]);

  const getAllEmployees = (filters: UseGetAllEmployeesQueryParams) => {
    const newFilters = { ...filterSettings, ...filters };
    setFilterSettings(newFilters);

    getAllEmployeesHttp({ queryParams: newFilters });
  };
  //#endregion

  const openCloseFiltersDrawer = (drawerState: FiltersDrawer) => dispatch(openCloseFiltersDrawerAction(drawerState));

  // Clear filter settings, in FilterDrawer component.
  const clearFilterSettings = () => {
    setFilterSettings({ searchString: filterSettings?.searchString });

    getAllEmployeesHttp({ queryParams: { searchString: filterSettings?.searchString } });
  };
  return (
    <EmployeesStateContext.Provider value={{ ...state, isFetchingAllEmployees, filterSettings }}>
      <EmployeesActionsContext.Provider value={{ getAllEmployees, openCloseFiltersDrawer, clearFilterSettings }}>
        {children}
      </EmployeesActionsContext.Provider>
    </EmployeesStateContext.Provider>
  );
};

function useEmployeesState() {
  const context = useContext(EmployeesStateContext);

  if (context === undefined) {
    throw new Error('useEmployeesState must be used within a EmployeesProvider');
  }

  return context;
}

function useEmployeesActions() {
  const context = useContext(EmployeesActionsContext);

  if (context === undefined) {
    throw new Error('useEmployeesActions must be used within a EmployeesProvider');
  }

  return context;
}

function useEmployees() {
  return { ...useEmployeesState(), ...useEmployeesActions() };
}

export { EmployeesProvider, useEmployeesState, useEmployeesActions, useEmployees };
