import { BrowserRouter as Router, Routes, Route, useSearchParams } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import PostCard from "./components/custom/PostCard"
import Categories from "./pages/Categories"
import CategoryDetail from "./pages/CategoryDetail"
import Popular from "./pages/Popular"
import UserProfile from "./pages/UserProfile"
import Settings from "./pages/Settings"
import Support from "./pages/Support"
import Trending from "./pages/Trending"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/custom/ProtectedRoute";
import PostDetail from "./pages/PostDetail"
import Home from "./pages/Home"

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:categorySlug" element={<CategoryDetail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
