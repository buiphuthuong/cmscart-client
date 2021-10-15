import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Container = styled.div``
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  margin: 20px;
`
const Filter = styled.div`
  margin: 20px;
`
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`
const Option = styled.option``
const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split('/')[2]
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState('newest')

  const handleFilter = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }
  return (
    <Container>
      <Announcement />

      <Navbar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Product:</FilterText>
          <Select name='color' onChange={handleFilter}>
            <Option disabled>Color</Option>
            <Option value='white'>White</Option>
            <Option value='black'>Black</Option>
            <Option value='yellow'>Yellow</Option>
            <Option value='red'>Red</Option>
            <Option value='green'>Green</Option>
            <Option value='blue'>Blue</Option>
          </Select>
          <Select name='size' onChange={handleFilter}>
            <Option disabled>Size</Option>
            <Option value='S'>S</Option>
            <Option value='M'>M</Option>
            <Option value='L'>L</Option>
            <Option value='X'>X</Option>
            <Option value='XXL'>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Product:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value='newest'>Newest</Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default ProductList
