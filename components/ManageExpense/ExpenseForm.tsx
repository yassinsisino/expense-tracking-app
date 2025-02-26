import { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"

import Input from "./Input"
import Button from "../UI/Button"

import { GlobalStyles } from "../../constants/styles"
import { TExpense } from "../../types/expenses.types"
import { getFormattedDate } from "../../utils/date"

type TInputState = {
  value: string | Date | number,
  isValid: boolean
}

interface IExpenseFormProps {
  isEditing: boolean,
  defaultValue: TExpense | undefined
  onCancel: () => void,
  onSubmit: (expens: TExpense) => void
}

interface IInputsState {
  amount: TInputState,
  date: TInputState,
  description: TInputState
}


const ExpenseForm: React.FC<IExpenseFormProps> = ({ isEditing, onCancel, onSubmit, defaultValue }) => {

  const [inputs, setInputs] = useState<IInputsState>({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : '',
      isValid: true
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date as Date) : '',
      isValid: true
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true
    }
  })

  const isInputsValid = inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid

  const onInputChangeHandler = (inputIdentifier: string, enteredValue: string) => {
    setInputs(prev => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value as string
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(prev => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: { value: prev.description.value, isValid: descriptionIsValid }
        }
      })
      return
    }
    onSubmit(expenseData)
  }




  return (
    <View style={styles.form}>
      <Text style={styles.title}>{'Your Expense'}</Text>
      <View style={styles.inputsRow}>
        <Input
          label={'Amount'}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: onInputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value as string
          }}
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label={'date'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: onInputChangeHandler.bind(this, 'date'),
            value: inputs.date.value as string
          }}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label={'Description'}
        textInputConfig={{
          multiline: true,
          numberOfLines: 2,
          onChangeText: onInputChangeHandler.bind(this, 'description'),
          value: inputs.description.value as string
        }}
        invalid={!inputs.description.isValid}
      />
      {!isInputsValid && (
        <Text style={styles.errorText}>{'Invalid input, Please check your input!'}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>

    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalStyles.Colors.primary100,
    textAlign: 'center',
    marginVertical: 24,

  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.Colors.error500,
    margin: 8
  }

})