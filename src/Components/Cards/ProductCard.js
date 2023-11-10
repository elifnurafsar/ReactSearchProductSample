import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import stars from '../../Images/stars.jpg';
import sunshine from '../../Images/sunshine.jpg';
import orange_yellow from '../../Images/orange_yellow.jpg';
import ReactCardFlip from 'react-card-flip';

function ProductCard(props) {
    const {id, name, category, description, price} = props;
    const [index, setIndex] = useState(false)
    const ChangeSide = (e) => {
        e.preventDefault()
        setIndex(!index) 
    }
    return (
        <div onClick={(e) => ChangeSide(e)}>
            <ReactCardFlip isFlipped={index} flipDirection="vertical">
                <Card border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: '32rem',  maxHeight: 350, margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                    <Card.Img style={{ width: "auto", maxHeight: "200px", padding: '5px' }} variant="top" src={orange_yellow}/>
                    <Card.Body>
                        <Card.Title style={{color: '#191970', fontWeight: 'bold'}}>{name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{color: '#e6e6fa'}}>{name}</ListGroup.Item>
                            <ListGroup.Item style={{color: '#87ceeb'}}>{category}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
             
                <Card border="secondary" style={{ width: '18rem',  maxWidth: 'auto', height: '32rem',  maxHeight: 350, margin: 15, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
                    <Card.Body>
                        <Card.Title style={{color: '#191970', fontWeight: 'bold',  padding: '10px'}}>{name}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{color: '#e6e6fa', marginTop: "5%"}}>{description}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </ReactCardFlip>
        </div>
    )
}

export default ProductCard;