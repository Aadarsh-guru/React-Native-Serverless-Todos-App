import { View, Alert, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { getTodosService } from "../services/todo.service";
import { useTodos } from "../contexts/TodosProvider";
import LoadingScreen from "./LoadingScreen";
import TodoCard from "../components/TodoCard";

const Home = () => {

    const { auth } = useAuth();
    const { todos, setTodos } = useTodos();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setFetching(true);
                const { todos, success } = await getTodosService();
                if (success) {
                    setTodos(todos);
                }
            } catch (error: any) {
                console.log(error);
                return Alert.alert(error.response.data.message);
            } finally {
                setFetching(false);
            }
        }
        fetchTodos();
    }, [auth?.token])

    return (
        <>
            {
                fetching ?
                    <LoadingScreen />
                    : todos?.length === 0 ?
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text>No Todos</Text>
                        </View>
                        :
                        <View style={{ flex: 1 }} >
                            <ScrollView>
                                {todos.map((todo, index) => (
                                    <TodoCard key={index} todo={todo} index={index} setTodos={setTodos} />
                                ))}
                            </ScrollView>
                        </View>
            }
            <StatusBar style="auto" translucent={true} backgroundColor="transparent" />
        </>
    )
}

export default Home;
