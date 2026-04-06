import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const MyCard = ({ imgSrc, imgAlt, title, text, price }) => {
  return (
    <Card style={{ width: '22rem' }} className='little-lemon-card'>
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
            <Button className='little-lemon-button' variant="primary">Order a Delivery</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCard;