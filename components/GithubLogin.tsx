import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = makeRedirectUri();

console.log("#$^%&^*%&^$#%@$!#%^%&^*&$@", redirectUri);
// console.log(AuthSession.getRedirectUrl())

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/8b9c0875bc67e9e797c2",
};

export default function GithubLoginComponent() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "8b9c0875bc67e9e797c2",
      scopes: ["identity"], // what is this?
      // redirectUri,
      redirectUri: makeRedirectUri({
        // scheme: "com.willybeans.freedu",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login Using Github"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
