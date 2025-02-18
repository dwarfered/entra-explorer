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
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    const processData = (data: GridItem[]) =>
      data.filter((item) =>
        item.displayName.toLowerCase().startsWith(normalizedSearchTerm)
      );

    if (!isAuthenticated) {
      const items = generateItems();
      return processData(items);
    }

    if (!data) return [];

    return processData(data);
  }, [isAuthenticated, data, searchTerm]);
}

function useFilterForLineChart(
  isAuthenticated: boolean,
  data: GridItem[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();

    const groupByMonth = (filteredData: GridItem[]) => {
      const monthCounts: { [key: string]: number } = {};

      const currentDate = new Date();
      for (let i = 0; i < 12; i++) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        const month = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        monthCounts[month] = 0;
      }

      filteredData.forEach((item) => {
        const createdDate = new Date(item.createdDateTime);
        const month = createdDate.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        if (monthCounts[month] !== undefined) {
          monthCounts[month]++;
        }
      });

      return Object.entries(monthCounts)
        .map(([month, count]) => ({ month, count }))
        .reverse();
    };

    const processData = (data: GridItem[]) => {
      const filteredData = data.filter((item) =>
        item.displayName.toLowerCase().startsWith(normalizedSearchTerm)
      );
      return groupByMonth(filteredData);
    };

    if (!isAuthenticated) {
      const items = generateItems();
      return processData(items);
    }

    if (!data) return [];

    return processData(data);
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
    data: data,
    error: dataError,
    isLoading: isLoading,
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
    data?.value,
    searchTerm
  );

  const chartData = useFilterForLineChart(
    isAuthenticated,
    data?.value,
    searchTerm
  );

  if (isLoading) {
    // Optionally render a skeleton or partial grid
    return (
      <div style={{ margin: "6px" }}>
        <Body1>Loading...</Body1>
        <SkeletonGrid columns={2} />
      </div>
    );
  }

  if (dataError) {
    console.error(dataError);
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
            <Subtitle2>Example Mode</Subtitle2>
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

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

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
