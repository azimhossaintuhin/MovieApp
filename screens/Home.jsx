import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { fetchTrending, fetchUpcoming, fetchTopRated, fetchNowPlaying } from '../api';

// importing components
import Tranding from '../components/Tranding';
import MovieList from '../components/MovieList';

const android = Platform.OS === 'android';

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      console.log(state.isConnected);
    });

    if (isConnected) {
      getTrending();
      getUpcoming();
      getTopRated();
      getNowPlaying();
    }

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  // getting trending movies
  const getTrending = async () => {
    const data = await fetchTrending();
    setTrending(data);
  };

  // getting upcoming movies
  const getUpcoming = async () => {
    const data = await fetchUpcoming();
    setUpcoming(data);
  };

  // getting top-rated movies
  const getTopRated = async () => {
    const data = await fetchTopRated();
    setTopRated(data.results);
  };

  // getting now playing movies
  const getNowPlaying = async () => {
    const data = await fetchNowPlaying();
    setNowPlaying(data.results);
  };

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
    <View className="flex-1 bg-neutral-900">
      {/* icon and logo */}
      <SafeAreaView className={android ? "mt-14 pb-5" : "-mt-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Text style={{ fontSize: 30, color: "white" }}>
            <Text style={{ color: "red" }}>M</Text>ovie App
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
        <Tranding data={nowPlaying} />
        {/* upcoming movie */}
        <MovieList title={"Trending Movie"} data={trending} seeAll={true} />
        <MovieList title={"Upcoming Movie"} data={upcoming} seeAll={true} />
        <MovieList title={"Top Rated Movie"} data={topRated} seeAll={true} />
      </ScrollView>
    </View>
  );
};

export default Home;
