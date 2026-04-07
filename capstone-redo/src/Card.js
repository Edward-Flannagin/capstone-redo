import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';

const MyCard = ({ id, imgSrc, imgAlt, title, text, price }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    const item = {
      id,
      title,
      price,
      text,
      imgSrc,
      imgAlt,
    };
    addToCart(item);
    navigate('/order-online');
  };

  return (
    <Card style={{ width: 'fit-content', height: '500px' }} className='little-lemon-card'>
      <Card.Img variant="top" src={imgSrc} alt={imgAlt} width={400} height={300} style={{ objectFit: 'cover' }} />

      <Card.Body className='card-body'>
        <div className='card-title-price'>
          <Card.Title className='card-title'>{title}</Card.Title>
          <Card.Subtitle className='card-price'>{price}</Card.Subtitle>
        </div>
        <Card.Text>
          {text}
        </Card.Text>
        <div className='card-button-container'>
            <Button className='little-lemon-button' variant="primary" onClick={handleOrderClick}>Order a Delivery</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCard;