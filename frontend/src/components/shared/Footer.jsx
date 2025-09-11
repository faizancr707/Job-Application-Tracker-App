import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#00040A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */ }
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">About HireHub</h3>
            <p className="text-gray-400">
              Connecting talented professionals with innovative companies worldwide.
            </p>
          </div>
          {/* Quick Links Section */ }
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="hover:text-[#535bf2] transition">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-[#535bf2] transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#535bf2] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#535bf2] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources Section */ }
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="hover:text-[#535bf2] transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#535bf2] transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#535bf2] transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          {/* Connect With Us Section */ }
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#535bf2]">Connect With Us</h3>
            <div className="flex space-x-4">
              
              
              <a href="https://faizan-alam-sde-portfolio.vercel.app/" className="hover:text-[#535bf2] transition" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>

              <a href="https://www.linkedin.com/in/faizan-alam-06897a20b/" className="hover:text-[#535bf2] transition" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>

              <a href="https://www.instagram.com/in/faizanalamasharafi/" className="hover:text-[#535bf2] transition" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>

            </div>
          </div>
        </div>
        {/* Footer Bottom */ }
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            Developer : Faizan Alam
            © { new Date().getFullYear() } HireHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}