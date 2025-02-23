import { useContext } from "react"
import { View } from "react-native"
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput"
import { ExpensesContext } from "../store/expense-context"
import { getDateMinusDays } from "../utils/date"

interface IProps {

}

const RecentExpenses: React.FC<IProps> = () => {

  const { expenses } = useContext(ExpensesContext)

  const recentExpenses = expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    const expenseDate = new Date(expense.date.getFullYear(), expense.date.getMonth(), expense.date.getDay())
    return expenseDate > date7DaysAgo
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  )
}

export default RecentExpenses