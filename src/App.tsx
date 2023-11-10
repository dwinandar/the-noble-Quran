import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "./components/Navbar"
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <>
      <Navbar />
      <Toaster />
    </>
    </ThemeProvider>
  )
}

export default App
