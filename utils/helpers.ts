/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import AsStore from "@react-native-async-storage/async-storage";

type ValueLable = { value: any; label: string };
const setToStorage = (payload: any, type = "") => {
  if (type === "type_cat") {
    AsStore.multiSet([
      ["postCategory", JSON.stringify(payload.postCategory)],
      ["postType", JSON.stringify(payload.postType)],
    ]);
  }
};
const extractFromStorage = async (type = "") => {
  let returner = {};
  if (type === "type_cat") {
    await AsStore.multiGet(["postCategory", "postType"]).then((data) => {
      returner = data.reduce((pre, cur) => {
        const [key, value] = cur;
        pre[key] = JSON.parse(value);
        return pre;
      }, {});
      console.log("data", returner);
    });
  }
  return returner;
};
const ageFormator = (age: number, renderthisWay: boolean = true) => {
  const stringAge = age.toString();
  if (stringAge === "18" || stringAge === "19") return stringAge;
  const filler = renderthisWay ? " " : "-";
  if (stringAge.length === 2) {
    const yr = stringAge[0].concat("0s");
    const intify = parseInt(stringAge[1], 10);
    const yrPart =
      intify <= 3
        ? `early${filler}`
        : intify <= 6
        ? `mid${filler}`
        : `late${filler}`;

    return yrPart + yr;
  } else {
    return `100`;
  }
};

const formatLabelValue = (arr: Array<any>, label: string, value: string) => {
  const list = arr.reduce(
    (pre: ValueLable[], cur: any) => [
      ...pre,
      { value: cur[value], label: cur[label] },
    ],
    []
  );
  return list;
};

const filterValues = (data, key) => {
  return data.filter(({ id }) => id !== null);
};

const isChanged = (min: number, max: number) => {
  return min === 18 && max === 100;
};
const getPostTypes = () => [
  { value: 0, label: "Any" },
  { value: 1, label: "Chat" },
  { value: 3, label: "Live" },
  { value: 2, label: "Share" },
  { value: 4, label: "AMA" },
  { value: 6, label: "Discuss" },
  { value: 5, label: "Debate" },
  { value: 10, label: "Adult" },
];
const PtT = [
  { value: 0, label: "Any" },
  { value: 1, label: "Chat" },
  { value: 3, label: "Live" },
  { value: 2, label: "Share" },
  { value: 4, label: "AMA" },
  { value: 6, label: "Discuss" },
  { value: 5, label: "Debate" },
  { value: 10, label: "Adult" },
];
const getPostTypesIndex = [
  "Any",
  "Chat",
  "Share",
  "AMA",
  "Discuss",
  "Debate",
  "Adult",
  "Live",
];

const extractTagsId = (data: Array<any>) => {
  const newData: Array<any> = [];
  data.forEach((item) => newData.push(item?.id));
  return newData;
};
enum PostType {
  POST_TYPE = 0,
  // Chat-based
  // Chats about everything surrounding a topic
  CHAT = 1,
  // Shares browsing experience (music, video, random stuff, etc.)
  SHARE = 2,
  // Follows and comments on a live event/streaming
  LIVE = 3,
  // Ask me anything
  AMA = 4,
  // Debates on a certain topic
  DEBATE = 5,
  // Discusses about an issue or a problem
  DISCUSS = 6,
  // Talks about an adult topic
  ADULT = 10,
  // TODO: Room-based
  // Service-based
  // Provides opinions/suggestions/feedback on some idea or thought
  OFFER_OPINION = 40,
  // Provides professional advices to solve a problem
  OFFER_ADVICE = 41,
  // Provides mentorship on a skill or subject
  OFFER_MENTOR = 42,
  // Seeks opinions/suggestions/feedback on some idea or thought
  SEEK_OPINION = 50,
  // Seeks professional advices to solve a problem
  SEEK_ADVICE = 51,
  // Seeks mentorship on a skill or subject
  SEEK_MENTOR = 52,
  // Meetup-based
  // Meets for an activity
  ACTIVITY_MEETUP = 60,
  // Meets for an event (organized by a third party)
  EVENT_MEETUP = 61,
}
export {
  ageFormator,
  formatLabelValue,
  getPostTypes,
  getPostTypesIndex,
  isChanged,
  extractTagsId,
  PtT,
  filterValues,
  setToStorage,
  extractFromStorage,
};
