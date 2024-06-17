import { FC } from "react";
import { StyledTitle } from "./styles";
import { Typography } from "antd";

export interface TitleProps {}

const { Title, Text } = Typography;

export const PageTitle: FC<TitleProps> = ({}) => {
  return (
    <StyledTitle className="employee-page-title">
      <Title level={5}>Employees Directory</Title>
      <Text code>There are No. employees</Text>
    </StyledTitle>
  );
};

export default PageTitle;
