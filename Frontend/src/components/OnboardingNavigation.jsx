import React from "react";
import useOnboardingNavigation from "../hooks/useOnboardingNavigation";

const OnboardingNavigation = () => {
  const { goToNextStep, goToPreviousStep, isFirstStep, isLastStep } =
    useOnboardingNavigation();

  return (
    <div
      className={`flex justify-between ${
        isFirstStep ? "p-0" : "p-6"
      } mx-auto my-4 max-w-7xl`}
    >
      {!isFirstStep && (
        <button
          onClick={goToPreviousStep}
          className={`px-4 py-2 text-white rounded bg-text`}
        >
          {isFirstStep ? "Get Started" : "Back"}
        </button>
      )}
      <button
        onClick={goToNextStep}
        className={`px-4 py-2 rounded ${
          isLastStep ? "bg-btn" : "bg-blue-500"
        } text-white`}
      >
        {isLastStep ? "Next" : isFirstStep ? "Get Started" : "Next"}
      </button>
    </div>
  );
};

export default OnboardingNavigation;
