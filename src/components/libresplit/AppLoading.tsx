import { BarLoader } from "react-spinners";

export function AppLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <BarLoader color={"#00ff00"} />
    </div>
  );
}
