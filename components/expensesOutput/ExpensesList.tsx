import React from "react"
import { FlatList, Text, View } from "react-native"

import ExpenseItem from "./ExpenseItem"
import { TExpense } from "../../types/expenses.types"


interface IProps {
  expenses: TExpense[]
}

const renderExpenseItem = ({ item }: { item: TExpense }) => {
  return <ExpenseItem expense={item} />
}

const ExpensesList: React.FC<IProps> = ({ expenses }) => {
  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default ExpensesList