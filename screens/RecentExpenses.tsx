import { View } from "react-native"
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput"

import { dummy_expenses } from "../data/dummy_expenses"

interface IProps {

}

const RecentExpenses: React.FC<IProps> = () => {
  return (
    <View>
      <ExpensesOutput expenses={dummy_expenses} expensesPeriod="Last 7 days" />
    </View>
  )
}

export default RecentExpenses