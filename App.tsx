
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import { SCREEN_ALIASES } from './constants/screenAliases';
import { GlobalStyles } from './constants/styles';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';


const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()

const ExpenseOverview = () => {
  const { Colors } = GlobalStyles
  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: Colors.primary500 },
          tabBarActiveTintColor: Colors.accent500
        }}>
        <BottomTab.Screen
          name={SCREEN_ALIASES.RECENT_EXPENSES}
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ size, color }) => (<Ionicons name='hourglass' size={size} color={color} />)
          }}
        />
        <BottomTab.Screen
          name={SCREEN_ALIASES.ALL_EXPENSES}
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ size, color }) => (<Ionicons name='calendar' size={size} color={color} />)
          }}
        />
      </BottomTab.Navigator>
    </>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={SCREEN_ALIASES.EXPENSE_OVERVIEW}>
          <Stack.Screen name={SCREEN_ALIASES.MANAGE_EXPENSE} component={ManageExpense} />
          <Stack.Screen
            name={SCREEN_ALIASES.EXPENSE_OVERVIEW}
            component={ExpenseOverview}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </>
  );
}


