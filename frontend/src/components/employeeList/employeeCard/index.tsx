import { EmployeeDto } from '@/api/employees';
import { EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { FC } from 'react';
import { StyledEmployeeCard } from './styles';

interface IEmployeeCardProps extends EmployeeDto {}

const { Text } = Typography;

const EmployeeCard: FC<IEmployeeCardProps> = ({ id, employeeId, firstName, lastName, phoneNumber }) => {
  return (
    <StyledEmployeeCard key={id} className="employee-card">
      <Button type="link">
        <EditOutlined />
      </Button>

      <Text strong>{employeeId}</Text>

      <Text strong>{lastName}</Text>

      <Text strong>{firstName}</Text>

      <Text strong>{phoneNumber}</Text>
    </StyledEmployeeCard>
  );
};

export default EmployeeCard;
