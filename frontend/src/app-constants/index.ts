import { ReferenceListItemValueDto } from '@/api/employees';
import { it } from 'node:test';

export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 8 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 16 },
    sm: { span: 16 },
  },
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const SKILL_LEVELS: ReferenceListItemValueDto[] = [
  {
    item: 'Beginner',
    itemValue: 1,
  },
  {
    item: 'Intermediate',
    itemValue: 2,
  },
  {
    item: 'Expert',
    itemValue: 3,
  },
];
