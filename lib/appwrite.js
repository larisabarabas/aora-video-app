import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.android.aora",
  projectId: "665ec7be002ac12a8055",
  databaseId: "665ec8f6003b5e1ee01a",
  userCollectionId: "665ec9190037211879ca",
  videoCollectionId: "665ec9340030d0d7cbdd",
  storageId: "665ecb6d0020d0ebf7c7",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarURL }
    );
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = account.get();
    if (!currentAccount) throw Error;
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

export const getSessions = async () => {
  try {
    const sessions = await account.listSessions();
    console.log(sessions.total);
    return sessions;
  } catch (error) {
    throw new Error(error);
  }
};

export const logout = async () => {
  try {
    const session = await account.deleteSession("current");
    console.log("deletedSessions", session);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};
