
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='w-[80%] bg-base-300 p-4 justify-self-center my-5'>
        <h1 className='font-bold'>About Us</h1>
        <p>MediRaksha is a smart healthcare platform designed to connect patients with nearby hospitals and medical facilities in real time. With features like live location tracking, file uploads for medical reports, and secure authentication, MediRaksha ensures timely access to healthcare when it’s needed most. Our goal is to bridge the gap between patients and healthcare providers through technology that is fast, reliable, and easy to use.</p>
      </div>
      <Footer />
    </div>
  )
}

export default About