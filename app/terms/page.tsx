import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ProhostAI',
  description: 'ProhostAI Terms of Service - Terms and conditions for using our AI-powered property management platform.',
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen bg-white">
        <section className="py-16 md:py-24">
          <div className="max-width-container section-padding">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-sm text-gray-600 mb-8">Last Updated: April 23, 2025</p>

              <div className="prose prose-gray max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600 mb-4">
                    Welcome to ProhostAI! These Terms of Service ("Terms") govern your use of our
                    website located at www.prohost.ai, our web application, mobile application(s),
                    and any other related services provided by Prohost AI, Inc. ("ProhostAI", "we",
                    "us", or "our").
                  </p>
                  <p className="text-gray-600 mb-4">
                    By accessing or using our Service, you agree to be bound by these Terms. If you
                    disagree with any part of these terms, then you may not access the Service.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Our Service is designed for property management companies and professional hosts
                    managing multiple short-term rental properties. By using our Service, you represent
                    that you are using it for business purposes in connection with your property
                    management operations.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Eligibility for Services</h2>
                  <p className="text-gray-600 mb-4">
                    ProhostAI services are available exclusively to organizations with two (2) or more
                    employees. By registering for or using our Service, you represent and warrant that
                    your organization meets this eligibility requirement.
                  </p>
                  <p className="text-gray-600 mb-4">
                    We reserve the right to verify your organization's eligibility at any time and may
                    suspend or terminate access to the Service if we determine that your organization
                    does not meet our eligibility requirements.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account Registration</h2>
                  <p className="text-gray-600 mb-4">
                    To use certain features of our Service, you must register for an account. When you
                    register for an account, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Keep your password secure and confidential</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription and Payment</h2>
                  <p className="text-gray-600 mb-4">
                    Our Service is offered on a subscription basis. The specific pricing, payment terms,
                    and features included in your subscription are as set forth on our pricing page and
                    in your subscription agreement.
                  </p>
                  <p className="text-gray-600 mb-4">
                    You agree to pay all fees associated with your subscription plan. Subscription fees
                    are billed in advance on a monthly or annual basis and are non-refundable except as
                    required by law or as explicitly stated in these Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
                  <p className="text-gray-600 mb-4">
                    You agree to use our Service only for lawful purposes and in accordance with these
                    Terms. You agree not to use our Service:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
                    <li>In any way that violates any applicable federal, state, local, or international law</li>
                    <li>To transmit any unauthorized advertising or promotional material</li>
                    <li>To impersonate or attempt to impersonate ProhostAI or any other person or entity</li>
                    <li>To engage in any conduct that restricts or inhibits anyone's use of the Service</li>
                    <li>To introduce any viruses, malware, or other harmful material</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
                  <p className="text-gray-600 mb-4">
                    The Service and its original content, features, and functionality are and will remain
                    the exclusive property of ProhostAI and its licensors. The Service is protected by
                    copyright, trademark, and other laws. Our trademarks and trade dress may not be used
                    in connection with any product or service without our prior written consent.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content</h2>
                  <p className="text-gray-600 mb-4">
                    Our Service allows you to post, link, store, share and otherwise make available certain
                    information, text, graphics, or other material ("Content"). You are responsible for the
                    Content that you post to the Service, including its legality, reliability, and appropriateness.
                  </p>
                  <p className="text-gray-600 mb-4">
                    By posting Content to the Service, you grant us the right and license to use, modify,
                    perform, display, reproduce, and distribute such Content in connection with providing
                    and improving our Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h2>
                  <p className="text-gray-600 mb-4">
                    Your use of our Service is also governed by our Privacy Policy. Please review our
                    Privacy Policy, which also governs the Site and informs users of our data collection
                    practices.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
                  <p className="text-gray-600 mb-4">
                    We may terminate or suspend your account immediately, without prior notice or liability,
                    for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p className="text-gray-600 mb-4">
                    Upon termination, your right to use the Service will cease immediately. If you wish
                    to terminate your account, you may simply discontinue using the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
                  <p className="text-gray-600 mb-4">
                    The information on this Service is provided on an "AS IS" and "AS AVAILABLE" basis.
                    ProhostAI makes no representations or warranties of any kind, express or implied, as
                    to the operation of the Service or the information, content, or materials included therein.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                  <p className="text-gray-600 mb-4">
                    In no event shall ProhostAI, its directors, employees, partners, agents, suppliers, or
                    affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses, resulting from your use of the Service.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-600 mb-4">
                    These Terms shall be governed and construed in accordance with the laws of the State
                    of Delaware, without regard to its conflict of law provisions. Our failure to enforce
                    any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
                  <p className="text-gray-600 mb-4">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any
                    time. If a revision is material, we will try to provide at least 30 days notice prior
                    to any new terms taking effect.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms, please contact us at{' '}
                    <a href="mailto:legal@prohost.ai" className="text-primary-600 hover:text-primary-700">
                      legal@prohost.ai
                    </a>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}