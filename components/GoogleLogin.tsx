import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Text, View } from "./Themed";

export default function () {
  const colorScheme = useColorScheme();
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  console.log("test");
  const configureGoogle = () => {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "877799132108-3kvno9kifo9nh6mtl398btl2ljespudr.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      androidClientId:
        "877799132108-3kvno9kifo9nh6mtl398btl2ljespudr.apps.googleusercontent.com",
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: "", // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: "", // [Android] specifies an account name on the device that should be used
      iosClientId:
        "877799132108-3kvno9kifo9nh6mtl398btl2ljespudr.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    } as any);
  };

  useEffect(() => {
    configureGoogle();
  });

  const signIn = async () => {
    console.log("signin'");
    try {
      await GoogleSignin.hasPlayServices();
      const res: any = await GoogleSignin.signIn();
      setUserInfo(res);
      console.log("userINFO", JSON.stringify(res, null, 2));
      setError(undefined);

      // setState({ userInfo });
    } catch (error: any) {
      console.log("test error", error);
      setError(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View>
      <Text>{JSON.stringify(error, null, 2)}</Text>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={
          colorScheme === "light"
            ? GoogleSigninButton.Color.Light
            : GoogleSigninButton.Color.Dark
        }
        onPress={signIn}
        // disabled={this.state.isSigninInProgress}
      />
    </View>
  );
}
