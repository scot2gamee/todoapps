import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultNavigationProps} from '../routes/RootStackParamList';
import {useNavigation} from '@react-navigation/native';
import {TextFont} from '../component/text';
import {Colors, SizeFonts} from '../styles';
import {useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {Todo} from '../types';
import {formattedDate} from '../component/formatDate';
type TodoProps = DefaultNavigationProps<'TodoDetail'>;

const TodoDetail = () => {
  const navigation = useNavigation<TodoProps['navigation']>();
  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  const totalSubtasks: number = todos.reduce(
    (total, task) => total + task.subtask.length,
    0,
  );
  const handleTaskPress = (id: number) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      navigation.navigate('Todo', {scrollToIndex: index});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailContainer}>
        <TextFont color={Colors.black} size={SizeFonts.h4}>
          {'Summary of the tasks'}
        </TextFont>
        <TextFont color={Colors.black} size={SizeFonts.l}>
          {'Tasks created:' + todos.length}
        </TextFont>
        <TextFont color={Colors.black} size={SizeFonts.l}>
          {'Subtasks:' + totalSubtasks}
        </TextFont>
        <FlatList
          data={todos.sort((a, b) => {
            const dueDateA = new Date(a.duedate);
            const dueDateB = new Date(b.duedate);
            return dueDateA.getTime() - dueDateB.getTime();
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => handleTaskPress(item.id)}
              style={styles.card}>
              <TextFont color={Colors.black} size={SizeFonts.l}>
                {`${index + 1}.${item.title}`}
              </TextFont>
              <TextFont color={Colors.black} size={SizeFonts.l}>
                {formattedDate(item.duedate)}
              </TextFont>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray4,
  },
  detailContainer: {
    paddingHorizontal: '5%',
    rowGap: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
  },
});
export default TodoDetail;
