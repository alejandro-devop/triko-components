import {useState, useEffect, useMemo} from 'react';
import {isEmpty} from 'shared/utils/functions';

export const productsMock = [
  {id: 1, name: 'Gelatina', category: 'Postres'},
  {id: 2, name: 'Salchichas', category: 'Carnes frías'},
  {id: 3, name: 'Arepas', category: 'Arina'},
  {id: 4, name: 'Quesito', category: 'Lacteos'},
  {id: 5, name: 'Arroz', category: 'Grano'},
  {id: 6, name: 'Cerveza', category: 'Alcohol'},
  {id: 7, name: 'Tomates', category: 'Verduras'},
  {id: 8, name: 'Espaguettis', category: 'Pasta'},
  {id: 9, name: 'Cerezas', category: 'frutas'},
  {id: 10, name: 'Lechuga', category: 'verduras'},
  {id: 11, name: 'Mortadela', category: 'Carnes Frías'},
  {id: 13, name: 'Pan', category: 'Parva'},
  {id: 14, name: 'Cereal kelogs', category: 'Granos'},
  {id: 15, name: 'Nutrecan', category: 'Granos'},
];

export const useProductMock = (options = {}) => {
  const {query = ''} = options;
  const [initialProducts, setInitialProducts] = useState([...productsMock]);
  const [loading, setLoading] = useState(true);
  const products = useMemo(() => {
    let filtered = [...initialProducts];
    if (!isEmpty(query)) {
      filtered = filtered.filter(item => {
        const exp = new RegExp(`.*(${query.toLowerCase()}).*`, 'g');
        return item.name.toLowerCase().match(exp);
      });
    }
    return filtered;
  }, [query]);
  useEffect(() => {
    setTimeout(() => {
      setInitialProducts(productsMock);
      setLoading(false);
    }, 2000);
  }, []);
  return {
    loading,
    products,
  };
};
