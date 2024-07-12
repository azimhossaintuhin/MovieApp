import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';

import Carousel from '@demfabris/react-native-snap-carousel';
const window = Dimensions.get('window');


const Tranding = ({ data }) => {
  console.log(data);
  return (
    <View >
      <Text className="text-white text-2xl font-bold mx-4  mt-10 mb-5">Trending</Text>
      <Carousel
        data={data}
        sliderWidth={window.width}
        itemWidth={window.width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center',}}
        firstItem={1}
        loop={true}
        layout={'default'}
        renderItem={({ item , index }) => <MovieCard key={index} item={item} />}
      />
    </View>
  );
};

const MovieCard = ({ item }) => {
  return (
 
     <TouchableWithoutFeedback>
      <Image
          source={{ uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/uCr7Ov7Rpzx0c0EPqbPcoEruTYl.jpg" }}
          style={{ width: window.width * 0.6, height: window.height * 0.4 }}
          className="rounded-xl"
        />
      </TouchableWithoutFeedback>
    
  );
};

export default Tranding;
