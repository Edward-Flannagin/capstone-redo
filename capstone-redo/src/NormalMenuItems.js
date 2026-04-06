import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';


function NormalMenuItems({ imgSrc, imgAlt, title, text, price, reverse }) {
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
                    {/* <div className='norm-button-container'>
                        <Button className='little-lemon-menu-button' variant='primary'>Tap to view or order </Button>
                    </div> */}
                </Card.Body>

            </div>
        </Card>
    );
}

export default NormalMenuItems;