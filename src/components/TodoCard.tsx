import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Todo } from '../contexts/TodosProvider';
import ConfirmationModal from './ConfirmationModel';
import EditModal from './EditModel';
import { deleteTodoService, updateTodoService } from '../services/todo.service';

interface TodoCardProps {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, index, setTodos }) => {

    const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            const { success } = await deleteTodoService(todo.id);
            if (success) {
                setTodos(prev => prev.filter(item => item.id !== todo.id));
                setConfirmModalVisible(false);
                return;
            }
        } catch (error: any) {
            console.log(error);
            return Alert.alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditConfirm = async (newContent: string) => {
        if (!newContent) {
            return Alert.alert('Todo cannot be empty');
        }
        try {
            setLoading(true);
            const { success } = await updateTodoService(todo.id, newContent);
            if (success) {
                setTodos(prev => prev.map(item => item.id === todo.id ? { ...item, content: newContent } : item));
                setEditModalVisible(false);
                return;
            }
        } catch (error: any) {
            console.log(error);
            return Alert.alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.todoContainer}>
                <Text>{index + 1}.</Text>
                <Text style={styles.todoText}>{todo.content}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity disabled={loading} onPress={() => setEditModalVisible(true)}>
                    <Ionicons name="create-outline" size={30} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity disabled={loading} onPress={() => setConfirmModalVisible(true)}>
                    <Ionicons name="trash-outline" size={30} color="red" />
                </TouchableOpacity>
            </View>
            <ConfirmationModal loading={loading} visible={isConfirmModalVisible} onConfirm={handleConfirmDelete} onCancel={() => setConfirmModalVisible(false)} />
            <EditModal loading={loading} visible={isEditModalVisible} todo={todo} onEdit={handleEditConfirm} onCancel={() => setEditModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    todoText: {
        marginLeft: 10,
        fontSize: 18,
        flexShrink: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default TodoCard;
