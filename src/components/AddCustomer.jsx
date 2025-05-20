
import { useState, useRef } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import axios from "axios";

function AddCustomer({ onClose, isOpen }) {
    if (!isOpen) return null;
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const dropAreaRef = useRef(null);
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        id_Number: "",
        phone_number: "",
        city: "",
        birth_date: "",
        agentsName: "",
        notes: "",
        image: null,
        joining_date: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles(newFiles);
            setFormData((prev) => ({
                ...prev,
                image: newFiles[0],
            }));
        }
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("id_Number", Number(formData.id_Number));
        formDataToSend.append("phone_number", formData.phone_number);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("birth_date", formData.birth_date);
        formDataToSend.append("joining_date", formData.joining_date);
        formDataToSend.append("agentsName", formData.agentsName);
        formDataToSend.append("notes", formData.notes);

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
        console.log(formData)
        const token = `islam__${localStorage.getItem("token")}`;

        try {
            const response = await axios.post(
                "http://localhost:3002/api/v1/insured/addInsured",
                // "http://localhost:3002/api/v1/insured/addInsured",
                formDataToSend,
                {
                    headers: {
                        token,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Customer added successfully:", response.data);
            onClose(false);
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles(newFiles);
            setFormData((prev) => ({
                ...prev,
                image: newFiles[0],
            }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
            <div className="2md:w-75 w-full max-w-[800px] bg-[rgb(255,255,255)] rounded-lg shadow-lg p-6 dark:bg-dark2">
                <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                    <h2 className="text-2xl font-semibold rounded-md">{t("customers.buttonAdd")}</h2>
                    <button onClick={() => onClose(false)} className="p-1 rounded-full hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-2 space-y-4 rounded-md border dark:border-borderNav border dark:border-borderNav-gray-300 dark:border dark:border-borderNav-dark3">
                    <div className="flex items-center justify-between pb-2 border dark:border-borderNav-b border dark:border-borderNav-gray-300">
                        <p className="text-[16px] font-semibold px-4 py-2 rounded-md">New Customer Form</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-4">
                        <div>
                            <label className="block text-sm font-medium">First name</label>
                            <input type="text" name="first_name" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack dark:bg-navbarBack" value={formData.first_name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last name</label>
                            <input type="text" name="last_name" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.last_name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" name="email" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.email} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Identity Number</label>
                            <input type="number" name="id_Number" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.id_Number} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Mobile</label>
                            <input type="text" name="phone_number" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.phone_number} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">City</label>
                            <select name="city" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.city} onChange={handleInputChange}>
                                <option value="">Choose city</option>
                                <option value="City 1">City 1</option>
                                <option value="City 2">City 2</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-4">
                        <div>
                            <label className="block text-sm font-medium"> Agent's Name</label>
                            <input type="text" name="agentsName" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.agentsName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Birth Date</label>
                            <input type="date" name="birth_date" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.birth_date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 px-4">
                        <div >
                            <label className="block text-sm font-medium">Notes</label>
                            <textarea name="notes" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.notes} onChange={handleInputChange} rows="1.5" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">joining_date</label>
                            <input type="date" name="joining_date" className="w-full p-1 border dark:border-borderNav rounded-md dark:bg-navbarBack" value={formData.joining_date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="px-4">
                        <label className="block text-sm font-medium">Customer Image (Optional)</label>
                        <div
                            onClick={handleBrowseClick}
                            ref={dropAreaRef}
                            className={`w-full max-w-[974px] relative flex cursor-pointer h-[63px] flex-col items-center justify-center border dark:border-borderNav-1 rounded-md bg-[#DEE4EE] ${isDragging ? "border dark:border-borderNav-[#5750F1] bg-[#5750F1]/5" : "border dark:border-borderNav-gray-300"
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInputChange} />
                                <span>Click or drag image here</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end px-4">
                        <button type="submit" className="px-4 py-2 text-[rgb(255,255,255)] bg-indigo-600 rounded-md hover:bg-indigo-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCustomer;

