// src/components/CreateEmployeeForm.jsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "../schemas/employeeSchema";
import { Modal } from "@andoniaina/react-modal";
import "@andoniaina/react-modal/Modal.css";
import useLocalStorage from "../hooks/useLocalStorage";
import DatePickerInput from "./DatePickerInput";
import SelectInput from "./SelectInput";
import { states } from "../data/states";

// Options de départements
const departments = [
    { value: "Sales", label: "Sales" },
    { value: "Marketing", label: "Marketing" },
    { value: "Engineering", label: "Engineering" },
    { value: "Human Resources", label: "Human Resources" },
    { value: "Legal", label: "Legal" },
];

// Options d'états
const stateOptions = states.map((state) => ({
    value: state.name,
    label: state.name,
}));

export default function CreateEmployeeForm() {
    const [employees, setEmployees] = useLocalStorage("employees", []);
    const [isOpen, setIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("success");

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            dateOfBirth: null,
            startDate: null,
            street: "",
            city: "",
            state: "Alabama",
            zipCode: "",
            department: "Sales",
        },
    });

    const onSubmit = (data) => {
        try {
            const employee = {
                ...data,
                dateOfBirth: data.dateOfBirth?.toISOString(),
                startDate: data.startDate?.toISOString(),
            };
            setEmployees([...employees, employee]);
            setModalMessage("L’employé a été ajouté avec succès !");
            setModalType("success");
            reset();
        } catch (err) {
            setModalMessage("Une erreur est survenue.");
            setModalType("error");
        }
        setIsOpen(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="employee-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" {...register("firstName")} className="form-input" />
                        {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" {...register("lastName")} className="form-input" />
                        {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <Controller
                            control={control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <DatePickerInput id="dateOfBirth" selectedDate={field.value} onChange={field.onChange} />
                            )}
                        />
                        {errors.dateOfBirth && <p className="error">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <Controller
                            control={control}
                            name="startDate"
                            render={({ field }) => (
                                <DatePickerInput id="startDate" selectedDate={field.value} onChange={field.onChange}/>
                            )}
                        />
                        {errors.startDate && <p className="error">{errors.startDate.message}</p>}
                    </div>
                </div>

                <fieldset className="adress">
                    <legend>Address</legend>

                    <div className="form-group">
                        <label htmlFor="street">Street</label>
                        <input {...register("street")} className="form-input" />
                        {errors.street && <p className="error">{errors.street.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input {...register("city")} className="form-input" />
                        {errors.city && <p className="error">{errors.city.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State</label>
                        <Controller
                            id="state"
                            control={control}
                            name="state"
                            render={({ field }) => <SelectInput {...field} options={stateOptions} />}
                        />
                        {errors.state && <p className="error">{errors.state.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="zipCode">Zip Code</label>
                        <input {...register("zipCode")} className="form-input" />
                        {errors.zipCode && <p className="error">{errors.zipCode.message}</p>}
                    </div>
                </fieldset>

                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <Controller
                        id="department"
                        control={control}
                        name="department"
                        render={({ field }) => <SelectInput {...field} options={departments}/>}
                    />
                    {errors.department && <p className="error">{errors.department.message}</p>}
                </div>

                <button type="submit" className="button_save">
                    Save
                </button>
            </form>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} type={modalType} message={modalMessage}>
                <h2>{modalType === "error" ? "Erreur" : "Succès"}</h2>
                <p>{modalMessage}</p>
            </Modal>
        </>
    );
}
