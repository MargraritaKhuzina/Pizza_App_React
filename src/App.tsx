import React, { Suspense } from 'react';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
// import Loadable from 'react-loadable';
import Home from './pages/home';
// import NotFound from './pages/notFound';
// import Cart from './pages/cart';
// import FullPizza from './pages/fullPizza';
import MainLayout from './layouts/mainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/cart'));

// const Cart = Loadable({
//   loader: () => import(/* webpackChunkName: "Cart"*/ './pages/cart'),
//   loading: () => <h1>Идет загрузка...</h1>,
// });

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/notFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza"*/ './pages/fullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<h1>Идет загрузка...</h1>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<h1>Идет загрузка...</h1>}>
              <FullPizza />
            </Suspense>
          }
        />

        <Route
          path="*"
          element={
            <Suspense fallback={<h1>Идет загрузка...</h1>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
