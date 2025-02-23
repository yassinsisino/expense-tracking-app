import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"

interface IProps {
  children: React.ReactNode
  onPress: () => void
  mode?: 'flat' | undefined
  style?: any
}

const Button: React.FC<IProps> = ({ children, onPress, mode, style }) => {

  return (
    <View style={style}>
      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed} >
        <View style={[styles.button, mode === 'flat' ? styles.flat : null]}>
          <Text style={[styles.buttonText, mode === 'flat' ? styles.flatText : null]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View >
  )
}

export default Button

const styles = StyleSheet.create({

  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.Colors.primary500,
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  flatText: {
    color: GlobalStyles.Colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.Colors.primary100,
    borderRadius: 4
  }

})