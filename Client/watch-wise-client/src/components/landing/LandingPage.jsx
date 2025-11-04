import { useRef, useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import BgClipCompressed from './BgClipSmallExtraCompressed.webm'

const MP4_VIDEO_URL = "https://drive.google.com/file/d/116wQIfx1BLLIbN9y42ZK3I7tM2c9DCkN/view?usp=drive_link"; 
const WEBM_VIDEO_URL = "https://drive.google.com/file/d/11bv8cNVAOdu4eLFh2P0yHfFd1Nb1Za2b/view?usp=sharing";

const LandingPage = () => {
  const techStack = [
    { name: "React", desc: "Modern UI Framework", icon: "bi-filetype-jsx" },
    { name: "Go", desc: "Backend Runtime", icon: "bi-terminal" },
    { name: "Gin-gonic", desc: "Web Framework", icon: "bi-lightning-charge" },
    { name: "MongoDB", desc: "NoSQL Database", icon: "bi-database-fill-lock" },
    { name: "OpenAI", desc: "Langchain LLM Orchestration", icon: "bi-robot" },
    { name: "JWT", desc: "Authentication", icon: "bi-shield-check" },
  ];

  const features = [
    {
      title: "Smart Recommendations",
      desc: "AI-powered movie suggestions based on user review sentiment.",
      icon: "bi-stars",
    },
    {
      title: "User Reviews",
      desc: "Share and read authentic movie reviews.",
      icon: "bi-chat-left-text",
    },
    {
      title: "Streaming Links",
      desc: "Direct links to watch your favorite movies.",
      icon: "bi-film",
    },
    {
      title: "Watchlist Sync",
      desc: "Keep your favorite movies synced across all devices.",
      icon: "bi-bookmark-check",
    },
  ];

  const handleNavigate = () => {
    window.location.href = "/home";
  };

  const nextSectionRef = useRef(null);
  const extraInfoRef = useRef(null);
  const [isTypingTriggered, setIsTypingTriggered] = useState(false);

  // Define the text for the typewriter effect
  const typewriterText = "This site was built focusing on backend infrastructure more than the frontend, resulting in a very basic UI. The primary goals were centered solely on:";
  const typingSpeed = 30; // Milliseconds per character

  // Intersection Observer Hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTypingTriggered) {
          setIsTypingTriggered(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5, 
      }
    );

    if (extraInfoRef.current) {
      observer.observe(extraInfoRef.current);
    }

    return () => {
      if (extraInfoRef.current) {
        observer.unobserve(extraInfoRef.current);
      }
    };
  }, [isTypingTriggered]);

  // State to hold the currently displayed text
  const [displayedText, setDisplayedText] = useState('');

  // Typing Effect Logic
  useEffect(() => {
    if (isTypingTriggered && displayedText.length < typewriterText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(typewriterText.substring(0, displayedText.length + 1));
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [isTypingTriggered, displayedText, typewriterText]);


  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5 vh-100 d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
        >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        >
          <source src={MP4_VIDEO_URL} type="video/mp4" />
          <source src={WEBM_VIDEO_URL} type="video/mp4" />
          <source src={BgClipCompressed} type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

        {/* Hero Content */}
        <div className="container position-relative">
          <h1 className="display-3 fw-bold mb-3">
            Watch<span className="text-primary">Wise</span>
          </h1>
          <p className="lead mb-4">
            Your intelligent movie companion. Discover, review, and stream your favorite films.
          </p>
          <i
            className="bi bi-chevron-double-down fs-1 text-white"
            onClick={scrollToNext}
            style={{
              cursor: "pointer",
              animation: "bounce 1.5s infinite",
            }}
          ></i>
        </div>
      </section>

      {/* Features - Carousel Section */}
      <section className="py-5 bg-light text-dark" ref={nextSectionRef}>
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">What Makes It Special</h2>
          
          <div id="featuresCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
            
            {/* Carousel Indicators */}
            <div className="carousel-indicators" data-bs-theme="dark">
              {features.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#featuresCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner pb-5">
              {features.map((feature, index) => (
                <div key={feature.title} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <div className="d-flex justify-content-center">
                    <div className="card shadow-lg border-0 text-center w-75 p-4">
                      <div className="card-body">
                        <i className={`bi ${feature.icon} text-primary display-4 mb-3`}></i>
                        <h3 className="card-title fw-bold">{feature.title}</h3>
                        <p className="card-text text-muted lead">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-theme="dark" data-bs-target="#featuresCarousel" data-bs-slide="prev" >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-theme="dark" data-bs-target="#featuresCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Built With Modern Tech</h2>
          <p className="text-muted mb-5">
            A powerful combination of cutting-edge technologies
          </p>
          <div className="row g-3 justify-content-center">
            {techStack.map((tech, index) => (
              <div key={tech.name} className="col-6 col-md-4 col-lg-2">
                <div 
                  className="card border-0 shadow-sm p-3 h-100 text-center tech-fade-in tech-card-hover" 
                  style={{
                    animationDelay: `${index * 0.15}s`, 
                  }}
                >
                  <i className={`bi ${tech.icon} display-6 mb-2 text-primary`}></i>
                  <h5 className="fw-bold mb-1">{tech.name}</h5>
                  <p className="text-muted small mb-0">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛑 Extra Info Section - Highlighted Keywords 🛑 */}
      <section className="py-5 bg-dark text-white" ref={extraInfoRef}>
        <div className="container">
          <div className="alert alert-warning text-center fw-bold" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            Disclaimer: This site does not stream actual movies due to copyright issues. It only shows trailers.
          </div>

          <h3 className="fw-bold text-center mb-4 text-primary">Project Context & Focus</h3>
          
          <div className="row justify-content-center">
            <div className="col-lg-8 text-start">
                {/* Typewriter text is displayed here */}
                <p className="lead text-light typewriter-text">
                  {displayedText}
                  {/* Blinking cursor effect (requires external CSS for `.typewriter-cursor`) */}
                  {isTypingTriggered && displayedText.length < typewriterText.length && (
                    <span className="typewriter-cursor">|</span>
                  )}
                </p>
                {/* List and final text are displayed only after the typing is complete */}
                {isTypingTriggered && displayedText.length === typewriterText.length && (
                  <>
                    <ul>
                        <li>Learning and implementing the <span className="text-primary">Go</span> language.</li>
                        <li>Integrating and managing <span className="text-primary">MongoDB</span>.</li>
                        <li>Using the <span className="text-primary">Gin-gonic</span> framework for the API.</li>
                        <li>Implementing <span className="text-primary">LangChain</span> and <span className="text-primary">OpenAI</span> for advanced sentiment analysis.</li>
                        <li>Handling robust <span className="text-primary">JWT authentication</span>.</li>
                        <li>Successful deployment of the entire stack on external servers.</li>
                    </ul>
                    <p className="text-info mt-4">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        To review movies and see the **LangChain** logic in action, use the following admin credentials:
                        <br />
                        **Email:** `bobjones@hotmail.com`
                        <br />
                        **Password:** `Password1!`
                    </p>
                    <p className="text-muted small mt-4">
                        I plan to migrate to an OpenSource DB to get a larger list of movies, details, and direct links to streaming services in the near future. The current movie database is small.
                    </p>
                  </>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Was Built */}
      <section className="py-5 bg-light text-dark">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">How It Was Built</h2>
          <div className="row gy-4">
            {[
              {
                step: "01",
                title: "Architecture Design",
                desc: "Designed a scalable architecture with Go/Gin-gonic backend and MongoDB persistence.",
              },
              {
                step: "02",
                title: "Frontend Development",
                desc: "Built responsive React components with Bootstrap and React Router.",
              },
              {
                step: "03",
                title: "AI Integration & Analysis",
                desc: "Implemented **Langchain** to orchestrate calls to **OpenAI's LLM** for sentiment scoring of user reviews, powering recommendations.",
              },
              {
                step: "04",
                title: "Deployment & Scaling",
                desc: "Deployed the application with CI/CD pipeline for optimal performance and scalability.",
              },
            ].map((item) => (
              <div key={item.step} className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">
                      {item.step}. {item.title}
                    </h5>
                    <p className="text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 text-center bg-dark text-white">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Explore?</h2>
          <p className="text-muted mb-4">
            Start your cinematic journey with WatchWise today.
          </p>
          <button
            onClick={handleNavigate}
            className="btn btn-primary btn-lg px-5"
          >
            Enter WatchWise
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-3 bg-light text-center">
        <p className="text-muted mb-0">
          Built with ❤️ by Bhavya Makadia | © 2025 WatchWise
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;