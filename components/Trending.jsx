import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};
const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const TrendingVideo = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  console.log(item.video);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
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
          className="relative justify-center items-center "
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] self-center overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            className="w-12 h-12 absolute"
            resizeMode="contain"
            source={icons.play}
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeVideo, setActiveVideo] = useState(posts[1]);

  const viewableItemsChange = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideo(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      horizontal
      renderItem={({ item }) => (
        <TrendingVideo activeItem={activeVideo} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChange}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
