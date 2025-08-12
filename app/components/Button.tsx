import { Button as RNButton, Touchable, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import Text from "./Text";

function Button({
  className,
  onPress,
  title,
}: {
  className?: string;
  onPress: () => void;
  title: string;
}) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      className={className}
      onPress={onPress}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: colors.primary,
        borderRadius: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Zain_700Bold",
          fontSize: 32,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
