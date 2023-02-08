import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "meecha/utils/baseQuery";
export const generatedApi = createApi({
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: (build) => ({
    authLogin: build.mutation<AuthLoginApiResponse, AuthLoginApiArg>({
      query: ({ body }) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
    }),
    authRefresh: build.mutation<AuthRefreshApiResponse, AuthRefreshApiArg>({
      query: ({ body }) => ({
        url: `/auth/refresh`,
        method: "POST",
        body,
      }),
    }),
    createUser: build.mutation<CreateUserApiResponse, CreateUserApiArg>({
      query: ({ body }) => ({
        url: `/user`,
        method: "POST",
        body,
      }),
    }),
    updateMe: build.mutation<UpdateMeApiResponse, UpdateMeApiArg>({
      query: ({ body }) => ({
        url: `/user/me`,
        method: "POST",
        body,
      }),
    }),
    getMe: build.query<GetMeApiResponse, GetMeApiArg>({
      query: ({ language }) => ({
        url: `/user/me`,
        params: { language },
      }),
    }),
    getUser: build.query<GetUserApiResponse, GetUserApiArg>({
      query: ({ plan, post, language, event, id }) => ({
        url: `/user/${id}`,
        params: {
          language,
          plan,
          post,
          event,
        },
      }),
    }),
    deleteUser: build.mutation<DeleteUserApiResponse, DeleteUserApiArg>({
      query: ({ id }) => ({ url: `/user/${id}`, method: "DELETE" }),
    }),
    updateProfile: build.mutation<
      UpdateProfileApiResponse,
      UpdateProfileApiArg
    >({
      query: ({ body, language }) => ({
        url: `/profile`,
        method: "POST",
        body,
        params: { language },
      }),
    }),
    listProfiles: build.query<ListProfilesApiResponse, ListProfilesApiArg>({
      query: () => ({ url: `/profile` }),
    }),
    connectUser: build.mutation<ConnectUserApiResponse, ConnectUserApiArg>({
      query: ({ id, plan, call }) => ({
        url: `/user/${id}/connect`,
        method: "POST",
        params: { plan, call },
      }),
    }),
    disconnectUser: build.mutation<
      DisconnectUserApiResponse,
      DisconnectUserApiArg
    >({
      query: ({ id }) => ({
        url: `/user/${id}/connect`,
        method: "DELETE",
      }),
    }),
    listConnections: build.query<
      ListConnectionsApiResponse,
      ListConnectionsApiArg
    >({
      query: ({ before, after, count }) => ({
        url: `/connection`,
        params: {
          before,
          after,
          count,
        },
      }),
    }),
    blockUser: build.mutation<BlockUserApiResponse, BlockUserApiArg>({
      query: ({ id }) => ({
        url: `/user/${id}/block`,
        method: "POST",
      }),
    }),
    unblockUser: build.mutation<UnblockUserApiResponse, UnblockUserApiArg>({
      query: ({ id }) => ({
        url: `/user/${id}/block`,
        method: "DELETE",
      }),
    }),
    listBlocked: build.query<ListBlockedApiResponse, ListBlockedApiArg>({
      query: () => ({ url: `/blocked` }),
    }),
    getBalance: build.query<GetBalanceApiResponse, GetBalanceApiArg>({
      query: () => ({ url: `/balance` }),
    }),
    updateFilter: build.mutation<UpdateFilterApiResponse, UpdateFilterApiArg>({
      query: ({ filter, post }) => ({
        url: `/filter`,
        method: "POST",
        body: filter,
        params: { post },
      }),
    }),
    getFilter: build.query<GetFilterApiResponse, GetFilterApiArg>({
      query: () => ({ url: `/filter` }),
    }),
    createPost: build.mutation<CreatePostApiResponse, CreatePostApiArg>({
      query: (queryArg) => ({
        url: `/post`,
        method: "POST",
        body: queryArg.body,
        params: { language: queryArg.language, allowance: queryArg.allowance },
      }),
    }),
    listPosts: build.query<ListPostsApiResponse, ListPostsApiArg>({
      query: ({ before, after, count }) => ({
        url: `/post`,
        params: {
          before,
          after,
          count,
        },
      }),
    }),
    getPost: build.query<GetPostApiResponse, GetPostApiArg>({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}`,
        params: { plan: queryArg.plan },
      }),
    }),
    retirePost: build.mutation<RetirePostApiResponse, RetirePostApiArg>({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}/retire`,
        method: "POST",
      }),
    }),
    renewPost: build.mutation<RenewPostApiResponse, RenewPostApiArg>({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}/renew`,
        method: "POST",
        params: { allowance: queryArg.allowance, days: queryArg.days },
      }),
    }),
    declareInterest: build.mutation<
      DeclareInterestApiResponse,
      DeclareInterestApiArg
    >({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}/interest`,
        method: "POST",
        body: queryArg.body,
        params: { decline: queryArg.decline },
      }),
    }),
    listInterests: build.query<ListInterestsApiResponse, ListInterestsApiArg>({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}/interest`,
        params: {
          before: queryArg.before,
          after: queryArg.after,
          count: queryArg.count,
        },
      }),
    }),
    deleteInterest: build.mutation<
      DeleteInterestApiResponse,
      DeleteInterestApiArg
    >({
      query: (queryArg) => ({
        url: `/post/${queryArg.id}/interest`,
        method: "DELETE",
        params: { user: queryArg.user },
      }),
    }),
    initSearch: build.mutation<InitSearchApiResponse, InitSearchApiArg>({
      query: ({ body, language }) => ({
        url: `/search`,
        method: "POST",
        body,
        params: { language },
      }),
    }),
    fetchSearch: build.query<FetchSearchApiResponse, FetchSearchApiArg>({
      query: (queryArg) => ({
        url: `/search`,
        params: { cursor: queryArg.cursor },
      }),
    }),
    createPlan: build.mutation<CreatePlanApiResponse, CreatePlanApiArg>({
      query: (queryArg) => ({
        url: `/plan`,
        method: "POST",
        body: queryArg.body,
        params: { post: queryArg.post, allowance: queryArg.allowance },
      }),
    }),
    listPlans: build.query<ListPlansApiResponse, ListPlansApiArg>({
      query: (queryArg) => ({
        url: `/plan`,
        params: {
          before: queryArg.before,
          after: queryArg.after,
          count: queryArg.count,
        },
      }),
    }),
    updatePlan: build.mutation<UpdatePlanApiResponse, UpdatePlanApiArg>({
      query: (queryArg) => ({
        url: `/plan/${queryArg.id}`,
        method: "POST",
        body: queryArg.planUpdate,
      }),
    }),
    getPlan: build.query<GetPlanApiResponse, GetPlanApiArg>({
      query: (queryArg) => ({ url: `/plan/${queryArg.id}` }),
    }),
    deletePlan: build.mutation<DeletePlanApiResponse, DeletePlanApiArg>({
      query: (queryArg) => ({ url: `/plan/${queryArg.id}`, method: "DELETE" }),
    }),
    addPlanMember: build.mutation<
      AddPlanMemberApiResponse,
      AddPlanMemberApiArg
    >({
      query: (queryArg) => ({
        url: `/plan/${queryArg.id}/member`,
        method: "POST",
        params: { post: queryArg.post, user: queryArg.user },
      }),
    }),
    deletePlanMember: build.mutation<
      DeletePlanMemberApiResponse,
      DeletePlanMemberApiArg
    >({
      query: (queryArg) => ({
        url: `/plan/${queryArg.id}/member`,
        method: "DELETE",
        params: { user: queryArg.user },
      }),
    }),
    createEvent: build.mutation<CreateEventApiResponse, CreateEventApiArg>({
      query: (queryArg) => ({
        url: `/event`,
        method: "POST",
        body: queryArg.body,
        params: { plan: queryArg.plan },
      }),
    }),
    listEvents: build.query<ListEventsApiResponse, ListEventsApiArg>({
      query: (queryArg) => ({
        url: `/event`,
        params: {
          plan: queryArg.plan,
          before: queryArg.before,
          after: queryArg.after,
          count: queryArg.count,
        },
      }),
    }),
    updateEvent: build.mutation<UpdateEventApiResponse, UpdateEventApiArg>({
      query: (queryArg) => ({
        url: `/event/${queryArg.id}`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getEvent: build.query<GetEventApiResponse, GetEventApiArg>({
      query: (queryArg) => ({ url: `/event/${queryArg.id}` }),
    }),
    inviteToEvent: build.mutation<
      InviteToEventApiResponse,
      InviteToEventApiArg
    >({
      query: (queryArg) => ({
        url: `/event/${queryArg.id}/invite`,
        method: "POST",
        params: { user: queryArg.user },
      }),
    }),
    uninviteToEvent: build.mutation<
      UninviteToEventApiResponse,
      UninviteToEventApiArg
    >({
      query: (queryArg) => ({
        url: `/event/${queryArg.id}/invite`,
        method: "DELETE",
        params: { user: queryArg.user },
      }),
    }),
    respondEventInvite: build.mutation<
      RespondEventInviteApiResponse,
      RespondEventInviteApiArg
    >({
      query: (queryArg) => ({
        url: `/event/${queryArg.id}/rsvp`,
        method: "POST",
        params: { accept: queryArg.accept, allowance: queryArg.allowance },
      }),
    }),
    deleteEventInvite: build.mutation<
      DeleteEventInviteApiResponse,
      DeleteEventInviteApiArg
    >({
      query: (queryArg) => ({
        url: `/event/${queryArg.id}/rsvp`,
        method: "DELETE",
      }),
    }),
    addDevice: build.mutation<AddDeviceApiResponse, AddDeviceApiArg>({
      query: (queryArg) => ({
        url: `/device`,
        method: "POST",
        params: { token: queryArg.token },
      }),
    }),
    listDevices: build.query<ListDevicesApiResponse, ListDevicesApiArg>({
      query: () => ({ url: `/device` }),
    }),
    deleteDevice: build.mutation<DeleteDeviceApiResponse, DeleteDeviceApiArg>({
      query: (queryArg) => ({
        url: `/device`,
        method: "DELETE",
        params: { token: queryArg.token },
      }),
    }),
    createTag: build.mutation<CreateTagApiResponse, CreateTagApiArg>({
      query: (queryArg) => ({
        url: `/tag`,
        method: "POST",
        params: { name: queryArg.name, language: queryArg.language },
      }),
    }),
    completeTag: build.query<CompleteTagApiResponse, CompleteTagApiArg>({
      query: (queryArg) => ({
        url: `/tag`,
        params: { name: queryArg.name, language: queryArg.language },
      }),
    }),
    initiateCall: build.mutation<InitiateCallApiResponse, InitiateCallApiArg>({
      query: (queryArg) => ({
        url: `/call`,
        method: "POST",
        params: {
          user: queryArg.user,
          post: queryArg.post,
          room: queryArg.room,
        },
      }),
    }),
    respondCall: build.mutation<RespondCallApiResponse, RespondCallApiArg>({
      query: (queryArg) => ({
        url: `/call/${queryArg.id}`,
        method: "POST",
        params: { accept: queryArg.accept },
      }),
    }),
    cancelCall: build.mutation<CancelCallApiResponse, CancelCallApiArg>({
      query: (queryArg) => ({ url: `/call/${queryArg.id}`, method: "DELETE" }),
    }),
    upsertTopicCred: build.mutation<
      UpsertTopicCredApiResponse,
      UpsertTopicCredApiArg
    >({
      query: (queryArg) => ({
        url: `/credential/topic`,
        method: "PUT",
        body: queryArg.body,
        params: { language: queryArg.language, id: queryArg.id },
      }),
    }),
    getTopicCred: build.query<GetTopicCredApiResponse, GetTopicCredApiArg>({
      query: (queryArg) => ({ url: `/credential/topic/${queryArg.id}` }),
    }),
    upsertEduCred: build.mutation<
      UpsertEduCredApiResponse,
      UpsertEduCredApiArg
    >({
      query: (queryArg) => ({
        url: `/credential/education`,
        method: "PUT",
        body: queryArg.body,
        params: { language: queryArg.language, id: queryArg.id },
      }),
    }),
    getEduCred: build.query<GetEduCredApiResponse, GetEduCredApiArg>({
      query: (queryArg) => ({ url: `/credential/education/${queryArg.id}` }),
    }),
    upsertWorkCred: build.mutation<
      UpsertWorkCredApiResponse,
      UpsertWorkCredApiArg
    >({
      query: (queryArg) => ({
        url: `/credential/work`,
        method: "PUT",
        body: queryArg.body,
        params: { language: queryArg.language, id: queryArg.id },
      }),
    }),
    getWorkCred: build.query<GetWorkCredApiResponse, GetWorkCredApiArg>({
      query: (queryArg) => ({ url: `/credential/work/${queryArg.id}` }),
    }),
    deleteCred: build.mutation<DeleteCredApiResponse, DeleteCredApiArg>({
      query: (queryArg) => ({
        url: `/credential`,
        method: "DELETE",
        params: { id: queryArg.id },
      }),
    }),
    listNotifications: build.query<
      ListNotificationsApiResponse,
      ListNotificationsApiArg
    >({
      query: (queryArg) => ({
        url: `/notification`,
        params: {
          before: queryArg.before,
          after: queryArg.after,
          count: queryArg.count,
        },
      }),
    }),
    markNotification: build.mutation<
      MarkNotificationApiResponse,
      MarkNotificationApiArg
    >({
      query: (queryArg) => ({
        url: `/notification/${queryArg.id}/read`,
        method: "POST",
      }),
    }),
    listMessages: build.query<ListMessagesApiResponse, ListMessagesApiArg>({
      query: (queryArg) => ({
        url: `/chat/${queryArg.id}/messages`,
        params: {
          before: queryArg.before,
          after: queryArg.after,
          count: queryArg.count,
        },
      }),
    }),
    listCategories: build.query<
      ListCategoriesApiResponse,
      ListCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/misc/category`,
        params: { language: queryArg.language },
      }),
    }),
    listCountries: build.query<ListCountriesApiResponse, ListCountriesApiArg>({
      query: () => ({ url: `/misc/country` }),
    }),
    listLanguages: build.query<ListLanguagesApiResponse, ListLanguagesApiArg>({
      query: () => ({ url: `/misc/language` }),
    }),
  }),
});
export type AuthLoginApiResponse = /** status 200 Success */ AuthPackage;
export type AuthLoginApiArg = {
  body: {
    firebaseToken: string;
  };
};
export type AuthRefreshApiResponse = /** status 200 Success */ AuthPackage;
export type AuthRefreshApiArg = {
  body: {
    refreshToken: string;
    userId?: Id;
  };
};
export type CreateUserApiResponse = /** status 200 Success */ {
  id: Id;
};
export type CreateUserApiArg = {
  body: {
    handle: string;
  };
};
export type UpdateMeApiResponse = unknown;
export type UpdateMeApiArg = {
  body: {
    gender?: Gender;
    country?: Country;
    birthday?: string | null;
    location?: Coordinate;
  };
};
export type GetMeApiResponse = /** status 200 Success */ {
  data: OwnUserProfile;
};
export type GetMeApiArg = {
  language: Language;
};
export type GetUserApiResponse = /** status 200 Success */ {
  data: UserProfile;
};
export type GetUserApiArg = {
  id: Id;
  language: Language;
  plan?: Id;
  post?: Id;
  event?: Id;
};
export type DeleteUserApiResponse = unknown;
export type DeleteUserApiArg = {
  id: Id;
};
export type UpdateProfileApiResponse = unknown;
export type UpdateProfileApiArg = {
  language: Language;
  body: {
    headline?: string;
    nickname?: string | null;
    aboutMe?: string | null;
  };
};
export type ListProfilesApiResponse = /** status 200 Success */ {
  data: Profile[];
};
export type ListProfilesApiArg = {};
export type ConnectUserApiResponse = unknown;
export type ConnectUserApiArg = {
  id: Id;
  plan?: Id;
  call?: Id;
};
export type DisconnectUserApiResponse = unknown;
export type DisconnectUserApiArg = {
  id: Id;
};
export type ListConnectionsApiResponse =
  /** status 200 Success */ OffsetMetadata & {
    data: ConnectionChannel[];
  };
export type ListConnectionsApiArg = {
  before?: number;
  after?: number;
  count?: number;
};
export type BlockUserApiResponse = unknown;
export type BlockUserApiArg = {
  id: Id;
};
export type UnblockUserApiResponse = unknown;
export type UnblockUserApiArg = {
  id: Id;
};
export type ListBlockedApiResponse = /** status 200 Success */ {
  data: UserLogo[];
};
export type ListBlockedApiArg = {};
export type GetBalanceApiResponse = /** status 200 Success */ {
  data: Balance;
};
export type GetBalanceApiArg = {};
export type UpdateFilterApiResponse = unknown;
export type UpdateFilterApiArg = {
  post?: Id;
  filter: Filter;
};
export type GetFilterApiResponse = /** status 200 Success */ {
  data: Filter;
};
export type GetFilterApiArg = {};
export type CreatePostApiResponse = /** status 200 Success */ {
  id: Id;
};
export type CreatePostApiArg = {
  language: Language;
  allowance: number;
  body: PostBase & {
    note: string | null;
    categoryId: Id;
    credentialId?: NullId;
    tagIds: IdList;
    location?: Coordinate;
  };
};
export type ListPostsApiResponse = /** status 200 Success */ OffsetMetadata & {
  data: OwnPost[];
};
export type ListPostsApiArg = {
  before?: number;
  after?: number;
  count?: number;
};
export type GetPostApiResponse = /** status 200 Success */ {
  data: PostProfile;
};
export type GetPostApiArg = {
  id: Id;
  plan?: Id;
};
export type RetirePostApiResponse = unknown;
export type RetirePostApiArg = {
  id: Id;
};
export type RenewPostApiResponse = unknown;
export type RenewPostApiArg = {
  id: Id;
  allowance: number;
  days: number;
};
export type DeclareInterestApiResponse = unknown;
export type DeclareInterestApiArg = {
  id: Id;
  decline?: boolean;
  body: {
    credentialId: NullId;
    note?: string | null;
  };
};
export type ListInterestsApiResponse =
  /** status 200 Success */ OffsetMetadata & {
    data: Interest[];
  };
export type ListInterestsApiArg = {
  id: Id;
  before?: number;
  after?: number;
  count?: number;
};
export type DeleteInterestApiResponse = unknown;
export type DeleteInterestApiArg = {
  id: Id;
  user: Id;
};
export type InitSearchApiResponse = /** status 200 Success */ CursorMetadata & {
  data: PostHeader[];
};
export type InitSearchApiArg = {
  language: Language;
  body: {
    postId?: number | null;
    categoryId?: number | null;
    type?: number | null;
    tagIds?: Id[];
    anonymous?: boolean | null;
    maxDistance?: Distance;
  };
};
export type FetchSearchApiResponse =
  /** status 200 Success */ CursorMetadata & {
    data: PostHeader[];
  };
export type FetchSearchApiArg = {
  cursor: string;
};
export type CreatePlanApiResponse = /** status 200 Success */ {
  id: Id;
};
export type CreatePlanApiArg = {
  post?: Id;
  allowance: number;
  body: PlanUpdate & {
    memberIds: IdList;
  };
};
export type ListPlansApiResponse = /** status 200 Success */ OffsetMetadata & {
  data: PlanChannel[];
};
export type ListPlansApiArg = {
  before?: number;
  after?: number;
  count?: number;
};
export type UpdatePlanApiResponse = unknown;
export type UpdatePlanApiArg = {
  id: Id;
  planUpdate: PlanUpdate;
};
export type GetPlanApiResponse = /** status 200 Success */ {
  data: Plan;
};
export type GetPlanApiArg = {
  id: Id;
};
export type DeletePlanApiResponse = unknown;
export type DeletePlanApiArg = {
  id: Id;
};
export type AddPlanMemberApiResponse = unknown;
export type AddPlanMemberApiArg = {
  id: Id;
  post?: Id;
  user: Id;
};
export type DeletePlanMemberApiResponse = unknown;
export type DeletePlanMemberApiArg = {
  id: Id;
  user: Id;
};
export type CreateEventApiResponse = /** status 200 Success */ {
  id: Id;
};
export type CreateEventApiArg = {
  plan?: Id;
  body: EventBase &
    EventUpdateBase & {
      type: EventType;
      inviteesIds?: IdList;
    };
};
export type ListEventsApiResponse = /** status 200 Success */ OffsetMetadata & {
  data: EventDay[];
};
export type ListEventsApiArg = {
  plan?: Id;
  before?: number;
  after?: number;
  count?: number;
};
export type UpdateEventApiResponse = unknown;
export type UpdateEventApiArg = {
  id: Id;
  body: EventBase & EventUpdateBase;
};
export type GetEventApiResponse = /** status 200 Success */ {
  data: Event;
};
export type GetEventApiArg = {
  id: Id;
};
export type InviteToEventApiResponse = unknown;
export type InviteToEventApiArg = {
  id: Id;
  user: Id;
};
export type UninviteToEventApiResponse = unknown;
export type UninviteToEventApiArg = {
  id: Id;
  user: Id;
};
export type RespondEventInviteApiResponse = unknown;
export type RespondEventInviteApiArg = {
  id: Id;
  accept: boolean;
  allowance?: number;
};
export type DeleteEventInviteApiResponse = unknown;
export type DeleteEventInviteApiArg = {
  id: Id;
};
export type AddDeviceApiResponse = unknown;
export type AddDeviceApiArg = {
  token: string;
};
export type ListDevicesApiResponse = /** status 200 Success */ {
  data: Device[];
};
export type ListDevicesApiArg = {};
export type DeleteDeviceApiResponse = unknown;
export type DeleteDeviceApiArg = {
  token: string;
};
export type CreateTagApiResponse = /** status 200 Success */ {
  id: Id;
};
export type CreateTagApiArg = {
  name: string;
  language: Language;
};
export type CompleteTagApiResponse =
  /** status 200 Success */ OffsetMetadata & {
    data: (Tag & {
      refCount?: Id;
    })[];
  };
export type CompleteTagApiArg = {
  name: string;
  language: Language;
};
export type InitiateCallApiResponse = /** status 200 Success */ {
  callId?: Id;
  roomId: Id;
};
export type InitiateCallApiArg = {
  user: Id;
  post?: Id;
  room?: number;
};
export type RespondCallApiResponse = /** status 200 Success */ {
  callId?: Id;
  roomId: Id;
};
export type RespondCallApiArg = {
  id: Id;
  accept: boolean;
};
export type CancelCallApiResponse = unknown;
export type CancelCallApiArg = {
  id: Id;
};
export type UpsertTopicCredApiResponse =
  /** status 200 Success */ OwnCredential;
export type UpsertTopicCredApiArg = {
  language: Language;
  id?: Id;
  body: any & Topic;
};
export type GetTopicCredApiResponse = /** status 200 Success */ {
  data: OwnCredential;
};
export type GetTopicCredApiArg = {
  id: Id;
};
export type UpsertEduCredApiResponse = /** status 200 Success */ OwnCredential;
export type UpsertEduCredApiArg = {
  language: Language;
  id?: Id;
  body: any & EducationUpdate;
};
export type GetEduCredApiResponse = /** status 200 Success */ {
  data: Education;
};
export type GetEduCredApiArg = {
  id: Id;
};
export type UpsertWorkCredApiResponse = /** status 200 Success */ OwnCredential;
export type UpsertWorkCredApiArg = {
  language: Language;
  id?: Id;
  body: any & WorkUpdate;
};
export type GetWorkCredApiResponse = /** status 200 Success */ {
  data: Work;
};
export type GetWorkCredApiArg = {
  id: Id;
};
export type DeleteCredApiResponse = unknown;
export type DeleteCredApiArg = {
  id: Id;
};
export type ListNotificationsApiResponse =
  /** status 200 Success */ OffsetMetadata & {
    data: Notification[];
  };
export type ListNotificationsApiArg = {
  before?: number;
  after?: number;
  count?: number;
};
export type MarkNotificationApiResponse = unknown;
export type MarkNotificationApiArg = {
  id: Id;
};
export type ListMessagesApiResponse =
  /** status 200 Success */ OffsetMetadata & {
    data: Message[];
  };
export type ListMessagesApiArg = {
  id: Id;
  before?: number;
  after?: number;
  count?: number;
};
export type ListCategoriesApiResponse = /** status 200 Success */ {
  data: Category[];
};
export type ListCategoriesApiArg = {
  language: Language;
};
export type ListCountriesApiResponse = /** status 200 Success */ {
  data: CountryInfo[];
};
export type ListCountriesApiArg = {};
export type ListLanguagesApiResponse = /** status 200 Success */ {
  data: LanguageInfo[];
};
export type ListLanguagesApiArg = {};
export type Id = number;
export type UserLogo = {
  id: Id;
  handle: string;
  picture: string | null;
};
export type AuthPackage = {
  accountId: Id;
  disabled: boolean;
  tokens: {
    accessToken: string;
    accessExp: string;
    refreshToken?: string;
    refreshExp?: string;
  };
  user?: UserLogo;
};
export type Gender = ("M" | "F") | null;
export type Country = string | null;
export type Coordinate = number[];
export type AgeRange = number | null;
export type UserIdentity = {
  gender: Gender;
  ageRange: AgeRange;
  country: Country;
};
export type Language = string;
export type Profile = {
  headline: string;
  nickname: string | null;
  aboutMe: string | null;
  language: Language;
};
export type UserProfileBase = UserLogo &
  UserIdentity &
  Profile & {
    location: string | null;
    available: boolean;
  };
export type PrivacyOpt = number | null;
export type CredentialType = "education" | "work" | "topic";
export type Tag = {
  id: Id;
  name: string;
};
export type Credential = {
  type: CredentialType;
  description: string;
  tag: Tag;
};
export type OwnCredential = {
  id: Id;
  privacyOpt: PrivacyOpt;
} & Credential;
export type OwnUserProfile = UserProfileBase & {
  credentials: OwnCredential[];
};
export type UserProfile = UserProfileBase & {
  credentials: Credential[];
};
export type Offset = {
  next: number | null;
  prev: number | null;
  count: number;
};
export type OffsetMetadata = {
  metadata: Offset;
};
export type NullId = number | null;
export type Message = {
  senderId: Id;
  messageId: Id;
  type: number;
  timestamp: string;
  text?: string | null;
  reply: string | null;
  memberId?: NullId;
};
export type ChannelMember = {
  memberId: Id;
  readId: Id;
  deliveredId: Id;
};
export type MessageChannel = {
  channelId: Id;
  lastSender: UserLogo;
  lastMessage: Message;
  status: ChannelMember;
};
export type ConnectionChannel = UserLogo & MessageChannel;
export type Balance = {
  gold: number;
  silver: number;
};
export type Filter = {
  gender?: Gender;
  minAgeRange?: AgeRange;
  maxAgeRange?: AgeRange;
  country?: Country;
};
export type PostType = number;
export type PostBase = {
  subject: string;
  type: PostType;
  anonymous: boolean;
};
export type IdList = number[];
export type PostHeader = {
  id: Id;
  identity: UserIdentity;
  credential: string;
} & PostBase;
export type Post = PostHeader & {
  note?: string | null;
  category?: Tag;
  tags?: Tag[];
  language?: Language;
  disabled?: boolean;
  expiry?: string;
  creation?: string;
};
export type OwnPost = Post & {
  interestCount: number;
};
export type PostProfile = Post & {
  filter?: Filter;
  profile?: UserProfile;
};
export type Interest = {
  id: Id;
  credential: string;
  available?: boolean;
  note: string | null;
  identity: UserIdentity;
  logo?: UserLogo;
  creation: string;
};
export type Cursor = {
  next: string | null;
  prev: string | null;
  count: number;
};
export type CursorMetadata = {
  metadata: Cursor;
};
export type Distance = number | null;
export type PlanUpdate = {
  subject?: string;
  note?: string | null;
};
export type PlanBase = PlanUpdate & {
  id: Id;
  organizerId: Id;
  post?: PostHeader;
  memberCount: number;
  archived: boolean;
  anonymous: boolean;
  isTrial: boolean;
  anonymousId: NullId;
  creation: string;
};
export type PlanChannel = PlanBase & MessageChannel;
export type EventBase = {
  subject?: string;
  startTime?: string;
  duration?: number;
};
export type EventType = "meetup" | "call";
export type EventDay = EventBase & {
  id: Id;
  type: EventType;
  attendeeCount: number;
  accepted?: boolean;
};
export type EventUpdateBase = {
  note?: string | null;
  deadline?: number | null;
  stake?: number | null;
  location?: Coordinate;
};
export type EventInvitee = UserLogo & {
  accepted?: boolean;
  creation: string;
};
export type Event = EventDay &
  EventUpdateBase & {
    organizerId: Id;
    planId?: NullId;
    anonymousId: NullId;
    anonymous: boolean;
    ended: boolean;
    invitees: EventInvitee[];
    creation: string;
  };
export type PlanMember = UserLogo &
  ChannelMember & {
    creation: string;
  };
export type Plan = PlanBase & {
  goalEvent?: Event;
  members?: PlanMember[];
  messages?: Message[];
};
export type Device = {
  token: string;
  creation: string;
};
export type Topic = {
  description?: string;
  tagId?: Id;
  privacyOpt?: PrivacyOpt;
};
export type EducationBase = {
  degree?: string | null;
  gradYear?: number | null;
  ongoing?: boolean;
};
export type EducationUpdate = EducationBase & {
  schoolId?: NullId;
  majorId?: NullId;
  minorId?: NullId;
  privacyOpt?: PrivacyOpt;
};
export type Education = OwnCredential &
  EducationBase & {
    school?: Tag;
    major?: Tag;
    minor?: Tag;
  };
export type WorkBase = {
  yoe?: number | null;
  ongoing?: boolean;
};
export type WorkUpdate = WorkBase & {
  jobId?: NullId;
  companyId?: NullId;
  privacyOpt?: PrivacyOpt;
};
export type Work = OwnCredential &
  WorkBase & {
    job?: Tag;
    company?: Tag;
  };
export type Notification = {
  id: Id;
  type: number;
  relatedId: Id;
  text?: string;
  addtlData: string | null;
  read: boolean;
  creation: string;
};
export type Category = Tag & {
  parentId?: NullId;
};
export type CountryInfo = {
  code: Country;
  name: string;
};
export type LanguageInfo = {
  code: Language;
  name: string;
};
export const {
  useAuthLoginMutation,
  useAuthRefreshMutation,
  useCreateUserMutation,
  useUpdateMeMutation,
  useGetMeQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useListProfilesQuery,
  useConnectUserMutation,
  useDisconnectUserMutation,
  useListConnectionsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useListBlockedQuery,
  useGetBalanceQuery,
  useUpdateFilterMutation,
  useGetFilterQuery,
  useCreatePostMutation,
  useListPostsQuery,
  useGetPostQuery,
  useRetirePostMutation,
  useRenewPostMutation,
  useDeclareInterestMutation,
  useListInterestsQuery,
  useDeleteInterestMutation,
  useInitSearchMutation,
  useFetchSearchQuery,
  useCreatePlanMutation,
  useListPlansQuery,
  useUpdatePlanMutation,
  useGetPlanQuery,
  useDeletePlanMutation,
  useAddPlanMemberMutation,
  useDeletePlanMemberMutation,
  useCreateEventMutation,
  useListEventsQuery,
  useUpdateEventMutation,
  useGetEventQuery,
  useInviteToEventMutation,
  useUninviteToEventMutation,
  useRespondEventInviteMutation,
  useDeleteEventInviteMutation,
  useAddDeviceMutation,
  useListDevicesQuery,
  useDeleteDeviceMutation,
  useCreateTagMutation,
  useCompleteTagQuery,
  useInitiateCallMutation,
  useRespondCallMutation,
  useCancelCallMutation,
  useUpsertTopicCredMutation,
  useGetTopicCredQuery,
  useUpsertEduCredMutation,
  useGetEduCredQuery,
  useUpsertWorkCredMutation,
  useGetWorkCredQuery,
  useDeleteCredMutation,
  useListNotificationsQuery,
  useMarkNotificationMutation,
  useListMessagesQuery,
  useListCategoriesQuery,
  useListCountriesQuery,
  useListLanguagesQuery,
} = generatedApi;
