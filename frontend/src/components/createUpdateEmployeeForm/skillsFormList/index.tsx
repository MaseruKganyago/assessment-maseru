import { SkillDto, useSkillDelete } from '@/api/employees';
import { SkillLevelDropDown } from '@/components';
import { useEmployees } from '@/providers';
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Space, message } from 'antd';
import { FC, useState } from 'react';

interface ISkillsFormListProps {
  skills: SkillDto[];
}

const FormList = Form.List;
const FormItem = Form.Item;
const { confirm } = Modal;

export const SkillsFormList: FC<ISkillsFormListProps> = ({ skills }) => {
  const { interactiveMode } = useEmployees();
  const isCreateMode = interactiveMode === 'create';
  const [localSkills, setLocalSkills] = useState<SkillDto[]>(skills);

  const { mutate: deleteSkillHttp } = useSkillDelete({});

  /**
   * Handles the removal of a skill from the skills list.
   * If the skill has an id and the form is not in create mode, a confirmation dialog is shown before deleting the skill.
   * If the skill is successfully deleted, the skill is removed from the local skills array.
   */
  const handleSkillRemove = (index: number, remove: (index: number | number[]) => void) => {
    const skill = localSkills[index];
    if (skill?.id && !isCreateMode) {
      confirm({
        title: 'Delete Skill',
        icon: <ExclamationCircleFilled />,
        content: 'Are you sure you want to delete this skill?',
        onOk() {
          return deleteSkillHttp(null, { queryParams: { id: skill?.id } })
            .then(() => {
              message.success('Skill deleted successfully');
              remove(index);
              setLocalSkills((prev) => prev.filter((_, i) => i !== index));
            })
            .catch(() => message.error('Failed to delete skill'));
        },
      });
    } else {
      remove(index);
      setLocalSkills((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <FormList name="skills">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
              <FormItem
                {...restField}
                name={[name, 'name']}
                rules={[{ required: !isCreateMode, message: 'Required!' }]}
              >
                <Input placeholder="Skill Name" />
              </FormItem>

              <FormItem
                {...restField}
                name={[name, 'yearsOfExperience']}
                rules={[{ required: !isCreateMode, message: 'Required!' }]}
              >
                <InputNumber placeholder="Yrs Exp" />
              </FormItem>

              <FormItem
                {...restField}
                name={[name, 'skillLevel']}
                rules={[{ required: !isCreateMode, message: 'Required!' }]}
              >
                <SkillLevelDropDown placeholder="Seniority rating" />
              </FormItem>
              <MinusCircleOutlined onClick={() => handleSkillRemove(name, remove)} />
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
