import { useEmployees } from '@/providers';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Modal, message } from 'antd';
import { FC, useState } from 'react';
import { CreateUpdateEmployeeForm, ValidationErrors } from '@/components';
import { useEmployeesCreate } from '@/api/employees';
import { Moment } from 'moment';

interface INewEmployeeButtonProps {}

const NewEmployeeButtonModal: FC<INewEmployeeButtonProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);

  const { setInteractiveMode, getAllEmployees } = useEmployees();

  const [form] = Form.useForm();

  const { mutate: createEmployeeHttp, loading, error } = useEmployeesCreate({});

  const handleOnNewEmployeeClick = () => {
    setOpen(!open);
    setInteractiveMode('create');
  };

  const handleOnOk = () => {
    form.validateFields().then((values) => {
      const payload = { ...values, dateOfBirth: (values?.dateOfBirth as unknown as Moment)?.toISOString(true) };

      createEmployeeHttp(payload).then(() => {
        setOpen(!open);
        form.resetFields();

        getAllEmployees();
        message.success('Employee created successfully');
      });
    });
  };

  const handleCancel = () => {
    setOpen(!open);
  };
  return (
    <>
      <Button type="primary" onClick={handleOnNewEmployeeClick}>
        <PlusCircleOutlined />
        New Employee
      </Button>

      <Modal
        title="New Employee"
        open={open}
        width={700}
        loading={loading}
        okText="Save"
        onOk={handleOnOk}
        onCancel={handleCancel}
      >
        <ValidationErrors error={error} />
        <CreateUpdateEmployeeForm form={form} />
      </Modal>
    </>
  );
};

export default NewEmployeeButtonModal;
