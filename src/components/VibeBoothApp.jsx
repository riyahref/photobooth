import { useVibeBooth } from '../context/VibeBoothContext';
import LandingScreen from './screens/LandingScreen';
import PermissionScreen from './screens/PermissionScreen';
import CaptureScreen from './screens/CaptureScreen';
import VibeScreen from './screens/VibeScreen';
import FilterScreen from './screens/FilterScreen';
import CustomizeScreen from './screens/CustomizeScreen';
import NoteScreen from './screens/NoteScreen';
import PreviewScreen from './screens/PreviewScreen';

const VibeBoothApp = () => {
  const { currentScreen } = useVibeBooth();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen />;
      case 'permission':
        return <PermissionScreen />;
      case 'capture':
        return <CaptureScreen />;
      case 'vibe':
        return <VibeScreen />;
      case 'filter':
        return <FilterScreen />;
      case 'customize':
        return <CustomizeScreen />;
      case 'note':
        return <NoteScreen />;
      case 'preview':
        return <PreviewScreen />;
      default:
        return <LandingScreen />;
    }
  };

  return <main className="app-container">{renderScreen()}</main>;
};

export default VibeBoothApp;
