import React, { FC } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { nanoid } from 'nanoid';
import { SKILL_LEVELS } from '@/app-constants';
import { ReferenceListItemValueDto } from '@/api/employees';

interface ISkillLevelDropDownProps extends SelectProps<any> {
  useRaw?: boolean;
}

const SkillLevelDropDown: FC<ISkillLevelDropDownProps> = ({ useRaw = false, value, onChange, ...rest }) => {
  const options = SKILL_LEVELS?.map((d) => (
    <Select.Option value={d.itemValue} key={nanoid()}>
      {d.item}
    </Select.Option>
  ));

  const handleChange = (incomingValue: any, option: any) => {
    if (!useRaw) {
      let valueToReturn = incomingValue;

      if (Array.isArray(incomingValue)) {
        valueToReturn = (incomingValue as number[]).map<ReferenceListItemValueDto>((val) => ({
          itemValue: val,
          value: val,
        }));
      } else {
        valueToReturn = { itemValue: incomingValue, value: incomingValue };
      }

      if (onChange) {
        onChange(valueToReturn, option);
      }
    } else onChange && onChange(incomingValue, option);
  };

  const getValue = () => {
    if (Array.isArray(value)) {
      return typeof value[0] === 'number' ? value : value?.map((a) => a?.value ?? a?.itemValue);
    }
    return typeof value === 'number' ? value : value?.value ?? value?.itemValue;
  };

  return (
    <Select
      showSearch
      defaultActiveFirstOption={false}
      notFoundContent={null}
      allowClear={true}
      value={getValue()}
      onChange={handleChange}
      {...rest}
    >
      {options}
    </Select>
  );
};

export default SkillLevelDropDown;
