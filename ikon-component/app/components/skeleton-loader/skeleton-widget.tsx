import { Skeleton } from "@/shadcn/ui/skeleton";

export function SkeletonWidget({ count }: { count: number }) {
    return (
        <div className='flex flex-row gap-3 w-full'>
            {count > 0 && Array.from({ length: count }).map((_, index) => (
                <Skeleton key={'widget_'+index} className={"w-1/"+count+" flex flex-col md:flex-row gap-2 h-20"}>
                    <div className="flex flex-1 flex-row justify-between border rounded-md p-2 bg-card-new"></div>
                </Skeleton>
            ))}
        </div>
    );
}