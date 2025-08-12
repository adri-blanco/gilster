import { Text as RNText, TextProps } from "react-native";

export default function Text(props: TextProps) {
  return (
    <RNText
      {...props}
      style={[
        {
          color: "white",
          fontFamily: "Zain_400Regular",
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
}
