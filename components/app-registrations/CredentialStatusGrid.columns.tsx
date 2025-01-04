import {
  Link,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  tokens,
} from "@fluentui/react-components";
import { GridItem } from "./CredentialStatusGrid.data-model";
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

function getActiveCredentialsCount(item: GridItem): number {
  return (
    item.activePasswordCredentials.length + item.activeKeyCredentials.length
  );
}

function getExpiredCredentialsCount(item: GridItem): number {
  return (
    item.expiredPasswordCredentials.length + item.expiredKeyCredentials.length
  );
}

function getLongLivedCredentialsCount(item: GridItem): number {
  return (
    item.longLivedKeyCredentials.length +
    item.longLivedPasswordCredentials.length
  );
}

function getWarningDates(item: GridItem): Date[] {
  const allWarningTimes = [
    ...item.warningPasswordCredentials.map((x) =>
      new Date(x.endDateTime).getTime()
    ),
    ...item.warningKeyCredentials.map((x) => new Date(x.endDateTime).getTime()),
  ].filter((time) => !isNaN(time)); // Filter out invalid dates

  return allWarningTimes
    .map((t) => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());
}

function getEarliestWarningDate(item: GridItem): Date | null {
  const dates = getWarningDates(item);
  return dates.length > 0 ? dates[0] : null;
}

export const credentialStatusColumns = (
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
    columnId: "active",
    compare: (a, b) =>
      getActiveCredentialsCount(a) - getActiveCredentialsCount(b),
    renderHeaderCell: () => "Active",
    renderCell: (item) => {
      const activeCount = getActiveCredentialsCount(item);

      if (activeCount === 0) {
        return (
          <TableCellLayout
            media={<ErrorCircleFilled {...errorIconStyleProps} />}
          >
            0
          </TableCellLayout>
        );
      }

      if (activeCount === 1) {
        return (
          <TableCellLayout
            media={<CheckmarkCircleFilled {...validIconStyleProps} />}
          >
            {activeCount}
          </TableCellLayout>
        );
      }

      return (
        <TableCellLayout media={<WarningFilled {...warningIconStyleProps} />}>
          {activeCount}
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "expired",
    compare: (a, b) =>
      getExpiredCredentialsCount(a) - getExpiredCredentialsCount(b),
    renderHeaderCell: () => "Expired",
    renderCell: (item) => {
      const expiredCount = getExpiredCredentialsCount(item);

      if (expiredCount === 0) {
        return (
          <TableCellLayout
            media={<ErrorCircleFilled {...errorIconStyleProps} />}
          >
            0
          </TableCellLayout>
        );
      }

      return (
        <TableCellLayout media={<WarningFilled {...warningIconStyleProps} />}>
          {expiredCount}
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "longLived",
    compare: (a, b) =>
      getLongLivedCredentialsCount(a) - getLongLivedCredentialsCount(b),
    renderHeaderCell: () => "Long-lived",
    renderCell: (item) => {
      const count = getLongLivedCredentialsCount(item);

      if (count === 0) {
        return (
          <TableCellLayout
            media={<CheckmarkCircleFilled {...validIconStyleProps} />}
          >
            0
          </TableCellLayout>
        );
      }

      return (
        <TableCellLayout media={<ErrorCircleFilled {...errorIconStyleProps} />}>
          {count}
        </TableCellLayout>
      );
    },
  }),

  createTableColumn<GridItem>({
    columnId: "warnCredential",
    compare: (a, b) => {
      const earliestA = getEarliestWarningDate(a);
      const earliestB = getEarliestWarningDate(b);

      // Handle null values (no valid dates)
      if (!earliestA && !earliestB) return 0;
      if (!earliestA) return 1; // Put nulls at the "bottom"
      if (!earliestB) return -1;

      return earliestA.getTime() - earliestB.getTime();
    },
    renderHeaderCell: () => "Near Expiry",
    renderCell: (item) => {
      const warningDates = getWarningDates(item);
      const expiringCount = warningDates.length;

      if (expiringCount === 0) {
        return (
          <TableCellLayout
            media={<CheckmarkCircleFilled {...validIconStyleProps} />}
          >
            0
          </TableCellLayout>
        );
      }

      return (
        <TableCellLayout media={<WarningFilled {...warningIconStyleProps} />}>
          {expiringCount}
        </TableCellLayout>
      );
    },
  }),
];
