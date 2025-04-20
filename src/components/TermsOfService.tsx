import { motion } from 'framer-motion';
import Logo from './Logo';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <Logo />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using HireOns, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">2.1 Account Creation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining account security</li>
                  <li>You must be at least 18 years old to use the platform</li>
                </ul>

                <h3 className="text-xl font-medium">2.2 Account Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain the confidentiality of your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>You are responsible for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Platform Usage</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">3.1 User Conduct</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Respect other users' privacy and rights</li>
                  <li>Do not engage in fraudulent or deceptive practices</li>
                  <li>Do not share confidential company information</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>

                <h3 className="text-xl font-medium">3.2 Prohibited Activities</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Impersonating others or providing false information</li>
                  <li>Harassing or discriminating against other users</li>
                  <li>Sharing inappropriate or offensive content</li>
                  <li>Attempting to bypass security measures</li>
                  <li>Using the platform for unauthorized commercial purposes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Referral Process</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">4.1 Referral Guidelines</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Referrals must be based on genuine professional relationships</li>
                  <li>Referrers must have direct knowledge of the candidate's abilities</li>
                  <li>Referrals should align with the candidate's qualifications</li>
                  <li>Both parties must maintain professional conduct</li>
                </ul>

                <h3 className="text-xl font-medium">4.2 Referral Rewards</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Rewards are subject to company policies and availability</li>
                  <li>Successful referrals must meet specific criteria</li>
                  <li>Rewards may be modified or discontinued at any time</li>
                  <li>Tax implications are the responsibility of the recipient</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Platform content and features are protected by copyright</li>
                  <li>Users retain rights to their personal content</li>
                  <li>License to use platform content is limited to personal use</li>
                  <li>Unauthorized use of platform content is prohibited</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Platform is provided "as is" without warranties</li>
                  <li>We are not responsible for hiring decisions</li>
                  <li>We do not guarantee job placement or referrals</li>
                  <li>Users are responsible for their interactions and outcomes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>We may terminate or suspend accounts for violations</li>
                  <li>Users may terminate their accounts at any time</li>
                  <li>Certain provisions survive account termination</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the platform constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms of Service, please contact us at:
                <br />
                <a href="mailto:legal@hireons.com" className="text-primary-600 hover:text-primary-700">
                  legal@hireons.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 