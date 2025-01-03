import {
  Link,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  tokens,
} from "@fluentui/react-components";
import { GridItem } from "./SamlStatusGrid.data-model";
import {
  CheckmarkCircleFilled,
  ErrorCircleFilled,
  FluentIconsProps,
  WarningFilled,
} from "@fluentui/react-icons";

const validIconStyleProps: FluentIconsProps = {
  primaryFill: tokens.colorPaletteLightGreenForeground1,
  className: "iconClass",
};

const errorIconStyleProps: FluentIconsProps = {
  primaryFill: tokens.colorPaletteRedForeground1,
  className: "iconClass",
};

const warningIconStyleProps: FluentIconsProps = {
  primaryFill: tokens.colorPaletteMarigoldForeground3,
  className: "iconClass",
};

export const samlStatusColumns = (
  isAuthenticated: boolean
): TableColumnDefinition<GridItem>[] => [
  createTableColumn<GridItem>({
    columnId: "displayName",
    compare: (a, b) => a.appDisplayName.localeCompare(b.appDisplayName),
    renderHeaderCell: () => "App Display name",
    renderCell: (item) => {
      const link = isAuthenticated
        ? `https://entra.microsoft.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/SignOn/objectId/${item.id}/appId/${item.appId}/preferredSingleSignOnMode/saml/servicePrincipalType/Application/fromNav/`
        : undefined;
      return (
        <TableCellLayout>
          <Link target="_blank" href={link}>
            {item.appDisplayName}
          </Link>
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "expiry",
    compare: (a, b) => {
      const dateA = new Date(a.preferredTokenSigningKeyEndDateTime);
      const dateB = new Date(b.preferredTokenSigningKeyEndDateTime);
      return dateA.getTime() - dateB.getTime();
    },
    renderHeaderCell: () => "SAML Certificate Expiry Status",
    renderCell: (item) => {
      const expiry = new Date(item.preferredTokenSigningKeyEndDateTime);
      const nowUtc = new Date();
      const warningUtc = new Date();
      warningUtc.setMonth(warningUtc.getMonth() + 2);

      let status;

      if (expiry <= nowUtc) {
        status = "expired";
      } else if (expiry <= warningUtc) {
        status = "warning";
      } else {
        status = "valid";
      }

      switch (status) {
        case "expired":
          return (
            <TableCellLayout
              media={<ErrorCircleFilled {...errorIconStyleProps} />}
            >
              {expiry.toLocaleString()}
            </TableCellLayout>
          );
        case "warning":
          return (
            <TableCellLayout
              media={<WarningFilled {...warningIconStyleProps} />}
            >
              {expiry.toLocaleString()}
            </TableCellLayout>
          );
        case "valid":
          return (
            <TableCellLayout
              media={<CheckmarkCircleFilled {...validIconStyleProps} />}
            >
              {expiry.toLocaleString()}
            </TableCellLayout>
          );
      }
    },
  }),
];
