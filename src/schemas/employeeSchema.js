import { z } from "zod";

const MIN_AGE = 18;

const isAtLeastAge = (birthDate, minAge) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= minAge;
    }

    return age >= minAge;
};

export const employeeSchema = z
    .object({
        firstName: z.string().min(2, "Le prénom doit avoir au moins 2 caractères"),
        lastName: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),

        dateOfBirth: z.date({
            required_error: "La date de naissance est requise",
        }),

        startDate: z.date({
            required_error: "La date de début est requise",
        }),

        street: z.string().min(2, "La rue est requise"),
        city: z.string().min(2, "La ville est requise"),
        state: z.string().min(2, "L'état est requis"),
        zipCode: z.string().min(4, "Le code postal est requis"),
        department: z.string().min(2, "Le département est requis"),
    })
    // 🔒 âge minimum
    .refine(
        (data) => isAtLeastAge(data.dateOfBirth, MIN_AGE),
        {
            message: `L'employé doit avoir au moins ${MIN_AGE} ans`,
            path: ["dateOfBirth"],
        }
    )
    // 🔒 startDate > dateOfBirth
    .refine(
        (data) => data.startDate > data.dateOfBirth,
        {
            message: "La date de début doit être postérieure à la date de naissance",
            path: ["startDate"],
        }
    );
