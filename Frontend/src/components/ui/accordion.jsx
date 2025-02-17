import React, { useState } from "react";
import { ICONS } from "@/assets/icons/icons";
import { motion } from "framer-motion";

export const Accordion = ({ children }) => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (value) => {
    setOpenItem(openItem === value ? null : value);
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { openItem, toggleItem })
  );
};

export const AccordionItem = ({ value, children, openItem, toggleItem }) => {
  const isOpen = openItem === value;

  return (
    <div className="mb-2 border rounded-lg">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, onClick: () => toggleItem(value) })
      )}
    </div>
  );
};

export const AccordionTrigger = ({ children, onClick, isOpen }) => {
  return (
    <button
      className="flex items-center justify-between w-full px-4 py-3 text-left transition-all bg-bg hover:bg-gray-200"
      onClick={onClick}
    >
      <span className="font-medium">{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ICONS.ARROW_DOWN className="w-5 h-5" />
      </motion.div>
    </button>
  );
};

export const AccordionContent = ({ children, isOpen }) => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden bg-white border-t"
    >
      <div className="flex flex-col px-4 py-3">{children}</div>
    </motion.div>
  );
};
