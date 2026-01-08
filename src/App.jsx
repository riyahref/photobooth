import { VibeBoothProvider } from './context/VibeBoothContext';
import VibeBoothApp from './components/VibeBoothApp';
import './index.css';

function App() {
  return (
    <VibeBoothProvider>
      <VibeBoothApp />
    </VibeBoothProvider>
  );
}

export default App;
