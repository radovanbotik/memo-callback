import React from "react";
import useFetch from "./useFetch";
import { useState, useEffect, useCallback, useMemo } from "react";
const url = "https://course-api.com/javascript-store-products";

export default function Index() {
  const { data } = useFetch(url);
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState(0);

  const getMostExpensive = data => {
    console.log(data);
    return (
      data.reduce((total, item) => {
        const price = item.fields.price;
        if (price >= total) {
          total = price;
        }
        return total;
      }, 0) / 100
    );
  };
  const mostExpensive = useMemo(() => getMostExpensive(data), [data]);
  const addToCart = useCallback(() => {
    setCart(prev => prev + 1);
  }, [cart]);

  return (
    <div>
      <h1>Count:{count}</h1>
      <button
        onClick={e =>
          setCount(prev => {
            return prev + 1;
          })
        }
      >
        click me
      </button>
      <h1 style={{ margin: "3ex" }}>cart items: {cart}</h1>
      <h1>most expensive = ${mostExpensive}</h1>
      <ProductList data={data} addToCart={addToCart} />
    </div>
  );
}
const ProductList = React.memo(({ data, addToCart }) => {
  useEffect(() => {
    console.log("Productlist rerendered");
  });
  return (
    <div>
      {data.map(entry => (
        <Product key={entry.id} {...entry} addToCart={addToCart} />
      ))}
    </div>
  );
});
function Product(props) {
  useEffect(() => {
    console.log("Product rerendered");
  });
  const { addToCart } = props;
  const { name, price, company } = props.fields;
  return (
    <article>
      <h2>{name}</h2>
      <h3>{price / 100}Eur</h3>
      <h4>{company}</h4>
      <button onClick={addToCart}>add to cart</button>
    </article>
  );
}
