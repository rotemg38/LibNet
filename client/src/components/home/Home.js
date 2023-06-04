import About from "./About";
import Contact from "./Contact";
import Footer from "../Footer";
import React from 'react';
import NewBooks from "./NewBooks";

function Home() {
    return (
        <>

            <header className="masthead text-center text-white" id="home">
                <div className="masthead-content">
                    <div className="container">
                        <h1 className="masthead-heading ">Welcome to your library</h1>
                        <h2 className="masthead-subheading ">Explore the world of books</h2>
                    </div>
                </div>
            </header>
            <About></About>
            <NewBooks></NewBooks>
            <Contact></Contact>
            <Footer></Footer>

        </>
    );
}

export default Home;