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
      scopes: [], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        "877799132108-jutucpc03e8ldn7qrqtolclgkvdp3rrf.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
      //we want access_type: offline - so we can receive a REFRESH TOKEN
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: "", // specifies a hosted domain restriction
      // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // accountName: "", // [Android] specifies an account name on the device that should be used
      iosClientId:
        "877799132108-s1l5qr0koi0ddqt075130fjhnk5boevh.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      // googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      // openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
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

const userINFOAndroid = {
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
  serverAuthCode: null,
  idToken:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzYjQ5NTE2MmFmMGM4N2NjN2E1MTY4NjI5NDA5NzA0MGRhZjNiNDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4Nzc3OTkxMzIxMDgtNGRodmk4cWowdXJsZjdibWNsZ3YzbTM3c2kzMGx1cXAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4Nzc3OTkxMzIxMDgtanV0dWNwYzAzZThsZG43cXJxdG9sY2xna3ZkcDNycmYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0NTIwMDA0NDMxMDg1NDY1MjkiLCJlbWFpbCI6IndpbGx3ZWRtZWR5a0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IldpbGxpYW0gV2VkbWVkeWsiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSmpQTDFWTi1EcWlnRF93UjJNZElnamIxZ2VrR3V0My0wajJNSGV5bkp2S3FBZlJKN2E9czk2LWMiLCJnaXZlbl9uYW1lIjoiV2lsbGlhbSIsImZhbWlseV9uYW1lIjoiV2VkbWVkeWsiLCJpYXQiOjE3MTI5MzQ3NTcsImV4cCI6MTcxMjkzODM1N30.o5FzbZeUAQhu4Osic9shtfms3_mrrjosfjVFR_JXbTMMLljY8rliDQ6mWCEC5eLlNeV8MZeOe25MIvQMBpk3NzfQc7sFQHcTYMcbpXR0hBnBX6fuq44qpjKYoMoc9q1a-pB8tBwpYu_TPnMkbxd59_18YHDD85uLSGm3T9WVtthFyfTj9Ni7Aq8VXoD_j4TFD82Ma16DNqGJojVvLqkXfmcAVppc_XxFQirZuREqXRfKclYnFuFMFatY2kpnpxLIKPnVeuksR3ftkdoPXJKB_W6OPAVzH1BtjUEYswMStmSDbxwgJ6qyk4n-1Z5PBq6SKNlwk18w4ycm0XjsY7ATNA",
  user: {
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocJjPL1VN-DqigD_wR2MdIgjb1gekGut3-0j2MHeynJvKqAfRJ7a=s96-c",
    email: "willwedmedyk@gmail.com",
    familyName: "Wedmedyk",
    givenName: "William",
    name: "William Wedmedyk",
    id: "104452000443108546529",
  },
};

const userINFOIOS = {
  idToken:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzYjQ5NTE2MmFmMGM4N2NjN2E1MTY4NjI5NDA5NzA0MGRhZjNiNDMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4Nzc3OTkxMzIxMDgtM2t2bm85a2lmbzluaDZtdGwzOThidGwybGplc3B1ZHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4Nzc3OTkxMzIxMDgtM2t2bm85a2lmbzluaDZtdGwzOThidGwybGplc3B1ZHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ0NTIwMDA0NDMxMDg1NDY1MjkiLCJlbWFpbCI6IndpbGx3ZWRtZWR5a0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlE2cHVwdlZsaE1YWEFmV3owOEtOaWciLCJub25jZSI6Im9POFZUeHgzVjVZcVZXd0RDc1lBOVFUdE4yczRpY29YZjlwRTF1QmhTdDgiLCJuYW1lIjoiV2lsbGlhbSBXZWRtZWR5ayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKalBMMVZOLURxaWdEX3dSMk1kSWdqYjFnZWtHdXQzLTBqMk1IZXluSnZLcUFmUko3YT1zOTYtYyIsImdpdmVuX25hbWUiOiJXaWxsaWFtIiwiZmFtaWx5X25hbWUiOiJXZWRtZWR5ayIsImlhdCI6MTcxMjY4MzI1OSwiZXhwIjoxNzEyNjg2ODU5fQ.IbJ9vDj5RmrKnq4Ovxpk3WPIY0eZY9J2dOfa7qXqXjMxkCHJMzOY2n7Mq2BOlu2BDntZahgc1y9qKggQ0o7fXR5XI8SYg1lUu9uh1ljpRPSiE2PBdyCRxLOztT9XDtQPBdDA1-fya2E2p7Bz8Wamx_nXKWBa3B8cnqi34PHi_qlm2wlv-nd7b9O0w_9YtECdM7q1VGm_x-k-vQ-o6bOxiuCnvDAerpYPFmGvYSP7-73oiaJ044bOT7r8IJzp4nwVCbyd78Swa2WD-wlMODJYxa5XoJ0EIZTIvGZHtzFznFm-Eoul80xrpvbyl6GR2g9q1Kf-Wx6C5U7jVLkaMWrmOQ",
  serverAuthCode:
    "4/0AeaYSHAd3BXqQHSTQzoE0vgS7m7a-Em_ql1_KmHc0Aqaq1HgdZtSLVxDiw-9dWUbq8X4Og",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/drive.readonly",
    "openid",
  ],
  user: {
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocJjPL1VN-DqigD_wR2MdIgjb1gekGut3-0j2MHeynJvKqAfRJ7a=s120",
    givenName: "William",
    familyName: "Wedmedyk",
    name: "William Wedmedyk",
    email: "willwedmedyk@gmail.com",
    id: "104452000443108546529",
  },
};
