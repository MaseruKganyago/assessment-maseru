import { UseGetProps, UseMutateProps, useGet, useMutate } from 'restful-react';

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
  dateOfBirth?: any | null;
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

export interface EmployeeAjaxResponse {
  result?: EmployeeDto | null;
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface EmployeeListAjaxResponse {
  result?: EmployeeDto[] | null;
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface UseEmployeesGetAllQueryParams {
  searchString?: string | null;
  dateOfBirth?: any | null;
  skillName?: string | null;
  skillLevel?: number | null;
  yearsOfExperience?: number | null;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface EmployeesGetQueryParams {
  id?: string;
}
export type UseEmployeesGetProps = Omit<
  UseGetProps<EmployeeAjaxResponse, ErrorInfo, EmployeesGetQueryParams, void>,
  'path'
>;

export const useEmployeesGet = (props: UseEmployeesGetProps) =>
  useGet<EmployeeAjaxResponse, ErrorInfo, EmployeesGetQueryParams, void>(
    `/api/services/Assesment/Employees/Get`,
    props
  );

export type UseEmployeesGetAllProps = Omit<
  UseGetProps<EmployeeListAjaxResponse, ErrorInfo, UseEmployeesGetAllQueryParams, void>,
  'path'
>;

export const useEmployeesGetAll = (props: UseEmployeesGetAllProps) =>
  useGet<EmployeeListAjaxResponse, ErrorInfo, UseEmployeesGetAllQueryParams, void>(
    '/api/services/Assesment/Employees/GetAll',
    props
  );

export type UseEmployeesCreateProps = Omit<
  UseMutateProps<EmployeeListAjaxResponse, ErrorInfo, void, EmployeeDto, void>,
  'path' | 'verb'
>;

export const useEmployeesCreate = (props: UseEmployeesCreateProps) =>
  useMutate<EmployeeListAjaxResponse, AjaxResponseBase, void, EmployeeDto>(
    'POST',
    `/api/services/Assesment/Employees/Create`,
    props
  );

export type UseEmployeesUpdateProps = Omit<
  UseMutateProps<EmployeeListAjaxResponse, ErrorInfo, void, EmployeeDto, void>,
  'path' | 'verb'
>;

export const useEmployeesUpdate = (props: UseEmployeesCreateProps) =>
  useMutate<EmployeeListAjaxResponse, AjaxResponseBase, void, EmployeeDto>(
    'PUT',
    `/api/services/Assesment/Employees/Update`,
    props
  );
