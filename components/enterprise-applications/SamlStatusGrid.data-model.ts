export interface GridItem {
  id: string;
  appId: string;
  appDisplayName: string;
  preferredTokenSigningKeyEndDateTime: string;
}

export interface SamlStatus {
  id: string;
  appId: string;
  appDisplayName: string;
  preferredTokenSigningKeyEndDateTime: string;
}

export function generateSamlStatus(): SamlStatus[] {
  const now = new Date();
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(now.getMonth() + 2);
  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(now.getFullYear() + 2);

  return [
    {
      appDisplayName: "Oracle Access Manager for Oracle E-Business Suite",
      appId: "oracle-id",
      id: "oracle-id",
      preferredTokenSigningKeyEndDateTime: twoMonthsFromNow.toISOString(),
    },
    {
      appDisplayName: "AWS Single-Account Access",
      appId: "aws-id",
      id: "aws-id",
      preferredTokenSigningKeyEndDateTime: twoYearsFromNow.toISOString(),
    },
    {
      appDisplayName: "Workday",
      appId: "workday-id",
      id: "worday-id",
      preferredTokenSigningKeyEndDateTime: now.toISOString(),
    },
  ];
}
