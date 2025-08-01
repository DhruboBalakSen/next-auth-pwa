"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bike, Newspaper, Map, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Page = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />
      {/* Hero Section */}
      <motion.section
        className="text-center pt-32 pb-20 bg-orange-500 text-white"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl font-bold" variants={fadeIn}>
          Your Ride, Your Tribe, Your Journey
        </motion.h1>
        <motion.p className="text-xl mt-4" variants={fadeIn}>
          The ultimate social hub for motorcyclists.
        </motion.p>
        <motion.div className="mt-8" variants={fadeIn}>
          <Link href="/register">
            <Button className="bg-white text-orange-500 hover:bg-gray-200 border-orange">
              Join the Tribe <ArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="ml-4 bg-white text-orange-500 hover:bg-gray-200 border-orange"
            >
              Explore Features
            </Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-20 px-4 md:scroll-m-24 bg-gray-100"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <motion.div
          className="mt-12 grid md:grid-cols-4 gap-8 text-center"
          variants={staggerContainer}
        >
          <motion.div className="feature" variants={fadeIn}>
            <Bike size={48} className="mx-auto text-orange-500" />
            <h3 className="text-xl font-semibold mt-4">Community Feed</h3>
            <p className="mt-2">
              Share your rides, photos, and connect with fellow bikers.
            </p>
          </motion.div>
          <motion.div className="feature" variants={fadeIn}>
            <Newspaper size={48} className="mx-auto text-orange-500" />
            <h3 className="text-xl font-semibold mt-4">Biker Blogs</h3>
            <p className="mt-2">Read and write stories, tips, and reviews.</p>
          </motion.div>
          <motion.div className="feature" variants={fadeIn}>
            <Map size={48} className="mx-auto text-orange-500" />
            <h3 className="text-xl font-semibold mt-4">Organized Trips</h3>
            <p className="mt-2">
              Plan, join, and navigate group rides and tours.
            </p>
          </motion.div>
          <motion.div className="feature" variants={fadeIn}>
            <ShoppingCart size={48} className="mx-auto text-orange-500" />
            <h3 className="text-xl font-semibold mt-4">Marketplace</h3>
            <p className="mt-2">Buy and sell bikes, gear, and accessories.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Why ThrottleTribe Section */}
      <motion.section
        className="bg-gray-100 py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Why ThrottleTribe?</h2>
          <p className="mt-4 text-lg">
            ThrottleTribe is more than just an app; it&apos;s a community. Built by
            riders, for riders. We understand the passion, the freedom, and the
            camaraderie of the motorcycling world. Join us to connect with a
            global network of enthusiasts who share your love for the open road.
          </p>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        id="testimonials"
        className="py-20 px-4 md:scroll-m-24 bg-gray-100"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center">What Our Riders Say</h2>
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-8 text-center"
          variants={staggerContainer}
        >
          <motion.div
            className="testimonial p-6 border rounded-lg hover:shadow-md ease-in-out duration-150"
            variants={fadeIn}
          >
            <p>
              &quot;ThrottleTribe helped me find a local riding group, and I&apos;ve made
              some great friends.&quot;
            </p>
            <p className="mt-4 font-semibold">- Alex R.</p>
          </motion.div>
          <motion.div
            className="testimonial p-6 border rounded-lg hover:shadow-md ease-in-out duration-150"
            variants={fadeIn}
          >
            <p>
              &quot;The marketplace is fantastic! I sold my old gear in just a few
              days.&quot;
            </p>
            <p className="mt-4 font-semibold">- Jessica M.</p>
          </motion.div>
          <motion.div
            className="testimonial p-6 border rounded-lg hover:shadow-md ease-in-out duration-150"
            variants={fadeIn}
          >
            <p>
              &quot;Planning trips is so much easier with the app. The routes are
              great and the community is super helpful.&quot;
            </p>
            <p className="mt-4 font-semibold">- Mike P.</p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Get Started Section */}
      <motion.section
        className="bg-orange-500 text-white py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold">Ready to Join the Tribe?</h2>
        <p className="mt-4 text-lg">
          Create an account today and start your journey with thousands of
          fellow riders.
        </p>
        <Link href="/register">
          <Button className="mt-8 bg-white text-orange-500 hover:bg-gray-200">
            Get Started Now <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        className="py-20 px-4 md:scroll-m-24"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <motion.div
          className="mt-12 max-w-2xl mx-auto"
          variants={staggerContainer}
        >
          <motion.div className="faq-item mt-4" variants={fadeIn}>
            <h3 className="text-xl font-semibold">
              Is ThrottleTribe free to use?
            </h3>
            <p className="mt-2">
              Yes, the basic features of ThrottleTribe are completely free. We
              may introduce premium features in the future.
            </p>
          </motion.div>
          <motion.div className="faq-item mt-4" variants={fadeIn}>
            <h3 className="text-xl font-semibold">
              Can I organize my own trips?
            </h3>
            <p className="mt-2">
              Absolutely! You can create your own trips, invite friends, and
              share them with the community.
            </p>
          </motion.div>
          <motion.div className="faq-item mt-4" variants={fadeIn}>
            <h3 className="text-xl font-semibold">
              Is the marketplace secure?
            </h3>
            <p className="mt-2">
              We provide a platform for users to connect, but we always
              recommend following safe practices for buying and selling online.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-orange-500 text-white text-center py-8">
        <p>
          &copy; {new Date().getFullYear()} ThrottleTribe. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="#" className="hover:underline">
            Facebook
          </Link>
          <Link href="#" className="hover:underline">
            Twitter
          </Link>
          <Link href="#" className="hover:underline">
            Instagram
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Page;
