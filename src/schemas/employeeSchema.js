import { z } from "zod";

export const employeeSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
    dateOfBirth: z.string().min(1, "La date de naissance est requise"),
    startDate: z.string().min(1, "La date de début est requise"),
    street: z.string().min(2, "La rue est requise"),
    city: z.string().min(2, "La ville est requise"),
    state: z.string().min(2, "L'état est requis"),
    zipCode: z.string().min(4, "Le code postal est requis"),
    department: z.string().min(2, "Le département est requis"),
});
