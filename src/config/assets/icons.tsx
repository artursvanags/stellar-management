import {
  ChevronsUpDown,
  ChevronDown,
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
  Edit: Pencil,
  Archive: Archive,
  Favorite: Star,
  Unfavorite: StarOff,
  Delete: Trash,
};
