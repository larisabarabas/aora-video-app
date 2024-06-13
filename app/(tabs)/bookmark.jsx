import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const Bookmark = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full min-h-[85vh] px-4 my-6 justify-center">
          <Text className="text-white">Bookmark</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
