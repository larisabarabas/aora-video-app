import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center h-full px-4">
          <Image
            className="w-[130px] h-[84px]"
            resizeMode="contain"
            source={images.logo}
          ></Image>
          <Image
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
            source={images.cards}
          ></Image>
          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center font-bold">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              source={images.path}
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-gray-100 text-sm font-pregular mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
