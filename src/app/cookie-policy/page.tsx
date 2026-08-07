'use client';

export default function PrivacyPolicyPage() {
  return (
    <section className="privacy-policy-section">
      <div className="privacy-policy-container">
        <div className="privacy-policy-wrapper">
          <span className="privacy-policy-label">Privacy & Cookies</span>

          <h1 className="privacy-policy-title">Privacy Policy</h1>

          <p className="privacy-policy-subtitle">
            Learn how we use cookies to improve your browsing experience while keeping your
            information secure.
          </p>

          <div className="privacy-policy-card">
            <div className="privacy-policy-block">
              <h2>Cookie Policy</h2>

              <p>
                We use cookies to improve your experience on our website, to personalize content, to
                provide social media features, and to analyze our traffic. By accepting cookies, you
                help us make the site faster and better.
              </p>
            </div>

            <div className="privacy-policy-block">
              <h3>Essential Cookies</h3>

              <p>
                Essential cookies are always active and are required for the website to function
                properly.
              </p>
            </div>

            <div className="privacy-policy-block">
              <h3>Analytics Cookies</h3>

              <p>
                Analytics cookies are optional and help us understand how our visitors use the
                website so we can improve performance and content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
