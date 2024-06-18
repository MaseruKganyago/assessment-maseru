import { useEmployees } from '@/providers';
import { Form, Modal, message } from 'antd';
import { FC } from 'react';
import { CreateUpdateEmployeeForm, ValidationErrors } from '@/components';
import { useEmployeesUpdate } from '@/api/employees';

interface IUpdateEmployeeModalProps {}

const UpdateEmployeeModal: FC<IUpdateEmployeeModalProps> = ({}) => {
  const { interactiveMode, setInteractiveMode, storeEmployeeId, employeeId, getAllEmployees, filterSettings } =
    useEmployees();

  const { mutate: updateEmployeeHttp, loading, error } = useEmployeesUpdate({});

  const isUpdateMode = interactiveMode === 'edit';

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const payload = { ...values, id: employeeId };

      updateEmployeeHttp(payload).then(() => {
        message.success('Employee updated successfully');

        getAllEmployees(filterSettings);
        handleCancel();
      });
    });
  };

  const handleCancel = () => {
    setInteractiveMode(null);
    storeEmployeeId(null);
  };

  return (
    <Modal
      title="Update Employee"
      open={isUpdateMode}
      width={700}
      destroyOnClose
      loading={loading}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <ValidationErrors error={error} />
      <CreateUpdateEmployeeForm form={form} />
    </Modal>
  );
};

export default UpdateEmployeeModal;
