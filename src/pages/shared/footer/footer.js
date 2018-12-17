import React, { Component } from 'react';
import './footer.sass';

class Footer extends Component {
  render() {
    return (
        <div className="footer">
        <div className="auther">
          <p>Coded By <span>Eslam Sameh</span> </p>
        </div>
        <div className="auther-links">
          <div>
              <a href="https://www.facebook.com/thekiller.eslam"><i className="fa fa-facebook"></i></a>
        
          </div>
          <div>
              <a href="https://www.linkedin.com/in/eslam-sameh-0b1093155/"><i className="fa fa-linkedin"></i></a>
        
          </div>
          <div>
              <a href="https://twitter.com/EslamSameh1993"><i className="fa fa-twitter"></i></a>
        
          </div>
        
        </div>
        </div>
        
    );
  }
}

export default Footer;
