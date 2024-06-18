import { EmployeeDto } from '@/api/employees';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { FC } from 'react';
import { StyledEmployeeCard } from './styles';
import { useEmployees } from '@/providers';
import { UpdateEmployeeModal } from '@/components';
import EmployeeDeleteButton from './employeeDeleteButton';

interface IEmployeeCardProps extends EmployeeDto {}

const { Text } = Typography;

const EmployeeCard: FC<IEmployeeCardProps> = ({ id, employeeId, firstName, lastName, phoneNumber }) => {
  const { setInteractiveMode, storeEmployeeId, filterSettings, getAllEmployees } = useEmployees();

  const handleEdit = () => {
    setInteractiveMode('edit');
    storeEmployeeId(id);
  };
  return (
    <StyledEmployeeCard key={id} className="employee-card">
      <Button type="link" onClick={handleEdit}>
        <EditOutlined />
      </Button>

      <EmployeeDeleteButton id={id} postDelete={() => getAllEmployees(filterSettings)} />

      <Text strong>{employeeId}</Text>

      <Text strong>{firstName}</Text>

      <Text strong>{lastName}</Text>

      <Text strong>{phoneNumber}</Text>

      <UpdateEmployeeModal />
    </StyledEmployeeCard>
  );
};

export default EmployeeCard;
