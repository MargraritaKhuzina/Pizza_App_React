import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice';
import { FilterSortType, SortPropertyEnum } from '../redux/slices/filterSliceTypes';

// КАК ЗАМУТИТЬ TOGGLE ЗНАЧЕНИЕ НА КНОПКУ/СПИСОК И Т.Д?
// в общем, для начала мы оборачиваем нужный код условием
// что если у нас открыто (open) то мы отображаем этот код (делаем это или через && или через ? :)
// потом мы задаем <span onClick={() => setOpen(!open)}>популярности</span>
// !open - это типа местный toggle, оно реверсит значение на обратное, благодаря чему получается то true то false и у нас тоглится список

// НАВЕШИВАЕМ ОБРАБОТЧИК ТАКОЙ, ЧТОБЫ СКРЫВАЛСЯ ПОП АП ПРИ КЛИКЕ В ДУРГУЮ ОБЛАСТЬ
// для этого используем useEffect, создаем в константе функцию, в которой используем const sortRef = useRef();, чтобы отследить где именно сделан клик
// выглядит это так: (!event.path.includes(sortRef.current))
// там мы закрываем окно, а потом нам нужно при демонтаже компонента удалять обработчик document.body.addEventListener
// КАК ЭТО СДЕЛАТЬ?
//  через return пишем return () => {
//       document.body.removeEventListener('click', handleClickOutside);
//     }

type ListSort = {
  name: string;
  sortProperty: SortPropertyEnum;
};
type PopupClick = MouseEvent & {
  path: Node[];
};
type SortProps = {
  value: FilterSortType;
};

export const list: ListSort[] = [
  { name: 'самым популярным', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'наименее популярным', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'самым дорогим', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'самым дешевым', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (от Я до А)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (от А до Я)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const Sort: React.FC<SortProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  // отображение списка сортировки объектов
  const OnClickListItem = (object: ListSort) => {
    dispatch(setSortType(object));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      // если клик произошел не по области Popup, то окно закрывается
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {/* если окно Popup открыто, то отображается список параметров сортировки */}
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((object, index) => (
              <li
                key={index}
                onClick={() => OnClickListItem(object)}
                className={value.sortProperty === object.sortProperty ? 'active' : ''}>
                {object.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
