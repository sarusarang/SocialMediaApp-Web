import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";




export default function ProfileLoader() {


    return (


        <section className="animate-fade-in" aria-label="profile-loader">


            {/* PROFILE CARD */}
            <Card className="overflow-hidden border-0 sm:border shadow-none sm:shadow-md rounded-xl">


                <CardContent className="px-4 sm:p-6">


                    <div className="flex flex-col md:flex-row gap-2 md:gap-8">


                        {/* Avatar */}
                        <div className="flex flex-col items-center gap-4">
                            <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full" />

                            <Skeleton className="h-9 w-32 rounded-full" />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 space-y-4 mt-5 md:mt-0">
                          
                            {/* Name */}
                            <Skeleton className="h-8 w-48 rounded-md" />

                            {/* Username */}
                            <Skeleton className="h-4 w-28 rounded-md" />

                            {/* Bio */}
                            <Skeleton className="h-4 w-60 rounded-md" />
                            <Skeleton className="h-4 w-40 rounded-md" />

                            {/* Website */}
                            <Skeleton className="h-4 w-32 rounded-md" />

                            {/* Stats */}
                            <div className="flex gap-6 md:gap-12">
                                <Skeleton className="h-6 w-14 rounded-md" />
                                <Skeleton className="h-6 w-20 rounded-md" />
                                <Skeleton className="h-6 w-20 rounded-md" />
                            </div>

                        </div>

                    </div>

                </CardContent>

            </Card>


            {/* TABS */}
            <Card className="mt-4 border-0 sm:border shadow-none sm:shadow-md rounded-xl">

                {/* TAB BUTTONS */}
                <div className="border-b flex text-sm font-medium p-3">
                    <Skeleton className="flex-1 h-10 rounded-l-2xl rounded-r-none" />
                    <Skeleton className="flex-1 h-10 rounded-r-2xl rounded-l-none" />
                </div>

                {/* GRID LOADER */}
                <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-xl" />
                        ))}
                    </div>
                </CardContent>

            </Card>


        </section>

);

}
