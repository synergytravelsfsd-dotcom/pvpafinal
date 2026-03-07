import { useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type RegistrationDialogProps = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  defaultType?: "Student" | "Visitor" | "Exhibitor";
};

const schema = z.object({
  attendeeType: z.enum(["Student", "Visitor", "Exhibitor", "Other"]),
  attendeeOther: z.string().optional(),
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  mobile: z.string().min(7, "Enter a valid mobile number"),
  city: z.string().min(2, "City is required"),
  profession: z.string().min(2, "Profession is required"),
  industryRole: z.enum(["Manufacturer", "Importer", "Exporter", "Distributor", "Pharmacist", "Other"]),
  industryOther: z.string().optional(),
}).refine((v) => (v.attendeeType === "Other" ? !!v.attendeeOther && v.attendeeOther.length >= 2 : true), {
  message: "Please specify type",
  path: ["attendeeOther"],
}).refine((v) => (v.industryRole === "Other" ? !!v.industryOther && v.industryOther.length >= 2 : true), {
  message: "Please specify role",
  path: ["industryOther"],
});

type FormValues = z.infer<typeof schema>;

export default function RegistrationDialog({ open, onOpenChange, defaultType = "Visitor" }: RegistrationDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      attendeeType: defaultType,
      attendeeOther: "",
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      profession: "",
      industryRole: "Manufacturer",
      industryOther: "",
    },
  });

  const labelForType = useMemo(() => {
    if (form.getValues("attendeeType") === "Exhibitor") return "Company / Organization";
    if (form.getValues("attendeeType") === "Student") return "Institution / University";
    return "Profession";
  }, [form.watch("attendeeType")]);

  const gFormConfig = {
    id: import.meta.env.VITE_GFORM_ID as string | undefined,
    name: import.meta.env.VITE_GFORM_NAME as string | undefined,
    attendeeType: import.meta.env.VITE_GFORM_ATTENDEE as string | undefined,
    email: import.meta.env.VITE_GFORM_EMAIL as string | undefined,
    mobile: import.meta.env.VITE_GFORM_MOBILE as string | undefined,
    city: import.meta.env.VITE_GFORM_CITY as string | undefined,
    profession: import.meta.env.VITE_GFORM_PROFESSION as string | undefined,
  };

  const canSubmitToGoogle = Boolean(
    gFormConfig.id &&
      gFormConfig.name &&
      gFormConfig.attendeeType &&
      gFormConfig.email &&
      gFormConfig.mobile &&
      gFormConfig.city &&
      gFormConfig.profession,
  );

  const submitToGoogleForms = async (values: FormValues) => {
    const url = `https://docs.google.com/forms/d/e/${gFormConfig.id}/formResponse`;
    const fd = new FormData();
    fd.append(`entry.${gFormConfig.name!}`, values.fullName);
    fd.append(
      `entry.${gFormConfig.attendeeType!}`,
      values.attendeeType === "Other" && values.attendeeOther ? `Other: ${values.attendeeOther}` : values.attendeeType,
    );
    fd.append(`entry.${gFormConfig.email!}`, values.email);
    fd.append(`entry.${gFormConfig.mobile!}`, values.mobile);
    fd.append(`entry.${gFormConfig.city!}`, values.city);
    fd.append(`entry.${gFormConfig.profession!}`, values.profession);
    await fetch(url, { method: "POST", body: fd, mode: "no-cors" });
  };

  const onSubmit = (values: FormValues) => {
    try {
      const payload = {
        ...values,
        submittedAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("pvpa_expo_registrations") || "[]");
      localStorage.setItem("pvpa_expo_registrations", JSON.stringify([payload, ...existing]));

      if (canSubmitToGoogle) {
        submitToGoogleForms(values).catch(() => {});
      }

      const waText = encodeURIComponent(
        [
          "Expo 2026 Registration",
          `Name: ${values.fullName}`,
          `Type: ${values.attendeeType === "Other" && values.attendeeOther ? `Other: ${values.attendeeOther}` : values.attendeeType}`,
          `Email: ${values.email}`,
          `Mobile: ${values.mobile}`,
          `City: ${values.city}`,
          `Profession: ${values.profession}`,
          `Industry Role: ${values.industryRole === "Other" && values.industryOther ? `Other: ${values.industryOther}` : values.industryRole}`,
        ].join("\n"),
      );
      const waUrl = `https://wa.me/923004378496?text=${waText}`;
      window.open(waUrl, "_blank");

      toast.success("Registration submitted. Check your email for a copy.");
      onOpenChange(false);
      form.reset({
        attendeeType: defaultType,
        attendeeOther: "",
        fullName: "",
        email: "",
        mobile: "",
        city: "",
        profession: "",
        industryRole: "Manufacturer",
        industryOther: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Register for Expo‑2026</DialogTitle>
          <DialogDescription>Fill in your details and submit your registration.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="e.g., Ali Khan"
                      {...field}
                      className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attendeeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Type</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                    >
                      <option>Student</option>
                      <option>Visitor</option>
                      <option>Exhibitor</option>
                      <option>Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("attendeeType") === "Other" && (
              <FormField
                control={form.control}
                name="attendeeOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., Sponsor, Media, Government"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <input
                        type="tel"
                        placeholder="+92XXXXXXXXXX"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., Lahore"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelForType}</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., Veterinarian"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="industryRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                    >
                      <option>Manufacturer</option>
                      <option>Importer</option>
                      <option>Exporter</option>
                      <option>Distributor</option>
                      <option>Pharmacist</option>
                      <option>Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("industryRole") === "Other" && (
              <FormField
                control={form.control}
                name="industryOther"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify role</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., Supplier"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="btn-outline rounded-lg px-4 py-2"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary rounded-lg px-4 py-2">
                Submit Registration
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
