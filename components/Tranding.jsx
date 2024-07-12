import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
console.log(width)

const Tranding = ({data}) => {
    console.log(data)
  return (
    // <View>
    //   <Text className="text-white text-2xl font-bold mx-4 mt-10">Trending</Text>
    //   <Carousel
    //     data={data}
    //     firstItem={1}
    //     inactiveSlideOpacity={0.60}
    //     renderItem={({ item }) => <MovieCard item={item} />}  // Correct JSX return
    //     sliderWidth={width}
    //     itemWidth={width * 0.7}
    //     slideStyle={{ display: 'flex', alignItems: 'center' }}
    //   />
    // </View>
    <View>
      <Text className="text-white text-2xl font-bold mx-4 mt-10">{data}</Text>
    </View>
  );
};

// const MovieCard = ({ item }) => {
//   return (
//     <TouchableWithoutFeedback>
//       <View className="flex-1">
//         <Image source={{ uri: `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` }} className="w-72 h-96 rounded-lg" />
//         <Text className="text-white text-lg font-bold mt-2">/ </Text>
//         <Text className="text-white text-lg mt-2">{item.vote_average}</Text>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

export default Tranding;
