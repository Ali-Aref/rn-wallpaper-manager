import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Props = Omit<TouchableOpacityProps, "children"> & {
  title: string;
  isLoading?: boolean;
};

const Button: React.FC<Props> = ({
  title,
  isLoading,
  style,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || isLoading}
      style={[styles.touchable, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      {isLoading && <ActivityIndicator size="small" color="white" />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
