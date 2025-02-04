import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background layers (similar to Index) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: "url('/lovable-uploads/a80cc99e-7626-449b-9e43-809aaf3ff598.png')",
          opacity: 0.6
        }}
      />
      <div className="absolute inset-0 z-1 bg-primary/80 bg-water-pattern animate-float" />
      <div className="absolute inset-0 z-2">
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/5 to-primary/20 animate-wave [animation-delay:7.5s]" />
      </div>

      <div className="container relative z-10 py-12">
        <Link to="/" className="inline-block mb-8 text-white hover:text-primary-light transition-colors">
          ← Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-primary-light/20 text-white">
          <h1 className="text-4xl font-bold mb-8">About BlueCycle</h1>
          
          <div className="space-y-6 text-left">
            <p className="leading-relaxed">
              Water scarcity is a growing concern, especially in cities like <strong>Bangalore</strong>, where rapid urbanization and climate change have strained water resources. Reports highlight that <strong>Bangalore could run out of groundwater</strong> in the coming years, leading to a severe crisis for both residential and commercial users. The city's lakes are drying up, borewells are depleting, and dependency on <strong>private water tankers</strong> is skyrocketing—making water expensive and unsustainable.
            </p>

            <p className="leading-relaxed">
              At <strong>BlueCycle</strong>, we believe in <strong>making water more accessible, affordable, and sustainable</strong> by bridging the gap between those who <strong>need</strong> water and those who <strong>have</strong> treated water to offer.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p>We aim to create a <strong>reliable and transparent water marketplace</strong>, enabling:</p>
              <ul className="list-none space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span><strong>Buyers</strong> (construction companies, industries, and communities) to <strong>source treated water</strong> at affordable rates.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✅</span>
                  <span><strong>Sellers</strong> (residential societies, treatment plants) to <strong>sell excess treated water</strong>, reducing wastage.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Why Choose Us?</h2>
              <ul className="list-none space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">🌍</span>
                  <span><strong>Sustainable Water Use</strong> – We promote the reuse of treated water, reducing dependency on fresh groundwater.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💧</span>
                  <span><strong>Solving Water Crisis</strong> – Connecting buyers and sellers helps optimize water distribution and minimizes shortages.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🚛</span>
                  <span><strong>Seamless Delivery</strong> – Buyers can request water deliveries easily, ensuring <strong>uninterrupted operations</strong>.</span>
                </li>
              </ul>
            </div>

            <p className="text-lg font-semibold mt-8">
              Water is <strong>not an infinite resource</strong>, and Bangalore's crisis demands <strong>immediate action</strong>. Join us in making every drop count! <strong>Save Water. Secure the Future.</strong> 💧
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;