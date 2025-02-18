import React, { useState } from "react";

const WorkSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Accounting & Consulting");
  const [selectedServices, setSelectedServices] = useState([]);
  
  const categoryServices = {
     "Accounting & Consulting": [
      "Personal & Professional Coaching",
      "Accounting & Bookkeeping",
      "Financial Planning",
      "Recruiting & Human Resources",
      "Management Consulting & Analysis",
      "Other - Accounting & Consulting",

    ],
    "Admin Support": ["Virtual Assistance", "Data Entry", "Email Management"],
    "Customer Service": ["Call Support", "Live Chat Support", "Technical Assistance"],
    "Data Science & Analytics": ["Machine Learning", "Data Visualization", "Big Data Analysis"],
    "Design & Creative": ["Graphic Design", "Logo Design", "UX/UI Design"],
    "Engineering & Architecture": ["Building & Landscape Architecture","Chemical Engineering","Civil & Structural Engineering","Contract Manufacturing","Electrical & Electronic Engineering","Interior & Trade Show Design","Energy & Mecchanical Engineering","Physical Sciences","3D Modeling & CAD"],
    "IT & Networking" : ["Database Management & Administration","ERP/CRM Software","Information Security & Compliance","Network & System Administration","DevOps & Solution Architecture"],
    "Legal" : ["Corporate & Contract Law","International & Immigration Law","Finance & Tax Law","Public Law"],
    "Sales & Marketing" : ["Digital Marketing","Lead Generation & Telemarketing","Marketing,PR & Brand Strategy"],
    "Translation" : ["Language Tutoring & Interpretation","Translation & Localization Services"],
    "Web,Mobile & Software Dev" : ["Blockchain,NFT & Cryptocurrency","AI Apps & Integration","Desktop Application Development","Ecommerce Development","Game Design & Development","Mobile Development","Other-Software Development","Product Management & Scrum","QA Testing","Scripts & Utilities","Web & Mobile Design","web Development"],
    "Writing" : ["Sales & Marketing Copywriting","Content Writing","Editing & Proofreading Services","Professional & Business Writing"]
  };
  
  const categories = Object.keys(categoryServices);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : prev.length < 3
        ? [...prev, service]
        : prev
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-6 bg-bg my-4 max-w-7xl mx-auto rounded-lg">
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-6 border-text md:border-r-2 border-b-2 md:border-b-0">
        <h1 className="text-2xl font-semibold text-text mb-2">
          Great, so what kind of work are you here to do?
        </h1>
        <p className="text-text mb-4">Don't worry, you can change these choices later on.</p>
        <h2 className="text-lg font-medium text-text mb-2">Select 1 category</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer py-1 ${
                selectedCategory === category ? "text-btn font-semibold" : "text-text"
              }`}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedServices([]);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 p-6">
        <h2 className="text-lg font-medium text-text mb-2">Now, select 1 to 3 specialties</h2>
        <div className="space-y-2">
          {categoryServices[selectedCategory]?.map((service) => (
            <label key={service} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedServices.includes(service)}
                onChange={() => toggleService(service)}
                className="w-4 h-4"
              />
              <span className="text-text">{service}</span>
            </label>
          ))}
        </div>
        {selectedServices.length === 0 && (
          <p className="text-red-600 text-sm mt-2">⚠️ You must select at least one service.</p>
        )}
      </div>
    </div>
  );
};

export default WorkSelection;
