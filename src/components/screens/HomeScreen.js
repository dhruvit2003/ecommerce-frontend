import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Row, Col, Card } from 'react-bootstrap'

function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await axios.get('http://127.0.0.1:8000/api/products')
            console.log(data)

            setProducts(data)
        }
        fetchProducts()
    }, [])

  
    return (
        <Container>
            <h1>Welcome to ProShop</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Card className='my-3 p-3 rounded'>
                        <img src={product.image} alt={product.product_name} />
                        </Card>
                        <h3>{product.product_name}</h3>
                        <h6>{product.product_category}</h6>
                        <p>{product.price}</p>
                        <p>{product.product_info}</p>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen
