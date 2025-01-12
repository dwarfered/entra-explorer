"use client";

import AppRegAnalytics from "@/components/app-registrations/analytics/AppRegAnalytics";
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
      <Title3> Analytics</Title3>

      <h1 className={styles.h1}>
        <Body1>Application Registration analytics.</Body1>
      </h1>
      <h2>Creations</h2>
      <AppRegAnalytics />
    </>
  );
}
