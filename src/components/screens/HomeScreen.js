import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import Product from '../Product'
import { listProducts } from '../../actions/productsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Message from '../Message'

function HomeScreen() {
    const dispatch = useDispatch()
    const productsList = useSelector((state) => state.productsList)
    const { loading, error, products } = productsList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <Container>
            <h1>Welcome to ProShop</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default HomeScreen
