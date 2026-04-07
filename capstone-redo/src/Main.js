import About from './About.js'
import MyCard from './Card.js';
import MyTestimonial from './Testimonial.js';
import { Link } from 'react-router-dom';
import React from 'react';

function Main() {
    return (
        <main className='Main-Section'>
            <article className="hero-content">
                <div className='hero-header'>
                    <h1>Welcome to Little Lemon!</h1>
                    <h2>Chicago</h2>
                    <div className="hero-body">
                        <div className="hero-left">
                            <p className="hero-p">
                                We are a family owned Mediterranean restaurant, focused on traditional
                                recipes served with a modern twist.
                            </p>
                            <Link to="/reservations">
                                <button className="reservation-button">Reserve a Table</button>
                            </Link>
                        </div>

                        <img
                            src="./man-holding-platter.jpg"
                            alt="man holding a platter of food"
                            className="hero-img"
                        />
                    </div>
                </div>
            </article>


            {/* SPECIALS SECTION: */}
            <section className='specials-section'>
                <div className='specials-header'>
                    <h2 className='header'>This week's specials!</h2>
                    <Link to="/menu">
                        <button className="menu-button">Online Menu</button>
                    </Link>
                </div>

                <article className='specials-cards'>
                    <div className='special-card'>
                        <MyCard id={4}
                            imgSrc="/greek salad hidef.jpg"
                            imgAlt="Greek Salad"
                            title="Greek Salad"
                            text="The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                            price="$12.99" />
                    </div>
                    <div className="special-card">
                        <MyCard id={3}
                            imgSrc="/bruschetta hidef.jpg"
                            imgAlt="Bruschetta"
                            title="Bruschetta al Pomodoro"
                            text="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
                            price="$5.99" />
                    </div>
                    <div className="special-card">
                        <MyCard id={9}
                            imgSrc="/grilled fish hidef.jpg"
                            imgAlt="Grilled Fish"
                            title="Grilled Fish"
                            text="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
                            price="$25.99" />
                    </div>
                </article>
            </section>
            {/* TESTIMONIALS SECTION: */}
            <section className="testimonials-section">
                <div className="testimonials-header">
                    <h2>Here's what our customers are saying</h2>
                </div>
                <div className="testimonials-scroll">
                    <div className="testimonial-card">
                        <MyTestimonial imgSrc="/profile pic 1.jpg"
                            imgAlt="Customer 1"
                            name="Jacob R."
                            text="The food was absolutely wonderful, from preparation to presentation, very pleasing."
                            date="March 15, 2024"
                            rating={5} />
                    </div>
                    <div className="testimonial-card">
                        <MyTestimonial imgSrc="/profile pic 2.jpg"
                            imgAlt="Customer 2"
                            name="Sarah M."
                            text="Exceptional service and authentic Mediterranean flavors. This restaurant is a hidden gem. Will definitely come back!"
                            date="March 20, 2024"
                            rating={4} />
                    </div>
                    <div className="testimonial-card">
                        <MyTestimonial imgSrc="/profile pic 3.jpg"
                            imgAlt="Customer 3"
                            name="Elena L."
                            text="Amazing ambiance and delicious food. The staff was incredibly attentive and made our evening memorable."
                            date="March 25, 2024"
                            rating={5} />
                    </div>
                    <div className="testimonial-card">
                        <MyTestimonial imgSrc="/profile pic 4.jpg"
                            imgAlt="Customer 4"
                            name="Shai-Leung X."
                            text="Family-owned restaurant with heart and soul. Every dish tells a story of tradition and passion. Highly recommend!"
                            date="April 5, 2024"
                            rating={4} />
                    </div>
                </div>
            </section>
            {/* ABOUT SECTION: */}
            <About className="about-section-main"/>

        </main >
    );
}

export default Main;