import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'
import { imageUrl } from '../api'
import { useNavigation } from '@react-navigation/native'



const { width, height } = Dimensions.get('window')

const MovieList = ({ title, data , seeall}) => {

  const navigation = useNavigation()

  const handleClick = (id) => {

    navigation.navigate('Movie',{id})
  }



  return (
    <View className="flex-1 mb-8">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold mt-4 mb-5">{title}</Text>
        <TouchableOpacity>
          <Text className="text-yellow-400 text-lg font-bold mt-5 mb-5">{seeall?"See All": ""}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingLeft: 10 }}
      >
        {data?.map((item, index) => (
          <TouchableOpacity key={index} className="mx-2" onPress={()=>handleClick(item.id)}>
            <View className="rounded-xl overflow-hidden">
            <Image
               source={{ uri: `${imageUrl}${item.poster_path}` }}
              style = {{ width: width * 0.33, height: height * 0.22 }}
              className="rounded-3xl"
            />
              <Text className=" mt-2 font-bold text-white ml-3">{item.title.length>20?item.title.slice(1,15)+'....':item.title}</Text>
              </View>
          </TouchableOpacity>
        
        ))}
      </ScrollView>
    </View>
  )
}

export default MovieList
