import { SkillLevelDropDown } from '@/components';
import { useEmployees } from '@/providers';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import { FC } from 'react';

interface ISkillsFormListProps {}

const FormList = Form.List;
const FormItem = Form.Item;

export const SkillsFormList: FC<ISkillsFormListProps> = () => {
  const { interactiveMode } = useEmployees();
  const isCreateMode = interactiveMode === 'create';

  return (
    <FormList name="skills">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <FormItem {...restField} name={[name, 'name']} rules={[{ required: !isCreateMode }]}>
                <Input placeholder="Skill Name" />
              </FormItem>

              <FormItem {...restField} name={[name, 'yearsOfExperience']} rules={[{ required: !isCreateMode }]}>
                <InputNumber placeholder="Yrs Exp" />
              </FormItem>

              <FormItem {...restField} name={[name, 'skillLevel']} rules={[{ required: !isCreateMode }]}>
                <SkillLevelDropDown placeholder="Seniority rating" />
              </FormItem>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add New Skill
            </Button>
          </Form.Item>
        </>
      )}
    </FormList>
  );
};

export default SkillsFormList;
