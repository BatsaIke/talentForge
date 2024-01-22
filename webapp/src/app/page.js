import Header from "@/component/header/Header"
import Login from "./(auth)/login/page"
import LandingPage from "@/component/pages/landingPage/LandingPage"
import Footer from "@/component/footer/Footer"
import YourComponent from "@/component/pages/landingPage/components/YourComponent"

const Home =()=>{
  return(
    <>
    <Header/>
    <LandingPage/>
         <Footer/> 
    </>
  )
}

export default Home