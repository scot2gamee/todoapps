import {NativeStackScreenProps} from '@react-navigation/native-stack';

type StackProps = {
  scrollToIndex: number;
};

export type RootStackParamList = {
  Todo: StackProps;
  TodoDetail: undefined;
};

export type DefaultNavigationProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
