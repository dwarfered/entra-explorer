"use client";

import { SearchRegular } from "@fluentui/react-icons";
import {
  Body1,
  Caption1,
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
import { useState, useMemo, useRef } from "react";
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
import { SkeletonGrid } from "@/components/SkeletonGrid";
import useDebounce from "@/lib/utils/common";
import ExportCSVButton from "@/components/ExportCSVButton";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSetSearchTerm = useDebounce((value: string) => {
    setSearchTerm(value);
  }, 300);
  const handleChange = () => {
    if (inputRef.current) {
      debouncedSetSearchTerm(inputRef.current.value);
    }
  };

  const {
    data: selectedServicePrincipalData,
    // error: selectedServicePrincipalError,
    // isLoading: selectedServicePrincipalIsLoading,
  } = useAuthenticatedSWR<ServicePrincipal>(
    `${graphConfig.graphGetServicePrincipal}?&$filter=appid eq '00000003-0000-0000-c000-000000000000'`,
    isAuthenticated
  );

  const getServicePrincipalAppRolesAssignedTo = selectedServicePrincipalData
    ? `${graphConfig.graphGetServicePrincipal}/${selectedServicePrincipalData.value[0].id}/appRoleAssignedTo`
    : null;

  const {
    data: appRolesAssignedToData,
    // error: appRolesAssignedToError,
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

  if (appRolesAssignedToIsLoading) {
    // Optionally render a skeleton or partial grid
    return (
      <div style={{ margin: "6px" }}>
        <Body1>Loading...</Body1>
        <SkeletonGrid columns={5} />
      </div>
    );
  }

  type SortDirection = "ascending" | "descending";
  interface SortState {
    sortColumn: string | undefined;
    sortDirection: SortDirection;
  }

  const defaultSortState: SortState = {
    sortColumn: "createdDateTime",
    sortDirection: "descending",
  };

  return (
    <div>

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

      {!isAuthenticated && (
        <div style={{ margin: "6px" }}>
          <InfoLabel
            info={<>Until sign-in this screen returns sample data. </>}
          >
            <Subtitle2>Example Mode</Subtitle2>
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
          ref={inputRef}
          onChange={handleChange}
          placeholder="Filter by permission"
        />
      </div>

   

      <ExportCSVButton<GridItem> data={filteredItems} disabled={filteredItems.length === 0} fileName="appRolePermissions.csv" />

      <DataGrid
        size="small"
        items={filteredItems}
        columns={columns}
        sortable
        getRowId={(item) => item.displayName}
        defaultSortState={defaultSortState}
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
    </div>
  );
}
