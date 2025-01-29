import { useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"

interface IProps {
  route: any
  navigation: any
}


const ManageExpense: React.FC<IProps> = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])


  return (
    <View style={styles.container}>

      {isEditing &&
        <View style={styles.deleteContainer}>
          <IconButton
            name='trash'
            size={25}
            color={GlobalStyles.Colors.error500}
            onPress={() => { }}
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
  }
})