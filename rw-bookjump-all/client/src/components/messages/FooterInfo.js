import React from "react";
import {Divider} from "semantic-ui-react"
// import PropTypes from "prop-types";

const FooterInfo = () => (
  <div>
    <Divider inverted section />
    <footer style={{'textAlign': 'center'}}>
    	rwoj <b>©</b> 2017 - for books selection powered by goodreads <b>©</b>
    </footer>
  </div>
);

// MainPageInfo.propTypes = {
//   text: PropTypes.string.isRequired
// };

export default FooterInfo;
