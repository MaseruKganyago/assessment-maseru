import { DATE_FORMAT } from '@/app-constants';
import { DatePicker, Divider, Form, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib';
import { FC, useState } from 'react';
import { FormRow } from '@/components';
import { useEmployees } from '@/providers';

interface CreateUpdateEmployeeFormProps {
  form: FormInstance;
}

const FormItem = Form.Item;

const CreateUpdateEmployeeForm: FC<CreateUpdateEmployeeFormProps> = ({ form }) => {
  const { interactiveMode } = useEmployees();
  const isCreateMode = interactiveMode === 'create'; //On Create mode, only First Name and Last Name are required

  const [email, setEmail] = useState<string>('');
  const handleEmailChange = (email: string) => {
    //Remove white spaces from email
    setEmail(email.trim());
  };

  return (
    <Form layout="vertical" size="small" requiredMark form={form}>
      <Divider orientation="left">Basic Information</Divider>
      <FormRow
        leftCol={
          <FormItem label="First Name" name="firstName" rules={[{ required: isCreateMode }]}>
            <Input />
          </FormItem>
        }
        rightCol={
          <FormItem label="Last Name" name="lastName" rules={[{ required: isCreateMode }]}>
            <Input />
          </FormItem>
        }
      />

      <FormItem label="Contact Number" name="phoneNumber" rules={[{ required: !isCreateMode }]}>
        <Input />
      </FormItem>

      <FormItem label="Email Address" name="email" rules={[{ required: !isCreateMode }]}>
        <Input />
      </FormItem>

      <FormRow
        leftCol={
          <FormItem label="Date of Birth" name="dateOfBirth" rules={[{ required: !isCreateMode }]}>
            <DatePicker format={DATE_FORMAT} />
          </FormItem>
        }
      />

      <Divider orientation="left">Address</Divider>
      <FormItem label="Street Address" name="address" rules={[{ required: !isCreateMode }]}>
        <Input />
      </FormItem>

      <FormRow
        leftCol={
          <FormRow
            leftCol={
              <FormItem label="City" name="city" rules={[{ required: !isCreateMode }]}>
                <Input />
              </FormItem>
            }
            rightCol={
              <FormItem label="Postal code" name="postalCode" rules={[{ required: !isCreateMode }]}>
                <InputNumber />
              </FormItem>
            }
          />
        }
        rightCol={
          <FormItem label="Country" name="country" rules={[{ required: !isCreateMode }]}>
            <Input />
          </FormItem>
        }
      />
    </Form>
  );
};

export default CreateUpdateEmployeeForm;
