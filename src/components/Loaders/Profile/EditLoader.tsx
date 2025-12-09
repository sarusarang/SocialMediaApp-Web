import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";






export default function EditProfileSkeleton() {


    return (


        <section aria-label="edit-profile-loader" className="container w-full sm:max-w-7xl mx-auto py-0 sm:py-0 px-0 sm:px-4 animate-pulse">


            <Card className="bg-gradient-to-br from-background to-secondary/10 border-0 sm:border shadow-none sm:shadow-sm">


                <CardHeader className="pb-2 sm:pb-6">

                    <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                    </div>

                    <Skeleton className="h-4 w-64 mt-2" />

                </CardHeader>


                <CardContent>

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <Skeleton className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-background" />
                    </div>

                    {/* Form skeleton */}
                    <div className="space-y-6 sm:space-y-8">

                        {/* Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <Skeleton className="h-12 w-full rounded-lg" />
                            <Skeleton className="h-12 w-full rounded-lg" />
                        </div>

                        {/* Website */}
                        <Skeleton className="h-12 w-full rounded-lg" />

                        {/* Bio textarea */}
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </div>

                    {/* Buttons */}
                    <div className="px-0 pt-6 flex gap-2 justify-end">
                        <Skeleton className="h-10 w-24 rounded-lg" />
                        <Skeleton className="h-10 w-32 rounded-lg" />
                    </div>

                </CardContent>

            </Card>

        </section>
    );
}
