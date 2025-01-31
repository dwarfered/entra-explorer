import {
  Configuration,
  LogLevel,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "b8b844ef-4c33-4f56-8e65-414f4bdc59bd", // your app reg (clientId)
    authority: "https://login.microsoftonline.com/common", // common (multi-tenant app) or your tenantId
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  system: {
    allowNativeBroker: false, // Disables WAM Broker
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
  cache: {
    //cacheLocation: "sessionStorage", // This configures where your cache will be stored
    cacheLocation: "localStorage", // SSO between tabs
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Initial scopes
export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "Application.Read.All"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphMePhotoEndpoint:
    "https://graph.microsoft.com/v1.0/me/photos/48x48/$value",
  graphAppCredentialsEndpoint:
    "https://graph.microsoft.com/v1.0/applications?$select=appId,displayName,keyCredentials,passwordCredentials&$top=999",
  graphAppRegCreationsEndpoint:
    "https://graph.microsoft.com/v1.0/applications?$select=appId,displayName,createdDateTime,signInAudience&$top=999",
  graphSamlExpiryEndpoint:
    "https://graph.microsoft.com/beta/servicePrincipals?$select=preferredTokenSigningKeyEndDateTime,appDisplayName,id,appId&$top=999&$filter=preferredTokenSigningKeyEndDateTime ge 2021-01-02T12:00:00Z",
  graphGetServicePrincipal:
    "https://graph.microsoft.com/v1.0/servicePrincipals",
};

export const msalInstance = new PublicClientApplication(msalConfig);
