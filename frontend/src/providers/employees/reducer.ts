import { EmployeesActionEnums } from './actions';
import { IEmployeesStateContext } from './contexts';

export function employeesReducer(
  state: IEmployeesStateContext,
  action: ReduxActions.Action<IEmployeesStateContext>
): IEmployeesStateContext {
  const { type, payload } = action;

  switch (type) {
    case EmployeesActionEnums.GetAllEmployees:
    case EmployeesActionEnums.GetAllEmployeesSuccess:
    case EmployeesActionEnums.GetAllEmployeesError:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
