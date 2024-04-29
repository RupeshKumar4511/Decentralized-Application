const Footer =() => {
    const porductList =["Market","ERC20 Token","Donation"];
    const contactList =[
"support@cryptoking.com",
"info@example.com",
"Contact us"];

const usefullLink =["Home","About Us","Company Bio"];

return(
    <footer className = "text-center text-white backgroundMain lg:text-left">
        <div className ="mx-6 py-10 text-center md:text-left">
            <div className ="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className ="">
                    <h6 className = "md-4 flex items-center justify-center font-semibold upppercase md:justify-start">
                        Crypto King </h6>
                        <p>Here you can donate cryptocurrency to different campaign.</p>
                </div>
                <div className =""> 
                <h6 className ="md-4 flex justify-center font-semibold upppercase md:justify-start">
                    Product 
                    </h6>

                    {
                        porductList.map((el,i) => (
                            <p className ="mb-4" key= {i + 1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))
                    }
                </div>
                <div className ="">
                <h6 className ="md-4 flex justify-center font-semibold upppercase md:justify-start">
                    Useful links
                    </h6>
                    {
                        usefullLink.map((el,i) =>
                        (
                            <p className = "mb-4" key={i+1}>
                                <a href="#!">{el}</a>
                            </p>
                        ))
                    }
                </div>
                <div>
                  <h6 className = "mb-4 flex justify-center font-semibold uppercase md:justify-start">
                    Contact</h6>  
                    {contactList.map((el,i) => (
                        <p className ="mb-4" key ={i+1}>
                            <a href="#!">{el}</a>
                        </p>
                    )
                
                )}
                </div>
            </div>
        </div>
        <div className = "backgroundMain p-6 text-center">
            <span>&copy; 2024 Copyright: </span>
            <a className = "font-semibold " href="https://tailWind-elements.com/">
                Crypto King
            </a>
        </div>
    </footer>
);
};
export default Footer;
