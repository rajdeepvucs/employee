import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useForm, useController } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { format, parseISO } from "date-fns";
import axios from "axios";
import emailjs from '@emailjs/browser';  // Import EmailJS
import { useRef } from "react";
import { toast} from 'react-toastify';
import { baseURL } from "../../../config";
import { useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  phoneNumber?: string;
  role: "Developer" | "Designer" | "Manager";
  joiningDate?: Date | string;
};
// Retrieve parameters from environment variables
const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function Modal() {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const form = useRef<HTMLFormElement>(null); 

  const schema: ZodType<FormData> = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid email format." }),
    phoneNumber: z.string().optional().refine(
      (value) => !value || /^\d{10,15}$/.test(value),
      {
        message: "Phone number must be 10-15 digits.",
      }
    ),
    role: z.enum(["Developer", "Designer", "Manager"], {
      errorMap: () => ({ message: "Please select a role." }),
    }),
    joiningDate: z.string()
      .transform((val) => {
        if (!val) return undefined; // Handle empty string (no date selected)
        try {
          return parseISO(val);
        } catch (error) {
          return undefined; // Or throw an error if parsing fails
        }
      })
      .refine((date) => date !== undefined, {
        message: "Please select a joining date.",
      })
      .refine((date) => date instanceof Date && date <= new Date(), {
        message: "Joining date cannot be in the future.",
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch // Add watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "Developer",
      joiningDate: undefined,
    },
  });

  const { field: roleField } = useController({
    name: "role",
    control,
  });

  const joiningDateValue = watch("joiningDate");  

  const onSubmit = async (data: FormData) => {
    try {
      let formattedDate: string | undefined;

      if (data.joiningDate instanceof Date) {
        formattedDate = format(data.joiningDate, "yyyy-MM-dd");
      }

      const employeeData = {
        ...data,
        joiningDate: formattedDate,
      };

      // Save data in db
      const response = await axios.post(`${baseURL}/api/emp/addEmp`, employeeData);
      console.log("Employee added successfully:", response.data);

      // Show success toast after saving to DB
      toast.success("Employee added successfully!");

      // Send Email using EmailJS
      if (form.current) {
        const emailParams = {
          to_name: data.name,
          to_email: data.email,
          from_name: "ABC ",
          message: `A new employee has been added:\n
                    Name: ${data.name}\n
                    Email: ${data.email}\n
                    Phone: ${data.phoneNumber}\n
                    Role: ${data.role}\n
                    Joining Date: ${formattedDate}`,
        };

        emailjs
          .send(
            emailServiceId,  // Use Service ID from .env
            emailTemplateId, // Use Template ID from .env
            emailParams,
            emailPublicKey    // Use Public Key from .env
          
          )
          .then(
            (result) => {
              console.log("Email sent successfully!", result.text);
              toast.success("Email sent successfully! Email Sent");

            },
            (error) => {
              console.error("Error sending email", error.text);
              toast.error("Error sending email");
            }
          );
      }
      // Reset the form to its initial state
      reset();
      setOpen(false )
      navigate("/");
      //redirect home
      //window.location.href = "/home";


    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Error adding employee"); // Add error toast here
    
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus color="blue" size={48} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <form ref={form} onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <label htmlFor="name">Name:</label>
            <Input type="text" id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <label htmlFor="email">Email:</label>
            <Input type="email" id="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <Input type="tel" id="phoneNumber" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <label htmlFor="role">Role:</label>
            <Select
              onValueChange={roleField.onChange}
              defaultValue={roleField.value}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Developer">Developer</SelectItem>
                <SelectItem value="Designer">Designer</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <label htmlFor="joiningDate">Joining Date:</label>
            <Input type="date" id="joiningDate" {...register("joiningDate")} className="w-full" />
            {errors.joiningDate && (
              <p className="text-red-500">{errors.joiningDate.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}