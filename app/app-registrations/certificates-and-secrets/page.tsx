"use client";

import CredentialStatusGrid from "@/components/app-registrations/CredentialStatusGrid";
import IconCertificatesAndSecrets from "@/components/styling/icons/IconCertificatesAndSecrets";
import { useGlobalStyles } from "@/lib/utils/fluentuiHelper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Title3,
  Body1,
} from "@fluentui/react-components";

export default function CredentialStatus() {
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
      <Title3><IconCertificatesAndSecrets /> Certificates & secrets</Title3>

      <h1 className={styles.h1}><Body1>All Application Registrations that include certificates and secrets.</Body1></h1>
      <CredentialStatusGrid />
    </>
  );
}