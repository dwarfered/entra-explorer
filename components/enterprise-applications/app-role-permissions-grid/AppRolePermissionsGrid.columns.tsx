import { createTableColumn, FluentProvider, InfoLabel, Link, RatingDisplay, TableCellLayout, TableColumnDefinition } from "@fluentui/react-components";
import { GridItem } from "./AppRolePermissionsGrid.data-model";
import { SquareFilled } from "@fluentui/react-icons";
import { highRatingTheme, lowRatingTheme, mediumRatingTheme } from "@/lib/utils/fluentuiHelper";

export const appRoleColumns = (
    isAuthenticated: boolean,
    // servicePrincipalAppIdsLoading: boolean
  ): TableColumnDefinition<GridItem>[] => [
    createTableColumn<GridItem>({
      columnId: "permission",
      compare: (a, b) => {
        return a.permission.localeCompare(b.permission);
      },
      renderHeaderCell: () => {
        return "Permission";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout style={{ wordBreak: "break-word" }}>
            <InfoLabel info={item.description}>{item.permission}</InfoLabel>
          </TableCellLayout>
        );
      },
    }),

    createTableColumn<GridItem>({
      columnId: "riskLevel",
      compare: (a, b) => {
        return a.eamTierLevelTagValue! - b.eamTierLevelTagValue!;
      },
      renderHeaderCell: () => {
        return "EntraOps Classification";
      },
      renderCell: (item) => {
 
        return (
          <TableCellLayout style={{ wordBreak: "break-word" }}>
            {item.eamTierLevelTagValue === 2 && (
              <FluentProvider theme={lowRatingTheme} style={{ backgroundColor: "transparent" }}>
                <RatingDisplay
                  icon={SquareFilled}
                  color="brand"
                  value={1}
                  max={3}
                  countText={undefined}
                  valueText={item.eamTierLevelName}
                />
              </FluentProvider>
            )}
  
            {item.eamTierLevelTagValue === 1 && (
              <FluentProvider theme={mediumRatingTheme} style={{ backgroundColor: "transparent" }}>
                <RatingDisplay
                  icon={SquareFilled}
                  color="brand"
                  value={2}
                  max={3}
                  countText={undefined}
                  valueText={item.eamTierLevelName}
                />
              </FluentProvider>
            )}
  
            {item.eamTierLevelTagValue === 0 && (
              <FluentProvider theme={highRatingTheme} style={{ backgroundColor: "transparent" }}>
                <RatingDisplay
                  icon={SquareFilled}
                  color="brand"
                  value={3}
                  max={3}
                  countText={undefined}
                  valueText={item.eamTierLevelName}
                />
              </FluentProvider>
            )}
          </TableCellLayout>
        );
      },
    }),

    createTableColumn<GridItem>({
      columnId: "service",
      compare: (a, b) => {
        return a.eamTierLevelDefinitionService.localeCompare(
          b.eamTierLevelDefinitionService
        );
      },
      renderHeaderCell: () => {
        return "Service";
      },
      renderCell: (item) => {
        return (
          <TableCellLayout>{item.eamTierLevelDefinitionService}</TableCellLayout>
        );
      },
    }),
    createTableColumn<GridItem>({
      columnId: "principalDisplayName",
      compare: (a, b) => {
        return a.principalDisplayName.localeCompare(b.principalDisplayName);
      },
      renderHeaderCell: () => {
        return "Display Name";
      },
      renderCell: (item) => {
        const link =
          isAuthenticated && item.appId
            ? `https://entra.microsoft.com/#view/Microsoft_AAD_IAM/ManagedAppMenuBlade/~/Permissions/objectId/${item.principalId}/appId/${item.appId}/preferredSingleSignOnMode~/null/servicePrincipalType/Application/fromNav/`
            : undefined;
        return (
          <TableCellLayout>
            {link ? (
              <Link target="_blank" href={link}>
                {item.principalDisplayName}
              </Link>
            ) : (
              <div>{item.principalDisplayName}</div>
            )}
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
        return "Authorized";
      },
      renderCell: (item) => {
        const created = new Date(item.createdDateTime);
  
        return <TableCellLayout>{created.toLocaleString()}</TableCellLayout>;
      },
    }),
  ];