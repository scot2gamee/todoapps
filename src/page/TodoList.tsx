import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {Todo} from '../types';
import {addTodo, deleteTodo, updateTodo} from '../action/todoActions';
import {Colors, SizeFonts} from '../styles';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Button from '../component/button';
import {TextFont} from '../component/text';
import TextInput from '../component/textInput';
import {useNavigation} from '@react-navigation/native';
import {DefaultNavigationProps} from '../routes/RootStackParamList';
import {formattedDate} from '../component/formatDate';

type TodoProps = DefaultNavigationProps<'Todo'>;

const TodoList = ({route}: TodoProps) => {
  const navigation = useNavigation<TodoProps['navigation']>();
  const {scrollToIndex} = route.params || {};
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDateTime, setDueDateTime] = useState<Date | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const todos: Todo[] = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scrollToIndex !== undefined && flatListRef.current) {
      scrollToIndexFunc(scrollToIndex);
    }
  }, [scrollToIndex]);

  const scrollToIndexFunc = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  };
  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDueDateTime(selectedDate);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleSave = () => {
    if (editingTodo) {
      const updatedTodo: Todo = {
        ...editingTodo,
        title,
        description,
        duedate: dueDateTime ? dueDateTime : new Date(),
      };
      dispatch(updateTodo(updatedTodo));
    } else {
      const randomNumber = Math.floor(Math.random() * 1000000);
      const data = {
        id: randomNumber,
        title,
        description,
        duedate: dueDateTime ? dueDateTime : new Date(),
        subtask: [],
      };
      dispatch(addTodo(data));
    }
    setModalVisible(false);
  };

  const onCreate = (type: string, todoOrIndex?: Todo | number) => {
    if (type === 'edit' && typeof todoOrIndex === 'number') {
      const index = todoOrIndex;
      const todoItem = todos[index]; 
      setEditingTodo(todoItem);
      setTitle(todoItem.title);
      setDescription(todoItem.description);
      setDueDateTime(todoItem.duedate);
    } else if (typeof todoOrIndex === 'object' && todoOrIndex !== null) {
      const todoItem = todoOrIndex;
      setTitle(todoItem.title);
      setEditingTodo(todoItem);
      setDescription(todoItem.description);
      setDueDateTime(todoItem.duedate);
    } else {
      setEditingTodo(null);
      setTitle('');
      setDescription('');
      setDueDateTime(null);
    }
    setModalVisible(true);
  };
  const addSubtask = (item: Todo, newSubtask: string) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const data = {id: randomNumber, text: newSubtask};
    const updatedItem = {
      ...item,
      subtask: [...item.subtask, data],
    };
    dispatch(updateTodo(updatedItem));
  };
  const deleteSubtask = (item: Todo, subtaskId: number) => {
    const updatedSubtasks = item.subtask.filter(
      subtask => subtask.id !== subtaskId,
    );
    const updatedItem = {
      ...item,
      subtask: updatedSubtasks,
    };
    dispatch(updateTodo(updatedItem));
  };

  const editSubtask = (item: Todo, subtaskId: number, newText: string) => {
    const updatedSubtasks = item.subtask.map(subtask => {
      if (subtask.id === subtaskId) {
        return {...subtask, text: newText};
      }
      return subtask;
    });
    const updatedItem = {
      ...item,
      subtask: updatedSubtasks,
    };
    dispatch(updateTodo(updatedItem));
  };
  const subtaskContainerWithBackground = (index: number) => ({
    ...styles.subtaskContainer,
    backgroundColor: index % 2 ? Colors.gray7 : Colors.gray1,
  });
  const handelNext = () => {
    navigation.navigate('TodoDetail');
  };
  const showMode = (currentMode: string) => {
    DateTimePickerAndroid.open({
      value: dueDateTime?dueDateTime:new Date(),
      onChange:handleDateChange,
      mode: currentMode,
      is24Hour: true,
      minimumDate: new Date()
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <TextFont color={Colors.black} size={SizeFonts.h4}>
          {'TODO LIST'}
        </TextFont>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={todos.sort((a, b) => {
            const dueDateA = new Date(a.duedate);
            const dueDateB = new Date(b.duedate);
            return dueDateA.getTime() - dueDateB.getTime();
          })}
          ref={flatListRef}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.cardContainer}
              onPress={() => handelNext()}>
              <View style={styles.titleContainer}>
                <TextFont color={Colors.white} size={SizeFonts.l}>
                  {item.title}
                </TextFont>
                <View style={{flexDirection:'row'}}>
                <Button
                  title="Edit"
                  style={{backgroundColor: Colors.Transparent, marginRight: 10}}
                  onPress={() => {
                    const index = todos.findIndex(todo => todo.id === item.id);
                    onCreate('edit', index);
                  }}
                />
                <Button
                  title="Delete"
                  style={{backgroundColor: Colors.Transparent}}
                  onPress={() => handleDelete(item.id)}
                />
                </View>
              </View>
              <View style={styles.card}>
                <TextFont color={Colors.black} size={SizeFonts.h5}>
                  {item.description}
                </TextFont>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={() => (
                    <TextInput
                      placeholder="add subtask"
                      placeholderTextColor={Colors.gray1}
                      onEndEditing={event => {
                        if (event.nativeEvent.text.length > 0) {
                          addSubtask(item, event.nativeEvent.text);
                        }
                      }}
                      containerStyle={styles.inputSubtask}
                    />
                  )}
                  data={item.subtask}
                  renderItem={({item: subtask, index}) => (
                    <View style={subtaskContainerWithBackground(index)}>
                      <TextInput
                        containerStyle={{borderWidth: 0}}
                        value={subtask.text}
                        onChangeText={newText =>
                          editSubtask(item, subtask.id, newText)
                        }
                      />
                      <Button
                        style={{backgroundColor: Colors.Transparent}}
                        title="Delete"
                        onPress={() => deleteSubtask(item, subtask.id)}
                      />
                    </View>
                  )}
                />
                <View style={styles.line} />
                <TextFont color={Colors.black} size={SizeFonts.l}>
                  {formattedDate(item.duedate)}
                </TextFont>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <TouchableOpacity onPress={()=> onCreate('create')} style={styles.buttonAdd}>
        <TextFont color={Colors.white} size={SizeFonts.l}>
          {'ADD'}
        </TextFont>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
              style={styles.close}>
              <TextFont color={Colors.black} size={SizeFonts.l}>
                {'X'}
              </TextFont>
            </TouchableOpacity>
            <TextFont color={Colors.black} size={SizeFonts.l}>
              {'Title'}
            </TextFont>

            <TextInput
              value={title}
              placeholder="Please fill title"
              placeholderTextColor={Colors.gray1}
              style={styles.inputText}
              onChangeText={text => setTitle(text)}
            />
            <TextFont color={Colors.black} size={SizeFonts.l}>
              {'Description'}
            </TextFont>
            <TextInput
              value={description}
              placeholder="Please fill description"
              placeholderTextColor={Colors.gray1}
              style={styles.inputText}
              onChangeText={text => setDescription(text)}
              multiline
            />
            <TextFont color={Colors.black} size={SizeFonts.l}>
              {'Due Date'}
            </TextFont>
            <View style={styles.inputText}>
              <TextFont color={Colors.black} size={SizeFonts.l}>
                {dueDateTime ? formattedDate(dueDateTime) : ''}
              </TextFont>
            </View>
            {Platform.OS === 'ios'?
            <DateTimePicker
            value={dueDateTime || new Date()}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />:
          <View style={styles.selectDate}>
          <Button onPress={showDatepicker} title="Show date picker!" />
          <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          }
            <Button
              disabled={!title || !description || !dueDateTime}
              title="SAVE"
              onPress={() => handleSave()}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray4,
  },
  listContainer: {
    paddingHorizontal: '5%',
    paddingBottom: 40
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modal,
  },
  modalView: {
    width: '80%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 35,
    rowGap: 10,
  },

  inputText: {
    width: '100%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxHeight: 170,
    color: Colors.black,
  },
  cardContainer: {
    marginTop: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  titleContainer: {
    width: '100%',
    height: 36,
    backgroundColor: Colors.green,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    padding: 20,
  },
  inputSubtask: {
    marginTop: 20,
    color: Colors.black,
  },

  subtaskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray1,
    marginVertical: 20,
  },
  buttonAdd: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Blue,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  selectDate: {
    rowGap: 10
  }
});
export default TodoList;
