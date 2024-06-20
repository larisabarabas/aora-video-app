import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`${titleStyles} text-center`}>{title}</Text>
      <Text className="text-sm text-gray-100 font-pregular">{subtitle}</Text>
    </View>
  );
};

export default InfoBox;