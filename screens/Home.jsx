import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
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
  // All State Is Defined Here
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isRefreshed ,  setIsRefreshed] =  useState(true);
  // For Navigamtion Purpose
  const navigation = useNavigation();

  // checking internet connection
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
//  if internet is not connected tgen this will be shown
  if (!isConnected) {
    return (
      <View className="flex-1 bg-neutral-900 justify-center items-center">
        <Text className="text-white text-lg">
          Please turn on your data or WiFi.
        </Text>
      </View>
    );
  }
// if internet is connected then this will be shown
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

      <ScrollView contentContainerStyle={{ paddingBottom: 10 }} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={!isRefreshed}
          onRefresh={() => {
            
            getTrending();
            getUpcoming();
            getTopRated();
            getNowPlaying();
            console.log("all api called")
            setIsRefreshed(true);
          }}
        />
      }>
        <Tranding data={nowPlaying} />
        {/* trending movie */}
        <MovieList title={"Trending Movie"} data={trending} seeAll={true} />
        {/* Upcoming Movie */}
        <MovieList title={"Upcoming Movie"} data={upcoming} seeAll={true} />
        {/* Top Rated movie */}
        <MovieList title={"Top Rated Movie"} data={topRated} seeAll={true} />
      </ScrollView>
      {console.log( "is refreshed",isRefreshed)}
    </View>

  );
 
};

export default Home;
