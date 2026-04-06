import NormalMenuItems from '../NormalMenuItems.js';

function AboutPage() {
    return (
        <div>
            <section className="about-page-top">
                <article className="about-page-section">
                    <div className="about-page-content">
                        <h1 style={{ color: "#F4CE14" }}>About Little Lemon</h1>
                        <div className="about-body">
                            <article style={{ flex: "1 1 clamp(250px, 50vw, 500px)" }}>
                                <p className="p1">
                                    Little Lemon offers a taste of the Mediterranean right in the heart of Chicago,
                                    bringing to you generations of our family's recipes and a warm, inviting atmosphere
                                    to our cherished community. As a proud family-owned establishment, we are dedicated to
                                    sharing our heritage through honest, flavorful cooking, using fresh ingredients and
                                    time-honored techniques passed down through our family, the Petrakis. We believe dining
                                    should be an experience that nourishes the soul as much as the body, and we pour our
                                    heart into creating a welcoming space where guests feel like family from the moment
                                    they walk through our door.
                                </p>
                                <p className="p1">
                                    Little Lemon is the culinary dream of our family. Elias, our head chef and
                                    brother, crafts our moussaka and souvlaki perfectly using our grandmother
                                    Eleni's exact recipes. Elias' wife, Maria, ensures every guest is greeted with the
                                    warmth and hospitality central to our culture. Together with our children,
                                    Sofia and Niko, we run our restaurant as an extension of our own lively
                                    household. Our goal is simple: to make every person who dines with us feel the
                                    embrace of Mediterranean generosity and leave with a full stomach and a happy heart.
                                </p>
                            </article>
                            <div className="about-images">
                                <div className="about-images-stack">
                                    <img src="/little lemon chef possibility.jpg" alt="Elias Petrakis, head chef of Little Lemon" className="elias-image" />
                                    <img src="/little lemon chef possibility 2.jpg" alt="Shamia Petrakis, younger brother and chef of Little Lemon" className="shamia-image" />
                                </div>
                                {/* FOOTNOTES */}
                                <p className="about-footnote">
                                    Elias Petrakis (left) and Shamia Petrakis (right).
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <section className="about-page-mission-vision">
                    <article className='about-mission'>
                        <h2>Our Mission</h2>
                        <p>
                            At Little Lemon, our mission is to provide an authentic Mediterranean dining experience that celebrates the rich flavors and vibrant culture of the region. We are committed to using fresh, locally-sourced ingredients to create dishes that are not only delicious but also nourishing. Our goal is to create a warm and welcoming atmosphere where guests can gather to enjoy great food, share stories, and make lasting memories.
                        </p>
                    </article>
                    <article className='about-vision'>
                        <h2>Our Vision</h2>
                        <p>
                            Our vision at Little Lemon is to be recognized as a leading Mediterranean restaurant that sets the standard for culinary excellence and hospitality. We aspire to expand our reach within the community and beyond, sharing our passion for Mediterranean cuisine with a wider audience. Through innovation, sustainability, and a dedication to quality, we aim to create a dining experience that not only delights the palate but also fosters a sense of connection and belonging among our guests.
                        </p>
                    </article>
                </section>
            </section>

            {/* More about the company and the team */}
            <section className="about-page-team">
                <article className='norm-menu-items'>
                    <h2>Meet Our Team</h2>
                    <div className='norm-menu-list'>
                        <NormalMenuItems
                            imgSrc="./little lemon chef possibility.jpg"
                            imgAlt="Elias"
                            title="Elias Petrakis - Head Chef"
                            text="Elias is our head chef with over 20 years of experience in Mediterranean cuisine. His passion for fresh ingredients and bold flavors is evident in every dish he creates."
                            price=""
                        />
                    </div>
                    <div className='norm-menu-list'>
                        <NormalMenuItems
                            imgSrc="./maria.jpg"
                            imgAlt="Maria"
                            title="Maria Petrakis - Hospitality Manager"
                            text="Maria ensures that every guest feels at home at Little Lemon. With her warm hospitality and attention to detail, she makes dining with us a memorable experience."
                            price=""
                        />
                    </div>
                    <div className='norm-menu-list'>
                        <NormalMenuItems
                            imgSrc="./sofia.jpg"
                            imgAlt="Sofia"
                            title="Sofia Petrakis - Pastry Chef"
                            text="Sofia brings a sweet touch to our menu with her delectable Mediterranean desserts. Her creations are the perfect ending to any meal."
                            price=""
                        />
                    </div>
                    <div className='norm-menu-list'>
                        <NormalMenuItems
                            imgSrc="./niko.jpg"
                            imgAlt="Niko"
                            title="Niko Petrakis - Restaurant Manager"
                            text="Niko oversees the daily operations of Little Lemon. His leadership and dedication ensure that every aspect of our restaurant runs smoothly."
                            price=""
                        />
                    </div>
                </article>
            </section>
        </div>

    );
}

export default AboutPage;