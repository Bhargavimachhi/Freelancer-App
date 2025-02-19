import OnboardingNavigation from "@/components/OnboardingNavigation";
import { useState } from "react";

export default function SkillSelector() {
  const [skills, setSkills] = useState(["Web Development", "Web Application"]);
  const [input, setInput] = useState("");
  const allSkills = [
    "Web Development",
    "Web Application",
    "React.js",
    "Node.js",
    "MongoDB",
    "JavaScript",
    "CSS",
    "HTML",
    "Tailwind CSS",
    "API Development",
    "UI/UX Design",
    "Software Engineering",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
  ];

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(input.toLowerCase()) &&
      !skills.includes(skill)
  );

  const addSkill = (skill) => {
    if (!skills.includes(skill) && skills.length < 15) {
      setSkills([...skills, skill]);
      setInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <>
      <div className="p-6 mx-auto my-4 bg-white max-w-7xl min-h-[70vh]">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Nearly there! What work are you here to do?
        </h2>
        <p className="mb-2 text-gray-600">
          Your skills show clients what you can offer and help us choose which
          jobs to recommend to you.
        </p>
        <p className="mb-4 underline cursor-pointer text-btn hover:text-btnhover">
          Why choosing carefully matters
        </p>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-gray-700">Your Skills</h3>
          <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-gray-50">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm text-blue-700 transition duration-200 bg-blue-100 rounded-full cursor-pointer hover:bg-blue-200"
                onClick={() => removeSkill(skill)}
              >
                {skill} ✕
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-gray-700">Add a Skill</h3>
          <input
            type="text"
            placeholder="Type to search skills..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <div className="flex flex-wrap gap-2">
            {filteredSkills.map((skill) => (
              <button
                key={skill}
                className="px-3 py-1 text-sm text-gray-700 transition duration-200 bg-gray-100 border rounded-full hover:bg-gray-200"
                onClick={() => addSkill(skill)}
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      </div>
      <OnboardingNavigation />
    </>
  );
}
