"use client";

import { Question } from "@/components/question";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { type UserInfo } from "./survey";

const formSchema = z.object({
  firstName: z.string({ required_error: "What's your first name?" }).min(1, {
    message: "What's your first name?",
  }),
  lastName: z.string().optional(),
  company: z.string({ required_error: "Which company?" }).min(1, {
    message: "Which company?",
  }),
  email: z
    .string({ required_error: "Your email?" })
    .min(1, {
      message: "Your email?",
    })
    .email({
      message: "That email looks off",
    }),
  role: z.string({ required_error: "What's your role?" }).min(1, {
    message: "What's your role?",
  }),

  relationship: z
    .string({
      required_error: "How do you know us?",
    })
    .min(1, {
      message: "How do you know us?",
    }),
});

interface UserInfoFormProps {
  onSubmit: (data: UserInfo) => void;
  initialData?: UserInfo;
}

export const relationshipOptions = [
  {
    optionId: 1,
    id: "Partner",
    text: "I am a Partner",
  },
  {
    optionId: 2,
    id: "Customer",
    text: "I am a Customer",
  },
  {
    optionId: 3,
    id: "Future Customer",
    text: "I am a Future Customer",
  },
  {
    optionId: 4,
    id: "Employee",
    text: "I am a Nutanix Employee",
  },
];

export function UserInfoForm({ onSubmit, initialData }: UserInfoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialData?.firstName ?? "",
      lastName: initialData?.lastName ?? "",
      company: initialData?.company ?? "",
      email: initialData?.email ?? "",
      role: initialData?.role ?? "",
      relationship: initialData?.relationship ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="relationship"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Question
                  question={{
                    questionId: "relationship-to-nutanix",
                    sectionColor: "cyan",
                    type: "single",
                    sectionId: "nutanix",
                    sectionTitle: "Relationship to Nutanix",
                    text: "How would you describe your relationship with Nutanix?",
                    options: relationshipOptions,
                  }}
                  selectedOptions={field.value ? [field.value] : []}
                  handleOptionChange={(optionId) => {
                    field.onChange(optionId);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="!my-8"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company" {...field} />
                </FormControl>
                <FormMessage />
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
                    type="email"
                    placeholder="Enter your work email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your role or the areas you work in"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div>
          <FormLabel className="text-base">
            Which areas do you work in
          </FormLabel>
          <div className="mt-2">
            {workAreas.map((area) => (
              <FormField
                key={area.id}
                control={form.control}
                name="workAreas"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={area.id}
                      className="mb-1 flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(area.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, area.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== area.id,
                                  ),
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {area.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </div> */}

        <Button className="!mt-10 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md hover:from-purple-700 hover:to-pink-700">
          Submit
        </Button>
      </form>
    </Form>
  );
}
