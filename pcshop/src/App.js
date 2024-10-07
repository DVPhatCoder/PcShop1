import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './util';
import { jwtDecode } from 'jwt-decode';
import * as UserServices from '../src/services/UserServices';
import { updateUser } from '../src/redux/slides/useSlide';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../src/components/LoadingComponent/Loading';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => {
    return state.user;
  });



  useEffect(() => {
    setLoading(true)
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
    setLoading(false)
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserServices.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date().getTime() / 1000; // Thời gian hiện tại tính bằng giây
    let { decoded } = handleDecoded();
    if (decoded?.exp < currentTime) {
      const data = await UserServices.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  const handleGetDetailsUser = async (id, token) => {

    try {
      const res = await UserServices.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);

    }
  };

  return (
    <div>
      <Loading isPending={loading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              const isCheckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route key={route.path} path={isCheckAuth && route.path ? route.path : undefined} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              );
            })}
          </Routes>
        </Router>
      </Loading>


    </div>
  );
}

export default App;
