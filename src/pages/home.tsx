import React, { useEffect, useCallback } from 'react';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination } from '../components';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const onClickCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const orderAsc = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const categorySort = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        orderAsc,
        categorySort,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items
    .filter((object: any) => {
      if (object.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((item: any) => <PizzaBlock key={item.id} {...item} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h1>Ничего не найдено 😕</h1>
          <p>
            К сожалению, при загрузке данных произошла ошибка. Пожалуйста, попробуйте повторить
            попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
