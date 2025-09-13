import {
  BookOpen,
  Clapperboard,
  Coffee,
  Mountain,
  Music,
  Smile,
  Utensils,
  Zap,
} from "lucide-react";

export type Category = {
  name: string;
  color: string;
  icon: React.ElementType;
};

export const CATEGORIES: { [key: string]: Category } = {
  food: {
    name: "Food",
    color: "bg-orange-100 text-orange-600",
    icon: Utensils,
  },
  adventure: {
    name: "Adventure",
    color: "bg-green-100 text-green-600",
    icon: Mountain,
  },
  entertainment: {
    name: "Entertainment",
    color: "bg-purple-100 text-purple-600",
    icon: Clapperboard,
  },
  relaxation: {
    name: "Relaxation",
    color: "bg-blue-100 text-blue-600",
    icon: BookOpen,
  },
  music: { name: "Music", color: "bg-pink-100 text-pink-600", icon: Music },
};

export const THEMES = {
  default: {
    name: "Default",
    background: "bg-gray-50",
    header: "bg-white/80",
    card: "bg-white/70",
    primary: "bg-blue-600",
    primaryHover: "hover:bg-blue-700",
    primaryFocus: "focus:ring-blue-500",
    primaryText: "text-blue-600",
    titleText: "text-gray-800",
    icon: "text-blue-600",
  },
  adventurous: {
    name: "Adventurous",
    background: "bg-stone-100",
    header: "bg-stone-50/80",
    card: "bg-stone-50/70",
    primary: "bg-emerald-600",
    primaryHover: "hover:bg-emerald-700",
    primaryFocus: "focus:ring-emerald-500",
    primaryText: "text-emerald-600",
    titleText: "text-stone-800",
    icon: "text-emerald-600",
  },
  lazy: {
    name: "Lazy Weekend",
    background: "bg-indigo-50",
    header: "bg-white/80",
    card: "bg-white/70",
    primary: "bg-purple-600",
    primaryHover: "hover:bg-purple-700",
    primaryFocus: "focus:ring-purple-500",
    primaryText: "text-purple-600",
    titleText: "text-gray-800",
    icon: "text-purple-600",
  },
};

export type Vibe = "😊" | "⚡️" | "😌";

export const VIBES: {
  [key in Vibe]: { icon: React.ElementType; name: string };
} = {
  "😊": { icon: Smile, name: "Happy" },
  "⚡️": { icon: Zap, name: "Energetic" },
  "😌": { icon: Coffee, name: "Relaxed" },
};

export type Activity = {
  id: string;
  name: string;
  category: keyof typeof CATEGORIES;
};
export type ScheduledActivity = Activity & { scheduledId: string; vibe?: Vibe };
export type Day = string;
export type ThemeKey = keyof typeof THEMES;

export const MOCK_ACTIVITIES: Activity[] = [
  { id: "1", name: "Brunch at Sunny Side", category: "food" },
  { id: "2", name: "Mountain Trail Hike", category: "adventure" },
  { id: "3", name: "Watch a new movie", category: "entertainment" },
  { id: "4", name: "Read in the park", category: "relaxation" },
  { id: "5", name: "Live Jazz Night", category: "music" },
  { id: "6", name: "Italian Cooking Class", category: "food" },
];
