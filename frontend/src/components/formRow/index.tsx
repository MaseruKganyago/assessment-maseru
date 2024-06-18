import { Col, Row } from 'antd';
import React, { FC, ReactNode } from 'react';

interface IFormRowProps {
  leftCol?: ReactNode;
  rightCol?: ReactNode;
}

const FormRow: FC<IFormRowProps> = ({ leftCol, rightCol }) => {
  const gutter = [12, 12];

  return (
    // @ts-ignore
    <Row gutter={Array.isArray(gutter) && gutter?.length === 2 ? [gutter[0], gutter[1] / 2] : gutter}>
      <Col span={12}>{leftCol}</Col>
      <Col span={12}>{rightCol}</Col>
    </Row>
  );
};

export default FormRow;
