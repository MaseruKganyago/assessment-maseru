import { useEmployees } from '@/providers';
import { Button, DatePicker, Divider, Drawer, Form, FormInstance, Input, InputNumber, Space } from 'antd';
import { FC, useEffect } from 'react';
import { SkillLevelDropDown } from '@/components';
import { FilterOutlined } from '@ant-design/icons';
import { UseGetAllEmployeesQueryParams } from '@/api/employees';
import moment, { Moment } from 'moment';
import _ from 'lodash';

interface IFilterDrawerProps {}

export const FiltersDrawer: FC<IFilterDrawerProps> = ({}) => {
  const { drawerState, openCloseFiltersDrawer, getAllEmployees, filterSettings, clearFilterSettings } = useEmployees();

  const [form] = Form.useForm<UseGetAllEmployeesQueryParams>();

  useEffect(() => {
    // Remove search string from filter settings, as it is not needed in filters drawer.
    delete filterSettings?.searchString;

    if (!_.isEmpty(filterSettings)) {
      filterSettings.dateOfBirth = moment(filterSettings?.dateOfBirth);

      // Set form values, with dateOfBirth as moment object.
      form.setFieldsValue({ ...filterSettings, dateOfBirth: moment(filterSettings?.dateOfBirth) });
    } else {
      form.resetFields();
    }
  }, [filterSettings]);

  const onApplyFilters = () => {
    const formValues = form.getFieldsValue();
    const dateString = (formValues?.dateOfBirth as unknown as Moment)?.toISOString(true);

    //Send request to get all employees with dateOfBirth as a string.
    getAllEmployees({ ...formValues, dateOfBirth: dateString });
  };

  const onClearFilters = () => {
    clearFilterSettings();
    openCloseFiltersDrawer('closed');
  };

  const filterButton = () => (
    <Button type="link" onClick={() => openCloseFiltersDrawer('open')}>
      Filter <FilterOutlined />
    </Button>
  );

  const extraButtons = () => (
    <Space>
      <Button onClick={onClearFilters}>Clear</Button>
      <Button type="primary" onClick={onApplyFilters}>
        Apply
      </Button>
    </Space>
  );

  return (
    <>
      {filterButton()}
      <Drawer
        title="Filters"
        placement="right"
        size="default"
        closable={true}
        onClose={() => openCloseFiltersDrawer('closed')}
        open={drawerState === 'open'}
        width={400}
        extra={extraButtons()}
      >
        <FiltersForm form={form} />
      </Drawer>
    </>
  );
};

export default FiltersDrawer;

interface IFiltersFormProps {
  form: FormInstance;
}

const FormItem = Form.Item;

const FiltersForm: FC<IFiltersFormProps> = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <FormItem label="Date of birth" name="dateOfBirth">
        <DatePicker picker="year" />
      </FormItem>

      <Divider orientation="left">Skill Filters</Divider>

      <FormItem label="Skill Name" name="skillName">
        <Input />
      </FormItem>

      <FormItem label="Skill Level" name="skillLevel">
        <SkillLevelDropDown useRaw />
      </FormItem>

      <FormItem label="Years of Experience" name="yearsOfExperience">
        <InputNumber />
      </FormItem>
    </Form>
  );
};
