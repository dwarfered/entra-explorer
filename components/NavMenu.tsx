import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Body1,
  Body1Strong,
  Button,
  Divider,
  tokens,
  Toolbar,
  ToolbarGroup,
} from "@fluentui/react-components";
import { DividerTallFilled, HomeRegular } from "@fluentui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import IconAppRegistrations from "./styling/icons/IconAppRegistrations";
import IconEnterpriseApps from "./styling/icons/IconEnterpriseApps";

export default function NavMenu() {
  const router = useRouter();

  const pathname = usePathname(); // Get the current route

  const activeStyle = {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground2BrandSelected,
  };

  return (
    <Toolbar aria-label="with Separeted Groups">
      <ToolbarGroup role="presentation" style={{ width: "100%" }}>
        <Button
          onClick={() => {
            router.push("/");
          }}
          shape="square"
          appearance="subtle"
          icon={<HomeRegular />}
          style={{
            width: "100%",
            justifyContent: "flex-start", // This aligns the button content to the left
            display: "flex", // Ensures flexbox layout for content alignment,
            ...(pathname === "/" ? activeStyle : {}),
          }}
        >
          <Body1Strong> Home</Body1Strong>
        </Button>
        <Divider />

        {/* <AuthenticatedTemplate> */}
        <Accordion defaultOpenItems="1">
          <AccordionItem value="1">
            <AccordionHeader
              icon={<IconAppRegistrations />}
              expandIconPosition="end"
            >
              <Body1Strong>App Registrations</Body1Strong>
            </AccordionHeader>
            <AccordionPanel>
              <Button
                icon={
                  pathname === "/app-registrations/creations" ? (
                    <DividerTallFilled
                      style={{
                        transform: "scaleX(2)",
                      }}
                    />
                  ) : undefined
                }
                onClick={() =>
                  router.push("/app-registrations/creations")
                }
                shape="square"
                appearance="subtle"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  display: "flex",
                  ...(pathname === "/app-registrations/creations"
                    ? activeStyle
                    : {}),
                }}
              >
                <Body1>Creations</Body1>
              </Button>
              <Button
                icon={
                  pathname === "/app-registrations/certificates-and-secrets" ? (
                    <DividerTallFilled
                      style={{
                        transform: "scaleX(2)",
                      }}
                    />
                  ) : undefined
                }
                onClick={() =>
                  router.push("/app-registrations/certificates-and-secrets")
                }
                shape="square"
                appearance="subtle"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  display: "flex",
                  ...(pathname === "/app-registrations/certificates-and-secrets"
                    ? activeStyle
                    : {}),
                }}
              >
                <Body1>Certificates & secrets</Body1>
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* </AuthenticatedTemplate> */}
        <Accordion defaultOpenItems="1">
          <AccordionItem value="1">
            <AccordionHeader
              icon={<IconEnterpriseApps />}
              expandIconPosition="end"
            >
              <Body1Strong>Enterprise Applications</Body1Strong>
            </AccordionHeader>
            <AccordionPanel>
              <Button
                icon={
                  pathname ===
                  "/enterprise-applications/app-role-permissions" ? (
                    <DividerTallFilled
                      style={{
                        transform: "scaleX(2)",
                      }}
                    />
                  ) : undefined
                }
                onClick={() =>
                  router.push("/enterprise-applications/app-role-permissions")
                }
                shape="square"
                appearance="subtle"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  display: "flex",
                  ...(pathname ===
                  "/enterprise-applications/app-role-permissions"
                    ? activeStyle
                    : {}),
                }}
              >
                <Body1>App role permissions</Body1>
              </Button>
              <Button
                icon={
                  pathname ===
                  "/enterprise-applications/saml-certificate-expiry-status" ? (
                    <DividerTallFilled
                      style={{
                        transform: "scaleX(2)",
                      }}
                    />
                  ) : undefined
                }
                onClick={() =>
                  router.push(
                    "/enterprise-applications/saml-certificate-expiry-status"
                  )
                }
                shape="square"
                appearance="subtle"
                style={{
                  width: "100%",
                  justifyContent: "flex-start",
                  display: "flex",
                  ...(pathname ===
                  "/enterprise-applications/saml-certificate-expiry-status"
                    ? activeStyle
                    : {}),
                }}
              >
                <Body1>SAML certificate status</Body1>
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </ToolbarGroup>
      <ToolbarGroup role="presentation"></ToolbarGroup>
    </Toolbar>
  );
}
