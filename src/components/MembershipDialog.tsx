import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
 

type MembershipDialogProps = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
};

const schema = z.object({
  fullName: z.string().min(2, "Required"),
  idNumber: z.string().min(5, "Required"),
  fbrReturn: z.string().min(2, "Required"),
  companyName: z.string().min(2, "Required"),
  companyAddress: z.string().min(2, "Required"),
  licenseType: z.enum([
    "Drug Sale License",
    "Drug Manufacturer License",
    "Distribution Letter",
    "Importer",
    "Pharmacy",
    "Pharmacist",
    "Other",
  ]),
  licenseDetail: z.string().optional(),
  proposer: z.string().min(2, "Required"),
  counterProposer: z.string().min(2, "Required"),
});

type FormValues = z.infer<typeof schema>;

export default function MembershipDialog({ open, onOpenChange }: MembershipDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      idNumber: "",
      fbrReturn: "",
      companyName: "",
      companyAddress: "",
      licenseType: "Drug Sale License",
      licenseDetail: "",
      proposer: "",
      counterProposer: "",
    },
  });
  

  const onSubmit = (values: FormValues) => {
    try {
      const payload = { ...values, submittedAt: new Date().toISOString() };
      const existing = JSON.parse(localStorage.getItem("pvpa_membership_applications") || "[]");
      localStorage.setItem("pvpa_membership_applications", JSON.stringify([payload, ...existing]));

      const waText = encodeURIComponent(
        [
          "PVPA Membership Application",
          `Name: ${values.fullName}`,
          `ID/Passport: ${values.idNumber}`,
          `FBR Tax Return: ${values.fbrReturn}`,
          `Company: ${values.companyName}`,
          `Address: ${values.companyAddress}`,
          `License/Role: ${
            values.licenseType === "Other" && values.licenseDetail ? `Other: ${values.licenseDetail}` : values.licenseType
          }`,
          `Proposer: ${values.proposer}`,
          `Counter Proposer: ${values.counterProposer}`,
        ].join("\n"),
      );
      const waUrl = `https://wa.me/923004378496?text=${waText}`;
      window.open(waUrl, "_blank");

      toast.success("Application prepared in WhatsApp.");
      onOpenChange(false);
      form.reset();
      
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Apply for PVPA Membership</DialogTitle>
          <DialogDescription>Provide the required information to begin your application.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete Name</FormLabel>
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
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID / Passport No.</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., CNIC or Passport"
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
                name="fbrReturn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current FBR Tax Return</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Reference or year"
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
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="e.g., PVPA Pharma Pvt Ltd"
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
              name="companyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Address</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Street, City, Postal Code"
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
              name="licenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License / Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                    >
                      <option>Drug Sale License</option>
                      <option>Drug Manufacturer License</option>
                      <option>Distribution Letter</option>
                      <option>Importer</option>
                      <option>Pharmacy</option>
                      <option>Pharmacist</option>
                      <option>Other</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("licenseType") === "Other" && (
              <FormField
                control={form.control}
                name="licenseDetail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please specify</FormLabel>
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
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="proposer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposer</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Name of proposer"
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
                name="counterProposer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Counter Proposer</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Name of counter proposer"
                        {...field}
                        className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={() => onOpenChange(false)} className="btn-outline rounded-lg px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="btn-primary rounded-lg px-4 py-2">
                Submit Application
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
