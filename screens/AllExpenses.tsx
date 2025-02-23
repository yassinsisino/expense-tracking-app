import { Text, View } from "react-native"
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput"
import { dummy_expenses } from "../data/dummy_expenses"
import { useContext } from "react"
import { ExpensesContext } from "../store/expense-context"

const AllExpenses = () => {

  const { expenses } = useContext(ExpensesContext)

  console.log('expenses', expenses)

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  )
}

export default AllExpenses