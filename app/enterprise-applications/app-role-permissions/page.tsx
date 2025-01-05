"use client";

import AppRolePermissionsGrid from "@/components/enterprise-applications/app-role-permissions-grid/AppRolePermissionsGrid";
import IconPermissions from "@/components/styling/icons/IconPermissions";
import { useGlobalStyles } from "@/lib/utils/fluentuiHelper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Title3,
  Body2,
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
          <BreadcrumbButton current>Enterprise Applications</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title3>
        <IconPermissions /> Enterprise Applications |{" "}
        <Body2>App role permissions</Body2>{" "}
      </Title3>
      <h1 className={styles.h1}><Body1>All Enterprise Applications with assigned application roles.</Body1></h1>
      <AppRolePermissionsGrid />
    </>
  );
}
