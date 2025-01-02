export interface Application {
  keyCredentials: KeyCredential[];
  passwordCredentials: PasswordCredential[];
  displayName: string;
  appId: string;
}

export interface KeyCredential {
  key: string;
  endDateTime: string;
  customKeyIdentifier: string;
  usage: string;
  keyId: string;
  displayName: string;
  type: string;
  startDateTime: string;
}

export interface PasswordCredential {
  startDateTime: string;
  secretText: null;
  customKeyIdentifier: null;
  keyId: string;
  endDateTime: string;
  hint: string;
  displayName: string;
}

export interface GridItem {
  appId: string;
  displayName: string;
  activeKeyCredentials: KeyCredential[];
  activePasswordCredentials: PasswordCredential[];
  expiredKeyCredentials: KeyCredential[];
  expiredPasswordCredentials: PasswordCredential[];
  longLivedKeyCredentials: KeyCredential[];
  longLivedPasswordCredentials: PasswordCredential[];
  warningKeyCredentials: KeyCredential[];
  warningPasswordCredentials: PasswordCredential[];
}

export function generateApplications(): Application[] {
  const now = new Date();

  const twoYearsFromNow = new Date();
  twoYearsFromNow.setFullYear(now.getFullYear() + 2);

  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(now.getMonth() + 2);

  return [
    {
      displayName: "Long Lived App",
      appId: "app-id-long-lived",
      keyCredentials: [
        {
          key: "long-lived-key",
          endDateTime: twoYearsFromNow.toISOString(),
          customKeyIdentifier: "long-lived-custom-key",
          usage: "Sign",
          keyId: "key-id-long-lived",
          displayName: "Long Lived Key",
          type: "RSA",
          startDateTime: now.toISOString(),
        },
      ],
      passwordCredentials: [
        {
          startDateTime: now.toISOString(),
          secretText: null,
          customKeyIdentifier: null,
          keyId: "password-id-long-lived",
          endDateTime: twoYearsFromNow.toISOString(),
          hint: "LLP",
          displayName: "Long Lived Password",
        },
      ],
    },
    {
      displayName: "Near Expiry App",
      appId: "app-id-near-expiry",
      keyCredentials: [],
      passwordCredentials: [
        {
          startDateTime: now.toISOString(),
          secretText: null,
          customKeyIdentifier: null,
          keyId: "password-id-near-expiry",
          endDateTime: twoMonthsFromNow.toISOString(),
          hint: "NEP",
          displayName: "Near Expiry Password",
        },
      ],
    },
  ];
}