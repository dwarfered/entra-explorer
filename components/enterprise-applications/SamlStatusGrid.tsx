"use client";

import { SearchRegular } from "@fluentui/react-icons";
import {
  Body1,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  InfoLabel,
  Input,
  Subtitle2,
} from "@fluentui/react-components";

import { useIsAuthenticated } from "@azure/msal-react";
import { useState, useMemo } from "react";
import useSWR from "swr";

import { SamlStatus, generateSamlStatus } from "./SamlStatusGrid.data-model";
import { samlStatusColumns } from "./SamlStatusGrid.columns";
import { fetcher, ODataResponse } from "@/lib/utils/msGraphFetcher";
import { graphConfig } from "@/lib/msalConfig";

function useAuthenticatedSWR<T>(url: string, isAuthenticated: boolean) {
  return useSWR<ODataResponse<T>>(isAuthenticated ? url : null, fetcher);
}

function useFilteredSamlStatus(
  isAuthenticated: boolean,
  data: SamlStatus[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const processSamlStatus = (samlStatus: SamlStatus[]) =>
      samlStatus
        .filter((item) =>
          item.appDisplayName.toLowerCase().startsWith(normalizedSearchTerm)
        );

    if (!isAuthenticated) {
      const samlStatuses = generateSamlStatus();
      return processSamlStatus(samlStatuses);
    }

    if (!data) return [];

    return processSamlStatus(data);
  }, [isAuthenticated, data, searchTerm]);
}

export default function SamlStatusGrid() {
  const isAuthenticated = useIsAuthenticated();
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const {
    data: samlStatusData,
    error: samlStatusError,
    isLoading: samlStatusIsLoading,
  } = useAuthenticatedSWR<SamlStatus>(
    graphConfig.graphSamlExpiryEndpoint,
    isAuthenticated
  );

  const columns = useMemo(
    () => samlStatusColumns(isAuthenticated),
    [isAuthenticated]
  );

  const filteredItems = useFilteredSamlStatus(
    isAuthenticated,
    samlStatusData?.value,
    searchTerm
  );

  if (samlStatusIsLoading) {
    // Optionally render a skeleton or partial grid
    return (
      <div style={{ margin: "6px" }}>
        <Body1>Loading...</Body1>
        {/* <SkeletonGrid columns={4} /> */}
      </div>
    );
  }

  if (samlStatusError) {
    console.error(samlStatusError);
    return (
      <div style={{ margin: "6px" }}>
        Failed to fetch applications.{" "}
        <Body1>
          (This operation requires sign-in and delegated Microsoft Graph access
          to Application.Read.All)
        </Body1>
      </div>
    );
  }

  // type SortDirection = "ascending" | "descending";
  // interface SortState {
  //   sortColumn?: string;
  //   sortDirection: SortDirection;
  // }

  // const defaultSortState: SortState = {
  //   sortColumn: "warnCredential",
  //   sortDirection: "ascending",
  // };

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

      {/* <Body1 style={{ margin: "6px" }}>
        {filteredItems.length} App Registrations with certificates & secrets.
      </Body1> */}

      <div style={{ margin: "6px" }}>
        <Input
          type="text"
          size="small"
          contentBefore={<SearchRegular />}
          onChange={onSearchChange}
          placeholder="Filter by display name"
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
        <DataGridBody<SamlStatus>>
          {({ item, rowId }) => (
            <DataGridRow<SamlStatus> key={rowId}>
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
