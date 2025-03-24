import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-pg-blue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 432.071 445.383" className="w-full h-full">
                  <g>
                    <path 
                      fill="#FFFFFF" 
                      d="M403.77,223.92c0,0-19.54,84.06-17.79,119.41s13.64,68.62,13.64,68.62l-154.54-5.37l-79.43-145.73
                      l79.43-145.73l154.54-5.38c0,0-11.89,33.27-13.64,68.62S403.77,223.92,403.77,223.92z"/>
                    <path 
                      fill="#FFFFFF" 
                      d="M216.04,36.75c-103.57,0-187.5,83.93-187.5,187.5c0,103.57,83.93,187.5,187.5,187.5
                      c37.93,0,73.24-11.25,102.76-30.62c-0.87-3.34-1.88-6.34-2.81-8.96c-4.58-12.93-9.93-12.1-9.93-12.1l-8.23,3.52l-6.17-4.11
                      c-11.63-7.28-47.94-58.46-47.94-58.46s-7.04-9.87,4.7-10.58c9.87-0.59,21.16,5.87,21.16,5.87l42.35,26.75c0,0,6.35,3.67,6.47,7.63
                      c0.12,3.96,2.93,6.35,2.93,6.35s5.06-0.47,8.71-4.19c0.18-0.18,0.37-0.37,0.55-0.56c-26.17,21.66-59.82,34.64-96.55,34.64
                      c-83.27,0-150.73-67.46-150.73-150.73S132.77,73.52,216.04,73.52c83.27,0,150.73,67.46,150.73,150.73
                      c0,16.37-2.62,32.13-7.43,46.9c0.27-0.53,0.53-1.06,0.79-1.59c0,0,5.87-9.4,6.76-17.93c0.88-8.52-0.59-25.46-0.59-25.46
                      s3.23-38.03,2.35-53.51c-0.88-15.49-0.88-47.35-0.88-47.35s-0.59-51.16-7.04-71.44c-6.46-20.28-31.4-41.45-31.4-41.45
                      S304.14,36.75,216.04,36.75z"/>
                  </g>
                </svg>
              </div>
              <span className="text-xl font-bold">PostgreSQL Performance Farm</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-pg-orange-light font-medium">
              Home
            </Link>
            <a href="https://www.postgresql.org/docs/" className="text-white hover:text-pg-orange-light font-medium" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
            <a href="https://www.postgresql.org/community/" className="text-white hover:text-pg-orange-light font-medium" target="_blank" rel="noopener noreferrer">
              Community
            </a>
            <a href="https://github.com/postgres/postgres" className="text-white hover:text-pg-orange-light font-medium" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 