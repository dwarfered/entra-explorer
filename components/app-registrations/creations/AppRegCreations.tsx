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
import { useState, useMemo, useRef } from "react";
import useSWR from "swr";


import { fetcher, ODataResponse } from "@/lib/utils/msGraphFetcher";
import { graphConfig } from "@/lib/msalConfig";

import useDebounce from "@/lib/utils/common";
import { generateItems, GridItem } from "./AppRegCreations.data-model";
import { tableColumns } from "./AppRegCreations.columns";
import { SkeletonGrid } from "@/components/SkeletonGrid";

function useAuthenticatedSWR<T>(url: string, isAuthenticated: boolean) {
  return useSWR<ODataResponse<T>>(isAuthenticated ? url : null, fetcher);
}

function useFilter(
  isAuthenticated: boolean,
  data: GridItem[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const processSamlStatus = (samlStatus: GridItem[]) =>
      samlStatus.filter((item) =>
        item.displayName.toLowerCase().startsWith(normalizedSearchTerm)
      );

    if (!isAuthenticated) {
      const samlStatuses = generateItems();
      return processSamlStatus(samlStatuses);
    }

    if (!data) return [];

    return processSamlStatus(data);
  }, [isAuthenticated, data, searchTerm]);
}

export default function AppRegCreations() {
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
    data: samlStatusData,
    error: samlStatusError,
    isLoading: samlStatusIsLoading,
  } = useAuthenticatedSWR<GridItem>(
    graphConfig.graphAppRegCreationsEndpoint,
    isAuthenticated
  );

  const columns = useMemo(
    () => tableColumns(isAuthenticated),
    [isAuthenticated]
  );

  const filteredItems = useFilter(
    isAuthenticated,
    samlStatusData?.value,
    searchTerm
  );

  if (samlStatusIsLoading) {
    // Optionally render a skeleton or partial grid
    return (
      <div style={{ margin: "6px" }}>
        <Body1>Loading...</Body1>
        <SkeletonGrid columns={2} />
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
          ref={inputRef}
          onChange={handleChange}
          placeholder="Filter by display name"
        />
      </div>

      <DataGrid
        size="small"
        items={filteredItems}
        columns={columns}
        sortable
        getRowId={(item) => item.appId}
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
    </div>
  );
}
