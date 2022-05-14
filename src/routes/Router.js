import React from "react";
import Login from "./Login";
import Main from "./Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Hospital from "routes/Hospital";
import Shelter from "./Shelter";
import Abandoned from "./Abandoned";
import AnimalDetail from "pages/AnimalDetail";
import MyAccount from "./MyAccount";
import DeleteAccount from "./DeleteAccount";
import ChangePW from "./ChangePW";
import License from "./License";
import Pharmacy from "./Pharmacy";
import Adoption from "./Adoption";
import Favorite from "./Favorite";
import { Provider } from "react-redux";
import store from "reducers/store";
import WriteArticle from "./WriteArticle";

export default function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/abandoned" element={<Abandoned />} />
          <Route path="/abandoned/:id" element={<AnimalDetail />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/delete" element={<DeleteAccount />} />
          <Route path="/change" element={<ChangePW />} />
          <Route path="/license" element={<License />} />
          <Route path="/adoption" element={<Adoption />} />
          <Route path="/adoption/write" element={<WriteArticle />} />
        </Routes>
      </Router>
    </Provider>
  );
}
