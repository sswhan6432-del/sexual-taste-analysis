import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Velvet Compass",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 font-serif text-3xl font-normal text-text-primary">Privacy Policy</h1>
      <p className="mb-2 text-sm text-text-muted">Effective: February 18, 2025</p>

      <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">1. Information We Collect</h2>
          <p>
            Velvet Compass (&quot;Service&quot;) does not require registration and does not store any
            personal data on our servers. Test results are stored only in your browser&apos;s local storage.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">2. Cookies &amp; Advertising</h2>
          <p>
            This site serves ads through Google AdSense. Google may use cookies to display
            interest-based advertisements. You can manage cookies in your browser settings or
            disable personalized ads at{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline"
            >
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">3. Third-Party Services</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Google AdSense: Advertising and cookie usage</li>
            <li>Vercel: Website hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">4. Data Storage</h2>
          <p>
            Test responses and results are never transmitted to or stored on our servers. All data
            is processed exclusively within your browser and can be removed by clearing your
            browser data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">5. Your Rights</h2>
          <p>
            You may delete all data at any time by clearing your browser&apos;s local storage.
            For questions, please use our <a href="/contact" className="text-gold underline">Contact</a> page.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">6. Changes</h2>
          <p>
            This privacy policy may be updated as needed. Changes will be posted on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
