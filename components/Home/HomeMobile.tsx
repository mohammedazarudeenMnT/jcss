"use client";

import Image from "next/image";

export default function HomeMobile() {
  return (
    <section className="fixed inset-0 overflow-hidden pt-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home.jpg"
          alt="JCSS Background"
          fill
          className="object-cover"
          priority
        />
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 h-full overflow-y-auto pb-8">
        {/* Mobile Content Sections */}
        <div className="space-y-2 px-4">
          {/* Welcome Section */}
          <div className="p-4">
            <p className="text-slate-200 text-xs leading-relaxed">
              <span className="font-bold text-orange-500">
                Welcome to JCSS.
              </span>{" "}
              Here, we navigate the complexities of today's global business
              environment by offering tailored Accounting and Regulatory
              Services. Headquartered in Bangalore, with offices across India,
              Singapore, Japan and Indonesia, our experienced team delivers
              practical, transparent solutions to help businesses thrive amidst
              intense competition, evolving regulations, and shifting consumer
              demands.
            </p>
          </div>

          {/* Our Journey Section */}
          <div className="p-4">
            <p className="text-slate-200 text-xs leading-relaxed">
              <span className="font-bold text-orange-500">Our Journey:</span>{" "}
              Since 2000, we've advised over 450 clients - from start-ups to
              Fortune 500 companies—across industries like Infrastructure, IT,
              Manufacturing, and Construction. With offices in Bangalore,
              Chennai, Delhi, Hyderabad, Pune, Ahmedabad, Singapore, Tokyo, and
              Jakarta, we're always close to our clients.
            </p>
          </div>

          {/* Our Promises Section */}
          <div className="p-4">
            <p className="text-slate-200 text-xs leading-relaxed">
              <span className="font-bold text-orange-500">Our Promises:</span>{" "}
              JCSS was founded on one core value: Delivering Transparency. We
              simplify complex regulations, anticipate business needs, and
              provide clear, effective solutions. Over the years, we've grown
              globally, but our commitment to transparency remains unchanged,
              supported by a dedicated team that shares our vision.
            </p>
          </div>

          {/* Let's Talk Button */}
          {/* <div className="fixed bottom-8 right-8 z-30">
            <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center justify-center w-16 h-16 animate-bounce-slow hover:animate-pulse transform-gpu">
              <div className="flex flex-col items-center transition-all duration-300">
                <svg
                  className="w-7 h-7 mb-0.5 transition-transform duration-300 hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-xs font-semibold transition-all duration-300 hover:text-orange-100">
                  Talk
                </span>
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
