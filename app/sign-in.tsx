import { HrefObject, Link, router } from "expo-router";
// import { Text, View } from "react-native";
import { useSession } from "../context/Auth/ctx";
import { Text, TextInput, View } from "../components/Themed";
import GithubLoginComponent from "../components/GithubLogin";
import { StyleSheet, useColorScheme } from "react-native";
import { useState } from "react";
import Colors from "../constants/Colors";
import { Button } from "../components/Button";

// import SeekingFox from "../svgs/seeking_fox.svg";
import CuriousFox from "../svgs/curious_fox_min.svg";

type Url = {
  pathname: string;
  params?: { id: string };
};

export default function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();
  const { signIn } = useSession();

  const handleRegister = () => {
    router.replace("/register");
  };

  const handleSignIn = () => {
    // api stuff here
    // userName, password
    //on res:
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };
  return (
    <View style={styles.container}>
      <CuriousFox
        height={250}
        width={250}
        style={{ color: Colors[colorScheme ?? "light"].tint }}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome to Freedu!</Text>
        <Text style={styles.header}>Please login to continue</Text>
      </View>
      <View style={styles.loginContainer}>
        <TextInput
          onChangeText={setUserName}
          placeholder="Username"
          style={[
            styles.inputs,
            {
              borderColor: Colors[colorScheme ?? "light"].border,
            },
          ]}
        />
        <TextInput
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          style={[
            styles.inputs,
            {
              borderColor: Colors[colorScheme ?? "light"].border,
            },
          ]}
        />
        <Button
          onPress={handleSignIn}
          title="Login"
          style={{ width: "50%", marginBottom: 10 }}
        />

        <Button
          onPress={handleRegister}
          title="Register"
          style={{ width: "50%" }}
        />
      </View>

      <View
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
        style={styles.separator}
      />
      <GithubLoginComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontFamily: "Helvetica",
    fontWeight: "700",
    fontSize: 24,
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    height: 40,
    width: "80%",
    marginBottom: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
});
