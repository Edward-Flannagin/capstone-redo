import Card from 'react-bootstrap/Card';

const MenuCard = ({ imgSrc, imgAlt, title, text, price }) => {
  return (
    <Card className='little-lemon-menu-card'>
      <Card.Img variant="top" src={imgSrc} alt={imgAlt} width={400} height="200px" style={{ objectFit: 'cover' }} />

      <Card.Body>
        <div className='menu-card-title-price'>
          <Card.Title className='menu-card-title'>{title}</Card.Title>
          <Card.Subtitle className='menu-card-price'>{price}</Card.Subtitle>
        </div>
          <Card.Text className='item-text'>
            {text}
          </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MenuCard;