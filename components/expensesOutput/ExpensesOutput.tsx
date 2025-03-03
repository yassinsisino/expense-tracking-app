import React from "react"
import { StyleSheet, View, Text } from "react-native"
import ExpensesSummary from "./ExpensesSummary"
import ExpensesList from "./ExpensesList"
import { TExpense } from "../../types/expenses.types"
import { GlobalStyles } from "../../constants/styles"



interface IProps {
  expenses: TExpense[],
  expensesPeriod: string,
  fallbackText: string
}

const ExpensesOutput: React.FC<IProps> = ({ expenses, expensesPeriod, fallbackText }) => {

  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0)
    content = <ExpensesList expenses={expenses} />

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.Colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 22
  }
})