import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";

// native functions
const android = Platform.OS === "android";
const { width, height } = Dimensions.get("window");

const Search = () => {
  // navigation
  const navigation = useNavigation();
  const data =  [1,2,3,4,5,6,7,8,9,10]
  const name =  "Vikings  Valhalla"

  return (
    <SafeAreaView className=" flex-1 bg-neutral-800 " >
      {/* search bar */}
      <View
        className={
          android
            ? "mt-14 mx-4 border-2 border-neutral-600 flex-row justify-between items-center  rounded-full  space-y-4"
            : "-mt-3 mx-4 border-2 border-neutral-600 flex-row justify-between items-center  rounded-full"
        }
      >
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"white"}
          className="pb-1 pl-6 font-semibold text-white tracking-wider flex-1 text-base"
        />
        <TouchableOpacity
          className="p-2  bg-neutral-400 rounded-full m-1"
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size={30} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      {/* Scroll View */}
      <ScrollView 
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:15}}
        className="space-y-6"
      >
        <Text className="text-white text-xl font-bold mt-4 mb-5 mx-6">Result ({data.length})</Text>
        <View className="flex-row justify-between flex-wrap">
           
            {data?.map((item, index) => (
                <TouchableOpacity key={index} className="mx-3" onPress={()=>navigation.navigate("Movie", index)}>
                <View className="rounded-xl overflow-hidden space-y-2 mb-4">
                <Image
                source={{uri:"https://image.tmdb.org/t/p/w600_and_h900_bestv2/uCr7Ov7Rpzx0c0EPqbPcoEruTYl.jpg"}}
                style={{width:width*0.44,height:height*0.3}}
                />
                <Text className="text-neutral-300 ml-1 mt-2">{name.length=="14"?name.slice(0,22)+"....":name}</Text>
                </View>
                </TouchableOpacity>
            ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;
