
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="top-bar">
          <h1 className="logo">Medi Raksha</h1>
          <nav className="main-nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contactus">Contact</a></li>
            </ul>
          </nav>
          <div className="auth-links">
            <a href="/signup" className="btn">Sign Up</a>
            <a href="/login" className="btn login">Log In</a>
          </div>
        </div>
      </header>

      <main>
        <section>
          <div className="slider">
            <div className="slides">
              <img src="/24821.jpg" className="slide" alt="Slide 1" />
              <img src="/5840340.jpg" className="slide" alt="Slide 2" />
              <img src="/24816.jpg" className="slide" alt="Slide 3" />
            </div>
            <button className="prev">&#10094;</button>
            <button className="next">&#10095;</button>
          </div>
        </section>

        <section>
          <div className="container">
            <Card
              image="https://www.gigadocs.com/blog/wp-content/uploads/2019/12/Technology-Makes-It-Easy-To-Consult-The-Doctor-Of-Your-Choice.png"
              title="Book Appointment"
              text="If you are sick or need to see a doctor, we can help you. Just click the button below to book an appointment. We will fix a time for you to meet the doctor. If you need help, ask someone near you or call us. We are here for you."
              link="/bookappointment"
              buttonText="Book Now"
            />
            <Card
              image="https://hackread.com/wp-content/uploads/2023/10/artificial-intelligence-healthcare-chatgpt-boy-diagnosis-1024x597.jpg"
              title="AI Diagnosis"
              text="Not feeling well? Tell us your symptoms. Our smart computer (AI) will try to understand what might be wrong. It helps you know if you need to see a doctor. Easy, fast, and safe. If you don’t understand, ask someone to help."
              link="/aidiagnosis"
              buttonText="Try Now"
            />
            <Card
              image="https://t4.ftcdn.net/jpg/14/06/78/55/240_F_1406785579_DMtJNNT7KHYS7Wbv2rlLiIUdLlx24wKn.jpg"
              title="Emergency"
              text="If it is very serious — like chest pain, heavy bleeding, or someone is not breathing — this is an emergency. Call for help right away or go to the hospital. You can also press the button below to get fast help."
              link="/emergency"
              buttonText="Call Help"
            />
            <Card
              image="https://media.sciencephoto.com/image/f0429781/800wm/F0429781-Doctor_checking_on_male_patient.jpg"
              title="Live Bed Check"
              text="Need a bed in the hospital? Use this to see which hospitals have empty beds right now. You can find a place for treatment faster. If you need help, ask someone or call us."
              link="/livebedcheck"
              buttonText="Check Status"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Medi Raksha</h3>
            <p>&copy; 2025 | All Rights Reserved</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/aboutus">About Us</a></li>
              <li><a href="/contactus">Contact</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/faqs">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@mediraksha.com</p>
            <p>Phone: +91-98765-43210</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Card = ({ image, title, text, link, buttonText }) => (
  <div className="item">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{text}</p>
    <a href={link}>{buttonText}</a>
  </div>
);

export default App;
