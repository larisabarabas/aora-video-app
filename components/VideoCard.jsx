import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";
import { useGlobalContext } from "../context/GlobalProvider";

const VideoCard = ({
  video: { title, thumbnail, video, saved_by },
  creator: { username, avatar },
  onDeletePost,
  onSavePost,
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        {/* This can be moved to a separate component and it can also be refactored to use FlatList and to receive multiple items */}
        <View className="flex flex-col justify-end">
          <TouchableOpacity
            activeOpacity={0.7}
            className="pt-2"
            onPress={() => setIsDropdownOpened(!isDropdownOpened)}
          >
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {isDropdownOpened && (
            <View className="bg-black-100 px-6 py-4 my-2 rounded-xl w-[130px] absolute z-50 right-0 top-9">
              {user.username !== username &&
                saved_by.includes(user.$id) === false && (
                  <TouchableOpacity
                    className="flex flex-row gap-2 justify-start items-center"
                    onPress={() => {
                      Alert.alert(
                        "Success",
                        "This post was saved to Bookmarks"
                      );
                      setIsDropdownOpened(false);
                      onSavePost();
                    }}
                  >
                    <Image
                      source={icons.bookmark}
                      resizeMode="contain"
                      className="w-3 h-3"
                    />
                    <Text className="text-white font-pmedium text-sm">
                      Save
                    </Text>
                  </TouchableOpacity>
                )}

              {user.username === username && (
                <TouchableOpacity
                  className="flex flex-row gap-2 justify-start items-center"
                  onPress={() => {
                    Alert.alert("Success", "This post got deleted");
                    setIsDropdownOpened(false);
                    onDeletePost();
                  }}
                >
                  <Image
                    source={icons.deleteItem}
                    resizeMode="contain"
                    className="w-3 h-3"
                  />
                  <Text className="text-white font-pmedium text-sm">
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Video goes here */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
