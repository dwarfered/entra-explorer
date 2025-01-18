import {
  Link,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  tokens,
} from "@fluentui/react-components";
import {
  CheckmarkCircleFilled,
  FluentIconsProps,
  WarningFilled,
} from "@fluentui/react-icons";
import { GridItem } from "./AppRegCreations.data-model";

const validIconStyleProps: FluentIconsProps = {
  primaryFill: tokens.colorPaletteLightGreenForeground1,
  className: "iconClass",
};

const warningIconStyleProps: FluentIconsProps = {
  primaryFill: tokens.colorPaletteMarigoldForeground3,
  className: "iconClass",
};

export const tableColumns = (
  isAuthenticated: boolean
): TableColumnDefinition<GridItem>[] => [
  createTableColumn<GridItem>({
    columnId: "displayName",
    compare: (a, b) => a.displayName.localeCompare(b.displayName),
    renderHeaderCell: () => "Display name",
    renderCell: (item) => {
      const link = isAuthenticated
        ? `https://entra.microsoft.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Credentials/appId/${item.appId}`
        : undefined;
      return (
        <TableCellLayout>
          <Link target="_blank" href={link}>
            {item.displayName}
          </Link>
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "signInAudience",
    compare: (a, b) => a.signInAudience.localeCompare(b.signInAudience),
    renderHeaderCell: () => "Sign In Audience",
    renderCell: (item) => {
      if (item.signInAudience === "AzureADMyOrg") {
        return (
          <TableCellLayout
            media={<CheckmarkCircleFilled {...validIconStyleProps} />}
          >
            {item.signInAudience}
          </TableCellLayout>
        );
      }

      return (
        <TableCellLayout media={<WarningFilled {...warningIconStyleProps} />}>
          {item.signInAudience}
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "createdDateTime",
    compare: (a, b) => {
      const dateA = new Date(a.createdDateTime);
      const dateB = new Date(b.createdDateTime);
      return dateA.getTime() - dateB.getTime();
    },
    renderHeaderCell: () => {
      return "Created";
    },
    renderCell: (item) => {
      const created = new Date(item.createdDateTime);

      return <TableCellLayout>{created.toLocaleString()}</TableCellLayout>;
    },
  }),
];
