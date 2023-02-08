/* eslint-disable */
/* eslint-disable quotes */
import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import { replaceMentionValues } from "react-native-controlled-mentions";

import {
  useCreatePostMutation,
  useListCategoriesQuery,
  useGetMeQuery,
  useListCredentialsQuery,
  useCompleteTagQuery,
} from "meecha/generated/api.generated";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Modalize } from "react-native-modalize";

import DropDownInputPicker from "meecha/components/input/DropDownInputPicker";
import { formatLabelValue, filterValues } from "../../utils/helpers";
import TagInput from "../input/TagInput";
import { getPostTypes } from "meecha/utils/helpers";
import MentionsInput from "../input/MentionsInput";

const { width } = Dimensions.get("window");

// const POST_TYPE = [
//   { name: "Any", id: 1 },
//   { name: "Chat", id: 2 },
//   { name: "Share", id: 3 },
//   { name: "Live", id: 4 },
// ];

const POST_TYPE = [
  { id: 0, name: "Any" },
  { id: 1, name: "Chat" },
  { id: 3, name: "Live" },
  { id: 2, name: "Share" },
  { id: 4, name: "AMA" },
  { id: 5, name: "Discuss" },
  { id: 6, name: "Debate" },
  { id: 7, name: "Adult" },
];

const extractTagsId = (data) => {
  const new_data = [];
  data.map((item) => new_data.push(item?.id ? item?.id : item?.name));
  return new_data;
};

const CreatePost = forwardRef(({ navigation, searchNow }, ref) => {
  const [showNote, setShowNote] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [isAnoymous, setIsAnoymous] = useState(false);
  const [error, setError] = useState(false);
  const [credential, setCredential] = useState(null);
  const [page, setPage] = useState(1);
  const [myTags, setMyTags] = useState([]);

  console.log("myTags", myTags);

  const categories = useListCategoriesQuery({
    language: "eng",
  })?.data?.data;

  //console.log("categories", categories);

  const [category, setCategory] = useState(
    categories ? categories[0] : { id: 12, name: "Rock Music" }
  );

  const [type, setType] = useState(POST_TYPE[0]);

  const [topic, setTopic] = useState("");
  const [note, setNote] = useState("");
  const [payment, setPayment] = useState("");
  const [location, setLocation] = useState("");

  const horizontalScroll = useRef(null);
  const noteRef = useRef(null);
  const topicRef = useRef(null);

  const modalizeRef = useRef<Modalize>(null);

  const tagInputRef = useRef(null);

  const [createPost] = useCreatePostMutation();

  const cred = useListCredentialsQuery({
    language: "eng",
  }).data?.data;

  //console.log("cred", cred);

  useImperativeHandle(ref, () => ({
    open: openModal,
    close: closeModal,
  }));

  const requestCreatePost = () => {
    //console.log("category", category);
    //console.log("tagInputRef", tagInputRef?.current?.getTags());
    const payload = {
      subject: replaceMentionValues(topic, ({ name }) => `#${name}`),
      categoryId: category?.id,
      type: type?.id,
      credentialId: credential,
      tags: extractTagsId(tagInputRef?.current?.getTags()),
      note: note,
      anonymous: isAnoymous,
      location: [],
    };
    console.log("payload", payload);

    // note !== "" && { ...payload, note };

    createPost({
      language: "eng",
      allowance: 100,
      body: payload,
    }).then(({ data }) => {
      console.log("CreatePostRes =>", data);
      if (data?.id) {
        closeModal();
        resetData();
        searchNow();
      }
    });
  };

  const openModal = () => {
    modalizeRef.current?.open();
  };
  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const onNotePress = () => {
    setShowNote((prevState) => !prevState);
    // [showNote ? noteRef : topicRef].current.focus();
  };
  const onPaymentPress = () => {
    setShowPayment((prevState) => !prevState);
  };
  const onLocationPress = () => {
    setShowLocation((prevState) => !prevState);
  };

  const onAnoymousPress = () => {
    setIsAnoymous((prevState) => !prevState);
  };

  const createMyTags = () => {
    const myTagsCopy = [...myTags];
    replaceMentionValues(topic, ({ name, id }) => {
      // console.log("taggs", name, id);
      myTagsCopy.push({ name, id });
    });
    setMyTags(myTagsCopy);
  };

  const onNextPress = () => {
    if (topic !== "") {
      Keyboard.dismiss();
      setShowNote(false);
      setShowPayment(false);
      setShowLocation(false);
      setShowTags(true);
      createMyTags();
      setPage(2);
      horizontalScroll.current.scrollToEnd();
    } else {
      setError(true);
    }
  };

  const resetData = () => {
    setTopic("");
    setIsAnoymous(false);
    setNote("");
    setPayment("");
    setLocation("");
    setShowTags(false);
    setPage(1);
    setMyTags([]);
  };

  const onResetPost = () => {
    resetData();

    horizontalScroll.current.scrollTo({ x: 0 });
  };

  const onChangeTopic = (topic: React.SetStateAction<string>) => {
    setError(false);

    // setTopic(replaceMentionValues(topic, ({ name }) => `#${name}`));
    setTopic(topic);
  };

  const onValidationCredentialSelect = (credential) => {
    setCredential(credential);
  };

  const onSubmitPost = () => {
    // console.log("tagInputRef", tagInputRef.current.getTags());
    requestCreatePost();
  };

  const RenderTags = ({
    name,
    icon = "",
    onPress = () => {},
    IconLib = Icon,
  }: {
    name: string;
    icon?: string;
    onPress?: Function;
  }) => {
    const isAnoymousTag = isAnoymous && name === "Anonymous";

    const anoymousStyle = isAnoymousTag ? styles.anoymousContainer : {};
    const anoymousText = isAnoymousTag ? styles.anoymousText : {};
    const color = isAnoymousTag ? "red" : "#000";

    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.tags, anoymousStyle]}
      >
        {icon !== "" && (
          <View style={styles.iconContainer}>
            <IconLib name={icon} size={15} color={color} />
          </View>
        )}
        <Text allowFontScaling={false} style={[styles.tagName, anoymousText]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTags2 = (
    name: String,
    icon: String,
    options: Array,
    onPress = () => {}
  ) => {
    return (
      <Menu>
        <MenuTrigger customStyles={{ triggerWrapper: styles.tags }}>
          {icon && (
            <View style={styles.iconContainer}>
              <Icon name={icon} size={15} color="#000" />
            </View>
          )}
          <Text allowFontScaling={false} style={styles.tagName}>
            {name}
          </Text>
        </MenuTrigger>
        <MenuOptions>
          {options?.map((item: string | undefined, index) => {
            return (
              <MenuOption
                onSelect={() => onPress(item)}
                text={item?.name}
                key={`_item${index}`}
              />
            );
          })}
        </MenuOptions>
      </Menu>
    );
  };

  const renderTextInput = () => {
    return (
      <View>
        {/* <TextInput
          // ref={topicRef}
          placeholder="Topic"
          style={styles.input}
          autoFocus
          value={topic}
          multiline
          onChangeText={onChangeTopic}
        /> */}
        <MentionsInput onChangeText={onChangeTopic} value={topic} />
        {error && <Text style={styles.error}>Please enter topic name</Text>}
      </View>
    );
  };

  const renderNoteInput = () => {
    return (
      <View
        style={[
          styles.inputContainer,
          { opacity: showNote ? 1 : 0, height: showNote ? "100%" : 0 },
        ]}
      >
        <View style={styles.inputTitleContainer}>
          <Text style={styles.inputTitle}>Note</Text>
          <TouchableOpacity style={styles.inputCancel} onPress={onNotePress}>
            <Icon name="plus" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <TextInput
          ref={noteRef}
          autoFocus
          multiline
          onChangeText={(val) => setNote(val)}
          style={styles.noteInput}
        />
      </View>
    );
  };

  const renderPaymentInput = (title, onPress, onChangeText) => {
    return (
      <View style={styles.inputContainer}>
        <View style={styles.inputTitleContainer}>
          <Text style={styles.inputTitle}>{title}</Text>
          <TouchableOpacity
            style={styles.inputCancel}
            onPress={() => onPress()}
          >
            <Icon name="plus" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <TextInput
          autoFocus
          onChangeText={(val) => onChangeText(val)}
          style={styles.paymentInput}
        />
      </View>
    );
  };

  const RenderNextButton = ({ onPress = () => {} }: { onPress: Function }) => {
    return (
      <TouchableOpacity onPress={() => onPress()} style={styles.nextBtn}>
        <Icon2 name="chevron-right" size={40} color="#000" />
      </TouchableOpacity>
    );
  };

  const RenderResetButton = () => {
    return (
      <TouchableOpacity onPress={onResetPost} style={styles.nextBtn}>
        <Icon2 name="refresh" size={30} color="#000" />
      </TouchableOpacity>
    );
  };

  const renderCreatePost = () => {
    return (
      <View style={{ width: width - 40 }}>
        <View style={styles.popupTagContainer}>
          {/* {renderTags2(
            `Category: ${category ? category?.name : ""}`,
            "pencil",
            categories,
            setCategory
          )}
          {renderTags2(`Type: ${type.name}`, "pencil", POST_TYPE, setType)} */}
          <RenderTags
            name={`Category: ${
              category?.name
              // !category ? categories[0]?.name : category.name
            }`}
            icon="pencil"
            onPress={() =>
              navigation.navigate("Selection", {
                data: categories,
                onSelect: setCategory,
                title: "Categories",
                selected: !category ? categories[0]?.id : category.id,
              })
            }
          />
          <RenderTags
            name={`Type: ${type?.name}`}
            icon="pencil"
            onPress={() =>
              navigation.navigate("Selection", {
                data: POST_TYPE,
                onSelect: setType,
                selected: !type ? type[0]?.id : type.id,
              })
            }
          />
        </View>
        <View style={styles.addedTagContainer}>
          {!showNote && (
            <RenderTags name="Note" icon="plus" onPress={onNotePress} />
          )}
          {/* {!showPayment && (
            <RenderTags name="Payment" icon="plus" onPress={onPaymentPress} />
          )}
          {!showLocation && (
            <RenderTags name="Location" icon="plus" onPress={onLocationPress} />
          )} */}
        </View>
        {renderTextInput()}
        {/* <View style={{ alignSelf: "flex-start" }}> */}
        {/* </View> */}
        {renderNoteInput()}
        {showPayment &&
          renderPaymentInput("Payment", onPaymentPress, setPayment)}
        {showLocation &&
          renderPaymentInput("Location", onLocationPress, setLocation)}
      </View>
    );
  };

  const renderValidatePost = () => {
    return (
      <View style={{ width: width - 40 }}>
        <Text style={{}}>
          {replaceMentionValues(topic, ({ name }) => `#${name}`)}
        </Text>
        <Text style={styles.dropDownTitle}>Choose a credential</Text>
        <DropDownInputPicker
          data={
            cred && formatLabelValue(filterValues(cred), "description", "id")
          }
          onSelect={onValidationCredentialSelect}
          placeholder="Choose a credential"
        />
        <Text style={styles.dropDownTitle}>Tags</Text>
        {showTags && <TagInput ref={tagInputRef} defaultData={myTags} />}
      </View>
    );
  };

  const renderFooter = () => {
    return page === 1 ? (
      <View style={styles.bottomContainer}>
        <View style={styles.bottomTagContainer}>
          <RenderTags name="#" />
          <RenderTags
            name="Anonymous"
            icon="skull"
            onPress={onAnoymousPress}
            IconLib={Icon3}
          />
        </View>
        <RenderNextButton onPress={onNextPress} />
      </View>
    ) : (
      <View style={styles.validatePostBottom}>
        <Text style={styles.validatePostNote}>
          Once created, a post cannot be edited
        </Text>
        <RenderResetButton />
        <RenderNextButton onPress={onSubmitPost} />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a Post</Text>

        <ScrollView
          keyboardShouldPersistTaps="always"
          ref={horizontalScroll}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          horizontal
          style={{}}
        >
          {renderCreatePost()}
          {renderValidatePost()}
        </ScrollView>
      </View>
    );
  };

  return (
    <Modalize
      // onLayout={(nativeEvent: {
      //   layout: { height: number; width: number; x: number; y: number };
      // }) => {
      //   console.log("height", height);
      //   setHeight(height);
      // }}
      // modalHeight={height}
      avoidKeyboardLikeIOS={true}
      FooterComponent={renderFooter}
      keyboardAvoidingBehavior="height"
      overlayStyle={{ top: 80 }}
      handleStyle={styles.modalHandle}
      adjustToContentHeight
      scrollViewProps={{
        keyboardShouldPersistTaps: "always",
        nestedScrollEnabled: true,
        scrollEnabled: false,
      }}
      ref={modalizeRef}
    >
      {renderContent()}
    </Modalize>
  );
});

const styles = StyleSheet.create({
  modalHandle: {
    height: 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    zIndex: -10,
  },
  tags: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  tagName: {
    bottom: 1,
    color: "#000",
  },
  addedTagContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  popupTagContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    // marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    // position: "absolute",
    paddingHorizontal: 20,
    bottom: 0,
    paddingBottom: 10,
  },
  bottomTagContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    marginRight: 5,
  },
  input: {
    padding: 0,
    borderBottomWidth: 1,
  },
  noteInput: {
    height: 50,
    borderWidth: 1,

    paddingHorizontal: 3,
    paddingVertical: 3,
    textAlignVertical: "top",
  },
  inputTitle: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentInput: {
    borderWidth: 1,
    padding: 0,
  },
  inputContainer: {
    marginTop: 10,
  },
  inputCancel: {
    transform: [{ rotate: "-45deg" }],
  },
  nextBtn: {},
  validatePostBottom: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  validatePostNote: {
    fontSize: 10,
    flex: 1,
  },
  dropDownTitle: {
    marginVertical: 10,
    fontWeight: "bold",
  },
  anoymousContainer: {
    borderColor: "green",
  },
  anoymousText: {
    color: "green",
  },
  error: {
    color: "red",
  },
  tagContainer: { marginTop: 10 },
});

export default CreatePost;
