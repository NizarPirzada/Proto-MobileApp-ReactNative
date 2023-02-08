/* eslint-disable react/jsx-fragments */
/* eslint-disable spaced-comment */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState, useRef, Fragment, ReactNode } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  Text as RNText,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Text, Button, Divider } from "@ui-kitten/components";
import { widthPercentageToDP as WP } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { Images, Colors } from "meecha/constants";
import { useKeyboard } from "meecha/utils/hooks";
import {
  ageFormator,
  getPostTypes,
  isChanged,
  extractTagsId,
} from "meecha/utils/helpers";
import type { Tag } from "meecha/store/postSettings";
import {
  useListCategoriesQuery,
  useListCountriesQuery,
  useUpdateFilterMutation,
  useGetFilterQuery,
  Category,
  CountryInfo,
} from "meecha/generated/api.generated";
import TagInput from "../input/TagInput";
import DropDown from "../input/DDPicker";
import getShadow from "../shadow";
//import Rheostat, { RheostatThemeProvider } from "../MultiRanger";

const HEADER_HEIGHT = 56;
type ValueLable = { value: any; label: string };
const SearchPreference = ({
  children,
  searchNow,
  searchNowWithFilter,
  Cat,
  PType,
  setCat_PTWhileApply,
}: {
  Cat: Tag;
  PType: Tag;
  children: ReactNode;
  searchNowWithFilter: Function;
  searchNow: Function;
  setCat_PTWhileApply: Function;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  //States
  const [loading, setLoading] = useState<boolean>(false);
  const [AgeLimit, setAgeLimit] = useState<Array<number>>([18, 100]);
  const [distance, setDistance] = useState<number>(10);
  const [gender, setGender] = useState<string>("");
  const [filterModal, setFilterModal] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [category, setCategory] = useState<number>(Cat ? Cat.id : 0);
  const [postType, setPostType] = useState<number>(PType ? PType.id : 0);
  const [categoriesList, setCategoriesList] = useState<Array<ValueLable>>([]);
  const [CountriesList, setCountriesList] = useState<Array<ValueLable>>([]);
  const [enabled, setEnabled] = useState<boolean>(false);
  const [saveFilter] = useUpdateFilterMutation();
  const { data: dataFilter, refetch: reFetch } = useGetFilterQuery({});
  const { data: dataCategories } = useListCategoriesQuery({ language: "eng" });
  const { data: dataCountries } = useListCountriesQuery({ language: "eng" });
  const tagInputRef = useRef(null);
  const [keyBHeight, keyBDShown] = useKeyboard();
  //console.log("Çats", dataCategories);
  useEffect(() => {
    if (dataCategories) {
      const { data } = dataCategories;
      if (data && Array.isArray(data)) {
        const list = data.reduce(
          (pre: ValueLable[], cur: Category) => [
            ...pre,
            { value: cur.id, label: cur.name },
          ],
          [{ value: 0, label: "Random" }]
        );

        setCategoriesList(list);
      }
    }
  }, [dataCategories]);
  useEffect(() => {
    if (dataCountries) {
      const { data } = dataCountries;
      if (data && Array.isArray(data)) {
        const list = data.reduce(
          (pre: ValueLable[], cur: CountryInfo) => [
            ...pre,
            { value: cur.code, label: cur.name },
          ],
          []
        );
        setCountriesList(list);
      }
    }
  }, [dataCountries]);
  useEffect(() => {
    if (filterModal && dataFilter) {
      //console.log("getFilter", dataFilter);
      const {
        data: {
          maxAgeRange,
          minAgeRange,
          gender: gndr,
          country: cntry,
          maxDistance,
        },
      } = dataFilter;
      setAgeLimit([minAgeRange || 18, maxAgeRange || 100]);
      setGender(
        gndr ? (gndr === "M" ? "Male" : gndr === "F" ? "Female" : "Other") : ""
      );
      setCountry(cntry || "");
      setDistance(maxDistance || 10);
      //setCategory(0);
      //setCat({ name: "Random", id: 0 });
      //setPostType(0);
      //setPT({ name: "Any", id: 0 });
      setTimeout(() => {
        setEnabled(true);
      }, 300);
    } else {
      setEnabled(false);
      reFetch();
    }
  }, [filterModal, dataFilter]);
  const resetIt = () => {
    setEnabled(false);
    setAgeLimit([18, 100]);
    setDistance(10);
    setGender("");
    setCategory(0);
    setPostType(0);
    setCountry("");
    setCategory(0);
    setCat_PTWhileApply({ name: "Random", id: 0 }, { name: "Any", id: 0 });
    // setCat({ name: "Random", id: 0 });
    // setPT({ name: "Any", id: 0 });
    setTimeout(() => setEnabled(true), 100);
    const filter = {
      gender: undefined,
      minAgeRange: undefined,
      maxAgeRange: undefined,
      country: undefined,
      maxDistance: undefined,
      categoryId: 0,
      type: 0,
      tags: [],
      anonymous: false,
    };
    //console.log("filterPayload", filter);
    saveFilter({ filter })
      .then((res) => {
        // console.log("DD", JSON.stringify(res));
        setFilterModal(false);
      })
      .finally(() => {
        searchNow();
      });
  };

  return (
    <Fragment>
      <Modal
        animationType="slide"
        visible={filterModal}
        onRequestClose={() => setFilterModal(false)}
      >
        <View
          style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
        >
          <View style={[styles.header, { height: HEADER_HEIGHT }]}>
            <RNText style={{ fontWeight: "bold", fontSize: 20 }}>
              Search Preferences
            </RNText>
            <TouchableOpacity
              onPress={resetIt}
              activeOpacity={0.85}
              style={{
                width: 40,
                height: 40,
                //borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image source={Images.reset} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: WP(6),
              borderTopWidth: 2,
              borderRightWidth: 2,
              borderLeftWidth: 2,
            }}
          >
            {enabled && (
              <Fragment>
                {categoriesList.length > 0 && (
                  <View style={{ paddingTop: 10 }}>
                    <Label rightLable="Category" />
                    <DropDown
                      placeHolder="Select a Category"
                      defaultSelected={category}
                      onChangeValue={(e: number) => {
                        //console.log("Cat", e);
                        setCategory(e);
                      }}
                      data={categoriesList}
                    />
                  </View>
                )}
                <View style={{ paddingTop: 10 }}>
                  <Label rightLable="Post Type" />
                  <DropDown
                    placeHolder="Select a Post Type"
                    defaultSelected={`${postType}`}
                    onChangeValue={(e: number) => {
                      setPostType(e);
                    }}
                    data={[
                      { value: "0", label: "Any" },
                      { value: "1", label: "Chat" },
                      { value: "3", label: "Live" },
                      { value: "2", label: "Share" },
                      { value: "4", label: "AMA" },
                      { value: "6", label: "Discuss" },
                      { value: "5", label: "Debate" },
                      { value: "10", label: "Adult" },
                    ]}
                  />
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Label rightLable="Tags" />
                  <TagInput ref={tagInputRef} />
                </View>
                <Divider
                  style={{
                    backgroundColor: Colors.black,
                    height: 1,
                  }}
                />
                <View style={{ paddingTop: 10 }}>
                  <Label rightLable="Gender" />
                  <View
                    style={{
                      //height: 40,
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {["Male", "Female", "Other"].map((item) => {
                      const isSelected = gender === item;
                      return (
                        <TouchableOpacity
                          //status={isSelected ? "success" : "basic"}
                          style={{
                            height: 32,
                            width: "33%",
                            borderWidth: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "#000",
                            ...getShadow(3, isSelected ? "#000" : "#FFF"),
                          }}
                          key={item}
                          onPress={() => {
                            setGender(isSelected ? "" : item);
                          }}
                        >
                          <Text
                            style={{
                              color: isSelected ? Colors.white : Colors.black,
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                {CountriesList.length > 0 && (
                  <View style={{ paddingTop: 10 }}>
                    <Label rightLable="Country" />
                    <DropDown
                      placeHolder="Select a country"
                      defaultSelected={country}
                      data={CountriesList}
                      onChangeValue={setCountry}
                    />
                  </View>
                )}
                <View style={{ paddingTop: 10 }}>
                  <Label
                    rightLable="Age"
                    leftLable={`${ageFormator(AgeLimit[0])} - ${ageFormator(
                      AgeLimit[1]
                    )}`}
                  />
                  {/* <Text>{`${AgeLimit[0]} - ${AgeLimit[1]}`}</Text> */}
                  {/* <RheostatThemeProvider
                    theme={{
                      themeColor: "#111",
                      grey: "#AEAEAE",
                    }}
                  >
                    <Rheostat
                      handle={() => (
                        <View
                          style={{
                            width: Platform.OS === "android" ? 4 : 27,
                            height: Platform.OS === "android" ? 4 : 27,
                            backgroundColor: "#111",
                            borderRadius: Platform.OS === "android" ? 2 : 14,
                            ...getShadow(3, "#000"),
                          }}
                        />
                      )}
                      values={AgeLimit}
                      min={18}
                      max={100}
                      onSliderDragEnd={({
                        values,
                      }: {
                        values: Array<number>;
                      }) => {
                        setAgeLimit(values);
                      }}
                    />
                  </RheostatThemeProvider> */}
                  <View style={{ alignSelf: "center" }}>
                    <MultiSlider
                      isMarkersSeparated={true}
                      selectedStyle={{
                        backgroundColor: Colors.black,
                        height: Platform.OS === "android" ? 1 : 3,
                      }}
                      values={AgeLimit}
                      min={18}
                      max={100}
                      sliderLength={WP(80)}
                      step={1}
                      trackStyle={{
                        backgroundColor: Colors.grey,
                        height: Platform.OS === "android" ? 1 : 3,
                      }}
                      markerStyle={{
                        width: Platform.OS === "android" ? 12 : 28,
                        height: Platform.OS === "android" ? 12 : 28,
                        backgroundColor: Colors.black,
                        borderRadius: Platform.OS === "android" ? 6 : 14,
                      }}
                      onValuesChangeFinish={setAgeLimit}
                    />
                  </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <Label rightLable="Distance" leftLable={`< ${distance} mi`} />
                  <Slider
                    value={distance}
                    thumbTintColor={Colors.black}
                    style={{ height: 40 }}
                    minimumValue={10}
                    maximumValue={1000}
                    onSlidingComplete={setDistance}
                    step={10}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#AEAEAE"
                  />
                </View>
              </Fragment>
            )}
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* <View style={{ borderRightWidth: 2, borderLeftWidth: 2 }}> */}
              <Button
                onPress={() => {
                  const filter = {
                    gender: gender
                      ? gender === "Male"
                        ? "M"
                        : gender === "Female"
                        ? "F"
                        : null
                      : undefined,
                    minAgeRange: isChanged(AgeLimit[0], AgeLimit[1])
                      ? undefined
                      : AgeLimit[0],
                    maxAgeRange: isChanged(AgeLimit[0], AgeLimit[1])
                      ? undefined
                      : AgeLimit[1],
                    country: country || undefined,
                    maxDistance: distance === 10 ? undefined : distance,
                    categoryId: parseInt(`${category}`, 10),
                    type: parseInt(`${postType}`, 10),
                    tags: extractTagsId(tagInputRef?.current?.getTags()),
                    anonymous: false,
                  };
                  //------
                  const allPosts = getPostTypes();
                  const { label: name, value: id } = allPosts.find(
                    (itm) => itm.value == postType
                  );
                  //setPT({ name, id });
                  //------

                  const { label: nameX, value: idX } = categoriesList.find(
                    (itm) => itm.value == category
                  );
                  //setCat({ name: nameX, id: idX });
                  //------

                  setCat_PTWhileApply({ name: nameX, id: idX }, { name, id });
                  // console.log("filterPayload", filter);

                  saveFilter({ filter })
                    .then((res) => {
                      // console.log("DD", JSON.stringify(res));
                      setFilterModal(false);
                    })
                    .finally(() => {
                      searchNowWithFilter(idX, id);
                      setLoading(false);
                      //setTimeout(searchNow, 700);
                    });
                }}
                style={[
                  styles.button,
                  {
                    width: WP(80),
                    alignSelf: "center",
                    marginBottom: 20,
                    backgroundColor: "#000",
                    borderColor: "#000",
                  },
                ]}
                appearance="filled"
                status="info"
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setFilterModal(true);
        }}
      >
        {children}
      </Pressable>
    </Fragment>
  );
};
const Label = ({
  rightLable = "",
  leftLable = "",
}: {
  rightLable: string;
  leftLable?: string;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginBottom: 5,
      }}
    >
      <Text category="label" appearance="default">
        {rightLable}
      </Text>
      <Text category="label" appearance="hint">
        {leftLable}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
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
    // borderRadius: 4,
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
    paddingHorizontal: 16,
  },
  modalHandle: {
    height: 0,
  },
});
export default SearchPreference;
