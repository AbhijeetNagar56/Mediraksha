import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        
        {/* === 1. Hero Section (Uses daisyui 'hero') === */}
        <section className="hero bg-base-200 py-16 sm:py-24">
          <div className="hero-content text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              {/* Highlight the main brand focus using primary color text (text-primary) */}
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-base-content">
                Bridging the Gap Between Care and <span className="text-primary">Patient</span>
              </h1>
              <p className="py-6 text-xl text-base-content/80">
                At **MediRaksha**, our mission is simple: to provide **fast, reliable, and secure** access to healthcare services when you need them most, leveraging technology to save time and lives.
              </p>
              <div className="mt-8">
                <a href="#our-values" className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition duration-300">
                  Discover Our Mission
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* === 2. Core Values/Pillars Section (Uses daisyui 'card') === */}
        <section id="our-values" className="py-16 sm:py-24 bg-base-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-4 text-base-content">Our Commitment</h2>
            <p className="text-center text-lg mb-12 text-base-content/70">
              MediRaksha is built on three core pillars that define our service.
            </p>
            
            {/* Grid for key pillars/features - Now using daisyui card for styling */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Pillar 1: Accessibility */}
              <div className="card shadow-xl bg-base-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-4">📍</div> {/* Icon Placeholder */}
                  <h3 className="card-title text-2xl">Real-Time Accessibility</h3>
                  <p className="text-base-content/80">
                    Instantly connect with nearby facilities. Our live tracking ensures timely and effective emergency response, reducing critical wait times.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">Location Based</div>
                  </div>
                </div>
              </div>

              {/* Pillar 2: Security */}
              <div className="card shadow-xl bg-base-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-4">🛡️</div> {/* Icon Placeholder */}
                  <h3 className="card-title text-2xl">Data Security & Privacy</h3>
                  <p className="text-base-content/80">
                    We prioritize patient trust. Secure authentication and encrypted file uploads mean your medical records are always protected and private.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">HIPAA Compliant</div>
                  </div>
                </div>
              </div>

              {/* Pillar 3: Efficiency */}
              <div className="card shadow-xl bg-base-200 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                <div className="card-body items-center text-center">
                  <div className="text-5xl text-primary mb-4">📄</div> {/* Icon Placeholder */}
                  <h3 className="card-title text-2xl">Digital Health Efficiency</h3>
                  <p className="text-base-content/80">
                    Seamless file uploads for medical reports eliminate paperwork, ensuring providers have vital information instantly for better decisions.
                  </p>
                  <div className="card-actions justify-end mt-4">
                    <div className="badge badge-outline">Paperless</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* === 3. Vision & Call to Action (Uses daisyui color 'primary' for background) === */}
        <section className="py-16 bg-primary text-primary-content">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold">Our Vision for the Future</h2>
                <p className="mt-4 text-xl max-w-4xl mx-auto opacity-90">
                    We envision a world where geographical barriers and complex logistics no longer hinder healthcare access. **MediRaksha** is continuously evolving, guided by technology, empathy, and an unwavering focus on the patient's well-being.
                </p>
                <div className="mt-8">
                    <button className="btn btn-primary btn-outline border-primary-content text-primary-content hover:bg-primary-content hover:text-primary hover:border-primary-content transition duration-300">
                        Join Our Healthcare Network
                    </button>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;