import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Selection = ({ navigation, route }) => {
  const { data, onSelect, selected } = route?.params;
  //console.log("selected", selected);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cancel}
        onPress={() => {
          navigation.pop();
        }}
      >
        <Icon name="times" size={25} />
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                navigation.pop();
              }}
            >
              <Text>{item?.name}</Text>
              {selected === item?.id && <Icon name="check" />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  item: {
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancel: {
    alignSelf: "flex-end",
    paddingLeft: 20,
    paddingVertical: 10,
  },
});
