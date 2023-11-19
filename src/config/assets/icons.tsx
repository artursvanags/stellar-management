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
  Loader2,
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

export const ToolStackIcons = {
  Tailwind: IconBrandTailwind,
  Nextjs: IconBrandNextjs,
  Typescript: IconBrandTypescript,
  Javascript: IconBrandJavascript,
  Wordpress: IconBrandWordpress,
  Graphql: IconBrandGraphql,
};

export const Spinner = Loader2;

export const AuthProviderIcons = {
  Github: IconBrandGithub,
  Google: IconBrandGoogle,
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
  Orders: Package,
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
