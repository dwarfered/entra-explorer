"use client";

import { SearchRegular } from "@fluentui/react-icons";
import {
  Caption1,
  Caption2,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  InfoLabel,
  Input,
  Link,
  Select,
  Subtitle2,
} from "@fluentui/react-components";

import { useIsAuthenticated } from "@azure/msal-react";
import { useState, useMemo } from "react";
import useSWR from "swr";

import {
  AppRole,
  AppRoleAssignedTo,
  GridItem,
  sampleItems,
  ServicePrincipal,
} from "./AppRolePermissionsGrid.data-model";
import { fetcher, ODataResponse } from "@/lib/utils/msGraphFetcher";
import { graphConfig } from "@/lib/msalConfig";
import { appRoleColumns } from "./AppRolePermissionsGrid.columns";
import { findEntraOpsClassificationByPermission } from "@/lib/utils/entraOpsHelper";

function useAuthenticatedSWR<T>(url: string, isAuthenticated: boolean) {
  return useSWR<ODataResponse<T>>(isAuthenticated ? url : null, fetcher);
}

function useFilter(
  isAuthenticated: boolean,
  appRolesAssignedToData: AppRoleAssignedTo[] | undefined,
  selectedServicePrincipalData: ServicePrincipal[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    if (!isAuthenticated) {
      return sampleItems.filter((item) =>
        item.permission.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    if (!appRolesAssignedToData || !selectedServicePrincipalData) return [];

    const appRoleMap = new Map<
      string,
      { sp: ServicePrincipal; role: AppRole }
    >();

    for (const sp of selectedServicePrincipalData) {
      for (const role of sp.appRoles) {
        appRoleMap.set(role.id, { sp, role });
      }
    }
    const gridItems: GridItem[] = appRolesAssignedToData
      .map((assigned) => {
        const match = appRoleMap.get(assigned.appRoleId);
        if (!match) {
          return null;
        }

        const { sp, role } = match;

        const entraOpsClassification = findEntraOpsClassificationByPermission(
          role.value
        );

        const gridItem: GridItem = {
          permission: role.value,
          description: role.description,
          principalDisplayName: assigned.principalDisplayName,
          principalId: assigned.principalId,
          appId: sp.appId,
          createdDateTime: assigned.createdDateTime,
          eamTierLevelName: entraOpsClassification!.EAMTierLevelName,
          eamTierLevelTagValue: entraOpsClassification!.EAMTierLevelTagValue,
          eamTierLevelDefinitionService: entraOpsClassification!.Service,
        };

        return gridItem;
      })
      .filter((item): item is GridItem => !!item)
      .filter((item) =>
        item.permission.toLowerCase().includes(normalizedSearchTerm)
      );

    return gridItems;
  }, [
    isAuthenticated,
    appRolesAssignedToData,
    selectedServicePrincipalData,
    searchTerm,
  ]);
}

export default function AppRolePermissionsGrid() {
  const isAuthenticated = useIsAuthenticated();
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const {
    data: selectedServicePrincipalData,
    error: selectedServicePrincipalError,
    isLoading: selectedServicePrincipalIsLoading,
  } = useAuthenticatedSWR<ServicePrincipal>(
    `${graphConfig.graphGetServicePrincipal}?&$filter=appid eq '00000003-0000-0000-c000-000000000000'`,
    isAuthenticated
  );

  const getServicePrincipalAppRolesAssignedTo = selectedServicePrincipalData
    ? `${graphConfig.graphGetServicePrincipal}/${selectedServicePrincipalData.value[0].id}/appRoleAssignedTo`
    : null;

  const {
    data: appRolesAssignedToData,
    error: appRolesAssignedToError,
    isLoading: appRolesAssignedToIsLoading,
  } = useAuthenticatedSWR<AppRoleAssignedTo>(
    getServicePrincipalAppRolesAssignedTo ?? "",
    isAuthenticated && !!getServicePrincipalAppRolesAssignedTo
  );

  const columns = useMemo(
    () => appRoleColumns(isAuthenticated),
    [isAuthenticated]
  );

  const filteredItems = useFilter(
    isAuthenticated,
    appRolesAssignedToData?.value,
    selectedServicePrincipalData?.value,
    searchTerm
  );

  return (
    <div>
      {!isAuthenticated && (
        <div style={{ margin: "6px" }}>
          <InfoLabel
            info={<>Until sign-in this screen returns sample data. </>}
          >
            <Subtitle2>Demo Mode</Subtitle2>
          </InfoLabel>
        </div>
      )}

      <div>
        <Select size="small" style={{ width: "200px", margin: "6px" }} disabled>
          <option>Microsoft Graph</option>
        </Select>
      </div>

      <div style={{ margin: "6px" }}>
        <Input
          type="text"
          size="small"
          contentBefore={<SearchRegular />}
          onChange={onSearchChange}
          placeholder="Filter by permission"
          value={searchTerm}
        />
      </div>

      <DataGrid
        size="small"
        items={filteredItems}
        columns={columns}
        sortable
        getRowId={(item) => item.displayName}
        // defaultSortState={defaultSortState}
        style={{ marginBottom: "10px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<GridItem>>
          {({ item, rowId }) => (
            <DataGridRow<GridItem> key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>

      <div>
        <Caption1 style={{ margin: "6px" }}>
          EntraOps Classifications
          <InfoLabel
            info={
              <Link
                target="_blank"
                href={"https://github.com/Cloud-Architekt/AzurePrivilegedIAM"}
              >
                Courtesy Cloud-Architekt (Thomas Naunheim)
              </Link>
            }
          ></InfoLabel>
        </Caption1>
      </div>
    </div>
  );
}
