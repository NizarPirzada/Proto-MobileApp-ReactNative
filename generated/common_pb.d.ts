// package: proto
// file: common.proto

import * as jspb from "google-protobuf";

export class UserLogo extends jspb.Message {
  getHandle(): string;
  setHandle(value: string): void;

  getPicture(): string;
  setPicture(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLogo.AsObject;
  static toObject(includeInstance: boolean, msg: UserLogo): UserLogo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLogo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLogo;
  static deserializeBinaryFromReader(message: UserLogo, reader: jspb.BinaryReader): UserLogo;
}

export namespace UserLogo {
  export type AsObject = {
    handle: string,
    picture: string,
  }
}

export class AppAction extends jspb.Message {
  getType(): AppAction.TypeMap[keyof AppAction.TypeMap];
  setType(value: AppAction.TypeMap[keyof AppAction.TypeMap]): void;

  getActionId(): number;
  setActionId(value: number): void;

  getId(): number;
  setId(value: number): void;

  hasChatEvent(): boolean;
  clearChatEvent(): void;
  getChatEvent(): ChatEvent | undefined;
  setChatEvent(value?: ChatEvent): void;

  hasRoomEvent(): boolean;
  clearRoomEvent(): void;
  getRoomEvent(): RoomEvent | undefined;
  setRoomEvent(value?: RoomEvent): void;

  getPayloadCase(): AppAction.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppAction.AsObject;
  static toObject(includeInstance: boolean, msg: AppAction): AppAction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppAction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppAction;
  static deserializeBinaryFromReader(message: AppAction, reader: jspb.BinaryReader): AppAction;
}

export namespace AppAction {
  export type AsObject = {
    type: AppAction.TypeMap[keyof AppAction.TypeMap],
    actionId: number,
    id: number,
    chatEvent?: ChatEvent.AsObject,
    roomEvent?: RoomEvent.AsObject,
  }

  export interface TypeMap {
    NONE: 0;
    CHAT_ENTER: 1;
    CHAT_LEAVE: 2;
    CHAT_EVENT: 3;
    ROOM_SUBSCRIBE: 10;
    ROOM_UNSUBSCRIBE: 11;
    ROOM_EVENT: 12;
    APP_HEARTBEAT: 13;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    CHAT_EVENT = 10,
    ROOM_EVENT = 12,
  }
}

export class AppResp extends jspb.Message {
  getActionId(): number;
  setActionId(value: number): void;

  getErrorCode(): number;
  setErrorCode(value: number): void;

  getOk(): boolean;
  setOk(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppResp.AsObject;
  static toObject(includeInstance: boolean, msg: AppResp): AppResp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppResp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppResp;
  static deserializeBinaryFromReader(message: AppResp, reader: jspb.BinaryReader): AppResp;
}

export namespace AppResp {
  export type AsObject = {
    actionId: number,
    errorCode: number,
    ok: boolean,
  }
}

export class AppEvent extends jspb.Message {
  getActionId(): number;
  setActionId(value: number): void;

  getErrorCode(): number;
  setErrorCode(value: number): void;

  getOk(): boolean;
  setOk(value: boolean): void;

  hasCallEvent(): boolean;
  clearCallEvent(): void;
  getCallEvent(): CallEvent | undefined;
  setCallEvent(value?: CallEvent): void;

  hasNotification(): boolean;
  clearNotification(): void;
  getNotification(): Notification | undefined;
  setNotification(value?: Notification): void;

  hasBalanceUpdate(): boolean;
  clearBalanceUpdate(): void;
  getBalanceUpdate(): BalanceUpdate | undefined;
  setBalanceUpdate(value?: BalanceUpdate): void;

  hasPostSuggest(): boolean;
  clearPostSuggest(): void;
  getPostSuggest(): PostSuggestion | undefined;
  setPostSuggest(value?: PostSuggestion): void;

  hasCallSuggest(): boolean;
  clearCallSuggest(): void;
  getCallSuggest(): CallSuggestion | undefined;
  setCallSuggest(value?: CallSuggestion): void;

  hasRoomEvent(): boolean;
  clearRoomEvent(): void;
  getRoomEvent(): RoomEvent | undefined;
  setRoomEvent(value?: RoomEvent): void;

  hasChatEvent(): boolean;
  clearChatEvent(): void;
  getChatEvent(): ChatEvent | undefined;
  setChatEvent(value?: ChatEvent): void;

  getPayloadCase(): AppEvent.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AppEvent.AsObject;
  static toObject(includeInstance: boolean, msg: AppEvent): AppEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AppEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AppEvent;
  static deserializeBinaryFromReader(message: AppEvent, reader: jspb.BinaryReader): AppEvent;
}

export namespace AppEvent {
  export type AsObject = {
    actionId: number,
    errorCode: number,
    ok: boolean,
    callEvent?: CallEvent.AsObject,
    notification?: Notification.AsObject,
    balanceUpdate?: BalanceUpdate.AsObject,
    postSuggest?: PostSuggestion.AsObject,
    callSuggest?: CallSuggestion.AsObject,
    roomEvent?: RoomEvent.AsObject,
    chatEvent?: ChatEvent.AsObject,
  }

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    CALL_EVENT = 11,
    NOTIFICATION = 12,
    BALANCE_UPDATE = 13,
    POST_SUGGEST = 17,
    CALL_SUGGEST = 14,
    ROOM_EVENT = 15,
    CHAT_EVENT = 16,
  }
}

export class CallEvent extends jspb.Message {
  getType(): CallEvent.TypeMap[keyof CallEvent.TypeMap];
  setType(value: CallEvent.TypeMap[keyof CallEvent.TypeMap]): void;

  getCallId(): number;
  setCallId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  getAnonymous(): boolean;
  setAnonymous(value: boolean): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallEvent.AsObject;
  static toObject(includeInstance: boolean, msg: CallEvent): CallEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallEvent;
  static deserializeBinaryFromReader(message: CallEvent, reader: jspb.BinaryReader): CallEvent;
}

export namespace CallEvent {
  export type AsObject = {
    type: CallEvent.TypeMap[keyof CallEvent.TypeMap],
    callId: number,
    userId: number,
    anonymous: boolean,
    data: string,
  }

  export interface TypeMap {
    NONE: 0;
    INCOMING: 1;
    NOT_ANSWERED: 2;
    DECLINED: 3;
    FAILED: 6;
    CANCELLED: 7;
  }

  export const Type: TypeMap;
}

export class BalanceUpdate extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BalanceUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: BalanceUpdate): BalanceUpdate.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: BalanceUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BalanceUpdate;
  static deserializeBinaryFromReader(message: BalanceUpdate, reader: jspb.BinaryReader): BalanceUpdate;
}

export namespace BalanceUpdate {
  export type AsObject = {
  }
}

export class Notification extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getType(): NotificationTypeMap[keyof NotificationTypeMap];
  setType(value: NotificationTypeMap[keyof NotificationTypeMap]): void;

  getRelatedid(): number;
  setRelatedid(value: number): void;

  getText(): string;
  setText(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Notification.AsObject;
  static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Notification;
  static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
}

export namespace Notification {
  export type AsObject = {
    id: number,
    type: NotificationTypeMap[keyof NotificationTypeMap],
    relatedid: number,
    text: string,
    data: string,
  }

  export class NewEventInvite extends jspb.Message {
    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserLogo | undefined;
    setUser(value?: UserLogo): void;

    getPlanName(): string;
    setPlanName(value: string): void;

    getGoalEvent(): boolean;
    setGoalEvent(value: boolean): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NewEventInvite.AsObject;
    static toObject(includeInstance: boolean, msg: NewEventInvite): NewEventInvite.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NewEventInvite, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NewEventInvite;
    static deserializeBinaryFromReader(message: NewEventInvite, reader: jspb.BinaryReader): NewEventInvite;
  }

  export namespace NewEventInvite {
    export type AsObject = {
      user?: UserLogo.AsObject,
      planName: string,
      goalEvent: boolean,
    }
  }
}

export class CallSuggestion extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallSuggestion.AsObject;
  static toObject(includeInstance: boolean, msg: CallSuggestion): CallSuggestion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallSuggestion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallSuggestion;
  static deserializeBinaryFromReader(message: CallSuggestion, reader: jspb.BinaryReader): CallSuggestion;
}

export namespace CallSuggestion {
  export type AsObject = {
  }
}

export class PostSuggestion extends jspb.Message {
  getPostId(): number;
  setPostId(value: number): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostSuggestion.AsObject;
  static toObject(includeInstance: boolean, msg: PostSuggestion): PostSuggestion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostSuggestion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostSuggestion;
  static deserializeBinaryFromReader(message: PostSuggestion, reader: jspb.BinaryReader): PostSuggestion;
}

export namespace PostSuggestion {
  export type AsObject = {
    postId: number,
    data: string,
  }
}

export class RoomMessage extends jspb.Message {
  getMemberId(): number;
  setMemberId(value: number): void;

  getContent(): string;
  setContent(value: string): void;

  getSentTs(): number;
  setSentTs(value: number): void;

  getAnonymous(): boolean;
  setAnonymous(value: boolean): void;

  hasLogo(): boolean;
  clearLogo(): void;
  getLogo(): UserLogo | undefined;
  setLogo(value?: UserLogo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomMessage.AsObject;
  static toObject(includeInstance: boolean, msg: RoomMessage): RoomMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomMessage;
  static deserializeBinaryFromReader(message: RoomMessage, reader: jspb.BinaryReader): RoomMessage;
}

export namespace RoomMessage {
  export type AsObject = {
    memberId: number,
    content: string,
    sentTs: number,
    anonymous: boolean,
    logo?: UserLogo.AsObject,
  }
}

export class RoomKey extends jspb.Message {
  getRoomid(): number;
  setRoomid(value: number): void;

  getMemberid(): number;
  setMemberid(value: number): void;

  getSharerid(): number;
  setSharerid(value: number): void;

  getAnonymous(): boolean;
  setAnonymous(value: boolean): void;

  getToken(): string;
  setToken(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomKey.AsObject;
  static toObject(includeInstance: boolean, msg: RoomKey): RoomKey.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomKey, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomKey;
  static deserializeBinaryFromReader(message: RoomKey, reader: jspb.BinaryReader): RoomKey;
}

export namespace RoomKey {
  export type AsObject = {
    roomid: number,
    memberid: number,
    sharerid: number,
    anonymous: boolean,
    token: string,
    url: string,
    type: string,
  }
}

export class RoomInfo extends jspb.Message {
  getUrl(): string;
  setUrl(value: string): void;

  getType(): string;
  setType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomInfo.AsObject;
  static toObject(includeInstance: boolean, msg: RoomInfo): RoomInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomInfo;
  static deserializeBinaryFromReader(message: RoomInfo, reader: jspb.BinaryReader): RoomInfo;
}

export namespace RoomInfo {
  export type AsObject = {
    url: string,
    type: string,
  }
}

export class RoomEvent extends jspb.Message {
  getType(): RoomEvent.TypeMap[keyof RoomEvent.TypeMap];
  setType(value: RoomEvent.TypeMap[keyof RoomEvent.TypeMap]): void;

  getRoomId(): number;
  setRoomId(value: number): void;

  getUserId(): number;
  setUserId(value: number): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): RoomMessage | undefined;
  setMessage(value?: RoomMessage): void;

  hasInfo(): boolean;
  clearInfo(): void;
  getInfo(): RoomInfo | undefined;
  setInfo(value?: RoomInfo): void;

  hasKey(): boolean;
  clearKey(): void;
  getKey(): RoomKey | undefined;
  setKey(value?: RoomKey): void;

  getPayloadCase(): RoomEvent.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomEvent.AsObject;
  static toObject(includeInstance: boolean, msg: RoomEvent): RoomEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomEvent;
  static deserializeBinaryFromReader(message: RoomEvent, reader: jspb.BinaryReader): RoomEvent;
}

export namespace RoomEvent {
  export type AsObject = {
    type: RoomEvent.TypeMap[keyof RoomEvent.TypeMap],
    roomId: number,
    userId: number,
    message?: RoomMessage.AsObject,
    info?: RoomInfo.AsObject,
    key?: RoomKey.AsObject,
  }

  export interface TypeMap {
    NONE: 0;
    KICKED: 1;
    DESTROYED: 2;
    MESSAGE: 3;
    ALLOCATED: 4;
    SUBSCRIBED: 5;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    MESSAGE = 10,
    INFO = 13,
    KEY = 12,
  }
}

export class ChatEvent extends jspb.Message {
  getType(): ChatEvent.TypeMap[keyof ChatEvent.TypeMap];
  setType(value: ChatEvent.TypeMap[keyof ChatEvent.TypeMap]): void;

  getChannelId(): number;
  setChannelId(value: number): void;

  getTimestamp(): number;
  setTimestamp(value: number): void;

  getSenderId(): number;
  setSenderId(value: number): void;

  getMessageId(): number;
  setMessageId(value: number): void;

  getFromUser(): boolean;
  setFromUser(value: boolean): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): ChatMessage | undefined;
  setMessage(value?: ChatMessage): void;

  getPayloadCase(): ChatEvent.PayloadCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatEvent.AsObject;
  static toObject(includeInstance: boolean, msg: ChatEvent): ChatEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatEvent;
  static deserializeBinaryFromReader(message: ChatEvent, reader: jspb.BinaryReader): ChatEvent;
}

export namespace ChatEvent {
  export type AsObject = {
    type: ChatEvent.TypeMap[keyof ChatEvent.TypeMap],
    channelId: number,
    timestamp: number,
    senderId: number,
    messageId: number,
    fromUser: boolean,
    message?: ChatMessage.AsObject,
  }

  export interface TypeMap {
    NONE: 0;
    MESSAGE: 1;
    TYPING: 2;
    STOP_TYPING: 5;
    READ: 3;
    DELIVERED: 4;
  }

  export const Type: TypeMap;

  export enum PayloadCase {
    PAYLOAD_NOT_SET = 0,
    MESSAGE = 10,
  }
}

export class ChatMessage extends jspb.Message {
  getType(): ChatMessage.TypeMap[keyof ChatMessage.TypeMap];
  setType(value: ChatMessage.TypeMap[keyof ChatMessage.TypeMap]): void;

  getText(): string;
  setText(value: string): void;

  getReplyId(): number;
  setReplyId(value: number): void;

  getMemberId(): number;
  setMemberId(value: number): void;

  getAnonymous(): boolean;
  setAnonymous(value: boolean): void;

  hasLogo(): boolean;
  clearLogo(): void;
  getLogo(): UserLogo | undefined;
  setLogo(value?: UserLogo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    type: ChatMessage.TypeMap[keyof ChatMessage.TypeMap],
    text: string,
    replyId: number,
    memberId: number,
    anonymous: boolean,
    logo?: UserLogo.AsObject,
  }

  export interface TypeMap {
    NONE: 0;
    TEXT: 1;
    MEMBER_JOIN: 2;
    MEMBER_LEFT: 3;
    CHANNEL_CREATED: 4;
    CHANNEL_DESTROYED: 5;
    CHANNEL_ARCHIVED: 6;
  }

  export const Type: TypeMap;
}

export class TxEnum extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxEnum.AsObject;
  static toObject(includeInstance: boolean, msg: TxEnum): TxEnum.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxEnum, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxEnum;
  static deserializeBinaryFromReader(message: TxEnum, reader: jspb.BinaryReader): TxEnum;
}

export namespace TxEnum {
  export type AsObject = {
  }

  export interface StatusMap {
    PENDING: 0;
    WITHHELD: 1;
    COMPLETED: 2;
    REFUNDED: 3;
    DEDUCTED: 4;
  }

  export const Status: StatusMap;

  export interface ReasonMap {
    NONE: 0;
    PLAN_CREATION: 1;
    POST_CREATION: 2;
    POST_RENEWAL: 8;
    STAKE: 3;
    CHARGE: 5;
    TIPS: 4;
    PURCHASE: 6;
    CASH_OUT: 7;
  }

  export const Reason: ReasonMap;
}

export class EventState extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventState.AsObject;
  static toObject(includeInstance: boolean, msg: EventState): EventState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventState;
  static deserializeBinaryFromReader(message: EventState, reader: jspb.BinaryReader): EventState;
}

export namespace EventState {
  export type AsObject = {
  }

  export interface EnumMap {
    SCHEDULED: 0;
    LOCKED: 1;
    STARTED: 2;
    ENDED: 3;
  }

  export const Enum: EnumMap;
}

export interface PostTypeMap {
  POST_TYPE: 0;
  CHAT: 1;
  SHARE: 2;
  LIVE: 3;
  AMA: 4;
  DEBATE: 5;
  DISCUSS: 6;
  ADULT: 10;
  OFFER_OPINION: 40;
  OFFER_ADVICE: 41;
  OFFER_MENTOR: 42;
  SEEK_OPINION: 50;
  SEEK_ADVICE: 51;
  SEEK_MENTOR: 52;
  ACTIVITY_MEETUP: 60;
  EVENT_MEETUP: 61;
}

export const PostType: PostTypeMap;

export interface PrivacyOptMap {
  PRIVATE: 0;
  CONNECTION: 1;
  COMMON: 2;
  PUBLIC: 3;
}

export const PrivacyOpt: PrivacyOptMap;

export interface NotificationTypeMap {
  ANNOUNCEMENT: 0;
  NEW_CONNECTION: 1;
  NEW_PLAN_INVITE: 2;
  NEW_EVENT_INVITE: 3;
  EVENT_UPDATED: 20;
  EVENT_RESCHEDULED: 21;
  EVENT_VERIFIED: 25;
  EVENT_CANCELLED: 27;
  EVENT_ENDED: 30;
  PLAN_GOAL_EVENT_ADDED: 40;
  PLAN_UPDATE: 41;
}

export const NotificationType: NotificationTypeMap;

export interface ChargeMap {
  CHARGE: 0;
  POST_CREATION: 1;
  POST_PAYMENT_ADDON: 2;
  POST_RENEWAL_ADDON: 3;
  POST_MEETUP_ADDON: 4;
  PLAN_CREATION: 10;
  PLAN_TRIAL_MEETUP_ADDON: 11;
}

export const Charge: ChargeMap;

