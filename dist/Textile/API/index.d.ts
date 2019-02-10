import { File, ExternalInvite, ContactInfo, ContactInfoQueryResult, Overview, FileData, ThreadInfo, WalletAccount, BlockInfo, NotificationInfo, ThreadFilesInfo, ThreadFeedItem, ThreadMessageInfo, LogLevel } from '../Models';
import { IMobilePreparedFiles, ICafeSession, ICafeSessions, IDirectory } from '@textile/react-native-protobufs';
declare class API {
    /**
     * Returns the hash of the initial join block. Not the threadId of the final thread created/joined
     */
    acceptExternalThreadInvite: (id_: string, key: string) => Promise<string>;
    acceptThreadInviteViaNotification: (id_: string) => Promise<string>;
    addContact: (contact: ContactInfo) => Promise<void>;
    addExternalThreadInvite: (threadId: string) => Promise<ExternalInvite>;
    addSchema: (jsonstr: string) => Promise<File>;
    addThread: (key: string, name: string, shared: boolean) => Promise<ThreadInfo>;
    addThreadComment: (blockId: string, body: string) => Promise<string>;
    addThreadFiles: (dir: IDirectory, threadId: string, caption?: string | undefined) => Promise<BlockInfo>;
    addThreadFilesByTarget: (target: string, threadId: string, caption?: string | undefined) => Promise<BlockInfo>;
    addThreadIgnore: (blockId: string) => Promise<string>;
    addThreadInvite: (threadId: string, inviteeId: string) => Promise<string>;
    addThreadLike: (blockId: string) => Promise<string>;
    addThreadMessage: (threadId: string, body: string) => Promise<string>;
    address: () => Promise<string>;
    avatar: () => Promise<string | undefined>;
    cafeSession: (peerId: string) => Promise<ICafeSession | undefined>;
    cafeSessions: () => Promise<ICafeSessions | undefined>;
    checkCafeMessages: () => Promise<void>;
    contact: (id_: string) => Promise<ContactInfo>;
    contactThreads: (id_: string) => Promise<ReadonlyArray<ThreadInfo>>;
    contacts: () => Promise<ReadonlyArray<ContactInfo>>;
    countUnreadNotifications: () => Promise<number>;
    deregisterCafe: (peerId: string) => Promise<void>;
    fileData: (hash: string) => Promise<FileData>;
    findContact: (username: string, limit: number, wait: number) => Promise<ContactInfoQueryResult>;
    ignoreThreadInviteViaNotification: (id_: string) => Promise<string>;
    imageFileDataForMinWidth: (pth: string, minWidth: number) => Promise<FileData>;
    notifications: (offset: string, limit: number) => Promise<ReadonlyArray<NotificationInfo>>;
    overview: () => Promise<Overview>;
    peerId: () => Promise<string>;
    prepareFiles: (path: string, threadId: string) => Promise<IMobilePreparedFiles>;
    prepareFilesAsync: (path: string, threadId: string) => Promise<IMobilePreparedFiles>;
    profile: () => Promise<ContactInfo>;
    readAllNotifications: () => Promise<void>;
    readNotification: (id_: string) => Promise<void>;
    refreshCafeSession: (peerId: string) => Promise<ICafeSession | undefined>;
    registerCafe: (peerId: string) => Promise<void>;
    removeThread: (id_: string) => Promise<string>;
    seed: () => Promise<string>;
    setAvatar: (id_: string) => Promise<void>;
    setLogLevels: (levels: Map<string, LogLevel>) => Promise<void>;
    setUsername: (username: string) => Promise<void>;
    start: () => Promise<void>;
    stop: () => Promise<void>;
    threadFeed: (offset: string, limit: number, threadId?: string | undefined) => Promise<ReadonlyArray<ThreadFeedItem>>;
    threadFiles: (offset: string, limit: number, threadId?: string | undefined) => Promise<ReadonlyArray<ThreadFilesInfo>>;
    threadMessages: (offset: string, limit: number, threadId?: string | undefined) => Promise<ReadonlyArray<ThreadMessageInfo>>;
    threadInfo: (threadId: string) => Promise<ThreadInfo>;
    threads: () => Promise<ReadonlyArray<ThreadInfo>>;
    username: () => Promise<string | undefined>;
    version: () => Promise<string>;
    initRepo: (seed: string, repoPath: string, logToDisk: boolean, debug: boolean) => Promise<void>;
    migrateRepo: (repoPath: string) => Promise<void>;
    newTextile: (repoPath: string, debug: boolean) => Promise<void>;
    newWallet: (wordCount: number) => Promise<string>;
    walletAccountAt: (phrase: string, index: number, password?: string | undefined) => Promise<WalletAccount>;
}
export default API;
