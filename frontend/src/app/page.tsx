'use client';

import { EmployeeList, FiltersDrawer, NewEmployeeButtonModal, PageTitle, SearchInput } from '@/components';
import { StyledBody, StyledHeader, StyledPage } from './styles';
import { FC, useEffect } from 'react';
import { useEmployees } from '@/providers';
import _ from 'lodash';
import { useLocalStorage } from '@/hooks';
import { FILTERS_SETTINGS_ID } from '@/app-constants';

interface IProps {}

const Page: FC<IProps> = ({}) => {
  const { getAllEmployees } = useEmployees();

  //Get filter settings from local storage, directly. As Page runs in client side.
  const [filterSettings] = useLocalStorage(FILTERS_SETTINGS_ID);

  useEffect(() => {
    getAllEmployees(filterSettings);
  }, [filterSettings]);

  return (
    <StyledPage className="employee-page">
      <StyledHeader className="page-header">
        <PageTitle />

        <SearchInput />

        <FiltersDrawer />

        <NewEmployeeButtonModal />
      </StyledHeader>

      <StyledBody className="page-body">
        <EmployeeList />
      </StyledBody>
    </StyledPage>
  );
};

export default Page;
