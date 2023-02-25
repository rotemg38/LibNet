
import About from "./About";
import Contact from "./Contact";
//import "./styles.css"
//import "./stylesHome.css"
//import "./homeStyle.css"
import CommonBooks from "./CommonBooks";
import Footer from "../Footer";


function Home() {
    return (
        <>
            
            <header className="masthead text-center text-white" id="home">
                <div className="masthead-content">
                    <div className="container">
                        <h1 className="masthead-heading ">Welcome to your library</h1>
                        <h2 className="masthead-subheading ">Explore the world of books</h2>
                        {/*<a className="btn btn-primary btn-xl rounded-pill mt-5" href="#scroll">Learn More</a>*/}
                    </div>
                </div>
            </header>
            <About></About>
            <CommonBooks></CommonBooks>
            <Contact></Contact>
            <Footer></Footer>
            
        </>
    );
  }
  
  export default Home;