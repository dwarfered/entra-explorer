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
  appRoleAssignedTo?: AppRoleAssignedTo[];
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
