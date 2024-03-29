import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import "./BottomBar.scss";

// const THEME = createTheme({
//   typography: {
//     useNextVariants: true,
//     fontSize: 20,
//     fontFamily: ['"Open Sans"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(
//       ","
//     ),
//   },
//   spacing: {
//     unit: 8,
//   }
// });

function Footer() {
  return (
    <Box className="footer_box">
      <Container className="footer_column">
        {/* <ThemeProvider theme={THEME}> */}
          <Typography variant="h6" color="inherit" align="center">
            Mission
          </Typography>
        {/* </ThemeProvider> */}

        <ul className="footer_list">
          <p>
            We are committed to providing affordable and quality notes to
            students, working professionals, and teachers.
          </p>
        </ul>
      </Container>

      <Container className="footer_column">
        {/* <ThemeProvider theme={THEME}> */}
          <Typography variant="h6" color="inherit" align="center">
            COMPANY
          </Typography>
        {/* </ThemeProvider> */}

        <ul className="footer_list">
          <li>
            <Link to="/about" className="footer_list_items">
              About
            </Link>
          </li>
          <li>
            <Link to="/career" className="footer_list_items">
              Career
            </Link>
          </li>
          <li>
            <Link to="/support" className="footer_list_items">
              Support
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="footer_list_items">
              Pricing
            </Link>
          </li>
          <li>
            <Link to="/faq" className="footer_list_items">
              FAQ
            </Link>
          </li>
        </ul>
      </Container>

      <Container className="footer_column">
        {/* <ThemeProvider theme={THEME}> */}
          <Typography variant="h6" color="inherit" align="center">
            RESOURCES
          </Typography>
        {/* </ThemeProvider> */}

        <ul className="footer_list">
          <li>
            <Link to="/blog" className="footer_list_items">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/help" className="footer_list_items">
              Help
            </Link>
          </li>
          <li>
            <Link to="/terms" className="footer_list_items">
              Terms
            </Link>
          </li>
        </ul>
      </Container>

      <Container className="footer_column">
        {/* <ThemeProvider theme={THEME}> */}
          <Typography variant="h6" color="inherit" align="center">
            Social Media
          </Typography>
        {/* </ThemeProvider> */}

        <ul className="footer_list">
          <IconContext.Provider
            value={{
              color: "white",
              size: 30,
              verticalAlign: "middle",
            }}
          >
            <li>
              <Link to="#" className="footer_list_items">
                Facebook{" "}
              </Link>
              <FaFacebook />
            </li>
            <li>
              <Link to="#" className="footer_list_items">
                GitHub{" "}
              </Link>
              <FaGithub />
            </li>
            <li>
              <Link to="#" className="footer_list_items">
                Instagram{" "}
              </Link>
              <FaInstagram />
            </li>
            <li>
              <Link to="#" className="footer_list_items">
                LinkedIn{" "}
              </Link>
              <FaLinkedin />
            </li>
          </IconContext.Provider>
        </ul>
      </Container>
    </Box>
  );
}

export default Footer;
