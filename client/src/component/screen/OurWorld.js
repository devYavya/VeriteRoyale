import React from 'react';
import '../style/OurWorld.css';
// import newArrivalsData from '../../Data/newArrivalsData'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import intro from "../img/usbg.mp4";
import us from "../img/us.mp4";

const NewArrivals = () => {

  // const tok = localStorage.getItem('token');

  return (
    <div className="new-arrivals-container">
      {/* Video section */}
      <div className="video-section">
        <video id="background-video" autoPlay loop muted>
          <source src={us} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>

      {/* Product Cards section */}
      <div className="our-world">
        <section className="intro">
          <h2>Who We Are</h2><br/>
          <p>VÉRITÉ ROYALE is a luxury perfume brand that embodies the essence of bespoke beauty.
             With a focus on creating enchanting scents that captivate and charm, this brand is 
             dedicated to providing high-quality, unique fragrances that are both alluring and sophisticated.</p><br/><br/>

           <h3> About VÉRITÉ ROYALE </h3> <br/>
           <p> VÉRITÉ ROYALE is a luxury perfume brand that is committed to excellence in every aspect of its products. 
            From the carefully selected ingredients to the exquisite packaging, every detail is meticulously crafted to 
            provide an unparalleled sensory experience. </p> <br/><br/>

           <h3> Our Philosophy </h3> <br/>
            <p> At VÉRITÉ ROYALE, we believe that perfume is an art form that has the power to evoke emotions,
               spark memories, and create connections. Our mission is to craft fragrances that not only smell 
               exquisite but also tell a story, evoke a feeling, and leave a lasting impression. </p><br/><br/>

            {/* Join the VÉRITÉ ROYALE Community
            Join our community of perfume connoisseurs and stay up-to-date on the latest news, trends, and releases from VÉRITÉ ROYALE. Follow us on social media, sign up for our newsletter, or visit our website to learn more about our brand and our products.

            Contact Us
            If you have any questions, comments, or feedback, please don't hesitate to contact us. We would be delighted to hear from you and to help you find the perfect fragrance to suit your taste and style.

            Email: info@veriteroyale.com Phone: +1 (555) 123-4567 Address: 123 Main St, Anytown, USA 12345

            Follow Us
            Facebook: @veriteroyale Instagram: @veriteroyale Twitter: @veriteroyale Pinterest: @veriteroyale

            Subscribe to Our Newsletter
            Stay up-to-date on the latest news, trends, and releases from VÉRITÉ ROYALE. Subscribe to our newsletter today and receive exclusive offers, promotions, and discounts.

            Subscribe Now

            Visit Our Website
            Learn more about VÉRITÉ ROYALE and our products by visiting our website.

            <p>Visit Our Website</p> */}
        </section>

        <section className="production">
          <h2>How We Produce Fragrances</h2><br/><br/>
          <h3>Our Fragrances</h3> <br/>
          <p>Our fragrances are designed to be worn and enjoyed, not just smelled. 
            We use only the finest ingredients, sourced from around the world, to 
            create unique and complex scents that are both alluring and sophisticated. 
            From floral and feminine to woody and oriental, our fragrances are designed 
            to appeal to a wide range of tastes and preferences.</p><br/>

          <h3>Our Commitment to Quality</h3><br/>
          <p>At VÉRITÉ ROYALE, we are committed to quality in every aspect of our products.
             We use only the finest ingredients, carefully selected for their quality and purity, 
             and we adhere to the highest standards of craftsmanship and attention to detail. 
             Our fragrances are designed to last, not just to smell good for a few hours, 
             but to provide a lasting impression that will leave you feeling confident and beautiful.</p><br/>
        </section>

        <section className="nature">
          <h2>Using Nature</h2>
          <p>We harness the power of nature to create fragrances that are not only delightful but also eco-friendly.</p>
        </section>

        <section className="video">
          <h2>Watch Our Process</h2>
          <iframe
            title="Fragrance Production"
            width="560"
            height="315"
            src={intro}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </section>
      </div>

    </div>
  );
};

export default NewArrivals;
