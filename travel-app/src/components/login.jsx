import { useState, useEffect } from 'react';

const slides = [
  {
    image: '/assets/images/Loginslider1.jpeg',
    title: 'Discover new places',
    subtitle: 'Explore beautiful destinations worldwide.',
  },
  {
    image: '/assets/images/Loginslider2.jpeg',
    title: 'Experience the thrill',
    subtitle: 'Adventure awaits you beyond horizons.',
  },
  {
    image: '/assets/images/Loginslider3.jpeg',
    title: 'Create unforgettable memories',
    subtitle: 'Travel with people who vibe with your soul.',
  },
];

export default function Login({ onSignUpClick, onBackToLanding, onLoginSuccess }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      alert('Please fill in both fields');
      return;
    }

    if (!agreed) {
      setError('Please agree to the terms and conditions');
      alert('Please agree to the terms and conditions');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Invalid email or password') {
          alert('Invalid email or password');
        } else {
          alert(data.message || 'Login failed');
        }
        setError(data.message || 'Login failed');
        return;
      }

      // Note: localStorage is not available in this environment
      // localStorage.setItem('authToken', data.token);
      alert("Login successful");
      onLoginSuccess(); // callback or redirect
    } catch (err) {
      console.error(err);
      alert('Server error');
      setError('Server error');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  }

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-r from-[#EC8E3D] to-[#6F93AD] overflow-hidden md:overflow-hidden sm:overflow-y-auto">
      {/* Left slider section */}
      <div className="w-full md:w-1/2 h-[655px] sm:h-[400px] md:h-auto relative overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={`${slide.image}?auto=format&fit=crop&w=900&q=80`}
              alt={slide.title}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 ease-in-out"
              style={{ transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)' }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 flex flex-col justify-center items-start p-6 sm:p-10 md:p-16 text-white">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg transform translate-y-4 opacity-0 transition-all duration-1000 ease-out"
                  style={{ transform: index === currentSlide ? 'translateY(0)' : 'translateY(4rem)', opacity: index === currentSlide ? 1 : 0 }}>
                {slide.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl max-w-sm drop-shadow-md transform translate-y-4 opacity-0 transition-all duration-1000 delay-300 ease-out"
                 style={{ transform: index === currentSlide ? 'translateY(0)' : 'translateY(4rem)', opacity: index === currentSlide ? 1 : 0 }}>
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Swipe Up Indicator - Mobile Only */}
        <div className="absolute bottom-4 w-full flex justify-center sm:hidden z-20">
          <div className="flex flex-col items-center text-white text-sm animate-bounce">
            <span className="mb-1">Swipe Up</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7 7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right login section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 md:p-16 relative">
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20 animate-fade-in relative overflow-hidden group">
          {/* Glass reflection effect */}
          <div className="absolute -inset-[500px] bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45 translate-x-[1000px] group-hover:translate-x-[-1000px] transition-transform duration-1500 ease-in-out"></div>

          {/* Back button */}
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Back to landing page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 text-center drop-shadow-lg">
            Welcome to
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#FCCB6E] to-[#EE9C8F]">
            NomadNova
          </h2>

          <p className="text-white mt-3 mb-8 text-center font-medium">
            Login or Sign up to start your adventure
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 transition-all duration-300 rounded-xl py-3 mb-5 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src="\assets\images\Google__G__logo.svg.webp"
              alt="Google icon"
              className="w-6 h-6 mr-3"
            />
            <span className="text-gray-800 font-semibold">Continue with Google</span>
          </button>

          <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl py-3 mb-8 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-white">
            <svg
              xmlns="\assets\images\Facebook-Free-PNG.png"
              className="w-6 h-6 mr-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.324V1.325c0-.732-.594-1.325-1.324-1.325z" />
            </svg>
            <span className="font-semibold">Continue with Facebook</span>
          </button>

          <div className="flex items-center mb-6">
            <hr className="flex-grow border-white/30" />
            <span className="mx-3 text-white text-sm">or</span>
            <hr className="flex-grow border-white/30" />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-transparent bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] focus:ring-opacity-80 text-gray-900 font-medium transition-all duration-300 placeholder-gray-500"
              />
              <div className="absolute inset-0 rounded-xl border border-white/30 pointer-events-none"></div>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-transparent bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#EC8E3D] focus:ring-opacity-80 text-gray-900 font-medium transition-all duration-300 placeholder-gray-500"
              />
              <div className="absolute inset-0 rounded-xl border border-white/30 pointer-events-none"></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              {/*<label className="flex items-center text-white">
                <input type="checkbox" id="remember" className="mr-2 rounded text-[#EC8E3D]" />
                Remember me
              </label>*/}
              <a href="#" className="underline text-[#FCCB6E] hover:text-white transition-colors">
                Forgot password?
              </a>  
            </div>

            {/* Terms and checkbox - FIXED VERSION */}
            <div className="flex items-start mb-2 gap-3">
              <div className="relative flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreed}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 bg-white/20 border-2 border-white/50 rounded appearance-none cursor-pointer checked:bg-[#FCCB6E] checked:border-[#FCCB6E] focus:outline-none focus:ring-2 focus:ring-[#FCCB6E] focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200"
                />
                {/* Custom checkmark */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${agreed ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <label htmlFor="agree-terms" className="text-white/80 text-sm cursor-pointer leading-tight">
                By continuing, you agree to our{' '}
                <a href="#" className="underline text-[#FCCB6E] hover:text-yellow-300 font-semibold transition-colors">
                  Terms and conditions
                </a>{' '}and{' '}
                <a href="#" className="underline text-[#FCCB6E] hover:text-yellow-300 font-semibold transition-colors">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <button
              type="submit"
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 ${
                agreed 
                  ? 'bg-gradient-to-r from-[#EC8E3D] to-[#FCCB6E] hover:from-[#FCCB6E] hover:to-[#EC8E3D] text-white hover:shadow-xl hover:-translate-y-1 cursor-pointer' 
                  : 'bg-gray-400/50 text-gray-300 cursor-not-allowed'
              }`}
              disabled={!agreed}
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white text-sm">
              New user?{' '}
              <button
                onClick={() => onSignUpClick()}
                className="text-[#FCCB6E] hover:text-white font-bold transition-colors relative group"
              >
                Sign up
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FCCB6E] group-hover:w-full transition-all duration-300"></span>
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}