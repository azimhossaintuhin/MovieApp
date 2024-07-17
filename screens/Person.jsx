import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
// all api imports here
import { fetchPresonData, fetchPersonMovie } from "../api";
import { imageUrl } from "../api";
// importing components
import MovieList from "../components/MovieList";
import NetInfo from '@react-native-community/netinfo';

// native functions
const { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";

const Person = ({ route }) => {
  // navigation
  const navigation = useNavigation();

  // defining state
  const [isLiked, setIsLiked] = useState(false);
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isConnected, setIsConnected] = useState(true); // Add state for internet connection

  // getting parameters
  const { id } = route.params;

  // use effect hook
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    if (isConnected) {
      getPersonDetails(id);
      getPersonMovies(id);
    }

    return () => {
      unsubscribe();
    };
  }, [id, isConnected]);

  // Handler
  const getPersonDetails = async () => {
    const data = await fetchPresonData(id);
    setPerson(data);
  }

  const getPersonMovies = async () => {
    const data = await fetchPersonMovie(id);
    setMovies(data);
  }

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
    <View className="flex-1 bg-neutral-800">
      {/* upper arrow and love icon */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="w-full">
          <SafeAreaView className={android ? "mt-16 flex-row justify-between items-center mx-4" : "-mt-3"}>
            <StatusBar style="light" />
            <TouchableOpacity
              className="p-1 bg-yellow-400 rounded-xl"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeftIcon size={30} color="white" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <HeartIcon size={30} color={isLiked ? "red" : "white"} />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        {/* image section */}
        <View className="flex-col items-center mt-10">
          <View className="w-70 h-70"
            style={{
              shadowColor: 'gray',
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 40,
            }}
          >
            <Image source={{ uri: `${imageUrl}${person?.profile_path}` }} style={{
              width: width * 0.74,
              height: width * 0.74,
            }} className="border-neutral-500 border-4 rounded-full" />
          </View>
          <View className="mt-4">
            <Text className="text-white text-4xl font-bold text-center">{person?.name}</Text>
            <Text className="text-neutral-400 text-lg mt-1 text-center">{person?.place_of_birth}</Text>
          </View>
        </View>

        {/* info of the actor */}
        <View className="flex-row p-4 justify-between bg-neutral-700 mt-4 mx-3 rounded-full">
          <View className="border-r-2 border-neutral-400 px-3 items-center">
            <Text className="text-neutral-100 font-semibold text-xl">Gender</Text>
            <Text className="text-neutral-300 text-sm">{person?.gender == 1 ? "Female" : "Male"}</Text>
          </View>

          <View className="border-r-2 border-neutral-400 px-3 items-center">
            <Text className="text-neutral-100 font-semibold text-xl">Birthday</Text>
            <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
          </View>

          <View className="border-r-2 border-neutral-400 px-3 items-center">
            <Text className="text-neutral-100 font-semibold text-xl">Known for</Text>
            <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
          </View>

          <View className="px-3 items-center">
            <Text className="text-neutral-100 font-semibold text-xl">Popularity</Text>
            <Text className="text-neutral-300 text-sm">{person?.popularity}</Text>
          </View>
        </View>
        {/* biography section */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-2xl font-bold">Biography</Text>
          <Text className="tracking-wide text-neutral-400">
            {person?.biography}
          </Text>
        </View>
        <MovieList data={movies} title={"Recent Movies"} seeAll={false} />
      </ScrollView>
    </View>
  );
};

export default Person;
