import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function ProjectCard({
  name,
  tags,
  experienceLevel,
  price,
  onViewProject,
}) {
  return (
    <Card className="w-full p-2 transition-transform duration-300 bg-white rounded-lg shadow-md sm:p-4 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start justify-start gap-2 sm:items-center sm:justify-between sm:flex-row">
          <span className="text-text">Skills Required :</span>
          <div className="flex gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Experience Level</span>
          <span className="font-medium">
            {experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text">Price</span>
          <span className="text-lg font-bold text-green-600">
            &#8377;{price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full font-semibold text-white bg-blue-600 hover:bg-blue-700"
          onClick={onViewProject}
        >
          View Project
        </Button>
      </CardFooter>
    </Card>
  );
}
