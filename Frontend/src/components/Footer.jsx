import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ICONS } from "@/assets/icons/icons";

const footerLinks = [
  {
    title: "For Clients",
    links: [
      "How to hire",
      "Talent Marketplace",
      "Project Catalog",
      "Hire an agency",
      "Enterprise",
      "Business Plus",
      "Any Hire",
      "Contract-to-hire",
      "Direct Contracts",
      "Hire worldwide",
      "Hire in the USA",
    ],
  },
  {
    title: "For Talent",
    links: [
      "How to find work",
      "Direct Contracts",
      "Find freelance jobs worldwide",
      "Find freelance jobs in the USA",
      "Win work with ads",
      "Exclusive resources with Freelancer Plus",
    ],
  },
  {
    title: "Resources",
    links: [
      "Help & support",
      "Success stories",
      "Upwork reviews",
      "Resources",
      "Blog",
      "Affiliate programme",
      "Free Business Tools",
    ],
  },
  {
    title: "Company",
    links: [
      "About us",
      "Leadership",
      "Investor relations",
      "Careers",
      "Our impact",
      "Press",
      "Contact us",
      "Partners",
      "Trust, safety & security",
      "Modern slavery statement",
    ],
  },
];

const socialIcons = [
  ICONS.FACEBOOK,
  ICONS.TWITTER,
  ICONS.LINKEDIN,
  ICONS.INSTAGRAM,
  ICONS.YOUTUBE,
];

const legalLinks = [
  "Terms of Service",
  "Privacy Policy",
  "CA Notice at Collection",
  "Cookie Settings",
  "Accessibility",
];

export default function Footer() {
  return (
    <footer className="px-6 py-10 text-white bg-black md:px-16">
      <div className="mx-auto text-sm max-w-7xl">
        <div className="hidden grid-cols-4 gap-8 md:grid">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="mb-2 text-base font-semibold text-white">
                {section.title}
              </h3>
              <ul className="space-y-2 text-gray-300">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="py-1 transition-colors duration-200 cursor-pointer hover:text-white"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:hidden">
          {footerLinks.map((section, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <DisclosureButton className="flex items-center justify-between w-full py-2 font-semibold text-left text-white transition-transform duration-500 transform">
                    {section.title}
                    <span
                      className={`transition-transform duration-500 ${
                        open ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <ICONS.ARROW_DOWN />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pl-4 mt-2 space-y-2 text-gray-300">
                    <ul>
                      {section.links.map((link, i) => (
                        <li
                          key={i}
                          className="py-1 transition-colors duration-200 hover:text-white"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between pt-6 mt-10 text-xs text-white border-t border-gray-700 md:flex-row">
        <div className="flex gap-3 mb-4 md:mb-0">
          {socialIcons.map((Icon, i) => (
            <Icon key={i} className="text-white cursor-pointer" />
          ))}
        </div>
        <div className="mb-2 text-center md:text-left">
          <p className="text-base text-white">
            &copy; 2015 - {new Date().getFullYear()} Upwork&reg; Global Inc.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-start md:flex-row">
          {legalLinks.map((link, i) => (
            <p key={i} className="cursor-pointer">
              {link}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
