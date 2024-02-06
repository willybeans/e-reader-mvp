import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { useCallback, useEffect, useRef, useState } from "react";
import { api, buildUrl } from "../../helpers/api";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import EditTextContent from "../../components/EditTextContent";
import { Button } from "../../components/Button";

type UserProfile = {
  id: string;
  username: string;
  profile: string;
  time_created: string;
};

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );
  const profileText = useRef("");
  // const [profile, setProfile] = useState<string>("");

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  useEffect(() => {
    (async function () {
      const usersProfile: UserProfile = await api(
        `${buildUrl()}/getUser?id=${"d2792a62-86a4-4c49-a909-b1e762c683a3"}`
      );
      setUserProfile({ ...usersProfile });
      profileText.current = usersProfile.profile;
    })();
  }, []);

  const updateProfileContent = (text: string) => {
    setUserProfile((prevState) => ({
      ...prevState,
      profile: text,
    }));
    // profileText.current = text;
    console.log("update ", userProfile);
  };

  const updateProfile = useCallback(async () => {
    try {
      let newProfileData: { message: string } = await api(
        `${buildUrl()}/updateUser`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...userProfile,
            profile: profileText.current,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      setIsEdit(false);
    } catch (e) {
      console.error("error: ", e);
    }
  }, [userProfile]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: "http://placekitten.com/200/300" }}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.contentContainerHeading}>
          <View>
            <Text>{userProfile?.username}'s Profile</Text>
          </View>
          <View>
            <Pressable onPress={() => setIsEdit(!isEdit)}>
              <FontAwesome
                name="edit"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView>
          {isEdit ? (
            <>
              <EditTextContent
                updateContent={updateProfileContent}
                content={userProfile?.profile}
              />
              <Button onPress={updateProfile} />
            </>
          ) : (
            <>
              <Text style={{ marginBottom: 10 }}>PROFILE</Text>
              <Text>{userProfile?.profile}</Text>
            </>
          )}
        </ScrollView>
      </View>

      {/* <Text style={styles.title}>Tab Profile</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentContainerHeading: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
