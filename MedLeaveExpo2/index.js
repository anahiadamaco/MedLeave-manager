// Must be imported at the very top — gesture handler needs to be initialized
// before any navigation or gesture-related code runs.
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';

// Register the main component
registerRootComponent(App);