export interface GridItem {
    appId: string;
    displayName: string;
    createdDateTime: string;
    signInAudience: string;
  }
 
 
  export function generateItems(): GridItem[] {
    const now = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(now.getMonth() - 2);
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setFullYear(now.getFullYear() - 4);
  
    return [
      {
        displayName: "Demo App 1",
        appId: "demo-app",
        signInAudience: "AzureADMyOrg",
        createdDateTime: twoMonthsAgo.toISOString(),
      },
      {
        displayName: "Demo App 2",
        appId: "demo-app2",
        signInAudience: "AzureADMultipleOrgs",
        createdDateTime: fourMonthsAgo.toISOString(),
      },
      {
        displayName: "Demo App 3",
        appId: "demo-app3",
        signInAudience: "AzureADMyOrg",
        createdDateTime: now.toISOString(),
      },
    ];
  }
  