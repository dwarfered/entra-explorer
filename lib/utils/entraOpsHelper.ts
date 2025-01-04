import appRoles from "../cloud-architekt/entra-ops-classification/Classification_AppRoles.json"; // compile-time import

const entraOpsAppRoles = appRoles as EAMTier[];

export interface TierDefinition {
  Category: string;
  Service: string;
  ResourceAppId: string;
  ResourceScope: string;
  RoleAssignmentScopeName: string[];
  RoleDefinitionActions: string[];
}

export interface EAMTier {
  EAMTierLevelName: string;
  EAMTierLevelTagValue: string;
  TierLevelDefinition: TierDefinition[];
}

function addSpaces(value: string): string {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function findEntraOpsClassificationByPermission(
  permissionToFind: string
): { EAMTierLevelName: string; Service: string, EAMTierLevelTagValue: number; } | undefined {
  for (const tier of entraOpsAppRoles) {
    for (const def of tier.TierLevelDefinition) {
      if (def.RoleDefinitionActions.includes(permissionToFind)) {
        return {
          EAMTierLevelName: addSpaces(tier.EAMTierLevelName),
          Service: def.Service,
          EAMTierLevelTagValue: Number(tier.EAMTierLevelTagValue),
        };
      }
    }
  }
  return {
    EAMTierLevelName: 'Unclassified',
    Service: 'Unclassified',
    EAMTierLevelTagValue: 2,
  };
}
