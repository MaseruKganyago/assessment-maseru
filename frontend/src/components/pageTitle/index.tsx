import { FC } from 'react';
import { StyledTitle } from './styles';
import { Typography } from 'antd';
import { useEmployees } from '@/providers';

export interface TitleProps {}

const { Title, Text } = Typography;

export const PageTitle: FC<TitleProps> = ({}) => {
  const { employees } = useEmployees();
  const totalEmployees = employees?.length;

  return (
    <StyledTitle className="employee-page-title">
      <Title level={5}>Employees Directory</Title>
      <Text code>
        There is {totalEmployees ?? 0} {totalEmployees > 1 || totalEmployees === 0 ? 'employees' : 'employee'}
      </Text>
    </StyledTitle>
  );
};

export default PageTitle;
