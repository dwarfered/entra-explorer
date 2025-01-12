"use client";

import AppRegCreations from "@/components/app-registrations/creations/AppRegCreations";
import { useGlobalStyles } from "@/lib/utils/fluentuiHelper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Title3,
  Body1,
} from "@fluentui/react-components";

export default function Page() {
  const styles = useGlobalStyles();
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbButton>Entra Explorer</BreadcrumbButton>
        </BreadcrumbItem>
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <BreadcrumbButton current>App Registrations</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title3> Creations</Title3>

      <h1 className={styles.h1}>
        <Body1>All Application Registrations.</Body1>
      </h1>
      <AppRegCreations />
    </>
  );
}
