import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        className="w-[270px] h-[215px]"
        source={images.empty}
        resizeMode="contain"
      />
      <Text className="text-sm font-pmedium text-gray-100"> {title}</Text>
      <Text className="text-2xl text-white font-psemibold">{subtitle}</Text>
    </View>
  );
};

export default EmptyState;
