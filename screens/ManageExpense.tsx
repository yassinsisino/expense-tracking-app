import { useContext, useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import IconButton from "../components/UI/IconButton"
import Button from "../components/UI/Button"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expense-context"

interface IProps {
  route: any
  navigation: any
}


const ManageExpense: React.FC<IProps> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const { deleteExpense, updateExpense, addExpense } = useContext(ExpensesContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId)
    navigation.goBack()
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = () => {
    if (isEditing)
      updateExpense(editedExpenseId, { amount: 10 })
    else
      addExpense(editedExpenseId)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            name='trash'
            size={25}
            color={GlobalStyles.Colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      }
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.Colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.Colors.primary200,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
})