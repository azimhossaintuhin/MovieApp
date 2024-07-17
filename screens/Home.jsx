import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState , useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native'; 
import { fetchTrending, fetchUpcoming , fetchTopRated , fetchNowPlaying } from '../api';
// api calls are here

// importing components
import  Tranding  from '../components/Tranding';
import MovieList from '../components/MovieList';

const android = Platform.OS === 'android';





const Home = () => {
  const [trending , setTrending] = useState([])
  const [upcoming , setUpcoming] = useState([])
  const [nowPlaying , setNowPlaying] = useState([])
  const [topRated , setTopRated] = useState([])

  const navigation = useNavigation();

  useEffect(() => {
    getTrending()
    getUpcoming()
    getTopRated()
    getNowPlaying()

  }, [])
  
  // getting trending movies
  const getTrending = async () => {
    const data = await fetchTrending()
    setTrending(data)
  }

  // getting upcoming movies
  const getUpcoming = async () => {
    const data = await fetchUpcoming()
    setUpcoming(data)
  }

  // getting top rated movies
  const getTopRated = async () => {
    const data = await fetchTopRated()
    setTopRated(data.results)
  }

  // getting now playing movies
  const getNowPlaying = async () => {
    const data = await fetchNowPlaying()
    setNowPlaying(data.results)
  }

  return (
    <View className="flex-1 bg-neutral-900">
      {/* icon and logo */}
      <SafeAreaView className={android ? "mt-14 pb-5" : "-mt-3"} >
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} color="white" strokeWidth={2} />
          <Text style={{fontSize:30 , color:"white"}}>
            <Text style={{color:"red"}}>M</Text>ovie App
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
       
      </SafeAreaView>

      <ScrollView contentContainerStyle={{paddingBottom:10}} showsVerticalScrollIndicator={false}>
        <Tranding data={nowPlaying} />
        {/* upcoming movie */}
        <MovieList title={"Tending Movie"} data={trending}  seeall={true}/>

        <MovieList title={"Upcoming Movie"} data={upcoming}  seeall={true}/>

        <MovieList title={"Top Rated  Movie"} data={topRated} seeall={true} />
        
      </ScrollView>


    </View>

    


  );
};

export default Home;
