function About() {

  return (
    <section className="about-section">
      <div className="about-content">
        <h2 style={{ color: "#F4CE14" }}>About Little Lemon</h2>
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
    </section>
  );
}

export default About;