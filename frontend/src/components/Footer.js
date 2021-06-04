import React from "react";
import {Container, Col, Row} from "react-bootstrap";

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className={'text-center py-3'}>
                        Copyright <i className="fas fa-copyright"></i> Nitesh Ramola
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer