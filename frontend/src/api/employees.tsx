import { UseGetProps, useGet } from 'restful-react';

export interface ReferenceListItemValueDto {
  item?: string | null;
  itemValue?: number | null;
}

export interface GuidNullableEntityReferenceDto {
  id?: string | null;
  _displayName?: string | null;
  _className?: string | null;
}

export interface SkillDto {
  id?: string | null;
  name?: string | null;
  yearsOfExperience?: number | null;
  skillLevel?: ReferenceListItemValueDto | null;
  employee?: GuidNullableEntityReferenceDto | null;
}

export interface EmployeeDto {
  id?: string | null;
  employeeId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  postalCode?: number | null;
  postalCodeString?: string | null;
  country?: string | null;
  skills?: SkillDto[] | null;
}

export interface ValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: ValidationErrorInfo[] | null;
}

export interface EmployeeListAjaxResponse {
  result?: EmployeeDto[] | null;
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface UseGetAllEmployeesQueryParams {
  searchString?: string | null;
  dateOfBirth?: string | null;
  skillName?: string | null;
  skillLevel?: number | null;
  yearsOfExperience?: number | null;
}

export type UseGetAllEmployeesProps = Omit<
  UseGetProps<EmployeeListAjaxResponse, ErrorInfo, UseGetAllEmployeesQueryParams, void>,
  'path'
>;

export const useGetAllEmployees = (props: UseGetAllEmployeesProps) =>
  useGet<EmployeeListAjaxResponse, ErrorInfo, UseGetAllEmployeesQueryParams, void>(
    '/api/services/Assesment/Employees/GetAll',
    props
  );
