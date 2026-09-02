import React, { forwardRef, useRef, useState, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { createPortal } from "react-dom";
import { cn } from "@/libs/utils";
import gsap from "gsap";
import { User } from "lucide-react";

const tooltipVariants = cva(
    "fixed z-50 px-3 py-1.5 text-xs font-medium rounded-md shadow-md pointer-events-none transition-none",
    {
        variants: {
            variant: {
                dark: "bg-slate-900 text-white border border-slate-800",
                light: "bg-white text-gray-800 border border-gray-200 shadow-lg",
                primary: "bg-indigo-600 text-white",
            },
        },
        defaultVariants: {
            variant: "dark",
        },
    }
);

export interface TooltipProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
    content: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
}

const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
    (
        {
            children,
            content,
            position = "top",
            variant,
            delay = 200,
            className,
            ...props
        },
        ref
    ) => {
        const [isVisible, setIsVisible] = useState(false);
        const [coords, setCoords] = useState({ top: 0, left: 0 });
        const targetRef = useRef<HTMLSpanElement | null>(null);
        const tooltipRef = useRef<HTMLDivElement | null>(null);
        const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

        const updatePosition = () => {
            if (!targetRef.current || !tooltipRef.current) return;

            const targetRect = targetRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const offset = 8;

            let top = 0;
            let left = 0;

            switch(position){
                case "bottom": 
                top = targetRect.bottom + offset;
                left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                break;
                case "left": 
                top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                left = targetRect.left - tooltipRect.width - offset;
                break;
                case "right": 
                top = targetRect.top + targetRect.height / 2 - tooltipRect.height / 2;
                left = targetRect.right + offset;
                break;
                case "top": 
                default:
                top = targetRect.top - tooltipRect.height - offset;
                left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2;
                break;
            }
             setCoords({ top, left });
        };

        useEffect(() => {
          if(!isVisible) return;
            updatePosition();
            window.addEventListener("scroll", updatePosition);
            window.addEventListener("resize", updatePosition);

        
          return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
          }
        }, [isVisible, position])
        
        const handleMouseEnter = () => {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(true);
            }, delay);
        }
        const handleMouseLeave = () => {
            if(timeoutRef.current) clearTimeout(timeoutRef.current);
            if(tooltipRef.current) {
                gsap.to(tooltipRef.current, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.15,
                    onComplete: () => setIsVisible(false),
                });
            } else {
                setIsVisible(false);
            }
        };

        useEffect(() => {
            if(isVisible && tooltipRef.current) {
                gsap.fromTo(
                    tooltipRef.current,
                    { opacity: 0, scale: 0.95},
                    { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out"}
                );
            }

        }, [isVisible]);

    return (
        <>
        <span
        ref={(node) => {
            targetRef.current = node;
            if(typeof ref === "function") ref(node);
            else if(ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }} 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
        {...props}
        >
            {children}
        </span>
        {isVisible && 
        createPortal(
            <div 
            ref={tooltipRef}
            role="tooltip"
            className={cn(tooltipVariants({ variant }), className)}
            style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
            >
                {content}

            </div>,
            document.body
        )
    }
        </>
    )

}
);




Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };

