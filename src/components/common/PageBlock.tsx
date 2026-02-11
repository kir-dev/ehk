"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card";

function PostBlock({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className="container mx-auto">
            <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-3 md:p-6">
                    <div className={cn("flex flex-col gap-2 md:gap-3", className)}
                        {...props}>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export { PostBlock }

