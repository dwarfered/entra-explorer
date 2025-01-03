"use client";

import IconCertificates from "@/components/styling/icons/IconCertificates";
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
          <BreadcrumbButton current>Enterprise Applications</BreadcrumbButton>
        </BreadcrumbItem>
      </Breadcrumb>
      <Title3 className={styles.toolbar}><IconCertificates /> Enterprise Applications | <Body2>SAML certificate expiry status</Body2> </Title3>
    </>
  );
}