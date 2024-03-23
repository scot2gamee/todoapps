import React, {memo} from 'react';

import {Text} from 'react-native';
import type {
  NativeSyntheticEvent,
  LayoutChangeEvent,
  TextLayoutEventData,
} from 'react-native';

interface ITextProps {
  children?: React.ReactNode;
  style?: React.CSSProperties | object;
  color?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  size?: number;
  limit?: number;
  textAlign?: 'auto' | 'left' | 'right' | 'center';
  mr?: number;
  ml?: number;
  mb?: number;
  mt?: number;
  pr?: number;
  pl?: number;
  pb?: number;
  pt?: number;
  loading?: boolean;
  numberOfline?: number;
  onTextLayout?: (e: NativeSyntheticEvent<TextLayoutEventData>) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress?: () => void;
}

interface ITextComponent {
  props: ITextProps;
}

const TextComponent = ({props}: ITextComponent) => {
  const styleLayout = {
    marginRight: props.mr,
    marginLeft: props.ml,
    marginTop: props.mt,
    marginBottom: props.mb,
    paddingRight: props.pr,
    paddingLeft: props.pl,
    paddingTop: props.pt,
    paddingBottom: props.pb,
  };

  return (
    <Text
      onTextLayout={props?.onTextLayout}
      onLayout={props.onLayout}
      onPress={props?.onPress}
      numberOfLines={props.limit}
      ellipsizeMode="tail"
      style={[
        {
          ...styleLayout,
          ...props,
          fontSize: props.size,
          color: props.color,
          textAlign: props.textAlign,
          backgroundColor: props.backgroundColor,
          width: props.width,
          height: props.height,
          borderBottomWidth: props.borderBottomWidth,
          borderBottomColor: props.borderBottomColor,
        },
      ]}>
      {props.children}
    </Text>
  );
};

export const TextFont = memo((props: ITextProps) =>
  TextComponent({
    props,
  }),
);
