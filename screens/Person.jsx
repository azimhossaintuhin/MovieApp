
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
import React,{useState} from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

// importing components
import MovieList from "../components/MovieList";

// native functions
const {width , height} = Dimensions.get("window");
const android = Platform.OS === "android";

const Person = () => {
  // defining state
    const [isLiked, setIsLiked] = useState(false);
    const navigation = useNavigation();
    const [movies, setMovies] = useState([1,2,3,4,5,6]);



  return (
    <View className=" flex-1 bg-neutral-800">
      {/* upper arrow and love icon */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="w-full">
        <SafeAreaView className={android?"mt-16 flex-row justify-between items-center  mx-4":"-mt-3"}>
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
        <View className="flex-col items-center  mt-10"     >
            <View className=" w-70 h-70 "
            style={{
              shadowColor:'gray',
              shadowOffset:{width:0,height:5},
              shadowOpacity:1,
              shadowRadius:40,
            }}
        >
            <Image source={{uri:"https://media.themoviedb.org/t/p/w300_and_h450_bestv2/83o3koL82jt30EJ0rz4Bnzrt2dd.jpg"}} style={{
                width:width*0.74,
                height:width*0.74,
                
               
            }}   className="border-neutral-500 border-4 rounded-full"/>
          </View>
         <View className="mt-4 ">
          <Text className="text-white text-4xl font-bold text-center  ">Chris Pratt</Text>
          <Text className="text-neutral-400 text-lg  mt-1 text-center">London, United Kingdom</Text>
          </View>

           
        </View>

        {/* info of the actor */}
        <View className="flex-row p-4 justify-between bg-neutral-700 mt-4 mx-3 rounded-full ">
            <View className="border-r-2 border-neutral-400 px-3 items-center">
              <Text className="text-neutral-100 font-semibold text-xl ">Gender</Text>
              <Text className="text-neutral-300 text-sm ">Male</Text>
            </View>

            <View className="border-r-2 border-neutral-400 px-3 items-center">
              <Text className="text-neutral-100 font-semibold text-xl ">Birthday</Text>
              <Text className="text-neutral-300 text-sm ">1964-02-14</Text>
            </View>

            <View className="border-r-2 border-neutral-400 px-3 items-center">
              <Text className="text-neutral-100 font-semibold text-xl ">Known for</Text>
              <Text className="text-neutral-300 text-sm ">Acting</Text>
            </View>

            <View className=" px-3 items-center">
              <Text className="text-neutral-100 font-semibold text-xl ">Popularity</Text>
              <Text className="text-neutral-300 text-sm ">62.75</Text>
            </View>
           
          </View> 

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-2xl font-bold ">Biography</Text>
            <Text className="  tracking-wid   text-neutral-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ratione velit. Eius nesciunt porro molestias quo ipsam debitis suscipit eveniet, amet deserunt obcaecati, provident quibusdam? Ut rem praesentium ipsa odit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ratione velit. Eius nesciunt porro molestias quo ipsam debitis suscipit eveniet, amet deserunt obcaecati, provident quibusdam? Ut rem praesentium ipsa odit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, ratione velit. Eius nesciunt porro molestias quo ipsam debitis suscipit eveniet, amet deserunt obcaecati, provident quibusdam? Ut rem praesentium ipsa odit?
            </Text>
          </View>
          <MovieList data={[]} title={"Recent Movies"} seeall={false}/>
      </ScrollView>

    {/* recent movies */}
   
  
    </View>
  );
};

export default Person;
