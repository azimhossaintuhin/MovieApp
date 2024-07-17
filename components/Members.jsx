import { View, Text , ScrollView , TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { imageUrl } from '../api'

const Members = ({cast}) => {
  const navigation = useNavigation()

  return (
    <View className="my-6">
        <Text className="text-white font-bold mx-4">Top Members</Text>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 10 }} className="mt-4">
              {cast?.map((item, index) => {
                const id  =  item?.id
                return(
                  <TouchableOpacity key={index} onPress={()=>navigation.navigate("Person" ,{id})} >
                  <View className="flex-col items-center  justify-center mx-2 ">
                    <View className="overflow-hidden w-70 h-70 rounded-full bg-neutral-700 p-1">
                    <Image
                      source={{ uri: `${imageUrl}${item?.profile_path}` }}
                      style = {{ width: 70, height: 70 }}
                      className="rounded-full"
                    />
                    </View>
                    <Text className="text-white mt-2">{item?.name}</Text>
                    <Text className="text-neutral-400 text-sm">{item?.character}</Text>
                  </View>
                </TouchableOpacity>
                )
                
})}
            </ScrollView>
    </View>
  )
}

export default Members