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