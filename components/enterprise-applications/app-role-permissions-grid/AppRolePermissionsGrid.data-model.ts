export interface ServicePrincipal {
  id: string;
  appId: string;
  appRoles: AppRole[];
}

export interface AppRole {
  id: string;
  allowedMemberTypes: string[];
  isEnabled: boolean;
  value: string;
  displayName: string;
  origin: string;
  description: string;
  // appRoleAssignedTo?: AppRoleAssignedTo[];
}

export interface AppRoleAssignedTo {
  createdDateTime: string;
  deletedDateTime?: string;
  resourceDisplayName: string;
  principalDisplayName: string;
  principalType: string;
  appRoleId: string;
  id: string;
  principalId: string;
  resourceId: string;
}

export interface GridItem {
  permission: string;
  description: string;
  principalDisplayName: string;
  principalId: string;
  appId?: string;
  createdDateTime: string;
  eamTierLevelName: string;
  eamTierLevelTagValue: number;
  eamTierLevelDefinitionService: string;
}

export const sampleItems: GridItem[] = [
  {
    permission: "AccessReview.Read.All",
    description: "Read all access reviews",
    principalDisplayName: "App One",
    principalId: "user1",
    appId: "app1",
    createdDateTime: "2022-01-01T00:00:00Z",
    eamTierLevelName: "Management Plane",
    eamTierLevelTagValue: 1,
    eamTierLevelDefinitionService: "Entitlement Management"
  },
  {
    permission: "User.Read.All",
    description: "Read all users' full profiles",
    principalDisplayName: "My App",
    principalId: "user2",
    appId: 'test',
    createdDateTime: "2022-01-02T00:00:00Z",
    eamTierLevelName: "User Access",
    eamTierLevelTagValue: 2,
    eamTierLevelDefinitionService: "Default member"
  },
  {
    permission: "User.ReadBasic.All",
    description: "Read all users' basic profiles",
    principalDisplayName: "My App",
    principalId: "user2",
    appId: 'test',
    createdDateTime: "2022-01-02T00:00:00Z",
    eamTierLevelName: "User Access",
    eamTierLevelTagValue: 2,
    eamTierLevelDefinitionService: "Default member"
  },
];