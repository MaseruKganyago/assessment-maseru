"use client";

import { PageTitle } from "@/components";
import { StyledBody, StyledHeader, StyledPage } from "./styles";

const Page = () => {
  return (
    <StyledPage className="employee-page">
      <StyledHeader className="page-header">
        <PageTitle />
      </StyledHeader>

      <StyledBody className="page-body"></StyledBody>
    </StyledPage>
  );
};

export default Page;
