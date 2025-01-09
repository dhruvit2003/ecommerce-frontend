import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Container } from 'react-bootstrap'
import Rating from '../Rating'
import axios from 'axios'
// import { Loader } from '../Loader'
// import { Message } from '../Message'


export const ProductScreen = () => {
  const { id } = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`/api/product/${id}`)
      setProduct(data)
    }
    fetchProducts()
  }, [])


  return (
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>
        {/* {loading?( */}
        {/* <Loader/> */}
        {/* ): error?( */}
        {/* <Message variant='danger'>{error}</Message> */}
        {/* ):( */}
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.product_name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.num_reviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Brand: {product.product_brand} </ListGroup.Item>

              <ListGroup.Item>Description: {product.product_info}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price} Rs</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stock_count > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className='btn-block btn-success' disabled={product.stock_count === 0} type='button'>Add to Cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )

}

export default ProductScreen