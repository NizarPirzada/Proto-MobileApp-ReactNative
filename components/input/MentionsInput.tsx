import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import {
  MentionInput,
  replaceMentionValues,
} from "react-native-controlled-mentions";
import { useCompleteTagQuery } from "meecha/generated/api.generated";

const suggestions = [
  { id: "1", name: "David Tabaka" },
  { id: "2", name: "Mary" },
  { id: "3", name: "Tony" },
  { id: "4", name: "Mike" },
  { id: "5", name: "Grey" },
];

const MentionsInput = ({ onChangeText, value }) => {
  //   const [value, setValue] = useState("");
  const [inputOffset, setInputOffset] = useState(0);
  const [prevOffset, setPrevOffset] = useState(0);
  const [query, setQuery] = useState("");

  const tagSuggestions = useCompleteTagQuery({
    language: "eng",
    name: query,
  })?.data?.data;

  console.log("value", value);

  const lg = replaceMentionValues(value, ({ name }) => `#${name}`);

  console.log("inputOffset", inputOffset);

  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    console.log("keyword", keyword);

    if (keyword == null) {
      return null;
    }

    setQuery(keyword);

    return (
      <ScrollView
        keyboardShouldPersistTaps
        style={{
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 25,
          // marginLeft: inputOffset,
          left: lg.length * 6.5,
          paddingVertical: 2,
          borderWidth: 1,
          zIndex: 100,
        }}
      >
        {
          // suggestions
          //   .filter((one) =>
          //     one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          //   )
          tagSuggestions &&
            tagSuggestions.map((one) => {
              console.log("tagSuggestions", one);
              return (
                <Pressable
                  key={one.id}
                  onPress={() => {
                    onSuggestionPress(one);
                  }}
                  style={{ paddingHorizontal: 5 }}
                >
                  <Text style={{ fontSize: 13, padding: 0 }}>{one.name}</Text>
                </Pressable>
              );
            })
        }
      </ScrollView>
    );
  };

  return (
    // <View
    //   style={{
    //     flexDirection: "row",

    //     flexWrap: "wrap",
    //     borderBottomWidth: 1,
    //   }}
    // >
    <MentionInput
      onLayout={({ nativeEvent: { layout: l } }) => {
        console.log(",change", l);
        setInputOffset((prev) => {
          setPrevOffset(prev);
          return Math.floor(Math.floor(l.height) / 10 - 2);
        });
      }}
      placeholder="Topic"
      autoFocus
      style={{
        padding: 0,
        borderBottomWidth: 1,
        // width: 100,
        // backgroundColor: "red",
      }}
      value={value}
      onChange={onChangeText}
      partTypes={[
        {
          isInsertSpaceAfterMention: true,
          trigger: "#", // Should be a single character like '@' or '#'
          renderSuggestions,
          textStyle: { fontWeight: "bold", color: "blue" }, // The mention style in the input
        },
      ]}
    />

    // </View>
  );
};

export default MentionsInput;
