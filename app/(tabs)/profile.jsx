import { Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { logout } from "../../lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text>Profile</Text>
          <CustomButton title="Logout" handlePress={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
