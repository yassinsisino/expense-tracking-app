
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import { SCREEN_ALIASES } from './constants/screenAliases';
import { GlobalStyles } from './constants/styles';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expense-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const ExpenseOverview = () => {
  const { Colors } = GlobalStyles
  const navigation = useNavigation()

  const handleHeaderRightPress = () => {
    navigation.navigate(SCREEN_ALIASES.MANAGE_EXPENSE as never)
  }

  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: Colors.primary500 },
          tabBarActiveTintColor: Colors.accent500,
          headerRight: ({ tintColor }) => {
            return <IconButton
              name='add'
              size={24}
              color={tintColor as string}
              onPress={handleHeaderRightPress}
            />
          }
        }}>
        <BottomTab.Screen
          name={SCREEN_ALIASES.RECENT_EXPENSES}
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name='hourglass'
                size={size}
                color={color}
              />)
          }}
        />
        <BottomTab.Screen
          name={SCREEN_ALIASES.ALL_EXPENSES}
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ size, color }) => (
              <Ionicons
                name='calendar'
                size={size}
                color={color}
              />)
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

export default function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <StatusBar style="light" />
      <QueryClientProvider client={queryClient}>
        <ExpensesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={SCREEN_ALIASES.EXPENSE_OVERVIEW}
              screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.Colors.primary500 },
                headerTintColor: 'white'
              }}
            >
              <Stack.Screen
                name={SCREEN_ALIASES.EXPENSE_OVERVIEW}
                component={ExpenseOverview}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={SCREEN_ALIASES.MANAGE_EXPENSE}
                component={ManageExpense}
                options={{
                  presentation: 'modal'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ExpensesContextProvider>
      </QueryClientProvider>
    </>
  );
}


