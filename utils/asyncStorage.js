import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value); // 确保存的是字符串

        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('Error storing value: ', e);

    }
};

const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null; // 解析字符串回对象
    } catch (e) {
        console.log('Error storing value: ', e);
    }
};
