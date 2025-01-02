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

import { Application, generateApplications } from "./data-model";
import { credentialStatusColumns } from "./CredentialStatusGrid.columns";
import { fetcher, ODataResponse } from "@/lib/utils/msGraphFetcher";
import { graphConfig } from "@/lib/msalConfig";

function useAuthenticatedSWR<T>(url: string, isAuthenticated: boolean) {
  return useSWR<ODataResponse<T>>(isAuthenticated ? url : null, fetcher);
}

function useFilteredCredentials(
  isAuthenticated: boolean,
  data: Application[] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const nowUtc = new Date();
    const futureUtc = new Date(nowUtc);
    futureUtc.setFullYear(futureUtc.getFullYear() + 2);
    const warningUtc = new Date(nowUtc);
    warningUtc.setMonth(warningUtc.getMonth() + 2);

    const processApplications = (applications: Application[]) =>
      applications
        .filter(
          (element) =>
            element.keyCredentials.length > 0 ||
            element.passwordCredentials.length > 0
        )
        .map((app) => ({
          ...app,
          activeKeyCredentials: app.keyCredentials.filter(
            (x) => new Date(x.endDateTime) > nowUtc
          ),
          activePasswordCredentials: app.passwordCredentials.filter(
            (x) => new Date(x.endDateTime) > nowUtc
          ),
          expiredKeyCredentials: app.keyCredentials.filter(
            (x) => new Date(x.endDateTime) <= nowUtc
          ),
          expiredPasswordCredentials: app.passwordCredentials.filter(
            (x) => new Date(x.endDateTime) <= nowUtc
          ),
          longLivedKeyCredentials: app.keyCredentials.filter(
            (x) => new Date(x.endDateTime) >= futureUtc
          ),
          longLivedPasswordCredentials: app.passwordCredentials.filter(
            (x) => new Date(x.endDateTime) >= futureUtc
          ),
          warningKeyCredentials: app.keyCredentials.filter(
            (x) =>
              new Date(x.endDateTime) >= nowUtc &&
              new Date(x.endDateTime) <= warningUtc
          ),
          warningPasswordCredentials: app.passwordCredentials.filter(
            (x) =>
              new Date(x.endDateTime) >= nowUtc &&
              new Date(x.endDateTime) <= warningUtc
          ),
        }))
        .filter((item) =>
          item.displayName.toLowerCase().startsWith(normalizedSearchTerm)
        );

    if (!isAuthenticated) {
      const applications = generateApplications();
      return processApplications(applications);
    }

    if (!data) return [];

    return processApplications(data);
  }, [isAuthenticated, data, searchTerm]);
}

export default function CredentialStatusGrid() {
  const isAuthenticated = useIsAuthenticated();
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const {
    data: appCredentialData,
    error: appCredentialError,
    isLoading: appCredentialIsLoading,
  } = useAuthenticatedSWR<Application>(
    graphConfig.graphAppCredentialsEndpoint,
    isAuthenticated
  );

  const columns = useMemo(
    () => credentialStatusColumns(isAuthenticated),
    [isAuthenticated]
  );

  const filteredItems = useFilteredCredentials(
    isAuthenticated,
    appCredentialData?.value,
    searchTerm
  );

  if (appCredentialIsLoading) {
    // Optionally render a skeleton or partial grid
    return (
      <div style={{ margin: "6px" }}>
        <Body1>Loading...</Body1>
        {/* <SkeletonGrid columns={4} /> */}
      </div>
    );
  }

  if (appCredentialError) {
    console.error(appCredentialError);
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

      <Body1 style={{ margin: "6px" }}>
        {filteredItems.length} App Registrations with credentials.
      </Body1>

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
        <DataGridBody<Application>>
          {({ item, rowId }) => (
            <DataGridRow<Application> key={rowId}>
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
