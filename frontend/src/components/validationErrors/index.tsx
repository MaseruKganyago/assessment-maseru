import { FC } from 'react';
import { Alert } from 'antd';

interface IValidationErrorInfo {
  message?: string | null;
  members?: string | null[] | null;
}

interface IDataError {
  error: IErrorInfo;
}

interface IErrorInfo {
  message?: string | null;
  details?: string | null;
  validationErrors?: IValidationErrorInfo[] | null;
}

interface IAjaxResponseBase {
  success?: boolean;
  data?: IDataError;
}

interface IProps {
  error: any;
}

/**
 * Renders a component to display validation errors.
 * Assumes the error is object of type IErrorInfo, else it will display a generic
 *  error message. ('An unknown error occurred')
 */
export const ValidationErrors: FC<IProps> = ({ error }) => {
  if (typeof error === 'boolean' && error)
    return <Alert message="Sorry an error ocurred while processing your request" type="error" showIcon closable />;

  if (!Boolean(error)) return null;

  const detailedError = error as IAjaxResponseBase;
  if (detailedError !== null) {
    const validationErrors = detailedError?.data?.error?.validationErrors || [];
    return validationErrors.length > 0 ? (
      <Alert
        message="Please correct the errors and try again:"
        description={
          <ul>
            {validationErrors?.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        }
        type="error"
        showIcon
        closable
      />
    ) : (
      <Alert
        message={
          detailedError?.data?.error?.details || detailedError?.data?.error?.message || 'An unknown error occurred'
        }
        type="error"
        showIcon
        closable
      />
    );
  }

  const errorMessage = typeof error === 'string';
  return !Boolean(errorMessage) ? null : <Alert message={errorMessage} type="error" showIcon closable />;
};
export default ValidationErrors;
