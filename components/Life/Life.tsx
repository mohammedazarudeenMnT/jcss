'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Life() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  // Initialize reCAPTCHA when component mounts
  useEffect(() => {
    const initRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current && !recaptchaLoaded) {
        try {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
            callback: (token: string) => setRecaptchaToken(token),
            'expired-callback': () => setRecaptchaToken(null),
            'error-callback': () => setRecaptchaToken(null)
          });
          setRecaptchaLoaded(true);
        } catch (error) {
          console.error('Error rendering reCAPTCHA:', error);
        }
      }
    };

    // Try to initialize immediately
    initRecaptcha();

    // If grecaptcha is not ready, wait for it
    const checkInterval = setInterval(() => {
      if (window.grecaptcha && !recaptchaLoaded) {
        initRecaptcha();
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [recaptchaLoaded]);

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
      setRecaptchaToken(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Handle form submission with reCAPTCHA token
      console.log('Form submitted:', { ...formData, recaptchaToken });
      
      // Send the data to the backend API
      const response = await fetch('/api/submit-career-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', phone: '', resume: null });
      resetRecaptcha();
      
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/care.jpg"
          alt="Career Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container - Responsive Alignment */}
      <div className="relative z-10 h-full overflow-y-auto flex items-center justify-center sm:justify-start p-4 sm:p-6 lg:pl-32 pt-20 sm:pt-24 lg:pt-32 pb-6 sm:pb-8">
        <div className="text-center sm:text-left max-w-2xl w-full">
          {/* Title */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-orange-500 mb-4 sm:mb-6">
              Life
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
              We always look for new minds, ideas and dynamism in our global 
              consulting arena. Send across your interest with a detailed note and 
              one of our team members will reach out to you for a suitable fit.
            </p>
          </div>

          {/* Contact Form */}
          <div 
            className="bg-white bg-opacity-95 rounded-xl sm:rounded-2xl p-2 sm:p-4 lg:p-6 shadow-xl animate-fade-in-up mx-2 sm:mx-0"
            style={{ animationDelay: '0.3s' }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                  required
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                  <label className="flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition-colors text-sm sm:text-base">
                    <span>Choose file</span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.pptx"
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                    Accepted file format: PPTX, PDF. File size not more than 10 mb
                  </p>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center sm:justify-start">
                <div ref={recaptchaRef} className="g-recaptcha"></div>
                {!recaptchaLoaded && (
                  <div className="flex items-center justify-center p-4 bg-gray-100 rounded border-2 border-dashed border-gray-300">
                    <span className="text-gray-500 text-sm">Loading reCAPTCHA...</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center sm:text-right">
                <button
                  type="submit"
                  disabled={!recaptchaToken || isSubmitting}
                  className={`w-full sm:w-auto text-white text-sm sm:text-base px-4 sm:px-6 py-1.5 sm:py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    !recaptchaToken || isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-400 hover:bg-orange-600'
                  }`}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}