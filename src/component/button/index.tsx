import React from 'react';
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  TextStyle,
} from 'react-native';
import {Colors} from '../../styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonStyle?: TextStyle;
  titleStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  titleStyle,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        {
          padding: 10,
          backgroundColor: disabled ? Colors.gray1 : Colors.Orange,
          borderRadius: 5,
        },
        buttonStyle,
      ]}
      onPress={onPress}
      {...props}>
      <Text style={[{color: 'white', textAlign: 'center'}, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
