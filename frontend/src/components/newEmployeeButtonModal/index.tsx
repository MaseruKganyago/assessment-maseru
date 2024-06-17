import { useEmployees } from '@/providers';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Modal } from 'antd';
import { FC, useState } from 'react';
import { CreateUpdateEmployeeForm } from '@/components';

interface INewEmployeeButtonProps {}

const NewEmployeeButtonModal: FC<INewEmployeeButtonProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { setInteractiveMode } = useEmployees();

  const [form] = Form.useForm();

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

      <Modal title="New Employee" open={open} width={700} onOk={handleOnOk} onCancel={handleCancel}>
        <CreateUpdateEmployeeForm form={form} />
      </Modal>
    </>
  );
};

export default NewEmployeeButtonModal;
