import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';

function NormalMenuItems({ id, imgSrc, imgAlt, title, text, price, reverse }) {
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
        <Card className={`norm-menu-card-inner ${reverse ? 'reverse' : ''}`}>
            <div className='norm-menu-card-content'>

                <img
                    src={imgSrc}
                    alt={imgAlt}
                    className='menu-item-image'
                />

                <Card.Body className='norm-menu-body'>
                    <div className='dish-name'>
                        <Card.Title className='dish-title'>{title}</Card.Title>
                        <Card.Subtitle className='norm-menu-item-price'>{price}</Card.Subtitle>
                    </div>

                    <Card.Text className='norm-item-text'>
                        {text}
                    </Card.Text>
                    <div className='norm-button-container'>
                        <Button className='little-lemon-button' variant='primary' onClick={handleOrderClick}>Order a Delivery</Button>
                    </div>
                </Card.Body>

            </div>
        </Card>
    );
}

export default NormalMenuItems;