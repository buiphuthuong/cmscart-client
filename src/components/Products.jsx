import styled from 'styled-components'
import Product from './Product'
import { useState, useEffect } from 'react'
import axios from 'axios'
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Products = ({ cat, sort, filters }) => {
  console.log(filters, cat)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://cmscart-server.herokuapp.com/api/products?category=${cat}`
            : 'https://cmscart-server.herokuapp.com/api/products'
        )
        console.log('res', res)
        setProducts(res.data)
      } catch (error) {}
    }
    getProducts()
  }, [cat])
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(
            ([key, value]) => item[key].includes(value) //lay ra nhung  cai  item voi key va  value
          )
        )
      )
  }, [products, cat, filters])
  //Object.entries(filters) =>Convert `obj` to a key/value array
  //sconsole.log('cat', cat)

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    } else if (sort === 'asc') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price))
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  )
}

export default Products
