interface GlowingEffectProps {
    blur?: number;
    inactiveZone?: number;
    proximity?: number;
    spread?: number;
    variant?: "default" | "white";
    glow?: boolean;
    className?: string;
    disabled?: boolean;
    movementDuration?: number;
    borderWidth?: number;
}
export declare const GlowingEffect: ({ blur, inactiveZone, proximity, spread, variant, glow, className, movementDuration, borderWidth, disabled, }: GlowingEffectProps) => import("react/jsx-runtime").JSX.Element;
export {};
