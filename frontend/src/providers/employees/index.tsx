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
import { UseGetAllEmployeesQueryParams, useGetAllEmployees } from '@/api/employees';
import {
  getAllEmployeesErrorAction,
  getAllEmployeesSuccessAction,
  openCloseFiltersDrawerAction,
  setInteractiveModeAction,
} from './actions';
import { useLocalStorage } from '@/hooks';
import _ from 'lodash';

export const FILTERS_SETTIGNS_ID = 'FILTERS_SETTINGS';

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
    getAllEmployeesHttp({ queryParams: filters });
  };
  //#endregion

  const openCloseFiltersDrawer = (drawerState: FiltersDrawer) => dispatch(openCloseFiltersDrawerAction(drawerState));

  //Update filter settings, in local storage.
  const storeFilterSettings = (filters: UseGetAllEmployeesQueryParams) => {
    setFilterSettings({ ...filterSettings, ...filters });
  };

  // Clear filter settings, in FilterDrawer component.
  const clearFilterSettings = () => {
    setFilterSettings({ searchString: filterSettings?.searchString });

    getAllEmployeesHttp({ queryParams: { searchString: filterSettings?.searchString } });
  };

  const setInteractiveMode = (interactiveMode: InterActiveMode) => dispatch(setInteractiveModeAction(interactiveMode));
  return (
    <EmployeesStateContext.Provider value={{ ...state, isFetchingAllEmployees, filterSettings }}>
      <EmployeesActionsContext.Provider
        value={{
          getAllEmployees,
          openCloseFiltersDrawer,
          storeFilterSettings,
          clearFilterSettings,
          setInteractiveMode,
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
