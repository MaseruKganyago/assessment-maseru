import { useEmployees } from '@/providers';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { FC, useState } from 'react';

interface INewEmployeeButtonProps {}

const NewEmployeeButtonModal: FC<INewEmployeeButtonProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { setInteractiveMode } = useEmployees();

  const handleOnNewEmployeeClick = () => {
    setOpen(!open);
    setInteractiveMode('create');
  };

  const handleOnOk = () => {};

  const handleCancel = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button type="primary" onClick={handleOnNewEmployeeClick}>
        <PlusCircleOutlined />
        New Employee
      </Button>

      <Modal title="New Employee" open={open} onOk={handleOnOk} onCancel={handleCancel}></Modal>
    </>
  );
};

export default NewEmployeeButtonModal;
