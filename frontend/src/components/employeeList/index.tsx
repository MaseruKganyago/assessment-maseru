import { List } from 'antd';
import { FC } from 'react';
import EmployeeCard from './employeeCard';
import { useEmployees } from '@/providers';
import _ from 'lodash';

interface IEmployeeListProps {}

const ListItem = List.Item;

const EmployeeList: FC<IEmployeeListProps> = ({}) => {
  const { employees } = useEmployees();

  return (
    <List
      size="large"
      bordered
      dataSource={employees}
      renderItem={(item) => (
        <ListItem>
          <EmployeeCard {...item} />
        </ListItem>
      )}
    />
  );
};

export default EmployeeList;
