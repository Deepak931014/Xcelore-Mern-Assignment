import { Routes, Route } from "react-router-dom";
import BaseLayout from './layouts/BaseLayout';

import { LoginForm, RegistrationForm, UserListing, NoPage, HomePage, ViewPage } from './pages';
    
const CustomRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage/>} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegistrationForm />} />
          <Route path="users" element={<UserListing />} />
          <Route path="view" element={<ViewPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    )
}

export default CustomRoutes;