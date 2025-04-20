import { motion } from 'framer-motion';
import Logo from './Logo';

const PrivacyPolicy = () => {
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1.1 Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Professional details (current company, role, experience)</li>
                  <li>Resume/CV and professional portfolio</li>
                  <li>Skills, qualifications, and career preferences</li>
                  <li>Referral history and success rates</li>
                </ul>

                <h3 className="text-xl font-medium">1.2 Usage Data</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Platform interaction and behavior</li>
                  <li>Connection and messaging history</li>
                  <li>Referral activities and outcomes</li>
                  <li>Device and browser information</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Facilitate connections between jobseekers and MMC employees</li>
                  <li>Match jobseekers with relevant opportunities</li>
                  <li>Track and manage referral processes</li>
                  <li>Improve platform functionality and user experience</li>
                  <li>Send important updates and notifications</li>
                  <li>Prevent fraud and ensure platform security</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Sharing and Disclosure</h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">3.1 With Other Users</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Professional profiles are visible to other platform users</li>
                  <li>Referral requests and status are shared between connected users</li>
                  <li>Communication history is accessible to involved parties</li>
                </ul>

                <h3 className="text-xl font-medium">3.2 With Third Parties</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers and partners (with strict confidentiality agreements)</li>
                  <li>Legal authorities when required by law</li>
                  <li>In case of business transfers or acquisitions</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Industry-standard encryption for data transmission</li>
                  <li>Secure storage of personal information</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication measures</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <div className="space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal data</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <div className="space-y-4">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintain user sessions</li>
                  <li>Remember preferences</li>
                  <li>Analyze platform usage</li>
                  <li>Improve service delivery</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-gray-600">
                For any privacy-related questions or concerns, please contact us at:
                <br />
                <a href="mailto:privacy@hireons.com" className="text-primary-600 hover:text-primary-700">
                  privacy@hireons.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 