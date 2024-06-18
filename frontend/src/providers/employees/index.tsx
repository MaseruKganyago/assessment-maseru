'use client';

import { FC, PropsWithChildren, use, useContext, useEffect, useReducer } from 'react';
import { employeesReducer } from './reducer';
import {
  EMPLOYEES_CONTEXT_INITIAL_STATE,
  EmployeesActionsContext,
  EmployeesStateContext,
  FiltersDrawer,
  InterActiveMode,
} from './contexts';
import {
  getAllEmployeesErrorAction,
  getAllEmployeesSuccessAction,
  openCloseFiltersDrawerAction,
  setInteractiveModeAction,
  storeEmployeeIdAction,
} from './actions';
import { useLocalStorage } from '@/hooks';
import _ from 'lodash';
import { FILTERS_SETTINGS_ID } from '@/app-constants';
import { UseEmployeesGetAllQueryParams, useEmployeesGetAll } from '@/api/employees';

const EmployeesProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, EMPLOYEES_CONTEXT_INITIAL_STATE);

  const [filterSettings, setFilterSettings] = useLocalStorage<UseEmployeesGetAllQueryParams>(FILTERS_SETTINGS_ID, null);

  //#region GetAllEmployees http request
  const {
    refetch: getAllEmployeesHttp,
    data,
    loading: isFetchingAllEmployees,
    error,
  } = useEmployeesGetAll({ lazy: true });

  useEffect(() => {
    if (!isFetchingAllEmployees && data) {
      dispatch(getAllEmployeesSuccessAction(data.result));
    } else if (!isFetchingAllEmployees && error) {
      dispatch(getAllEmployeesErrorAction(error));
    }
  }, [isFetchingAllEmployees]);

  const getAllEmployees = (filters: UseEmployeesGetAllQueryParams) => {
    getAllEmployeesHttp({ queryParams: filters });
  };
  //#endregion

  const openCloseFiltersDrawer = (drawerState: FiltersDrawer) => dispatch(openCloseFiltersDrawerAction(drawerState));

  //Update filter settings, in local storage.
  const storeFilterSettings = (filters: UseEmployeesGetAllQueryParams) => {
    setFilterSettings({ ...filterSettings, ...filters });
  };

  // Clear filter settings, in FilterDrawer component.
  const clearFilterSettings = () => {
    setFilterSettings({ searchString: filterSettings?.searchString });

    getAllEmployeesHttp({ queryParams: { searchString: filterSettings?.searchString } });
  };

  const setInteractiveMode = (interactiveMode?: InterActiveMode) => dispatch(setInteractiveModeAction(interactiveMode));

  const storeEmployeeId = (employeeId: string) => dispatch(storeEmployeeIdAction(employeeId));
  return (
    <EmployeesStateContext.Provider value={{ ...state, isFetchingAllEmployees, filterSettings }}>
      <EmployeesActionsContext.Provider
        value={{
          getAllEmployees,
          openCloseFiltersDrawer,
          storeFilterSettings,
          clearFilterSettings,
          setInteractiveMode,
          storeEmployeeId,
        }}
      >
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
