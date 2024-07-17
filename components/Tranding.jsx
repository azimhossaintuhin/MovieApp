import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { imageUrl } from '../api';
import Carousel from '@demfabris/react-native-snap-carousel';
const window = Dimensions.get('window');


const Tranding = ({ data }) => {

  return (
    <View style={{flex:1 , marginTop:10 , marginBottom:30}}>
      <Text className="text-white text-2xl font-bold mx-4  mt-10 mb-5">Trending</Text>
      <Carousel
        data={data}
        sliderWidth={window.width}
        itemWidth={window.width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center', marginTop: 20}}
        firstItem={1}
        loop={true}
        layout={'default'}
        renderItem={({ item , index }) => <MovieCard key={item.id} item={item} />}
      />
    </View>
  );
};

const MovieCard = ({ item }) => {
  return (
 
     <TouchableWithoutFeedback>
   
      <Image
          source={{ uri: `${imageUrl}${item.poster_path}` }}
          style={{ width: window.width * 0.6, height: window.height * 0.4 }}
          className="rounded-xl"
        />
      
      </TouchableWithoutFeedback>
    
  );
};

export default Tranding;
