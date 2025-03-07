import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import bgImage from "@/assets/images/bg.png"
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { theme } from '@/theme'

import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'

const app = () => {
  const [showSearch, toggleSearch] = useState(false)
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
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </GestureHandlerRootView >
  )
}

export default app