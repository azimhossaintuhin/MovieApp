import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { debounce } from "lodash";
// importing apis
import { serachMovieApi } from "../api";
import { imageUrl } from "../api";
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

// native functions
const android = Platform.OS === "android";
const { width, height } = Dimensions.get("window");

const Search = () => {
  // navigation
  const navigation = useNavigation();
  const [search, setSearch] = useState([]);
  const [isConnected, setIsConnected] = useState(true); // Add state for internet connection

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // getting search data
  const getSearch = async (query) => {
    if (isConnected) {
      const data = await serachMovieApi(query);
      setSearch(data);
    }
  };

  // handle input change
  const handleChange = (text) => {
    if (text.length > 0) {
      getSearch(text);
    } else {
      setSearch([]);
    }
  };

  // search handler
  const handleSearch = useCallback(debounce(handleChange, 400), [isConnected]);

  if (!isConnected) {
    return (
      <View className="flex-1 bg-neutral-800 justify-center items-center">
        <Text className="text-white text-lg">
          Please turn on your data or WiFi.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      {/* search bar */}
      <View className="pb-10">
        <View
          className={
            android
              ? "mt-14 mx-4 border-2 border-neutral-600 flex-row justify-between items-center rounded-full"
              : "mt-3 mx-4 border-2 border-neutral-600 flex-row justify-between items-center rounded-full"
          }
        >
          <TextInput
            onChangeText={(text) => handleSearch(text)}
            placeholder="Search Movie"
            placeholderTextColor={"white"}
            className="pb-1 pl-6 font-semibold text-white tracking-wider flex-1 text-base"
          />
          <TouchableOpacity
            className="p-2 bg-neutral-400 rounded-full m-1"
            onPress={() => navigation.navigate("Home")}
          >
            <XMarkIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Scroll View */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}
        className="space-y-6"
      >
        {search.length > 0 ? (
          <>
            <Text className="text-white text-xl font-bold mt-4 mb-5 mx-6">
              Result ({search.length})
            </Text>
            <View className="flex-row justify-between flex-wrap">
              {search.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="mx-3"
                  onPress={() => navigation.navigate("Movie", { id: item?.id })}
                >
                  <View className="rounded-xl overflow-hidden space-y-2 mb-4">
                    <Image
                      source={{
                        uri: `${imageUrl}${item.poster_path}`,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1 mt-2">
                      {item.title.length > 20
                        ? item.title.slice(1, 15) + "...."
                        : item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/null.png")}
              className="w-40 h-40 mt-[20rem]"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
