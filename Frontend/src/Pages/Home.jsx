import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import workImage from "../assets/images/work.jpg";

const Home = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    async function addUser() {
      const userData = {
        Clerk_id: user?.id,
        name: user?.firstName,
        email: user?.primaryEmailAddress.emailAddress,
      };

      try {
        await axios.post("http://localhost:3000/user/add", userData);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    addUser();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="container relative px-4 pt-16 mx-auto text-center max-w-7xl">
          <div className="max-w-2xl mx-auto">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              We are building bridge between clients and freelancers
            </h1>
            <p className="mb-8 text-text">
              Find high-quality talent or open jobs with the help of AI tools
              that keep you in control.
            </p>
          </div>
        </section>

        {/* Up your work game section */}
        <section className="container px-4 py-16 mx-auto max-w-7xl">
          <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
            <div className="flex gap-4">
              <div className="shrink-0">✨</div>
              <div>
                <h3 className="mb-2 font-semibold">No cost to join</h3>
                <p className="text-sm text-text">
                  Browse and browse talent profiles, preview projects, or even
                  book a consultation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0">🎯</div>
              <div>
                <h3 className="mb-2 font-semibold">
                  Post a job and hire top talent
                </h3>
                <p className="text-sm text-text">
                  Finding talent doesn't have to be a chore. Post a job or we
                  can search for you!
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0">💰</div>
              <div>
                <h3 className="mb-2 font-semibold">
                  Work with the best—without breaking the bank
                </h3>
                <p className="text-sm text-text">
                  Upwork makes it affordable to up your work and take advantage
                  of low transaction rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Browse talent section */}
        <section className="container px-4 py-16 mx-auto max-w-7xl">
          <h2 className="mb-4 text-2xl font-bold">Browse talent by category</h2>
          <p className="mb-8 text-text">
            Looking for work?{" "}
            <a href="/projects" className="text-head hover:underline">
              Browse jobs
            </a>
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="transition-shadow hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enterprise Suite section */}
        <section className="mx-auto mb-4 text-white rounded-lg bg-btn max-w-7xl">
          <div className="container grid items-center gap-8 px-4 py-16 mx-auto md:grid-cols-2">
            <div className="space-y-6 lg:ml-16">
              <h2 className="text-3xl font-bold md:text-4xl">
                This is how{" "}
                <span className="text-text">
                  good companies find good company.
                </span>
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Access expert talent to
                  fill your skill gaps
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Control your workflow,
                  hire, classify and pay your talent
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-white">✓</span> Partner with Upwork for
                  end-to-end support
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] flex items-center justify-center">
              <img
                src={workImage}
                alt="Enterprise workspace"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* For clients section */}
        <section className="mx-auto mb-4 rounded-lg bg-bg max-w-7xl">
          <div className="container px-4 py-16 mx-auto">
            <div className="max-w-xl">
              <div className="mb-4 text-sm font-medium">For clients</div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Find talent your way
              </h2>
              <p className="mb-8 text-text">
                Work with the largest network of independent professionals and
                get things done—from quick turnarounds to big transformations.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Button
                variant="outline"
                className="flex flex-col items-start h-auto px-6 py-8 text-white bg-btn hover:bg-btnhover"
                onClick={() => {
                  navigate("/my-projects");
                }}
              >
                <h3 className="mb-2 text-lg font-semibold">
                  Post a job and hire a pro
                </h3>
                <span className="text-sm">Talent Marketplace →</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-start h-auto px-6 py-8 text-white bg-gray-900 hover:bg-gray-800"
                onClick={() => {
                  navigate("/freelancers");
                }}
              >
                <h3 className="mb-2 text-lg font-semibold">Hire Talent</h3>
                <span className="text-sm">Freelancers →</span>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;

const categories = [
  { name: "Development & IT", rating: "4.85/5", skills: "1853" },
  { name: "AI Services", rating: "4.8/5", skills: "294" },
  { name: "Design & Creative", rating: "4.9/5", skills: "968" },
  { name: "Sales & Marketing", rating: "4.77/5", skills: "392" },
  { name: "Writing & Translation", rating: "4.92/5", skills: "505" },
  { name: "Admin & Customer Support", rating: "4.77/5", skills: "508" },
  { name: "Finance & Accounting", rating: "4.79/5", skills: "214" },
  { name: "Engineering & Architecture", rating: "4.85/5", skills: "650" },
];
