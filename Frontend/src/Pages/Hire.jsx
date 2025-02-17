import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICONS } from "@/assets/icons/icons";

const features = [
  {
    Icon: ICONS.STAR,
    title: "Over 1M reviews",
    text: "Highly rated professionals",
  },
  {
    Icon: ICONS.SHIELD,
    title: "Protected payments",
    text: "Hassle-free billing",
  },
  {
    Icon: ICONS.USERS,
    title: "Hire who you need",
    text: "Find pros quickly",
  },
];

const images = [
  {
    src: "https://placehold.co/400",
    alt: "Profile",
    style: "sm:left-[10%] sm:top-[20%] bottom-[30%]",
  },
  {
    src: "https://placehold.co/400",
    alt: "Profile",
    style: "sm:right-[15%] sm:top-[10%] right-[0px] top-[40%]",
  },
  {
    src: "https://placehold.co/400",
    alt: "Profile",
    style: "right-[25%] sm:top-[50%] bottom-[0px]",
  },
  {
    src: "https://placehold.co/400",
    alt: "Profile",
    style: "left-[20%] sm:top-[60%] bottom-[0px]",
  },
];

const services = [
  "Development & IT",
  "Design & Creative",
  "AI Services",
  "Sales & Marketing",
  "Writing & Translation",
  "Admin & Customer Support",
  "Finance & Accounting",
  "Legal",
  "HR & Training",
  "Engineering & Architecture",
];

const Hire = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container relative px-4 py-12 mx-auto text-center max-w-7xl">
        <div className="relative mx-auto max-w-7xl">
          {/* Profile Images */}
          <div className="absolute top-0 left-0 right-0 z-[-99]">
            <div className="relative h-[300px]">
              {images.map((image, index) => {
                return (
                  <>
                    <img
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className={`absolute ${image.style} w-20 h-20 rounded-full border-2 border-white`}
                    />
                  </>
                );
              })}
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Build your business with <br />
            <span className="text-btn">top freelancers</span>
          </h1>
          <p className="mt-4 text-lg text-text">
            Post a job and connect with independent talent today.
          </p>
          <div className="mt-8">
            <Button className="text-white cursor-pointer bg-btn hover:bg-btnhover">
              Get started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-12 text-2xl font-bold">
          Safe and secure hiring, for any size of work
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-start gap-4">
              <Icon className="w-6 h-6 text-btn" />
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container px-4 py-16 mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold">
          Choose a category to see popular skills for hire
        </h2>
        <div className="mb-8 space-x-4">
          <Button className="text-white bg-btn hover:bg-btnhover">
            Solo professionals
          </Button>
          <Button variant="outline">Teams</Button>
        </div>
        <p className="mb-8 text-text">
          Hiring a professional is great for growing your team or working on a
          project.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {services.map((category) => (
            <AccordionItem key={category} value={category} className="mb-4">
              <AccordionTrigger className="text-left">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                {/* add map function here - coming soon */}
                <Link className="mb-3 text-black">
                  Popular skills for {category}
                </Link>
                <Link className="mb-3 text-black">
                  Popular skills for {category}
                </Link>
                <Link className="mb-3 text-black">
                  Popular skills for {category}
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Trust Badges */}
      <section className="container px-4 py-16 mx-auto max-w-7xl">
        <p className="mb-8 text-sm text-gray-600">Trusted by</p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {["Microsoft", "Airbnb", "GE", "Automattic", "Bissell", "Coty"].map(
            (company) => (
              <div
                key={company}
                className="flex items-center justify-center transition-all grayscale hover:grayscale-0"
              >
                <img
                  src="/placeholder.svg"
                  alt={company}
                  className="object-contain w-auto h-8"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="container px-4 py-16 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-btn">
              A talent edge for your entire organization
            </h2>
            <p className="mt-2 text-text">
              Enterprise Suite helps you hire, manage, and scale talent
              strategically.
            </p>
          </div>
          <Button className="text-white bg-btn hover:bg-btnhover">
            Schedule a call
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Hire;
