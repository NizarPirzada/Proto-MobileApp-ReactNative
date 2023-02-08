import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export interface UserBasicProps {
  anonymous: boolean;
  handle?: string;
  ageRange?: number;
  country?: string;
  gender?: string;
  online?: boolean;
  picture?: string;
  credential: string;
  // styles
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50,
    marginVertical: 5,
  },
  imageContainer: {
    flex: 3,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  infoContainer: {
    flex: 7,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: 5,
  },
  image: {
    borderRadius: 25,
  },
  handleText: {},
  credentialText: {},
});

// export const UserBasic: React.FC<UserBasicProps> = () => {
//   return (
//     <View>
//       <View style={styles.imageContainer}>
//         <Image style={styles.image} source={} />
//       </View>
//       <View style={styles.infoContainer}>
//         <Text style={styles.handleText}></Text>
//         <Text style={styles.credentialText}></Text>
//       </View>
//     </View>
//   )
// }
