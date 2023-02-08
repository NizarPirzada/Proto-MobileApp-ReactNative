// // import React from "react";
// // import { TouchableOpacity, Text, StyleSheet } from "react-native";
// // import Tags from "react-native-tags";

// // const TagInput = () => {
// //   return (
// //     <Tags
// //       style={styles.container}
// //       inputContainerStyle={styles.containerStyle}
// //       initialText="monkey"
// //       //   textInputProps={{
// //       //     placeholder: "Any type of animal",
// //       //   }}
// //       //   initialTags={["dog", "cat", "chicken"]}
// //       onChangeTags={(tags) => console.log(tags)}
// //       onTagPress={(index, tagLabel, event, deleted) =>
// //         console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
// //       }
// //       containerStyle={{ justifyContent: "center" }}
// //       inputStyle={{ backgroundColor: "white" }}
// //       renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (
// //         <TouchableOpacity
// //           style={styles.tagContainerStyle}
// //           key={`${tag}-${index}`}
// //           onPress={onPress}
// //         >
// //           <Text style={styles.tagText}>{tag}</Text>
// //         </TouchableOpacity>
// //       )}
// //     />
// //   );
// // };

// // export default TagInput;

// // const styles = StyleSheet.create({
// //   container: {
// //     borderBottomWidth: 1,
// //   },
// //   containerStyle: {
// //     // borderBottomWidth: 1,
// //     // left: -20,
// //   },
// //   tagContainerStyle: {
// //     backgroundColor: "#c2c7cf",
// //     paddingVertical: 3,
// //     paddingHorizontal: 10,
// //     borderRadius: 10,
// //     marginRight: 10,
// //     marginBottom: 5,
// //   },
// //   tagText: {},
// // });

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import { View, Text, Dimensions, StyleSheet } from "react-native";
// import AutoTags from "react-native-tag-autocomplete";
// import { useCompleteTagQuery } from "meecha/generated/api.generated";

// const { width: screenWidth } = Dimensions.get("window");

// const TagInput = forwardRef(({}, ref) => {
//   const [tagsSelected, setTagsSelected] = useState([]);
//   const [text, setText] = useState("");

//   const tagInputRef = useRef(null);

//   const result = useCompleteTagQuery({
//     language: "eng",
//     name: text,
//   })?.data?.data;

//   useImperativeHandle(ref, () => ({
//     getTags: () => tagsSelected,
//   }));

//   const handleDelete = (index: number) => {
//     console.log("index", index);
//     tagsSelected.splice(index, 1);
//     setTagsSelected(tagsSelected);
//   };

//   const handleAddition = (suggestion) => {
//     console.log("suggestion", suggestion);
//     setTagsSelected(tagsSelected.concat(suggestion));
//   };

//   const onKeyPress = (key, value) => {
//     setText(value);
//     if (value === "") {
//       if (key === "Backspace") {
//         const tagsCopy = [...tagsSelected];
//         tagsCopy.splice(-1);
//         setTagsSelected(tagsCopy);
//       }
//     } else {
//       // if (key === " ") {
//       //   setTagsSelected(tagsSelected.concat({ name: value.trim() }));
//       //   console.log("resetValue", tagInputRef.current);
//       //   tagInputRef.current.resetValue();
//       //   // tagInputRef.resetValue();
//       // }
//     }
//   };

//   return (
//     <View style={{}}>
//       <AutoTags
//         ref={tagInputRef}
//         // onCustomTagCreated={(xx) => {
//         //   setTagsSelected(tagsSelected.concat({ name: xx }));
//         // }}
//         autoFocus={false}
//         onKeyPress={onKeyPress}
//         tagStyles={styles.tagStyles}
//         containerStyle={styles.containerStyle}
//         suggestions={result}
//         tagsSelected={tagsSelected}
//         handleAddition={handleAddition}
//         handleDelete={handleDelete}
//         placeholder="Add tags.."
//       />
//     </View>
//   );
// });

// export default TagInput;

// const styles = StyleSheet.create({
//   tagStyles: {
//     width: screenWidth - 40,
//     flexDirection: "row",
//     // flexWrap: "wrap",
//     // alignItems: "flex-start",
//     backgroundColor: "#efeaea",
//   },
//   containerStyle: {
//     backgroundColor: "#efeaea",
//     width: screenWidth - 40,
//   },
// });

import React, { useState, useImperativeHandle, forwardRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { useCompleteTagQuery } from "meecha/generated/api.generated";

const { width: screenWidth } = Dimensions.get("window");

const TagInput = forwardRef(({ defaultData = [] }, ref) => {
  let submitting: boolean;
  // const data = filterData(query);

  const [query, setQuery] = useState("");
  const [tagsSelected, setTagsSelected] = useState(defaultData);
  const [inputOffset, setInputOffset] = useState(0);

  const tagSuggestions = useCompleteTagQuery({
    language: "eng",
    name: query,
  })?.data?.data;

  useImperativeHandle(ref, () => ({
    getTags: () => tagsSelected,
  }));

  const onKeyPress = (key, value) => {
    setQuery(value);
    if (query === "") {
      if (key === "Backspace") {
        const tagsCopy = [...tagsSelected];
        tagsCopy.splice(-1);
        setTagsSelected(tagsCopy);
      }
    } else {
      // if (key === " ") {
      //   setTagsSelected(tagsSelected.concat({ name: value.trim() }));
      //   console.log("resetValue", tagInputRef.current);
      //   tagInputRef.current.resetValue();
      //   // tagInputRef.resetValue();
      // }
    }
  };

  const handleInput = (text) => {
    if (submitting) return;
    setQuery(text);
  };

  const handleDelete = (index: number) => {
    // console.log("index", index);
    tagsSelected.splice(index, 1);
    setTagsSelected(tagsSelected);
  };

  const addTag = (tag) => {
    setTagsSelected(tagsSelected.concat(tag));
    setQuery("");
  };

  const onSubmitEditing = () => {
    if (query.trim() === "") return;
    submitting = true;
    setTimeout(() => {
      submitting = false;
    }, 30);
  };

  const filterData = (query) => {
    if (!query || query.trim() == "") {
      return;
    }

    let suggestions = tagSuggestions;
    let results = [];
    query = query.toUpperCase();
    suggestions?.forEach((i) => {
      if (i.name.toUpperCase().includes(query)) {
        results.push(i);
      }
    });
    console.log("results", results);
    return results;
  };

  const isInclude = () => {
    let suggestions = tagSuggestions;
    const xy = suggestions?.forEach((i) => {
      console.log("ZZ", i.name.toUpperCase().includes(query));
      if (i.name.toUpperCase().includes(query)) {
        return true;
      } else {
        return false;
      }
    });
    console.log("XXX", xy);
    return xy;
  };

  const renderTags = () => {
    const padding = tagsSelected.length > 0 && { marginVertical: 5 };
    const width = filterData(query)?.length > 0 ? {} : { width: 0 };
    return (
      <View style={styles.tagStyles}>
        {tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={[styles.tag, padding]}
              onPress={handleDelete}
            >
              <Text style={styles.tagText}>{t.name}</Text>
            </TouchableHighlight>
          );
        })}
        <View>
          <FlatList
            scrollEnabled={true}
            style={[
              {
                left: inputOffset,
                position: "absolute",
                backgroundColor: "#fff",
                bottom: 40,
                zIndex: 9999,
                // borderWidth: 1,
              },
              width,
            ]}
            extraData={query}
            contentContainerStyle={{
              flex: 1,
              borderWidth: query !== "" ? 1 : 0,
            }}
            keyboardShouldPersistTaps="always"
            data={filterData(query)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  // borderBottomWidth: 1,
                  paddingHorizontal: 5,
                  paddingBottom: 2,
                  // alignItems: "center",
                }}
                onPress={() => addTag(item)}
              >
                <Text numberOfLines={1} style={{ fontSize: 13 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TextInput
            onLayout={({ nativeEvent: { layout: l } }) => {
              console.log("layout", l);
              setInputOffset(l.x);
            }}
            style={styles.input(tagsSelected.length)}
            placeholderTextColor="#bbb"
            placeholder="Add Tags.."
            onChangeText={handleInput}
            value={query}
            defaultValue={query}
            onKeyPress={({ nativeEvent: { key: keyValue } }) =>
              onKeyPress(keyValue, query)
            }
          />
        </View>
        {/* <Autocomplete
          data={filterData(query)}
          controlled={true}
          placeholder="Add Tags.."
          defaultValue={query}
          value={query}
          onKeyPress={({ nativeEvent: { key: keyValue } }) =>
            onKeyPress(keyValue, query)
          }
          onChangeText={handleInput}
          onSubmitEditing={onSubmitEditing}
          multiline={true}
          autoFocus={false}
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => addTag(item)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          inputContainerStyle={styles.inputContainerStyle}
          containerStyle={styles.containerStyle}
          underlineColorAndroid="transparent"
          style={styles.autoContainer}
          listContainerStyle={
            {
              // backgroundColor: "#efeaea",
            }
          }
        /> */}
      </View>
    );
  };

  return (
    <>
      {/* <View
        style={{
          height: 1,
          width: screenWidth - 40,
          backgroundColor: "#000",
          marginBottom: 2,
        }}
      /> */}
      <View style={styles.AutoTags}>{tagsSelected && renderTags()}</View>
      {/* <View
        style={{ height: 1, width: screenWidth - 40, backgroundColor: "#000" }}
      /> */}
    </>
  );
});

export default TagInput;

const styles = StyleSheet.create({
  autoContainer: { backgroundColor: "#efeaea", position: "absolute" },
  input: (val) => ({
    width: 100,
    top: val > 0 ? 5 : 0,
    padding: 0,
    paddingLeft: 5,
    color: "black",
  }),
  tagStyles: {
    // width: screenWidth - 40,
    alignContent: "center",
    flexDirection: "row",
    // justifyContent: "center",
    flexWrap: "wrap",
    // flex: 1,
    alignSelf: "center",

    // backgroundColor: "green",
    // flexShrink: 1,
    // flexBasis: 0,
    // alignItems: "flex-end",
    // flexGrow: 1,
    // alignItems: "flex-start",
    // backgroundColor: "#efeaea",
    // justifyContent: "space-around",
    // backgroundColor: "tan",
  },

  AutoTags: {
    flexDirection: "row",
    alignSelf: "baseline",
    flexWrap: "wrap",
    // backgroundColor: "red",

    // flexGrow: 1,
    // flex: 1,
    // flexGrow: 1,
    // flexBasis: 10,
    // flex:1,
    // flexBasis: 10,
    // alignItems: "flex-start",
    // backgroundColor: "red",
  },
  tagText: {
    // backgroundColor: "blue",
    // width: 100,
  },
  tag: {
    // width: 100,
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    marginLeft: 5,

    paddingHorizontal: 8,
    alignSelf: "baseline",
    // width: "100%",
    // alignSelf: "baseline",
  },
});
