import Dashboard from "./components/dashboard.jsx";
import SetupGuide from "./components/setupguide.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { languages } from "./i18n";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "./components/Auth.jsx";
import "./App.css";
const features = [
  {
    icon: "✳",
    titleKey: "smartRecommendations",
    descriptionKey: "smartRecommendationsDesc",
  },
  {
    icon: "₹",
    titleKey: "costOptimization",
    descriptionKey: "costOptimizationDesc",
  },
  {
    icon: "◈",
    titleKey: "performanceInsights",
    descriptionKey: "performanceInsightsDesc",
  },
];
const providers = [
  {
    name: "AWS",
    fullName: "Amazon Web Services",
    description: "Explore services and infrastructure options.",
    icon: "a",
    className: "aws-logo",
  },
  {
    name: "Microsoft Azure",
    fullName: "Microsoft cloud platform",
    description: "Explore cloud services and deployment options.",
    icon: "▦",
    className: "azure-logo",
  },
  {
    name: "Google Cloud",
    fullName: "Google cloud platform",
    description: "Explore computing, storage, and data services.",
    icon: "G",
    className: "google-logo",
  },
  {
    name: "Oracle Cloud",
    fullName: "Oracle Cloud Infrastructure (OCI)",
    description: "Explore cloud infrastructure, databases, and enterprise services.",
    icon: "O",
    className: "oracle-logo",
  },
  {
    name: "IBM Cloud",
    fullName: "IBM Cloud",
    description: "Explore enterprise cloud, AI, and hybrid cloud services.",
    icon: "IBM",
    className: "ibm-logo",
  },
  {
    name: "DigitalOcean",
    fullName: "DigitalOcean Cloud",
    description: "Explore developer-friendly cloud computing and hosting.",
    icon: "D",
    className: "digitalocean-logo",
  },
  {
    name: "Akamai Cloud",
    fullName: "Akamai Cloud Computing",
    description: "Explore cloud computing and globally distributed infrastructure.",
    icon: "A",
    className: "akamai-logo",
  },
  {
    name: "Alibaba Cloud",
    fullName: "Alibaba Cloud",
    description: "Explore cloud computing, storage, and data solutions.",
    icon: "A",
    className: "alibaba-logo",
  },
];


function App() {
  const { t, i18n } = useTranslation();

const handleLanguageChange = (event) => {
  const selectedLanguage = event.target.value;

  i18n.changeLanguage(selectedLanguage);
  localStorage.setItem("cloudwiseLanguage", selectedLanguage);
};

const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cloudwiseUser")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  // Demo frontend session only; connect real authentication later.
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("cloudwiseUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setProfileOpen(false);
    setMenuOpen(false);
    localStorage.removeItem("cloudwiseUser");
    navigate("/");
  };

  const openAuth = (mode) => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate(mode === "login" ? "/login" : "/signup");
  };

  const openDashboard = () => {
    setMenuOpen(false);
    setProfileOpen(false);
    navigate("/dashboard");
  };

  const scrollToFeatures = () => {
    setMenuOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("features")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("features")?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const homePage = (
    <div className="app" id="home">
      <header className="navbar">
        <a className="brand" href="#home" aria-label="CloudWise home">
          <span className="brand-icon">☁</span>
          <span>
            Cloud<span className="brand-accent">Wise</span>
          </span>
        </a>

        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a
            href="#features"
            onClick={(event) => {
              event.preventDefault();
              scrollToFeatures();
            }}
          >
            Features
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

<div className="language-selector">
  <span className="language-globe" aria-hidden="true">🌐</span>

  <div className="language-select-wrap">
   <select
  id="cloudwise-language"
  value={i18n.resolvedLanguage || "en"}
  onChange={handleLanguageChange}
  onMouseDown={() => setLanguageOpen((prev) => !prev)}
  onBlur={() => setLanguageOpen(false)}
  aria-label="Choose language"
>
  {languages.map((lang) => (
    <option key={lang.code} value={lang.code}>
      {lang.native}
    </option>
  ))}
</select>

<span className="language-arrow-position" aria-hidden="true">
  <span className={`language-arrow ${languageOpen ? "is-open" : ""}`}>
    ⌄
  </span>
</span>
  </div>
</div>

          <div className="mobile-nav-actions">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span className="profile-avatar">
                    {(user.name || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                  <div>
                    <strong>{user.name || "User"}</strong>
                    <span>{user.email}</span>
                  </div>
                </div>

                <button
                  className="button button-primary"
                  onClick={openDashboard}
                >
                  Dashboard
                </button>

                <button
                  className="button button-outline"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  className="button button-outline"
                  onClick={() => openAuth("login")}
                >
                  Log in
                </button>

                <button
                  className="button button-primary"
                  onClick={() => openAuth("signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="nav-actions desktop-actions">
          {user ? (
            <>
              <button
                className="button button-primary button-small"
                onClick={openDashboard}
              >
                Dashboard
              </button>

              <div className="profile-area">
                <button
                  className="profile-avatar"
                  title={user.name || "My profile"}
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  {(user.name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </button>

                {profileOpen && (
                  <div className="profile-dropdown">
                    <strong>{user.name || "User"}</strong>
                    <span>{user.email}</span>

                    <button onClick={handleLogout}>
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="login-link"
                onClick={() => openAuth("login")}
              >
                Log in
              </button>

              <button
                className="button button-primary button-small"
                onClick={() => openAuth("signup")}
              >
                Get Started <span>→</span>
              </button>
            </>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            
            <h1>
  {t("heroTitle")}
  <br />
  <span className="gradient-text">
    {t("heroSubtitle")}
  </span>
</h1>

          <p>{t("heroDescription")}</p>

            <div className="hero-actions">
              <button
                className="button button-primary button-large"
                onClick={() =>
                  user ? openDashboard() : openAuth("signup")
                }
              >
                {user ? "Open Dashboard" : "Get Started"} <span>→</span>
              </button>

              <button
                className="button button-secondary button-large"
                onClick={scrollToFeatures}
              >
                Explore Features
              </button>
            </div>

            <div className="hero-note">
              <span className="check-mark">✓</span>
              Compare options. Understand costs. Choose confidently.
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-orb orb-one" />
            <div className="visual-orb orb-two" />

            <div className="dashboard-card">
              <div className="dashboard-top">
                <div className="dashboard-brand">
                  <span className="dashboard-icon">☁</span>
                  <div>
                    <span className="mini-label">CLOUDWISE</span>
                    <h3>Cloud overview</h3>
                  </div>
                </div>

                <span className="preview-pill">Preview</span>
              </div>

              <div className="dashboard-intro">
                <span>Welcome to smarter cloud planning</span>
                <span className="intro-symbol">✦</span>
              </div>

              <div className="metric-grid">
                <div className="metric-card">
                  <span className="metric-label">Cloud Platforms</span>
                  <strong>08</strong>
                  <span className="metric-caption">Compare options</span>
                </div>

                <div className="metric-card">
                  <span className="metric-label">Your priorities</span>
                  <strong className="metric-blue">Your choice</strong>
                  <span className="metric-caption">Cost &amp; performance</span>
                </div>
              </div>

 
<div className="recommendation-panel">
 <div className="panel-heading">
  <div>
    <span className="mini-label">SMART RECOMMENDATIONS</span>
    <h4>Find your cloud match</h4>
  </div>
  <span className="panel-dots">...</span>
</div>

<div className="smart-recommendations">
  <div className="smart-recommendation-row">
    <div className="smart-rec-icon">🌐</div>
    <div className="smart-rec-details">
      <strong>Web application</strong>
      <span>Scalable workloads</span>
    </div>
    <span className="smart-rec-provider">AWS</span>
  </div>

  <div className="smart-recommendation-row">
    <div className="smart-rec-icon">✦</div>
    <div className="smart-rec-details">
      <strong>AI &amp; analytics</strong>
      <span>Data and AI tools</span>
    </div>
    <span className="smart-rec-provider">Google Cloud</span>
  </div>

  <div className="smart-recommendation-row">
    <div className="smart-rec-icon">▦</div>
    <div className="smart-rec-details">
      <strong>Enterprise app</strong>
      <span>Enterprise integration</span>
    </div>
    <span className="smart-rec-provider">Azure</span>
  </div>
</div>

  

</div>



              <div className="dashboard-footer">
                <span className="footer-dot" />
                Illustrative preview · Not live cloud data
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <span>ONE PLATFORM</span>
          <span className="trust-divider" />
          <span>MULTIPLE CLOUD PROVIDERS</span>
          <span className="trust-divider" />
          <span>SMARTER DECISIONS</span>
        </section>

        <section className="features-section" id="features">
          <div className="section-heading">
            <span className="section-eyebrow">WHAT YOU CAN DO</span>
            <h2>
              Cloud decisions, <span>made simpler.</span>
            </h2>
            <p>
              Everything you need to compare options and plan your cloud
              strategy in one place.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <div className={`feature-icon feature-icon-${index + 1}`}>
                  {feature.icon}
                </div>

                <h3>{t(feature.titleKey)}</h3>
                <p>{t(feature.descriptionKey)}</p>

                <button
                  className="feature-link"
                  onClick={() =>
                    user ? openDashboard() : openAuth("signup")
                  }
                >
                  Explore more <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-section" id="about">
          <div>
            <span className="section-eyebrow">
              YOUR CLOUD JOURNEY STARTS HERE
            </span>
            <h2>Ready to make a smarter cloud choice?</h2>
            <p>Start exploring your options with CloudWise.</p>
          </div>

          <button
            className="button button-white button-large"
            onClick={() =>
              user ? openDashboard() : openAuth("signup")
            }
          >
            {user ? "Open Dashboard" : "Get Started"} <span>→</span>
          </button>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">☁</span>
          <span>
            Cloud<span className="brand-accent">Wise</span>
          </span>
        </a>

        <p>Helping you navigate the cloud with confidence.</p>
        <span className="copyright">© 2026 CloudWise</span>
      </footer>
    </div>
  );


  return (
    <Routes>
      <Route path="/" element={homePage} />

      <Route
        path="/login"
        element={<Auth onLogin={handleLogin} />}
      />

      <Route
        path="/signup"
        element={<Auth onLogin={handleLogin} />}
      />

      
<Route
  path="/dashboard"
  element={
    user ? (
      <Dashboard user={user} onLogout={handleLogout} />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
