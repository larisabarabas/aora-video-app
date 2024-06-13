import { FlatList, Text } from "react-native";
import React from "react";

const Trending = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <Text className="text-3xl text-white" key={item.id}>
          {item.id}
        </Text>
      )}
    />
  );
};

export default Trending;
