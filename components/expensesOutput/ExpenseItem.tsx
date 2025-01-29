import { Pressable, StyleSheet, Text, View } from "react-native"
import { TExpense } from "../../types/expenses.types"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from '../../utils/date'
import { useNavigation } from "@react-navigation/native"
import { SCREEN_ALIASES } from "../../constants/screenAliases"

interface IProps {
  expense: TExpense
}

const ExpenseItem: React.FC<IProps> = ({ expense }) => {
  const { amount, date, description, id } = expense
  const navigation = useNavigation()

  const handleExpenseItemPress = () => {
    navigation.navigate(SCREEN_ALIASES.MANAGE_EXPENSE, {
      expenseId: id
    })
  }

  return (
    <Pressable onPress={handleExpenseItemPress} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]} >{description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amout}>{amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  container: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: GlobalStyles.Colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.Colors.primary500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.Colors.primary50
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amout: {
    color: GlobalStyles.Colors.primary500,
    fontWeight: 'bold',
  }



})