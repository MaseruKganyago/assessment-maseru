import { FC, PropsWithChildren, use, useContext, useEffect, useReducer } from 'react';
import { employeesReducer } from './reducer';
import { EMPLOYEES_CONTEXT_INITIAL_STATE, EmployeesActionsContext, EmployeesStateContext } from './contexts';
import { UseGetAllEmployeesQueryParams, useGetAllEmployees } from '@/api/employees';
import { getAllEmployeesErrorAction, getAllEmployeesSuccessAction } from './actions';

const EmployeesProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(employeesReducer, EMPLOYEES_CONTEXT_INITIAL_STATE);

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

  return (
    <EmployeesStateContext.Provider value={{ ...state, isFetchingAllEmployees }}>
      <EmployeesActionsContext.Provider value={{ getAllEmployees }}>{children}</EmployeesActionsContext.Provider>
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
