import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useGetUserQuery } from "@/lib/store/services/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z
  .object({
    profileImage: z.instanceof(File).optional(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9_-]*$/,
        "Username can only contain letters, numbers, underscores, and hyphens"
      ),
    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters")
      .max(254, "Email must be less than 254 characters"),
    password: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true; // Skip validation if empty
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          val
        );
      }, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),
    dateOfBirth: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        const date = new Date(val);
        const now = new Date();
        const minDate = new Date();
        minDate.setFullYear(now.getFullYear() - 100); // Max age 100 years
        const maxDate = new Date();
        maxDate.setFullYear(now.getFullYear() - 13); // Min age 13 years
        return date >= minDate && date <= maxDate;
      }, "You must be between 13 and 100 years old"),
    presentAddress: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length <= 200,
        "Address must be less than 200 characters"
      ),
    permanentAddress: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length <= 200,
        "Address must be less than 200 characters"
      ),
    city: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 2 && val.length <= 50),
        "City must be between 2 and 50 characters"
      ),
    postalCode: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        // Matches most common postal code formats
        return /^[A-Z0-9]{3,10}$/i.test(val.replace(/\s/g, ""));
      }, "Invalid postal code format"),
    country: z
      .string()
      .optional()
      .refine(
        (val) => !val || (val.length >= 2 && val.length <= 50),
        "Country must be between 2 and 50 characters"
      ),
  })
  .refine(
    (data) => {
      if (data.profileImage) {
        return (
          data.profileImage.size <= MAX_FILE_SIZE &&
          ACCEPTED_IMAGE_TYPES.includes(data.profileImage.type)
        );
      }
      return true;
    },
    {
      message:
        "Profile image must be less than 5MB and in JPEG, JPG, PNG, or WEBP format",
      path: ["profileImage"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export function EditProfileForm() {
  const { data: user, isLoading } = useGetUserQuery();
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      dateOfBirth: "",
      presentAddress: "",
      permanentAddress: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  useEffect(() => {
    if (user) {
      // Format date to YYYY-MM-DD for input type="date"
      const formattedDate = user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : undefined;

      form.reset({
        name: user.name,
        username: user.name,
        email: user.email,
        password: "**********",
        dateOfBirth: formattedDate,
        presentAddress: user.presentAddress,
        permanentAddress: user.permanentAddress,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
      });
      setPreviewImage(user.avatar);
    }
  }, [user, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function onSubmit(data: FormValues) {
    console.log("Form data:", data);
    // TODO: Handle form submission
  }

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        form.setError("profileImage", {
          type: "manual",
          message: "File size should be less than 5MB",
        });
        return;
      }
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        form.setError("profileImage", {
          type: "manual",
          message: "File type should be JPEG, JPG, PNG, or WEBP",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("profileImage", file);
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr]">
      {/* Left Column - Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
          />
          <img
            src={previewImage}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right Column - Form Fields */}
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="name"
                        aria-label="Full name"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.name && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="username"
                        aria-label="Username"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.username && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        autoComplete="email"
                        aria-label="Email address"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.email && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        autoComplete="current-password"
                        aria-label="Current password"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.password && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        autoComplete="bday"
                        aria-label="Date of birth"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.dateOfBirth && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="presentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Present Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="street-address"
                        aria-label="Present address"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.presentAddress &&
                            "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="permanentAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permanent Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="address-line2"
                        aria-label="Permanent address"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.permanentAddress &&
                            "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="address-level2"
                        aria-label="City"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.city && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="postal-code"
                        aria-label="Postal code"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.postalCode && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        autoComplete="country"
                        aria-label="Country"
                        className={cn(
                          "h-12 rounded-lg border-[#E2E8F0] bg-white",
                          form.formState.errors.country && "border-red-500"
                        )}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="h-12 px-8 text-base float-right">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
