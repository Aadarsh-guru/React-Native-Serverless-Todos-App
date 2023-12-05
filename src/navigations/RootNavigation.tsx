import { useAuth } from '../contexts/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';

const RootNavigation = () => {

    // @ts-ignore
    const { auth } = useAuth();

    return (
        <NavigationContainer>
            {auth?.token ?
                <MainNavigation />
                :
                <AuthNavigation />
            }
        </NavigationContainer>
    )
}

export default RootNavigation;