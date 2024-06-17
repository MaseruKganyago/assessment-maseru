'use client';

import { PageTitle } from '@/components';
import { StyledBody, StyledHeader, StyledPage } from './styles';
import { FC, useEffect } from 'react';
import { useEmployees } from '@/providers';

interface IProps {}

const Page: FC<IProps> = ({}) => {
  const { getAllEmployees } = useEmployees();

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <StyledPage className="employee-page">
      <StyledHeader className="page-header">
        <PageTitle />
      </StyledHeader>

      <StyledBody className="page-body"></StyledBody>
    </StyledPage>
  );
};

export default Page;
