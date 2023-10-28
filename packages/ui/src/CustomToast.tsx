import Constants, { ExecutionEnvironment } from 'expo-constants'

import { NativeToast as Toast } from './NativeToast'

const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient

export const CustomToast = () => (isExpo ? null : <Toast />)
