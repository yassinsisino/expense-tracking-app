import { Pressable, View, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'


interface IProps {
  name: React.ComponentProps<typeof Ionicons>['name']
  size: number
  color: string
  onPress: () => void
}

const IconButton: React.FC<IProps> = ({ name, size, color, onPress }) => {

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  )

}

export default IconButton

const styles = StyleSheet.create({

  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginVertical: 2,
    marginHorizontal: 8,
  },
  pressed: {
    opacity: 0.75,

  }


})