import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Todo } from '../contexts/TodosProvider';

interface EditModalProps {
    visible: boolean;
    todo: Todo;
    onEdit: (newContent: string) => void;
    onCancel: () => void;
    loading: boolean
}

const EditModal: React.FC<EditModalProps> = ({ visible, todo, onEdit, onCancel, loading }) => {

    const [editedContent, setEditedContent] = useState(todo.content);

    const handleEdit = async () => {
        await onEdit(editedContent);
    };

    return (
        <Modal transparent visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Edit Todo</Text>
                    <TextInput
                        style={styles.input}
                        value={editedContent}
                        onChangeText={(text) => setEditedContent(text)}
                        placeholder="Enter new todo content"
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity disabled={loading} onPress={handleEdit}>
                            <Text style={styles.confirmText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={loading} onPress={() => { onCancel(); setEditedContent(todo.content) }}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: 300,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    confirmText: {
        color: 'green',
    },
    cancelText: {
        color: 'red',
    },
});

export default EditModal;
