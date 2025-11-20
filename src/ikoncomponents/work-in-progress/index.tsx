import React from "react";

export function WorkInProgress() {
    return (
        <div className="flex h-full items-center justify-center">
            <div className="bg-background text-forefround rounded-xl p-6 text-center max-w-md">
                <div className="text-3xl font-bold mb-2 animate-pulse">
                    🚧 Work in Progress
                </div>
                <p className="text-muted-foreground">
                    We’re currently working on this section. Check back soon!
                </p>
            </div>
        </div>
    );
}
