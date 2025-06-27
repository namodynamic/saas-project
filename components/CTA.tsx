import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
}

interface CTASectionProps {
  badge?: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  buttons: CTAButton[];
  variant?: "gradient" | "light" | "dark";
  className?: string;
}

const CTA = ({
  badge,
  title,
  description,
  image,
  buttons,
  variant = "gradient",
  className,
}: CTASectionProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white";
      case "light":
        return "bg-gray-50 text-gray-900";
      case "dark":
        return "bg-gray-900 text-white";
      default:
        return "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white";
    }
  };

  const getButtonVariant = (buttonVariant: string) => {
    switch (buttonVariant) {
      case "primary":
        return variant === "gradient"
          ? "bg-white text-gray-900 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700";
      case "secondary":
        return variant === "gradient"
          ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          : "bg-gray-600 text-white hover:bg-gray-700";
      case "outline":
        return variant === "gradient"
          ? "border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          : "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent";
      default:
        return "bg-white text-gray-900 hover:bg-gray-100";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "gradient":
        return "text-blue-100";
      case "light":
        return "text-gray-600";
      case "dark":
        return "text-gray-300";
      default:
        return "text-blue-100";
    }
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8",
        getVariantStyles(),
        className
      )}
    >
      {variant === "gradient" && (
        <>
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {badge && (
              <Badge
                variant="secondary"
                className={cn(
                  "inline-flex px-4 py-2 text-sm font-medium rounded-3xl",
                  variant === "gradient"
                    ? "bg-white/20 text-white border-0"
                    : variant === "light"
                    ? "bg-blue-100 text-blue-800 border-0"
                    : "bg-gray-800 text-gray-200 border-0"
                )}
              >
                {badge}
              </Badge>
            )}

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                {title}
              </h2>
              <p
                className={cn(
                  "text-lg sm:text-xl leading-relaxed max-w-2xl",
                  getTextColor()
                )}
              >
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {buttons?.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  className={cn(
                    "px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg",
                    getButtonVariant(button.variant || "primary")
                  )}
                  asChild
                >
                  <Link href={button.href} className="flex items-center">
                    {button.icon && <span className="mr-1">{button.icon}</span>}
                    {button.text}
                    {!button.icon && <ChevronRight className="ml-1 h-5 w-5" />}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {image && (
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={image.width || 400}
                  height={image.height || 300}
                  className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA;
