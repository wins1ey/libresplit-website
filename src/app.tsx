import { AppNav } from "./components/libresplit/AppNav";
import AppRouter from "./router";

export default function App() {
  return (
    <div>
      <div>
        <AppNav />
      </div>
      <div className="px-2">
        <AppRouter />
      </div>
    </div>
  );
}
