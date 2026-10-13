import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Icon Imports (commonly used)
// ============================================

export {
  // Navigation
  Home,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ExternalLink,

  // Social
  Mail,
  Rss,

  // Content
  BookOpen,
  Video,
  Code,
  FileText,
  Calendar,
  Clock,
  Tag,
  Search,
  Filter,

  // Running
  Activity,
  Timer,
  MapPin,
  TrendingUp,
  Flame,

  // UI
  Check,
  AlertCircle,
  Info,
  Loader2,
  Star,
  Heart,
  Share2,
  Download,
  Copy,
  Link,

  // Misc
  Sun,
  Moon,
  Zap,
  Target,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// ============================================
// Icon Wrapper Component
// ============================================

export interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function Icon({
  icon: IconComponent,
  size = "md",
  className,
}: IconProps) {
  return (
    <IconComponent size={sizeMap[size]} className={cn("shrink-0", className)} />
  );
}
