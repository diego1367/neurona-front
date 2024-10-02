import './App.css';
import sharedService from "../src/services/sharedService";
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: 0, nombre: "", valor: ""});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    sharedService.getAll()
      .then(response => {
        setProducts(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    sharedService.create(newProduct)
      .then(() => {
        fetchProducts();
        setNewProduct({ id:0, nombre: "", valor: "" });
      })
      .catch(e => {
        console.log(e);
      });
  };



  return (
    <Container className="my-4">
      <h3 className="text-center mb-4">Lista de Productos</h3>
      <Row className="justify-content-center">
        <Col md={8}>
          <Form className="mb-4">
            <Row>
              <Col>
                <Form.Group controlId="formNombre">
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    value={newProduct.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formValor">
                  <Form.Control
                    type="text"
                    placeholder="Precio"
                    name="valor"
                    value={newProduct.valor}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" onClick={addProduct} className="w-100">
                  Agregar Producto
                </Button>
              </Col>
            </Row>
          </Form>

          <ListGroup>
            {products.map((product) => (
              <ListGroup.Item key={product.id}>
                {product.nombre} - ${product.valor}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

