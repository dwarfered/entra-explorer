"use client";

import CredentialStatusGrid from "@/components/app-registrations/CredentialStatusGrid";
import IconCertificatesAndSecrets from "@/components/styling/icons/IconCertificatesAndSecrets";
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

export default function CredentialStatus() {
  const styles = useStyles();
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
      <Title3 className={styles.toolbar}><IconCertificatesAndSecrets /> Application Registrations | <Body2>Certificates & Secrets</Body2> </Title3>
      <p>All Application Registrations that include certificates and secrets.</p>
      <CredentialStatusGrid />
    </>
  );
}