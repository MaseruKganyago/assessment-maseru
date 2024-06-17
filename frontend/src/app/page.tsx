"use client";

import { StyledBody, StyledHeader, StyledPage } from "./styles";

const Page = () => {
  return (
    <StyledPage className="employee-page">
      <StyledHeader className="page-header"></StyledHeader>

      <StyledBody className="page-body"></StyledBody>
    </StyledPage>
  );
};

export default Page;
