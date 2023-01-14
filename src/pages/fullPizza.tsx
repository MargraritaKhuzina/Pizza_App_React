import axios from 'axios';
import React, { useState, useEffect } from 'react';

import configFile from '../config.json';

import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const navigate = useNavigate();

  const baseUrl = configFile.apiEndpoint;

  useEffect(() => {
    async function fetchPizza() {
      try {
        // получаем данные по id конкретной пиццы
        const { data } = await axios.get(baseUrl + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении товара. Возвращаемся на главную страницу');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className="full-pizza">
        <div className="full-pizza__picture">
          <img className="full-pizza__image" src={pizza.imageUrl} alt="" />
        </div>
        <div className="full-pizza__description">
          <h2 className="full-pizza__title">{pizza.title}</h2>
          <p className="full-pizza__text">
            Состав: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil, tempore.
          </p>
          <h4 className="full-pizza__price">{pizza.price}</h4>
        </div>
      </div>

      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default FullPizza;
