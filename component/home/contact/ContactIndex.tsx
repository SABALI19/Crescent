// ContactUs.tsx
'use client'

import { useState, ChangeEvent, FormEvent } from "react";
import SideImg from "./ContactImg";
import { FiSend } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section
      id="contact-us"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-green-900 to-gray-800"
    >
      <div className="w-full flex flex-col lg:flex-row">
        {/* Image Half */}
        <div className="w-full lg:w-1/2">
          <SideImg />
        </div>

        {/* Form Half */}
        <div className="w-full lg:w-1/2 py-12 px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center">
          <div className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-gray-900/50 rounded-3xl border border-gray-700 p-8 md:p-12 shadow-2xl shadow-gray-900/50">
            <div className="mb-10">
              <div className="flex items-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-600">
                  CONTACT-
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-700">
                    US
                  </span>
                </span>
              </div>
              <p className="mt-4 text-gray-300 text-lg">
                We&apos;re always open and welcome your questions. Get in touch with
                us by filling out the form.
              </p>
            </div>

            <form onSubmit={(e: FormEvent) => e.preventDefault()} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border-b-2 border-gray-600 focus:border-green-400 outline-none text-white rounded-t-lg transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-gray-400 peer-focus:text-green-400 peer-placeholder-shown:translate-y-0 -translate-y-8 transition-all duration-300 pointer-events-none"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/70 border-b-2 border-gray-600 focus:border-green-400 outline-none text-white rounded-t-lg transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-400 peer-focus:text-green-400 peer-placeholder-shown:translate-y-0 -translate-y-8 transition-all duration-300 pointer-events-none"
                  >
                    Your Email
                  </label>
                </div>
              </div>

              <div className="relative mt-6">
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/70 border-b-2 border-gray-600 focus:border-green-400 outline-none text-white rounded-t-lg min-h-[160px] resize-y transition-all duration-300 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="message"
                  className="absolute left-4 top-3 text-gray-400 peer-focus:text-green-400 peer-placeholder-shown:translate-y-0 -translate-y-8 transition-all duration-300 pointer-events-none"
                >
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                className="mt-8 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-700 hover:from-green-500 hover:to-teal-600 text-white font-medium rounded-xl transition-all duration-300 w-full shadow-lg shadow-green-500/20 hover:shadow-green-500/40 flex items-center justify-center group"
              >
                <span>Send Message</span>
                <FiSend className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;