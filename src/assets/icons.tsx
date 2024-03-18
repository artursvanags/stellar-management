import {
  ChevronsUpDown,
  ChevronDown,
  ChevronRight,
  Sun,
  Moon,
  Laptop,
  ArrowUp,
  ArrowDown,
  EyeOff,
  LogIn,
  User,
  Plus,
  Menu,
  Loader,
  Trash,
  CreditCard,
  Package,
  LogInIcon,
  LogOutIcon,
  Info,
  Star,
  StarOff,
  Check,
  Pencil,
  Archive,
  CircleDot,
  File,
  Heart,
  Settings,
  Dot,
  Filter,
  Tag,
  MoreVertical,
  Copy,
 CheckCheck,
   X,
   PanelLeftClose,
   PanelLeftOpen
} from 'lucide-react';

import {
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandGraphql,
  IconBrandJavascript,
  IconBrandWordpress,
  IconBrandTailwind,
  IconBrandGoogle,
  IconBrandGithub,
} from '@tabler/icons-react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export const ToolStackIcons = {
  Tailwind: IconBrandTailwind,
  Nextjs: IconBrandNextjs,
  Typescript: IconBrandTypescript,
  Javascript: IconBrandJavascript,
  Wordpress: IconBrandWordpress,
  Graphql: IconBrandGraphql,
};

export const Icons = {
  logo: User,
  login: LogIn,
  dashboard: User,
  plus: Plus,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  arrowRight: ChevronRight,
  eyeOff: EyeOff,
  sort: ChevronsUpDown,
  sortAsc: ChevronDown,
  HamburgerMenu: Menu,
  Trash: Trash,
  Info: Info,
  Heart: Heart,
  Check: Check,
  Filament: CircleDot,
  Files: File,
  Dot: Dot,
  Filter: Filter,
  Tag: Tag,
  MenuVertical: MoreVertical,
  Copy: Copy,
};

export const ThemeIcons = {
  Sun: Sun,
  Moon: Moon,
  System: Laptop,
};

export const Spinner = Loader;

export const AuthProviderIcons = {
  Github: FaGithub,
  Google: FaGoogle,
};

export const SidebarIcons = {
  Filaments: CircleDot,
  Favorites: Heart,
  Files: File,
  SidebarClose: PanelLeftClose,
  SidebarOpen: PanelLeftOpen,
};

export const MyAccount = {
  Chevron: ChevronDown,
  User: User,
  Billing: CreditCard,
  Settings: Settings,
  Login: LogInIcon,
  Logout: LogOutIcon,
};

export const ActionsIcons = {
  SelectAll: CheckCheck,
  Edit: Pencil,
  Archive: Archive,
  Favorite: Star,
  Unfavorite: StarOff,
  Clear: X,
  Delete: Trash,
};

export const EmptyStateIcons = {
  Filament: Package,
};
