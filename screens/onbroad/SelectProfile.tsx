import {
  Profile,
  UpdateProfileApiArg,
  useListLanguagesQuery,
  useListProfilesQuery,
  useUpdateProfileMutation,
} from "meecha/generated/api.generated";
import React, { useEffect, useState, FC } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  SingleInputPage,
  SingleInputPageProps,
} from "meecha/components/pages/SingleInputPage";
import { CustomTextInput } from "meecha/components/input/CustomTextInput";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useDispatch } from "react-redux";
import { setLangCode } from "meecha/store/auth";

const loadingView = <Text>Loading ...</Text>;

/// https://redux-toolkit.js.org/rtk-query/usage/code-generation
// We need another file to enhance the generated API

export const CreateProfilePage = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [localLangCode, setLocalLangCode] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>();
  const [headline, setHeadline] = useState<string>();

  const [pos, setPos] = useState<number>(0);
  const [error, setError] = useState<string>();
  // https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usemutation
  const [createProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  // Load supported languages
  const {
    data: listLanguagesResp,
    isLoading,
    isFetching,
  } = useListLanguagesQuery("languages", {
    skip: pos !== 0,
  });

  const items: Array<SingleInputPageProps> = [
    {
      title: "Select profile language",
      inputComp: <></>,
      disabled: !localLangCode,
      onSubmit: () => {
        console.log("collected language", localLangCode);
        setPos(pos + 1);
      },
    },
    {
      title: "Tell people about you",
      inputComp: (
        <CustomTextInput
          value={headline}
          onChangeText={setHeadline}
          maxLength={64}
          showLength={true}
        />
      ),
      note: "This will serve as your profile headline.",
      disabled: !headline,
      onSubmit: () => {
        console.log("collected headline", headline);
        setPos(pos + 1);
      },
    },
    {
      title: "Enter a nickname",
      skip: !nickname,
      note: "Nickname will be shown alongside with your handle.",
      inputComp: (
        <CustomTextInput
          value={nickname}
          onChangeText={setNickname}
          maxLength={32}
          showLength={false}
          error={error}
        />
      ),
      onSubmit: async () => {
        // Submit create profile request
        console.log("collected nickname", nickname);
        const arg: UpdateProfileApiArg = { language: localLangCode!, body: {} };
        if (nickname) arg.body.nickname = nickname;
        if (headline) arg.body.headline = headline;
        try {
          await createProfile(arg);
          setPos(pos + 1);
          dispatch(setLangCode(localLangCode!));
        } catch (e) {
          console.log("got error", e);
          setError("Server error - please try again later");
        }
      },
    },
  ];

  if (pos === 0) {
    if (isLoading || isFetching) return loadingView;

    const languages = listLanguagesResp!.data;
    console.log("loaded languages", languages);

    const langItems: Array<ItemType> = [];
    for (let i = 0; i < languages.length; i++) {
      const language = languages[i];
      langItems.push({ label: language.name, value: language.code });
    }
    // https://github.com/hossein-zare/react-native-dropdown-picker/issues/56#issuecomment-841399365
    items[0].inputComp = (
      <View
        style={{
          height: 80,
          margin: 10,
          alignItems: "flex-start",
        }}
      >
        <DropDownPicker
          items={langItems}
          open={dropDownOpen}
          value={localLangCode}
          setOpen={setDropDownOpen}
          setValue={setLocalLangCode}
          listMode="SCROLLVIEW"
          containerStyle={{
            maxWidth: 200,
            marginHorizontal: 5,
          }}
          dropDownContainerStyle={{
            maxWidth: 200,
          }}
          style={{
            borderRadius: 0,
            height: 40,
          }}
          textStyle={{
            fontSize: 16,
          }}
        />
      </View>
    );
  }

  if (pos >= items.length) {
    return (
      <>
        <Text>I'm here</Text>
      </>
    );
  }

  const item = items[pos];
  return <SingleInputPage {...item} />;
};
const SelectProfilePage: FC = ({ navigation }) => {
  const { top, bottom } = useSafeAreaInsets();
  // Load profiles
  const {
    data: listProfilesResp,
    isFetching: isFetchingProfiles,
    isLoading: isLoadingProfiles,
  } = useListProfilesQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    const profiles = listProfilesResp?.data;
    if (profiles && profiles.length === 1) {
      dispatch(setLangCode(profiles[0].language));
    }
  }, [listProfilesResp]);

  if (isLoadingProfiles || isFetchingProfiles) return loadingView;

  const profiles: Array<Profile> = listProfilesResp!.data;
  console.log("loaded profiles", profiles);
  // If there is none, create a new profile
  if (profiles.length > 0) {
    // TODO: Ask user to choose a language
  }

  // Create profile sequence => ask user to enter nickname, headline
  return (
    <View
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={[
          style.header,
          {
            height: 56,
          },
        ]}
      >
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{
            width: 48,
            height: 48,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/previous.png")}
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
      <CreateProfilePage />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  button: {
    margin: 2,
  },
  buttonTag: {
    margin: 2,
    padding: 0,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#bbb",
    backgroundColor: "#fff",
  },
  statusStyle: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f2f3",
  },
  footerControl: {
    marginHorizontal: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
});
export default SelectProfilePage;
