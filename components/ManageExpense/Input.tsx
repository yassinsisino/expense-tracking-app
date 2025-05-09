import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

interface IInputProps {
  label: string,
  textInputConfig: TextInputProps,
  style?: any,
  invalid: boolean
}

const Input: React.FC<IInputProps> = ({ label, textInputConfig, style, invalid }) => {

  const inputStyles = [styles.input]
  if (textInputConfig && textInputConfig.multiline)
    inputStyles.push(styles.inputMultiline)

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={[inputStyles, invalid && styles.invalidInput]} {...textInputConfig} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,

  },
  label: {
    fontSize: 12,
    color: GlobalStyles.Colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.Colors.primary100,
    color: GlobalStyles.Colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
  invalidLabel: {
    color: GlobalStyles.Colors.error500
  },
  invalidInput: {
    backgroundColor: GlobalStyles.Colors.error50
  }
})