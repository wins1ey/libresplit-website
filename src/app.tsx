import { AppNav } from "./components/libresplit/AppNav";
import AppRouter from "./router";

export default function App() {
  return (
    <div>
      <div>
        <AppNav />
      </div>
      <div>
        <AppRouter />
      </div>
    </div>
  );
}
