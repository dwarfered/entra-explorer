"use client";

import AppRolePermissionsGrid from "@/components/enterprise-applications/app-role-permissions-grid/AppRolePermissionsGrid";
import IconPermissions from "@/components/styling/icons/IconPermissions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Title3,
  makeStyles,
  shorthands,
  Body2,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  toolbar: {
    ...shorthands.margin("6px"),
  },
});

export default function Page() {
  const styles = useStyles();
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
      <Title3 className={styles.toolbar}>
        <IconPermissions /> Enterprise Applications |{" "}
        <Body2>App role permissions</Body2>{" "}
      </Title3>
      <p>All Enterprise Applications with assigned application roles.</p>
      <AppRolePermissionsGrid />
    </>
  );
}
