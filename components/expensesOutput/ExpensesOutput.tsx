import React from "react"
import { StyleSheet, View } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { TExpense } from "../../types/expenses.types"
import { GlobalStyles } from "../../constants/styles"



interface IProps {
  expenses: TExpense[],
  expensesPeriod: string
}

const ExpensesOutput: React.FC<IProps> = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.Colors.primary700,
  }
})