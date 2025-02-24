import { StyleSheet, Text, View } from "react-native"
import Input from "./Input"
import { GlobalStyles } from "../../constants/styles"
import { useState } from "react"


type TInputValues = {
  amount: string,
  date: string,
  description: string,
}

const ExpenseForm = () => {


  const [inputValues, setInputValues] = useState<TInputValues>({
    amount: '',
    date: '',
    description: ''
  })

  const onInputChangeHandler = (inputIdentifier: string, enteredValue: string) => {
    setInputValues(prev => {
      return {
        ...prev,
        [inputIdentifier]: enteredValue
      }
    })
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
            value: inputValues.amount
          }}
          style={styles.rowInput}
        />
        <Input
          label={'date'}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: onInputChangeHandler.bind(this, 'date'),
            value: inputValues.date
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label={'Description'}
        textInputConfig={{
          multiline: true,
          numberOfLines: 2,
          onChangeText: onInputChangeHandler.bind(this, 'description'),
          value: inputValues.description
        }}
      />
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
  }

})