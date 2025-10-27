import Home from "./app/home";
import { Route, Routes } from "react-router";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
