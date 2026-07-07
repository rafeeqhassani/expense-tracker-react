import MainLayout from "./components/layout/MainLayout";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <MainLayout />
    </AppProviders>
  );
}

export default App;
