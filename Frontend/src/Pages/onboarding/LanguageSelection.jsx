import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import OnboardingNavigation from "@/components/OnboardingNavigation";

const availableLanguages = [
  "Spanish",
  "French",
  "German",
  "Mandarin",
  "Hindi",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
];

export default function LanguageSelection() {
  const [languages, setLanguages] = useState([{ name: "English", level: "" }]);

  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: "" }]);
  };

  const updateLanguage = (index, name) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].name = name;
    setLanguages(updatedLanguages);
  };

  const updateLevel = (index, level) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].level = level;
    setLanguages(updatedLanguages);
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col p-6 mx-auto my-6 max-w-7xl min-h-[70vh]">
        <h1 className="text-2xl font-semibold">
          Looking good. Next, tell us which languages you speak.
        </h1>
        <p className="mt-2 text-text">
          Upwork is global, so clients are often interested to know what
          languages you speak. English is a must, but do you speak any other
          languages?
        </p>
        <Card className="w-full mt-6">
          <CardContent className="p-4 space-y-4">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-between gap-2 pb-2 border-b sm:flex sm:items-center sm:flex-row"
              >
                <Select onValueChange={(value) => updateLanguage(index, value)}>
                  <SelectTrigger className="flex items-center justify-between w-40 px-3 py-1 border rounded-md">
                    <span>{lang.name || "Select a language"}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-bg">
                    {availableLanguages.map((language) => (
                      <SelectItem
                        key={language}
                        value={language}
                        className="cursor-pointer hover:bg-white"
                      >
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-4">
                  <Select onValueChange={(value) => updateLevel(index, value)}>
                    <SelectTrigger className="flex items-center justify-between w-40 px-3 py-1 border rounded-md">
                      <span>{lang.level || "My level is"}</span>
                    </SelectTrigger>
                    <SelectContent className="bg-bg">
                      {["basic", "conversational", "fluent", "native"].map(
                        (level) => {
                          return (
                            <SelectItem
                              key={level}
                              value={level}
                              className="cursor-pointer hover:bg-white"
                            >
                              {level}
                            </SelectItem>
                          );
                        }
                      )}
                    </SelectContent>
                  </Select>
                  {index !== 0 && (
                    <Button
                      onClick={() => removeLanguage(index)}
                      variant="ghost"
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Button
          onClick={addLanguage}
          variant="outline"
          className="mt-4 border-btn"
        >
          <Plus size={16} /> Add a language
        </Button>
      </div>
      <OnboardingNavigation />
    </>
  );
}
