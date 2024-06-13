import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({ value, placeholder, handleChangeText }) => {
  return (
    <View className=" border-2 border-black-200 rounded-2xl w-full h-16 px-4 bg-black-100 focus:border-secondary-100 items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
