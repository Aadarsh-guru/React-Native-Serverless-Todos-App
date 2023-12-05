import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createTodoService } from '../services/todo.service';
import { useNavigation } from '@react-navigation/native';
import { useTodos } from '../contexts/TodosProvider';

const Create = () => {

    const { todos, setTodos } = useTodos();
    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const hanldeAddTodo = async () => {
        if (!text) {
            return Alert.alert('Please enter todo text');
        }
        try {
            setLoading(true);
            const { success, todo, message } = await createTodoService(text);
            setLoading(false);
            if (success) {
                setText('');
                setTodos([todo, ...todos]);
                // @ts-ignore
                return navigation.navigate('Home');
            } else {
                return Alert.alert(message);
            }
        } catch (error: any) {
            setLoading(false);
            console.log(error);
            Alert.alert(error.response.data.message);
        };
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', paddingVertical: 20, paddingHorizontal: 10 }} >
            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: 20, color: 'grey', textAlign: 'center' }} >Add new todo</Text>
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 15,
                    marginTop: 10,
                    gap: 10,
                    alignItems: 'flex-start'
                }}
            >
                <TextInput
                    style={{
                        backgroundColor: "#F6F7FB",
                        height: 58,
                        marginBottom: 20,
                        fontSize: 16,
                        borderRadius: 10,
                        padding: 12,
                        width: '75%',
                    }}
                    value={text}
                    onChangeText={(e) => setText(e)}
                    placeholder="Enter odo here.."
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    onPress={hanldeAddTodo}
                    disabled={loading}
                    style={{
                        backgroundColor: '#f57c00',
                        height: 58,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '25%',
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                        {
                            loading ?
                                <ActivityIndicator
                                    size={'small'}
                                    color={'#fff'}
                                />
                                :
                                'Add'
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Create;