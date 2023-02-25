
function About() {
    return (
           <> 
        <section className="page-section" id="services">
            <br/>
            <br/>
        <div className="container">
            <div className="text-center">
                <h1 className="section-heading text-uppercase">A little about us...</h1>
            </div>
            <br/>
            <br/>
            <div className="row text-center">
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-search fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="my-3">Books Catalogue</h4>
                    <p className="text-muted">Catalogue full of books from all kinds with advanced search</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-book fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="my-3">Smart Book Recommendation</h4>
                    <p className="text-muted">Smart algorithm of book recommendation, our library will show you the books you might love</p>
                </div>
                <div className="col-md-4">
                    <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-comments fa-stack-1x fa-inverse"></i>
                    </span>
                    <h4 className="my-3">Social Library</h4>
                    <p className="text-muted">Easy to connect with other book lovers and get social with your community </p>
                </div>
            </div>
        </div>
        </section>

    

        </>
        

  );
}

export default About;