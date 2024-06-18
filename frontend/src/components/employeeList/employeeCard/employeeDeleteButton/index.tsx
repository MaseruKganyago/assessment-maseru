import { useEmployeesDelete } from '@/api/employees';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, message } from 'antd';
import { FC } from 'react';

interface IEmployeeDeketeButtonProps {
  id: string;
  postDelete: (id: string) => void;
}

const { confirm } = Modal;

const EmployeeDeleteButton: FC<IEmployeeDeketeButtonProps> = ({ id, postDelete }) => {
  const { mutate: deleteEmployeeHttp } = useEmployeesDelete({ queryParams: { id } });

  const showPromiseConfirm = () => {
    confirm({
      title: 'Delete employee',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure you want to delete this employee?',
      okType: 'danger',
      okText: 'Delete',
      onOk() {
        return deleteEmployeeHttp()
          .then(() => postDelete(id))
          .catch(() => {
            message.error('Failed to delete employee');
          });
      },
    });
  };
  return (
    <Button type="link" onClick={showPromiseConfirm}>
      <DeleteOutlined />
    </Button>
  );
};

export default EmployeeDeleteButton;
