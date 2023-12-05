import AuthProvider from './src/contexts/AuthProvider';
import TodosProvider from './src/contexts/TodosProvider';
import RootNavigation from './src/navigations/RootNavigation';

const App = () => {
  return (
    <AuthProvider>
      <TodosProvider>
        <RootNavigation />
      </TodosProvider>
    </AuthProvider>
  )
}

export default App;