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
import Colors, { pallatte } from "../../constants/Colors";
import EditTextContent from "../../components/EditTextContent";
import { Button } from "../../components/Button";
import { daysBetween } from "../../helpers/utils";

import Fox from "../../svgs/fox.svg";

type UserProfile = {
  id: string;
  username: string;
  profile: string;
  age: string;
  location: string;
  native_language: string;
  target_language: string;
  last_online: string;
  time_created: string;
  icon?: string;
};

const usersId = "d2792a62-86a4-4c49-a909-b1e762c683a3";

export default function ProfileScreen() {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );
  const profileText = useRef("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [dayJoined, setDayJoined] = useState<string | null>(null);

  const colorScheme = useColorScheme();

  useEffect(() => {
    (async function () {
      const usersProfile: UserProfile = await api(
        `${buildUrl()}/getUser?id=${"d2792a62-86a4-4c49-a909-b1e762c683a3"}`
      );
      setUserProfile({ ...usersProfile });
      profileText.current = usersProfile.profile;
      const joinedDate = new Date(usersProfile.time_created);
      const today = new Date();
      const dayDiff = daysBetween(joinedDate, today);

      setDayJoined(joinedDate.toDateString());
      setNumberOfDays(Math.floor(dayDiff));
    })();
  }, []);

  const updateProfileContent = (text: string) => {
    setUserProfile((prevState) => ({
      ...prevState,
      profile: text,
    }));
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
      <View
        style={[
          styles.bubble,
          {
            top: 0,
            left: -65,
            backgroundColor:
              colorScheme === "light" ? pallatte.colorGrey : pallatte.colorGold,
          },
        ]}
      />
      <View
        style={[
          styles.bubble,
          {
            top: -50,
            left: -15,
            backgroundColor:
              colorScheme === "light"
                ? pallatte.colorGold
                : pallatte.colorDarkPurple,
          },
        ]}
      />
      <View
        style={[
          styles.bubble,
          {
            top: 10,
            right: -45,
            backgroundColor:
              colorScheme === "light"
                ? pallatte.colorDarkGrey
                : pallatte.colorDarkGrey,
          },
        ]}
      />
      <View
        style={[
          styles.bubble,
          {
            top: -75,
            right: 50,
            backgroundColor:
              colorScheme === "light"
                ? pallatte.colorDarkPurple
                : pallatte.colorLightPurple,
          },
        ]}
      />
      <View
        style={[
          styles.bubble,
          {
            bottom: -55,
            left: -10,
            backgroundColor:
              colorScheme === "light"
                ? pallatte.colorLightPurple
                : pallatte.colorGrey,
          },
        ]}
      />
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {userProfile?.icon === undefined ? (
          <View
            style={{
              backgroundColor: pallatte.colorLightGrey,
              borderRadius: 100,
            }}
          >
            <Fox height={100} width={100} />
          </View>
        ) : (
          <Image
            source={{ uri: "http://placekitten.com/200/300" }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: pallatte.colorLightGrey,
            }}
          />
        )}

        <Text style={{ fontWeight: "700", fontSize: 18 }}>
          {userProfile?.username}
        </Text>
      </View>
      <View
        style={{
          marginTop: 50,
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <View style={styles.timeHeader}>
          <Text style={styles.timeHeadingText}>Member Since</Text>
          <Text>{dayJoined}</Text>
        </View>
        <View style={styles.timeHeader}>
          <Text style={styles.timeHeadingText}>Last Online</Text>
          <Text>
            {numberOfDays === 0 ? "Today" : `${numberOfDays} days ago`}{" "}
          </Text>
        </View>
      </View>

      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 0,
          justifyContent: "flex-start",
        }}
      >
        {isEdit ? (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexGrow: 1,
                width: "100%",
                alignItems: "flex-end",
              }}
            >
              <Pressable onPress={() => setIsEdit(!isEdit)}>
                <FontAwesome
                  name="close"
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                />
              </Pressable>
            </View>

            <EditTextContent
              updateContent={updateProfileContent}
              content={userProfile?.profile}
            />
            <Button style={{ maxWidth: "25%" }} onPress={updateProfile} />
          </View>
        ) : (
          <>
            <View style={styles.contentContainerHeading}>
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 10,
                  fontWeight: "500",
                }}
              >
                About Me
              </Text>
              <View>
                {usersId === userProfile.id && (
                  <Pressable onPress={() => setIsEdit(!isEdit)}>
                    <FontAwesome
                      name="edit"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                    />
                  </Pressable>
                )}
              </View>
            </View>

            <Text>{userProfile?.profile}</Text>
          </>
        )}
        <View
          style={[
            styles.profileItemContainer,
            {
              marginTop: 10,
            },
          ]}
        >
          <Text style={styles.profileItemHeader}>Age:</Text>
          <Text style={styles.profileItem}>{userProfile?.age}</Text>
        </View>
        <View style={styles.profileItemContainer}>
          <Text style={styles.profileItemHeader}>Location</Text>
          <Text style={styles.profileItem}>{userProfile?.location}</Text>
        </View>
        <View style={styles.profileItemContainer}>
          <Text style={styles.profileItemHeader}>Native Language</Text>
          <Text style={styles.profileItem}>{userProfile?.native_language}</Text>
        </View>
        <View style={styles.profileItemContainer}>
          <Text style={styles.profileItemHeader}>Target Language</Text>
          <Text style={styles.profileItem}>{userProfile?.target_language}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  bubble: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 0,
  },
  timeHeader: {
    alignItems: "center",
    flexDirection: "column",
  },
  timeHeadingText: {
    fontWeight: "700",
  },
  contentContainerHeading: {
    flex: 1,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  profileItemContainer: {
    flexDirection: "row",
  },
  profileItemHeader: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 5,
  },
  profileItem: {
    fontSize: 16,
  },
});
