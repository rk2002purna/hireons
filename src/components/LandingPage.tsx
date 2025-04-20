import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Users, Briefcase, Mail, Linkedin, Twitter, Github, Sparkles, Zap, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <button className="text-primary-600 hover:text-primary-700 font-medium">Login</button>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-primary-100/50" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Your Gateway to MMC Opportunities</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Connect with MMC Insiders
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Get Referred to Top Companies
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Connect directly with employees at top MMCs. Get insider referrals and increase your chances of landing your dream job at companies like Google, Microsoft, Amazon, and more.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all">
              Join as Jobseeker <ArrowRight size={20} />
            </button>
            <button className="bg-white hover:bg-gray-50 text-primary-600 px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 border border-primary-600 shadow-lg shadow-primary-500/10 hover:shadow-primary-500/20 transition-all">
              Join as Referrer <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How HireOns Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three simple steps to connect with MMC insiders and get referred to your dream company
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-12 h-12 text-primary-600" />,
                title: "Create Your Profile",
                description: "Showcase your skills and experience to attract the right MMC insiders"
              },
              {
                icon: <Briefcase className="w-12 h-12 text-primary-600" />,
                title: "Connect with Insiders",
                description: "Find and connect with employees at your target MMCs"
              },
              {
                icon: <Rocket className="w-12 h-12 text-primary-600" />,
                title: "Get Referred",
                description: "Receive referrals from MMC employees and fast-track your application"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose HireOns?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our innovative referral platform
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-primary-600">For Jobseekers</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Connect with employees at top MMCs",
                  "Get insider referrals for better opportunities",
                  "Learn about company culture and requirements",
                  "Get personalized career guidance",
                  "Increase your chances of getting hired"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-semibold text-primary-600">For MMC Employees</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Earn rewards for successful referrals",
                  "Help your company find great talent",
                  "Build your professional network",
                  "Get recognition for your contributions",
                  "Grow your influence in your organization"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 mt-1" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the MMC Insider Network</h2>
            <p className="text-gray-600 mb-8">Be among the first to connect with MMC employees and get referred to your dream company.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all">
                Join Waitlist
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Logo />
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={24} />
              </a>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-center">
              <p className="text-gray-400">© 2024 HireOns. All rights reserved.</p>
              <div className="flex space-x-4 mt-2">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 