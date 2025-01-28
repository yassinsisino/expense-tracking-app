import { Text, View } from "react-native"
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput"
import { dummy_expenses } from "../data/dummy_expenses"

const AllExpenses = () => {
  return (
    <View>
      <ExpensesOutput expenses={dummy_expenses} expensesPeriod="Total" />
    </View>
  )
}

export default AllExpenses