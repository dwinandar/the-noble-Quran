import App from "@/App";
import {  Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <App />
      <Outlet />
    </div>
  )
}