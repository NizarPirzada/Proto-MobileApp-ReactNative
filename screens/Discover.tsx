/* eslint-disable react/jsx-fragments */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef, Fragment } from "react";
import { PostSettingState, setPref, setReady } from "meecha/store/postSettings";
import type { Tag } from "meecha/store/postSettings";
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  NativeScrollEvent,
  Platform,
  Text as RNText,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Card, Text, Button, Avatar } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Modalize } from "react-native-modalize";
import Animated from "react-native-reanimated";
import moment from "moment";
import {
  useGetMeQuery,
  useFetchSearchQuery,
  useInitSearchMutation,
  useDeclareInterestMutation,
  useDeleteInterestMutation,
  InitSearchApiResponse,
} from "meecha/generated/api.generated";
import { useSelector, useDispatch } from "react-redux";
import {
  CreatePost,
  SearchPreference,
  SearchPreferencesNew,
} from "meecha/components/modals";
import getShadow from "meecha/components/shadow";
import { useAnimatedDims } from "meecha/utils/hooks";
import {
  ageFormator,
  getPostTypesIndex,
  setToStorage,
  PtT,
  extractFromStorage,
} from "meecha/utils/helpers";
//import Swipe from "meecha/components/swiper";
import { Images, Colors } from "meecha/constants";

const HeaderHeight = 56;
const isCloseToBottom = (
  { bottom, top }: { top: number; bottom: number },
  { layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent
) => {
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - (bottom + top)
  );
};

const DiscoverPage = ({ navigation }: { navigation: any }) => {
  const { top, bottom } = useSafeAreaInsets();
  const { postCategory, postType } = useSelector(
    ({ postSettings }: { postSettings: PostSettingState }) => postSettings
  );
  const dispatch = useDispatch();
  const setCatType = (CAT: Tag, TYPE: Tag) => {
    setToStorage(
      {
        postType: TYPE,
        postCategory: CAT,
      },
      "type_cat"
    );
    dispatch(setPref({ postType: TYPE, postCategory: CAT }));
  };
  // const ee = useSelector((state) => state);
  // console.log("Úserss", ee);
  //Refs
  const ScrollY = useRef(new Animated.Value(0));
  const modalizeRef = useRef<Modalize>(null);
  //States
  const [posts, setPosts] = useState([]);
  const [locInterests, setLocInterests] = useState<any>({});
  const [cursor, setCursor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [initSearch] = useInitSearchMutation();
  const [likeIt] = useDeclareInterestMutation();
  const [dislikeIt] = useDeleteInterestMutation();
  const {
    data: nextData,
    error,
    isLoading: nextIsLoading,
  } = useFetchSearchQuery({ cursor });
  const {
    data: UData,
    refetch: reFetchMe,
    isLoading,
  } = useGetMeQuery({ language: "eng" });
  // const {
  //   data: nextPosts,
  //   refetch: nextPostsRefetch,
  //   isLoading: isnextPostsLoading,
  // } = useListPostsQuery({ count: 20, after });
  //console.log("USER", UData);
  const handleInterested = (id: number, decline: boolean) => {
    const locI = { ...locInterests };
    locI[id] = !decline;
    setLocInterests(locI);
    likeIt({
      id,
      decline,
      body: { credentialId: null, note: null },
    }).then((re) => {
      // console.log("rrr", JSON.stringify(re));
    });
  };

  const handleNotInterested = (id: number, user: number) => {
    dislikeIt({ id, user });
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const RenderCards = ({ job }: { job: any }) => {
    //console.log("Çard", job);
    return (
      <View
        style={{
          ...getShadow(3),
          borderWidth: 2,
        }}
      >
        <Header
          title={job?.category?.name}
          type={job?.type}
          formattedRelativeTime={moment(job.creation).fromNow()}
        />
        <View
          style={{ width: "100%", paddingHorizontal: 15, paddingBottom: 15 }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: Platform.OS === "ios" ? 16 : 17,
            }}
          >
            {job.subject}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 18 }}>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {job.tags?.map((item: Tag, idx: number) => (
                <View
                  key={"_tag".concat(item.name).concat(idx?.toString())}
                  style={styles.buttonTag}
                >
                  <Text style={styles.TagTxt}>{item.name}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                //console.log("ss", job.id);
                handleInterested(
                  job.id,
                  locInterests[job.id] !== undefined
                    ? locInterests[job.id]
                    : job.interested
                );
              }}
              style={[
                styles.buttonTag,
                {
                  alignSelf: "flex-end",
                  ...getShadow(2),
                  borderColor:
                    locInterests[job.id] !== undefined
                      ? locInterests[job.id]
                        ? "green"
                        : "black"
                      : job.interested
                      ? "green"
                      : "black",
                },
              ]}
            >
              <Text
                style={{
                  ...styles.TagTxt,
                  color:
                    locInterests[job.id] !== undefined
                      ? locInterests[job.id]
                        ? "green"
                        : "black"
                      : job.interested
                      ? "green"
                      : "black",
                }}
              >
                + Interest
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer
          credential={job?.credential}
          userName={job?.identity?.handle}
          formattedRelativeTime={job?.identity?.ageRange}
          country={job?.identity?.country}
          gender={job?.identity?.gender}
          pic={job?.identity?.picture}
        />
      </View>
    );
  };

  //console.log("Next", nextData);
  // const RenderIcon = (props: any) => (
  //   <TouchableWithoutFeedback {...props}>
  //     <Image source={Images.search} style={{ width: 25, height: 25 }} />
  //   </TouchableWithoutFeedback>
  // );
  // useEffect(() => {
  //   if (nextData && nextData.data) {
  //     if (nextData.data.length) {
  //       setPosts([...posts, ...nextData.data]);
  //     }
  //   }
  // }, [nextData]);

  const RenderIcon2 = (props: any) => (
    <TouchableWithoutFeedback {...props}>
      <Image source={Images.add} style={{ width: 25, height: 25 }} />
    </TouchableWithoutFeedback>
  );
  const { headerHeight, headerOpacity, headerTranslateY } = useAnimatedDims({
    height: HeaderHeight,
    ScrollY: ScrollY.current,
  });
  const searchNow = () => {
    // const body = {
    //   categoryId: category.id !== 0 ? category.id : undefined,
    //   type: postType.id !== 0 ? postType.id : undefined,
    //   // tagIds: [],
    //   // anonymous: false,
    // };
    // console.log("Body", body);
    setLoading(true);
    initSearch({
      language: "eng",
      body: {
        categoryId: postCategory
          ? postCategory.id != 0
            ? postCategory.id
            : undefined
          : undefined,
        type: postType
          ? postType.id != 0
            ? postType.id
            : undefined
          : undefined,
      },
    })
      .then((res: any) => {
        setPosts(res.data.data);
        //console.log("GG", res.data.data);
        setCursor(res.data.metadata.next);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const searchNowWithFilter = (categoryId: number, type: number) => {
    setLoading(true);
    const body = {
      categoryId: categoryId != 0 ? categoryId : undefined,
      type: type != 0 ? type : undefined,
      // tagIds: [],
      // anonymous: false,
    };
    //console.log("Body", body);
    initSearch({
      language: "eng",
      body,
    })
      .then((res: any) => {
        setPosts(res.data.data);
        //console.log("GG", res.data.data);
        setCursor(res.data.metadata.next);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    searchNow();
    //AsStore.clear()
    //extractFromStorage("type_cat").then((res) => {});
    // setToStorage(
    //   {
    //     postType: { name: "Any", id: 0 },
    //     postCategory: { name: "Random", id: 0 },
    //   },
    //   "type_cat"
    // );
  }, []);
  return (
    <Fragment>
      <View style={[styles.container, { paddingTop: top }]}>
        <Animated.View
          style={[
            styles.header,
            {
              height: headerHeight,
              transform: [{ translateY: headerTranslateY }],
              opacity: headerOpacity,
            },
          ]}
        >
          <View
            style={[
              styles.header,
              {
                width: "100%",
                justifyContent: "space-between",
                paddingHorizontal: 0,
                borderRadius: 4,
                borderColor: "#ECF0F7",
              },
            ]}
          >
            <RNText style={{ fontWeight: "bold", fontSize: 20 }}>
              {postCategory?.name} / {postType?.name}
            </RNText>
            <SearchPreferencesNew
              searchNowWithFilter={searchNowWithFilter}
              searchNow={searchNow}
              Cat={postCategory}
              PType={postType}
              setCat_PTWhileApply={(inComObject1: Tag, inComObject2: Tag) =>
                setCatType(inComObject1, inComObject2)
              }
            >
              <View
                style={{
                  width: Platform.OS === "ios" ? 40 : 44,
                  height: Platform.OS === "ios" ? 40 : 44,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  //backgroundColor: "#F7F9FC",
                }}
              >
                <Image
                  source={Images.filter}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </SearchPreferencesNew>
          </View>
        </Animated.View>
        <View style={{ flex: 1 }}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={100}
            style={styles.container}
            contentContainerStyle={{ paddingBottom: bottom + 10 }}
            onScroll={({ nativeEvent }) => {
              const { contentOffset }: { contentOffset: any } = nativeEvent;
              ScrollY.current.setValue(contentOffset.y);
              if (isCloseToBottom({ bottom, top: 0 }, nativeEvent)) {
                // console.log("end", "Reached");
                // nextPostsRefetch();
                // setTimeout(() => {
                //   if (nextPosts?.data.length) {
                //     setAfter(after + 10);
                //     setPosts([...posts, ...nextPosts?.data]);
                //   }
                // }, 1000);
              }
            }}
            // onScroll={Animated.event([
            //   { nativeEvent: { contentOffset: { y: ScrollY.current } } },
            // ])}
          >
            {posts.length > 0 ? (
              <Fragment>
                {posts
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    // eslint-disable-next-line react/no-array-index-key
                    return <RenderCards job={item} key={`_job${index}`} />;
                  })}
              </Fragment>
            ) : (
              !loading && <RenderNoMoreCards />
            )}
          </Animated.ScrollView>
        </View>
        <Button
          style={[
            styles.floatingBtn,
            {
              bottom: bottom + 15,
            },
          ]}
          status="primary"
          accessoryLeft={<RenderIcon2 onPress={onOpen} />}
        />
      </View>
      <CreatePost
        ref={modalizeRef}
        navigation={navigation}
        searchNow={searchNow}
      />
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.transparentBlack,
            },
          ]}
        >
          <ActivityIndicator size="large" color="white" animating={true} />
        </View>
      )}
    </Fragment>
  );
};
const Header = ({
  title,
  type,
  formattedRelativeTime,
  style = {},
}: {
  title: string;
  type: number;
  formattedRelativeTime: string;
  style?: ViewStyle;
}) => {
  const thiObject = PtT?.find((itm) => itm.value === type);
  return (
    <View
      style={[
        style,
        {
          paddingHorizontal: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: Colors.white,
          height: 50,
        },
      ]}
    >
      <Text category="label">
        {title} / {thiObject ? thiObject.label : "Any"}
      </Text>
      <Text category="label" style={{ color: Colors.grey, lineHeight: 20 }}>
        {formattedRelativeTime}
      </Text>
    </View>
  );
};
const Footer = ({
  gender = "",
  userName = "",
  formattedRelativeTime = "",
  country = "",
  credential = "",
  pic = null,
  style = {},
}: {
  credential?: string;
  gender?: string;
  userName?: string;
  formattedRelativeTime?: string;
  pic?: string | null;
  country?: string;
  style?: ViewStyle;
}) => {
  return (
    <View style={[style, styles.footerContainer]}>
      <Avatar
        source={{
          uri: pic || "https://img.icons8.com/bubbles/2x/user.png",
        }}
      />
      <View>
        <Text category="s1">
          {`${userName} • ${
            formattedRelativeTime
              ? ageFormator(parseInt(formattedRelativeTime, 10), false)
              : ""
          } •${gender === "F" ? "♀️" : gender === "M" ? "♂️" : "☿️"}• `}
          {country}
        </Text>
        <Text category="s2" style={{ color: Colors.grey }}>
          {credential}
        </Text>
      </View>
    </View>
  );
};
const RenderNoMoreCards = () => {
  return (
    <Card>
      <Text appearance="hint" category="h6" style={{ textAlign: "center" }}>
        No posts to show...
      </Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  floatingBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    right: 15,
    alignSelf: "flex-end",
    position: "absolute",
    zIndex: 5,
    borderWidth: 0,
    ...getShadow(4, Colors.black),
  },
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
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#fff",
  },
  TagTxt: { fontSize: Platform.OS === "ios" ? 12 : 13 },
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
    borderTopColor: "black",
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f2f3",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footerControl: {
    marginHorizontal: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  modalHandle: {
    height: 0,
  },
});

const DiscoverPageWrapper = ({ navigation }: { navigation: any }) => {
  const { ready } = useSelector(
    ({ postSettings }: { postSettings: PostSettingState }) => postSettings
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //AsStore.clear()
    extractFromStorage("type_cat")
      .then((res: any) => {
        // console.log("extracted", res);
        dispatch(setPref(res));
      })
      .finally(() => {
        dispatch(setReady());
      });
    //setToStorage({ postType: "all", postCategory: "any" }, "type_cat");
  }, []);
  return ready ? (
    <DiscoverPage navigation={navigation} />
  ) : (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          zIndex: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.transparentBlack,
        },
      ]}
    >
      <ActivityIndicator size="large" color="white" animating={true} />
    </View>
  );
};

export default DiscoverPageWrapper;
