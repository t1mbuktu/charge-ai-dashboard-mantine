import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Dashboard from "./components/dashboard/Dashboard";
import { theme } from "./theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
  <Provider store={store}>
    <MantineProvider theme={theme} >
      <Dashboard />
    </MantineProvider>
  </Provider>
  )
}
