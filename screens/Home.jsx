import { View, Text, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

// importing components
import  Tranding  from '../components/Tranding';

const android = Platform.OS === 'android';

const Home = () => {
  const [trending , setTrending] = useState([1,2,3,4,5,6,7,8,9,10])
  console.log(trending)
  return (
    <View className="flex-1 bg-neutral-900">
      {/* icon and logo */}
      <SafeAreaView className={android ? "mt-14" : "-mt-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} color="white" strokeWidth={2} />
          <Text style={{fontSize:30 , color:"white"}}>
            <Text style={{color:"red"}}>M</Text>ovie App
          </Text>
          <TouchableOpacity>
            <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView>
        <Tranding data={trending} />
      </ScrollView>
    </View>
  );
};

export default Home;
