import React from "react"
import { FlatList, Text, View } from "react-native"
import { TExpense } from "../../types/expenses.types"


interface IProps {
  expenses: TExpense[]
}

const ExpenseListElement = (item: TExpense) => {
  return (
    <View>
      <Text>{item.description}</Text>
      <Text>{item.amount}</Text>
    </View>
  )
}

const ExpensesList: React.FC<IProps> = ({ expenses }) => {
  return (
    <View>
      <FlatList data={expenses} renderItem={({ item }) => ExpenseListElement(item)} />
    </View>
  )
}

export default ExpensesList