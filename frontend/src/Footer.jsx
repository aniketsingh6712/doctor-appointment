import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex space-x-6 mb-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaXTwitter className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://github.com/aniketsingh6712" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.linkedin.com/in/aniket-singh-872284227" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaLinkedin className="text-2xl hover:text-gray-400" />
          </a>
        </div>
        <p className="text-sm text-white">&copy; 2025 Doc on Click, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;