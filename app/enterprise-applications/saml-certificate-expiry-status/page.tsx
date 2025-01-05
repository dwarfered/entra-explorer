"use client";

import SamlStatusGrid from "@/components/enterprise-applications/SamlStatusGrid";
import IconCertificates from "@/components/styling/icons/IconCertificates";
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
        <IconCertificates /> Enterprise Applications |{" "}
        <Body2>SAML certificate expiry dates</Body2>{" "}
      </Title3>
      <h1 className={styles.h1}><Body1>All Enterprise Applications configured for SAML SSO, along with their expiration dates.</Body1></h1>
      <SamlStatusGrid />
    </>
  );
}
