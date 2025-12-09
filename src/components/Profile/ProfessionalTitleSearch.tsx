import { useMemo, useState } from "react";
import { debounce } from "@/lib/debounce";
import { useGetProfessionalTitle } from "@/Services/profile/useProfile";
import { ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";






export const ProfessionalTitleSearch = ( { form }: { form: any } ) => {



    // Search state
    const [search, setSearch] = useState<string>("");



    // Create a stable debounced setter (runs after 500ms)
    const debouncedSearch = useMemo(() => debounce(setSearch, 500), []);



    // Get Professional Title
    const { data: titles, isFetching, isLoading } = useGetProfessionalTitle(search);




    return (


        <FormField
            control={form.control}
            name="designation"
            render={({ field }) => (


                <FormItem className="flex flex-col">


                    <FormLabel className="text-sm">Professional Title</FormLabel>


                    <Popover>


                        <PopoverTrigger asChild>

                            <FormControl>

                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="dark:bg-transparent w-full h-10 justify-between text-sm rounded-lg border-muted-foreground/30 text-muted-foreground font-medium"
                                >
                                    {field.value ? field.value : "Select title"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>

                            </FormControl>

                        </PopoverTrigger>


                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">

                            <Command shouldFilter={false}>

                                <CommandInput
                                    placeholder="Search..."
                                    className="h-9"
                                    onValueChange={debouncedSearch}
                                />

                                <CommandEmpty>
                                    {isFetching || isLoading ? "Searching..." : "No titles found."}
                                </CommandEmpty>

                                <div className="max-h-44 sm:max-h-56 overflow-y-auto">

                                    <CommandGroup>

                                        {titles?.map((title) => (

                                            <CommandItem
                                                key={title}
                                                value={title}
                                                onSelect={() => field.onChange(title)}
                                            >

                                                {title}
                                                {field?.value === title && (
                                                    <Check className="ml-auto h-4 w-4" />
                                                )}
                                            </CommandItem>

                                        ))}

                                    </CommandGroup>

                                </div>

                            </Command>

                        </PopoverContent>

                    </Popover>

                    <FormMessage />

                </FormItem>

            )}

        />

    );

};
