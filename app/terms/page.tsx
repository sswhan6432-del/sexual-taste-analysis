import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Velvet Compass",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="mb-8 font-serif text-3xl font-normal text-text-primary">Terms of Service</h1>
      <p className="mb-2 text-sm text-text-muted">Effective: February 18, 2025</p>

      <div className="space-y-8 text-sm leading-relaxed text-text-secondary">
        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">1. Service Overview</h2>
          <p>
            Velvet Compass (&quot;Service&quot;) provides personality and archetype analysis tests for
            entertainment and self-understanding purposes. This service is not a substitute for
            professional psychological counseling.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">2. Age Requirement</h2>
          <p>
            This service is intended for adults (18 years and older). By using this service,
            you confirm that you are of legal age in your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">3. Terms of Use</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>This service is provided free of charge.</li>
            <li>No registration is required.</li>
            <li>Test results are for reference only and are not definitive personality assessments.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">4. Intellectual Property</h2>
          <p>
            All content including design, questions, and analysis algorithms are copyrighted by
            Velvet Compass. Unauthorized reproduction, distribution, or modification is prohibited.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">5. Disclaimer</h2>
          <p>
            Test results are based on statistical algorithms and may differ from your actual
            personality. The service provider does not guarantee the accuracy of results.
            Users are responsible for how they use and interpret the results.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">6. Advertising</h2>
          <p>
            This service may include advertisements served through Google AdSense.
            Ad content is the responsibility of the advertisers, not the service provider.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-normal text-text-primary">7. Changes</h2>
          <p>
            These terms may be modified as needed. Changes will be posted on this page.
            Continued use of the service after changes constitutes acceptance of the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
