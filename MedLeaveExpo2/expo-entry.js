import { registerRootComponent } from 'expo';
import App from './App';

// Use the public API to register the root component. Previously this imported
// an internal path which can break across Expo versions and lead to
// undefined/default import issues.
registerRootComponent(App);