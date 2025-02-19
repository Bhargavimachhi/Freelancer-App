import { useNavigate, useLocation } from "react-router-dom";

const useOnboardingNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    "/create-profile",
    "/create-profile/resume-upload",
    "/create-profile/categories",
    "/create-profile/skills",
    "/create-profile/language",
    "/create-profile/role",
    "/create-profile/work-experience",
    "/create-profile/education",
    "/create-profile/bio",
    "/create-profile/hourly-rate", // Last onboarding step
  ];

  const currentIndex = steps.indexOf(location.pathname);

  const goToNextStep = () => {
    if (currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1]);
    } else {
      navigate("/profile"); // Redirect to profile page after last step
    }
  };

  const goToPreviousStep = () => {
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1]);
    }
  };

  return {
    goToNextStep,
    goToPreviousStep,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === steps.length - 1,
  };
};

export default useOnboardingNavigation;
