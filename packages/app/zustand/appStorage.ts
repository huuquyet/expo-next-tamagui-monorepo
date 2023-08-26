import AsyncStorage from '@react-native-async-storage/async-storage'
import { StateStorage } from 'zustand/middleware'

// Create custom storage object
export const storage: StateStorage = {
  getItem: async (name: string): Promise<any | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(name)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.log(e)
    }
  },
  setItem: async (name: string, state: string): Promise<void> => {
    try {
      if (state) {
        const jsonValue = JSON.stringify(state)
        await AsyncStorage.setItem(name, jsonValue)
      }
    } catch (e) {
      console.log(e)
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(name)
    } catch (e) {
      console.log(e)
    }
  },
}
