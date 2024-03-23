import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  containerStyle,
  ...props
}) => {
  return (
    <RNTextInput
      style={[{borderWidth: 1, padding: 10, borderRadius: 5}, containerStyle]}
      {...props}
    />
  );
};

export default TextInput;
