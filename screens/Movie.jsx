import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import Members from "../components/Members";
import MovieList from "../components/MovieList";
import { fetchMovieDetails , fetchMovieCereditApi , fetchSemilarMovies } from "../api";
import { imageUrl } from "../api";

// some native functions
const AndroidSafeArea = Platform.OS === "android";
const { width, height } = Dimensions.get("window");

const Movie = ({ route }) => {
  // all the states
  const [isLiked, setIsLiked] = useState(false);
  const [movie, setMovie] = useState(null);
  const [Cast, setCast] = useState([]);
  const [RelatedMovies, setRelatedMovies] = useState([]);
  const [isConnected, setIsConnected] = useState(true); // Add state for internet connection
  // navigation
  const navigation = useNavigation();
  // getting movie id
  const { id } = route.params;

  // use effect hook
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });

    if (isConnected) {
      getMovieDetails(id);
      getMovieCast(id);
      getRelatedMovies(id);
    }

    return () => {
      unsubscribe();
    };
  }, [id, isConnected]);

  const getRelatedMovies = async (id) => {
    const data = await fetchSemilarMovies(id);
    setRelatedMovies(data);
  }

  // apis calls 
  const getMovieDetails = async () => {
    const data = await fetchMovieDetails(id);
    setMovie(data);
  };

  const getMovieCast = async () => {
    const data = await fetchMovieCereditApi(id);
    setCast(data);
  }

  if (!isConnected) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-white text-lg">
          Please turn on your data or WiFi.
        </Text>
      </View>
    );
  }

  return (
    //action buttons
    <ScrollView className="bg-neutral-900 ">
      <View className="w-full">
        <SafeAreaView
          className={
            AndroidSafeArea
              ? "mt-16 absolute z-30 w-full flex-row justify-between items-center px-4"
              : "-mt-3 absolute flex-row justify-between items-center px-4"
          }
        >
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

        {/* movie IMage */}

        <View>
          <Image
            source={{
              uri: `${imageUrl}${movie?.poster_path}`,
            }}
            style={{ width: width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
            style={{ width: width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        {/* Movie Title */}
        <View style={{ height: -(height * 0.5) }} className="space-y-3">
          <Text className="text-center text-3xl text-white font-extrabold tracking-wider">
            {movie?.title}
          </Text>
          {movie?.id ? (
            <Text className="text-center text-base text-neutral-400 font-semibold mt-2">
              {movie?.status} · {movie?.release_date.split("-")[0]} ·{" "}
              {movie?.runtime} min
            </Text>
          ) : null}
        </View>
        {/* Genres */}
        <View className="flex-row justify-center items-center  mx-4 space-x-2 my-2">
           {movie?.genres?.map((genre, index) => {
            const showDot = index+1 !== movie.genres.length;
            return(
              <Text
              key={index}
              className="text-neutral-400 text-lg font-bold"
            >
              {genre.name} {showDot && "• "}  
            </Text>
            )
         
           })}  
          
        </View>

        {/* Movie Description */}

        <Text className="text-neutral-400  mx-4 track-wide">
         {movie?.overview}
        </Text>
      </View>
      {/* cast members */}
      <Members cast={Cast} />

      {/* related Movies */}
      <MovieList title={"Related Movies"} data={RelatedMovies} seeAll={false} />
    </ScrollView>
  );
};

console.log("Movie component loaded");
export default Movie;
