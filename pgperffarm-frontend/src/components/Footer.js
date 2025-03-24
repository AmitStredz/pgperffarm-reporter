import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-pg-blue text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Performance Farm</h3>
            <p className="text-gray-300 text-sm">
              The PostgreSQL Performance Farm is a dashboard for reviewing performance test results across different PostgreSQL versions and configurations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.postgresql.org/docs/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://www.postgresql.org/support/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Support
                </a>
              </li>
              <li>
                <a href="https://wiki.postgresql.org/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Wiki
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.postgresql.org/community/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Community
                </a>
              </li>
              <li>
                <a href="https://www.postgresql.org/community/events/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Events
                </a>
              </li>
              <li>
                <a href="https://www.postgresql.org/mailing-lists/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Mailing Lists
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Development</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/postgres/postgres" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.postgresql.org/developer/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  Developer Central
                </a>
              </li>
              <li>
                <a href="https://commitfest.postgresql.org/" className="text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
                  CommitFest
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-600 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-300 mb-4 sm:mb-0">
            Copyright © {currentYear} PostgreSQL Global Development Group
          </div>
          <div className="flex space-x-4">
            <a href="https://www.postgresql.org/about/privacy/" className="text-sm text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="https://www.postgresql.org/about/policies/" className="text-sm text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
              Code of Conduct
            </a>
            <a href="https://www.postgresql.org/about/" className="text-sm text-gray-300 hover:text-white transition duration-300" target="_blank" rel="noopener noreferrer">
              About PostgreSQL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 