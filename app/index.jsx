import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useState } from 'react'

import bgImage from "@/assets/images/bg.png"
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '@/theme'
import { debounce } from 'lodash'

import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import partlyCloudyImg from '../assets/images/partlycloudy.png'
import { fetchLocations, fetchWeatherForcast } from '../api/weather'


const app = () => {
  const [showSearch, toggleSearch] = useState(false)
  const [locations, setLocations] = useState('')

  const handleLocation = (loc) => {
    setLocations([]);
    console.log(locations);

    fetchWeatherForcast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      console.log('got forecast:', data);

    })
  }
  const handleSearch = (value) => {
    // fetch locations
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then(data => {
        setLocations(data)
      })
    }

  }
  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), [])
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className='flex-1 flex-col'>
        <ImageBackground
          source={bgImage}
          resizeMode='cover'
          className='w-full h-full flex-1 justify-center'
          blurRadius={70}
        >
          <SafeAreaView className='flex flex-1'>
            <View style={{ height: '7%' }} className='mx-4 relative z-50'>
              <View className='flex-row justify-end items-center rounded-full'
                style={{ backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent' }}>
                {
                  showSearch ? (
                    <TextInput
                      onChangeText={handleTextDebounce}
                      placeholder='Search city'
                      placeholderTextColor={"darkgray"}
                      className='pl-6 h-14 flex-1 text-white pb-1 text-lg'
                    />) : null
                }
                <TouchableOpacity
                  onPress={() => toggleSearch(!showSearch)}
                  style={{ backgroundColor: theme.bgWhite(0.3) }}
                  className='rounded-full p-3 m-1'
                >
                  <MagnifyingGlassIcon size='25' color='white' />
                </TouchableOpacity>
              </View>

              {
                locations.length > 0 && showSearch ? (
                  <View className='bg-gray-300 rounded-3xl mt-2 w-full'>

                    {
                      locations.map((location, index) => {
                        let showBorder = index + 1 != locations.length
                        let borderClass = showBorder ? 'border-b-gray-400 border-b-2' : ''
                        return (
                          <TouchableOpacity
                            onPress={() => handleLocation(location)}
                            key={index}
                            className={`flex-row p-4 gap-3 pl-5 items-center ${borderClass} mb-1`}
                          >
                            <MapPinIcon size='20' color='gray'></MapPinIcon>
                            <Text className='text-black text-base'>{location?.name}, {location?.country}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                ) : null
              }
            </View>

            <View className='flex flex-col items-center gap-16 flex-1'>
              {/** Today weather */}
              <Text className='font-bold text-white text-3xl mt-10'>London,
                <Text className='text-gray-400 text-2xl'>UnitedKingdom</Text>
              </Text>
              <Image source={partlyCloudyImg} className='w-52 h-48'></Image>
              <View className='flex flex-col gap-1 items-center justify-center'>
                <Text className='text-6xl font-bold text-white'>23°</Text>
                <Text className='text-xl font-bold text-gray-400'>Partly cloudy</Text>
              </View>

              {/** other stats */}
              <View className='flex-row mt-4 gap-10 '>
                <View className='flex-row gap-2 items-center justify-center'>
                  <Image source={require('../assets/icons/wind.png')} className='w-7 h-7' />
                  <Text className='text-white'>22km</Text>
                </View>
                <View className='flex-row gap-2 items-center justify-center'>
                  <Image source={require('../assets/icons/droplet.png')} className='w-7 h-7' />
                  <Text className='text-white'>23%</Text>
                </View>
                <View className='flex-row gap-2 items-center justify-center'>
                  <Image source={require('../assets/icons/sun.png')} className='w-7 h-7' />
                  <Text className='text-white'>6:05AM</Text>
                </View>
              </View>
            </View>

            {/** forcast */}
            <View>
              <View className='flex-row gap-2 items-center ml-4'>
                <CalendarDaysIcon color='white'></CalendarDaysIcon>
                <Text className='text-white'>Daily forecast</Text>
              </View>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{ paddingHorizontal: 5, flexGrow: 1 }}
              >
                <View className='flex-row px-3 mt-4 gap-3'>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                  <View className='flex-col w-28 justify-center items-center rounded-3xl py-4 space-y-3 gap-3'
                    style={{ backgroundColor: theme.bgWhite(0.15) }}>
                    <Image source={require('../assets/images/heavyrain.png')} className='w-11 h-11' />
                    <Text className='text-gray-300'>Monday</Text>
                    <Text className='text-white text-xl font-bold'>13°</Text>
                  </View>
                </View>
              </ScrollView>
            </View>

          </SafeAreaView>
        </ImageBackground>
      </View>
    </GestureHandlerRootView >
  )
}

export default app