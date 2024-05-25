import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Protected from "./pages/protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/categories" element={<h1>categories</h1>} />
        <Route element={<Protected />}>
          <Route path="/home" element={<Feed />} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/setting" element={<h1>setting</h1>} />
          <Route path="/friends" element={<h1>friends</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
