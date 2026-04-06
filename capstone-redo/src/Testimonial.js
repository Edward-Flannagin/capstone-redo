import Card from 'react-bootstrap/Card';

const renderStars = (rating) => {
  const maxStars = 5;
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(maxStars - rating);

  return filledStars + emptyStars;
};

function MyTestimonial({ imgSrc, imgAlt, name, text, date, rating }) {
    return (
        <Card className='testimonial-card-inner'>
            <div className='testimonial-card-content'>
                <Card.Img variant="top" src={imgSrc} alt={imgAlt} className='testimonial-image' />
                
                <Card.Body className='testimonial-body'>
                    <div className='customer-name'>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className='testimonial-date'>{date}</Card.Subtitle>
                    </div>
                    <div className="rating">
                        <Card.Subtitle className='customer-rating'>{renderStars(rating)}</Card.Subtitle>
                    </div>
                    <Card.Text>
                        {text}
                    </Card.Text>
                </Card.Body>
            </div>
        </Card>
    );
}

export default MyTestimonial;