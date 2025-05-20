import axios from "axios";
import { useState } from "react";
import { X } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AddInsuranceCompany({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("private_car");
    const [errorMessage, setErrorMessage] = useState();
    const [success, setSuccess] = useState();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        insuranceType: "الزامي",
    });

    const [vehicleCategories, setVehicleCategories] = useState([
  {
    key: "private_car",
    label: "Private Car",
    rates: {
      "تحت_24": 0,
      "فوق_24": 0,
      "مبلغ_العرض": 0,
      "الحد_الأدنى_لـ_60_ألف": 0
    }
  },
  {
    key: "commercial_car",
    label: "Commercial Car",
    rates: {
      "تحت_24": 0,
      "فوق_24": 0,
      "مبلغ_العرض": 0,
      "الحد_الأدنى_لـ_60_ألف": 0
    }
  },
  {
    key: "motorcycle",
    label: "Motorcycle",
    rates: {
      "تحت_24": 0,
      "فوق_24": 0,
      "مبلغ_العرض": 0,
      "الحد_الأدنى_لـ_60_ألف": 0
    }
  }
]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
        if (name === "insuranceType" && value === "الزامي") {
            setActiveTab("private_car");
        }
    };

    const handleRateChange = (categoryKey, field, value) => {
        const numValue = value === "" ? 0 : Number(value);
        setVehicleCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.key === categoryKey
                    ? { ...category, rates: { ...category.rates, [field]: numValue } }
                    : category
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const rates = {};
            if (formData.insuranceType !== "الزامي") {
                vehicleCategories.forEach((category) => {
                    rates[category.key] = category.rates;
                });
            }

            if (!formData.name || !formData.contact || !formData.address) {
                setErrorMessage("Please fill in all required fields.");
                setLoading(false);
                return;
            }

            const dataToSend = {
                name: formData.name,
                insuranceType: formData.insuranceType,
                contact: formData.contact,
                address: formData.address,
                rates: formData.insuranceType !== "الزامي" ? rates : {},
            };

            const response = await axios.post("http://localhost:3002/api/v1/company/addInsuranceCompany", dataToSend, {
                headers: { token: `islam__${token}` }
            });

            if (response.status==201) {
                setSuccess("Insurance company added successfully.");
                
                onClose(true);
            } else {
                setErrorMessage(response.data.message || "Failed to add company.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to add company.";
            setErrorMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    };

   const rateFieldsConfig = [
  { field: "تحت_24", label: "Price for drivers under 24" },
  { field: "فوق_24", label: "Price for drivers over 24" },
  { field: "مبلغ_العرض", label: "Offer amount" },
  { field: "الحد_الأدنى_لـ_60_ألف", label: "Minimum for 60K" },
];



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-[800px] bg-[rgb(255,255,255)]  rounded-lg shadow-xl flex flex-col overflow-y-scroll hide-scrollbar h-[95vh]  dark:bg-dark2">
                <div className="flex items-center justify-between p-4 md:p-5 border dark:border-borderNav-b rounded-t">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-[rgb(255,255,255)]">Add Insurance Company</h2>
                    <button type="button" onClick={() => onClose(false)} className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-900">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="flex-grow overflow-y-auto p-4 space-y-6" onSubmit={handleSubmit}>
                    {success && <div className="px-4 py-2 bg-green-100 text-green-700 rounded-md">{success}</div>}
                    {errorMessage && <div className="px-4 py-2 bg-red-100 text-red-700 rounded-md">{errorMessage}</div>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Company Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter company name" className=" w-full p-2.5 border rounded-lg  dark:bg-navbarBack" required />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Insurance Type</label>
                            <select name="insuranceType" value={formData.insuranceType} onChange={(e) => handleSelectChange("insuranceType", e.target.value)} className=" w-full p-2.5 border dark:border-borderNav rounded-lg  dark:bg-navbarBack " required>
                                <option value="الزامي">الزامي</option>
                                <option value="ثالث شامل">ثالث شامل</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Contact Number</label>
                            <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Enter contact number" className=" w-full p-2.5 border dark:border-borderNav rounded-lg   dark:bg-navbarBack" required />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" className=" w-full p-2.5 border dark:border-borderNav rounded-lg dark:bg-navbarBack" required />
                        </div>
                    </div>

                    {formData.insuranceType !== "الزامي" && (
                        <div className="mt-6">
                            <div className="flex border dark:border-borderNav-b">
                                {vehicleCategories.map((category) => (
                                    <button
                                        key={category.key}
                                        type="button"
                                        onClick={() => setActiveTab(category.key)}
                                        className={`px-4 py-2 text-sm font-medium ${activeTab === category.key ? "border dark:border-borderNav   text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {rateFieldsConfig.map(({ field, label }) => (
                                    <div key={field}>
                                        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={vehicleCategories.find(cat => cat.key === activeTab).rates[field]}
                                            onChange={(e) => handleRateChange(activeTab, field, e.target.value)}
                                            className=" w-full p-2.5 border dark:border-borderNav rounded-lg  dark:bg-navbarBack "
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button type="submit" disabled={loading} className="bg-indigo-600  text-[rgb(255,255,255)] px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                            {loading ? "Saving..." : "Add Company"}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} transition={Bounce} />
        </div>
    );
}

export default AddInsuranceCompany;
