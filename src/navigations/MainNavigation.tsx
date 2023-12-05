import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import Home from "../screens/Home";
import { useAuth } from "../contexts/AuthProvider";
import Create from "../screens/Create";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

const MainNavigation = () => {

    const { handleLogout, auth } = useAuth();
    const navigation = useNavigation();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Home'
                component={Home}
                options={{
                    // @ts-ignore
                    headerRight: () => <Ionicons onPress={() => navigation.navigate('Create')} style={{ marginRight: 20 }} name="add" size={30} color={'grey'} />,
                    headerLeft: () => <Ionicons onPress={() => handleLogout()} style={{ marginLeft: 20 }} name="power-outline" size={24} color={'grey'} />,
                    headerTitleAlign: 'center',
                    headerTitle: auth?.user.name
                }}
            />
            <Stack.Screen
                name="Create"
                component={Create}
                options={{
                    // @ts-ignore
                    headerLeft: () => <Ionicons onPress={() => navigation.navigate('Home')} style={{ marginLeft: 20 }} name="arrow-back" size={24} color={'grey'} />,
                    headerRight: () => <Ionicons onPress={() => handleLogout()} style={{ marginRight: 20 }} name="power-outline" size={24} color={'grey'} />,
                    headerTitleAlign: 'center',
                    headerTitle: auth?.user.name
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;