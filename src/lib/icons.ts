import type { LucideIcon } from "lucide-react";
import {
  HelpCircle,
  // Negócios & Marketing
  TrendingUp, BarChart3, Target, Rocket, Zap,
  Award, Crown, Star, Sparkles, Gem,
  // Comunicação
  MessageCircle, MessageSquare, Phone, Mail, Send,
  Megaphone, Bell, AtSign,
  // Pessoas & Saúde
  Users, UserCheck, Heart, HeartPulse, Activity,
  Stethoscope, Pill, Shield, ShieldCheck,
  // Interface & Organização
  Eye, EyeOff, AlertCircle, CheckCircle2, XCircle,
  Info, Search, Filter,
  // Mídia & Design
  Palette, Camera, Image, Video, Music, Mic,
  Play, Pen, PenTool, Brush,
  // Tech & Dados
  LayoutDashboard, FolderKanban, Database, Globe,
  Wifi, Smartphone, Monitor, Laptop,
  // Navegação & Tempo
  Compass, Map, MapPin, Navigation,
  Calendar, Clock, Timer, Hourglass,
  // Finanças
  DollarSign, CreditCard, Wallet, PiggyBank,
  Receipt, BadgeDollarSign,
  // Suporte
  Headphones, LifeBuoy, Wrench, Settings,
  Lightbulb, BookOpen, GraduationCap,
  // Setas & Direção
  ArrowRight, ArrowUpRight, ChevronRight,
  MoveRight, Redo, RefreshCw,
  // Extras comuns
  Briefcase, Building2, FileText, Link, Lock,
  Check, Plus, Minus, X, ExternalLink,
} from "lucide-react";

/* ============================================
   REGISTRO DE ÍCONES
   Mapa curado de ícones (sem import wildcard).
   Apenas os ícones usados no icon picker e
   nos templates são registrados.
   ============================================ */

const iconMap: Record<string, LucideIcon> = {
  HelpCircle,
  TrendingUp, BarChart3, Target, Rocket, Zap,
  Award, Crown, Star, Sparkles, Gem,
  MessageCircle, MessageSquare, Phone, Mail, Send,
  Megaphone, Bell, AtSign,
  Users, UserCheck, Heart, HeartPulse, Activity,
  Stethoscope, Pill, Shield, ShieldCheck,
  Eye, EyeOff, AlertCircle, CheckCircle2, XCircle,
  Info, Search, Filter,
  Palette, Camera, Image, Video, Music, Mic,
  Play, Pen, PenTool, Brush,
  LayoutDashboard, FolderKanban, Database, Globe,
  Wifi, Smartphone, Monitor, Laptop,
  Compass, Map, MapPin, Navigation,
  Calendar, Clock, Timer, Hourglass,
  DollarSign, CreditCard, Wallet, PiggyBank,
  Receipt, BadgeDollarSign,
  Headphones, LifeBuoy, Wrench, Settings,
  Lightbulb, BookOpen, GraduationCap,
  ArrowRight, ArrowUpRight, ChevronRight,
  MoveRight, Redo, RefreshCw,
  Briefcase, Building2, FileText, Link, Lock,
  Check, Plus, Minus, X, ExternalLink,
};

/** Resolve nome do ícone para componente. Fallback: HelpCircle */
export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] || HelpCircle;
}

/** Lista curada de ícones populares para o icon picker do editor */
export const popularIcons: string[] = [
  // Negócios & Marketing
  "TrendingUp", "BarChart3", "Target", "Rocket", "Zap",
  "Award", "Crown", "Star", "Sparkles", "Gem",
  // Comunicação
  "MessageCircle", "MessageSquare", "Phone", "Mail", "Send",
  "Megaphone", "Bell", "AtSign",
  // Pessoas & Saúde
  "Users", "UserCheck", "Heart", "HeartPulse", "Activity",
  "Stethoscope", "Pill", "Shield", "ShieldCheck",
  // Interface & Organização
  "Eye", "EyeOff", "AlertCircle", "CheckCircle2", "XCircle",
  "Info", "HelpCircle", "Search", "Filter",
  // Mídia & Design
  "Palette", "Camera", "Image", "Video", "Music", "Mic",
  "Play", "Pen", "PenTool", "Brush",
  // Tech & Dados
  "LayoutDashboard", "FolderKanban", "Database", "Globe",
  "Wifi", "Smartphone", "Monitor", "Laptop",
  // Navegação & Tempo
  "Compass", "Map", "MapPin", "Navigation",
  "Calendar", "Clock", "Timer", "Hourglass",
  // Finanças
  "DollarSign", "CreditCard", "Wallet", "PiggyBank",
  "Receipt", "BadgeDollarSign",
  // Suporte
  "Headphones", "LifeBuoy", "Wrench", "Settings",
  "Lightbulb", "BookOpen", "GraduationCap",
  // Setas & Direção
  "ArrowRight", "ArrowUpRight", "ChevronRight",
  "MoveRight", "Redo", "RefreshCw",
];
