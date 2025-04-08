import { useContext, useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import IconButton from "../components/UI/IconButton"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"

import { ExpensesContext } from "../store/expense-context"
import { GlobalStyles } from "../constants/styles"
import { TExpense } from "../types/expenses.types"
import { storeExpense } from "../utils/http"

import Constants from "expo-constants"
import { useMutation } from "@tanstack/react-query"

interface IProps {
  route: any
  navigation: any
}


const ManageExpense: React.FC<IProps> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId


  const mutation = useMutation({
    mutationFn: async (expense: Partial<TExpense>) => storeExpense(expense),
    onSuccess: (data) => {
      console.log('Expense stored successfully:', data)
    },
    onError: (error) => {
      console.error('Error storing expense:', error)
    }
  })

  const { expenses, deleteExpense, updateExpense, addExpense } = useContext(ExpensesContext)

  const selectedExpense = expenses.find(expense => expense.id === editedExpenseId)

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

  const confirmHandler = (expenseData: TExpense) => {
    if (isEditing)
      updateExpense(editedExpenseId, { ...expenseData })
    else {
      mutation.mutate(expenseData)
      addExpense(expenseData)
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />
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
})