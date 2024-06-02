import React from "react";
import "./Footer.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading px-4">
          Get exclusive updates! Subscribe to our newsletter now.
        </p>
        <p className="text-white/80 mt-2 text-xs md:text-sm">Unsubscribe at any time.</p>
        <div className="mt-4 mx-auto max-w-max">
          <form className="flex">
            <input
              className="rounded-l text-gray-800 py-2 px-3 placeholder:text-base outline-none max-w-64"
              name="email"
              type="email"
              placeholder="john@example.com"
            />
            <button type="submit" className="cursor-pointer bg-transparent text-xs sm:text-base px-4 py-2 text-white hover:text-white/90 font-bold rounded-r outline-none border border-white">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <section className="container mx-auto px-4 md:px-8 lg:px-12 my-10 lg:py-4">
        <div className="xl:max-w-xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          <div className="text-white">
            <h2 className="font-semibold text-2xl">About Us</h2>
            <ul className="text-gray-300 mt-1 sm:mt-4">
              <li>
                <Link to="/sign-up">How it works</Link>
              </li>
              <li>
                <Link to="/">Testimonials</Link>
              </li>
              <li>
                <Link to="/">Careers</Link>
              </li>
              <li>
                <Link to="/">Investors</Link>
              </li>
              <li>
                <Link to="/">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="text-white">
            <h2 className="font-semibold text-2xl">Contact Us</h2>
            <ul className="text-gray-300 mt-1 sm:mt-4">
              <li>
                <Link to="/">Contact</Link>
              </li>
              <li>
                <Link to="/">Support</Link>
              </li>
              <li>
                <Link to="/">Destinations</Link>
              </li>
              <li>
                <Link to="/">Sponsorships</Link>
              </li>
            </ul>
          </div>
          <div className="text-white">
            <h2 className="font-semibold text-2xl">Social Media</h2>
            <ul className="text-gray-300 mt-1 sm:mt-4">
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
              <li>
                <Link to="/">Youtube</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              SPORTS BETS
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className="font-semibold text-white">
            SPORTS BETS © {new Date().getFullYear()}
          </small>
          <div className="social-icons">
            <Link
              className="social-icon-link facebook"
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className="social-icon-link instagram"
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className="social-icon-link twitter"
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
