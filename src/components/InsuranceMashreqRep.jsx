import { useState } from "react";
import { X } from "lucide-react";
const t = (key, ...args) => {
    const translations = {
        "mashreq.modalTitle": "Al-Mashreq Accident Report Form",
        "mashreq.step1Indicator": "Office & Policy",
        "mashreq.step2Indicator": "Insured & Vehicle",
        "mashreq.step3Indicator": "Driver Info",
        "mashreq.step4Indicator": "Accident Details",
        "mashreq.step5Indicator": "Other Parties & Damages",
        "mashreq.step6Indicator": "Signatures & Notes",

        "mashreq.officePolicyTitle": "Office and Insurance Policy Information",
        "mashreq.insuredVehicleTitle": "Insured Person and Vehicle Information",
        "mashreq.driverInfoTitle": "Driver Information",
        "mashreq.accidentDetailsTitle": "Accident Details",
        "mashreq.otherPartiesDamagesTitle": "Other Parties, Damages & Injuries",
        "mashreq.signaturesNotesTitle": "Signatures and Notes",

        "mashreq.branchOfficeLabel": "Branch Office",
        "mashreq.policyTypeLabel": "Policy Type",
        "mashreq.policyTypeOptionDefault": "Select Policy Type",
        "mashreq.policyNumberLabel": "Policy Number",
        "mashreq.policyDurationLabel": "Policy Duration (e.g., 1 Year)",
        "mashreq.policyFromLabel": "Policy Valid From",
        "mashreq.policyToLabel": "Policy Valid To",

        "mashreq.insuredNameLabel": "Insured Name (from DB)",
        "mashreq.insuredPersonalNoLabel": "Insured Personal No. (from DB)",
        "mashreq.insuredAddressLabel": "Insured Address (from DB)",
        "mashreq.insuredPhoneLabel": "Insured Phone (from DB)",

        "mashreq.vehicleRegNoLabel": "Vehicle Registration No. (Plate)",
        "mashreq.vehicleUsageLabel": "Vehicle Usage",
        "mashreq.vehicleTypeLabel": "Vehicle Type (from DB)",
        "mashreq.vehicleMakeYearLabel": "Vehicle Make Year",
        "mashreq.vehicleColorLabel": "Vehicle Color (from DB)",

        "mashreq.driverNameLabel": "Driver Name",
        "mashreq.driverJobLabel": "Driver Job",
        "mashreq.driverAddressLabel": "Driver Full Address",
        "mashreq.driverPhoneLabel": "Driver Phone",
        "mashreq.driverLicenseNoLabel": "Driver License Number",
        "mashreq.driverLicenseTypeLabel": "Driver License Type",
        "mashreq.driverLicenseIssueDateLabel": "License Issue Date",
        "mashreq.driverLicenseExpiryDateLabel": "License Expiry Date",
        "mashreq.driverAgeLabel": "Driver Age",
        "mashreq.driverIdNumberLabel": "Driver ID Number",

        "mashreq.accidentDateLabel": "Accident Date",
        "mashreq.accidentTimeLabel": "Accident Time (e.g., HH:MM)",
        "mashreq.weatherConditionLabel": "Weather Condition",
        "mashreq.roadConditionLabel": "Road Condition",
        "mashreq.accidentLocationLabel": "Accident Location",
        "mashreq.accidentTypeLabel": "Accident Type", 
        "mashreq.damageToVehicleLabel": "Damage to Insured Vehicle (Description)",
        "mashreq.vehicleSpeedLabel": "Vehicle Speed at Accident (approx km/h)",
        "mashreq.timeOfAccidentLabel": "Time of Accident (e.g. Day, Night)", 
        "mashreq.passengersCountLabel": "Number of Passengers in Insured Vehicle",
        "mashreq.vehicleUsedPermissionLabel": "Was vehicle used with permission?",
        "mashreq.accidentNotifierNameLabel": "Accident Notifier Name",
        "mashreq.accidentNotifierPhoneLabel": "Accident Notifier Phone",

        "mashreq.otherVehiclesTitle": "Other Vehicles Involved",
        "mashreq.addOtherVehicleButton": "+ Add Other Vehicle",
        "mashreq.otherVehicleItem": "Other Vehicle #{index}",
        "mashreq.otherVehicleNumberLabel": "Vehicle Number",
        "mashreq.otherVehicleTypeLabel": "Type",
        "mashreq.otherVehicleMakeYearLabel": "Make Year",
        "mashreq.otherVehicleColorLabel": "Color",
        "mashreq.otherVehicleOwnerNameLabel": "Owner Name",
        "mashreq.otherVehicleOwnerAddressLabel": "Owner Address",
        "mashreq.otherVehicleDriverNameLabel": "Driver Name",
        "mashreq.otherVehicleDriverAddressLabel": "Driver Address",
        "mashreq.otherVehicleInsuranceCoLabel": "Insurance Company",
        "mashreq.otherVehiclePolicyNoLabel": "Policy Number",
        "mashreq.otherVehicleWasParkedLabel": "Was Parked?",
        "mashreq.otherVehicleDamageDescLabel": "Damage Description",

        "mashreq.vehicleDamagesOverallLabel": "Overall Vehicle Damages Description",

        "mashreq.personalInjuriesTitle": "Personal Injuries (Insured Vehicle Occupants)",
        "mashreq.addPersonalInjuryButton": "+ Add Personal Injury",
        "mashreq.personalInjuryItem": "Injury #{index}: {name}",
        "mashreq.injuryNameLabel": "Name",
        "mashreq.injuryAgeLabel": "Age",
        "mashreq.injuryJobLabel": "Job",
        "mashreq.injuryAddressLabel": "Address",
        "mashreq.injuryTypeLabel": "Injury Type/Description",

        "mashreq.thirdPartyInjuredNamesTitle": "Third Party Injured Names (Other Vehicles)",
        "mashreq.addThirdPartyInjuredNameButton": "+ Add Third Party Injured Name",
        "mashreq.thirdPartyInjuredNameItem": "Injured: {name}",
        "mashreq.thirdPartyInjuredNamePlaceholder": "Name of injured in other vehicle",


        "mashreq.vehiclePassengersTitle": "Passengers in Insured Vehicle (Names)",
        "mashreq.addVehiclePassengerButton": "+ Add Passenger Name",
        "mashreq.vehiclePassengerItem": "Passenger: {name}",
        "mashreq.passengerNamePlaceholder": "Passenger Name",

        "mashreq.externalWitnessesTitle": "External Witnesses (Names)",
        "mashreq.addExternalWitnessButton": "+ Add Witness Name",
        "mashreq.externalWitnessItem": "Witness: {name}",
        "mashreq.witnessNamePlaceholder": "Witness Name",


        "mashreq.driverSignatureNameLabel": "Driver Signature (Name)",
        "mashreq.driverSignatureDateLabel": "Signature Date",
        "mashreq.claimantNameLabel": "Claimant Name",
        "mashreq.claimantSignatureLabel": "Claimant Signature (Name/Text)",
        "mashreq.receiverNameLabel": "Receiver Name (Officer/Employee)",
        "mashreq.receiverNotesLabel": "Receiver Notes",
        "mashreq.generalNotesLabel": "General Notes",

        "deleteButton": "Delete",
        "newLabel": "New",
        "backButton": "Previous",
        "nextButton": "Next",
        "submitButton": "Submit",
        "formSubmissionSuccess": "Report submitted successfully!",
        "formSubmissionError": "Error submitting report: ",
        "plateNumberRequiredError": "Vehicle Registration Number (Plate) is required.",
    };
    let text = translations[key] || key;
    if (args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
        const params = args[0];
        for (const k in params) {
            if (Object.hasOwnProperty.call(params, k)) {
                text = text.replace(new RegExp(`{${k}}`, 'g'), params[k]);
            }
        }
    }
    return text;
};


function InsuranceMashreqRep({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        branchOffice: '',
        insurancePolicy: {
            type: '',
            number: '',
            duration: '',
            from: '',
            to: ''
        },
        insuredPerson: {
            name: '',
            personalNumber: '', 
            fullAddress: '', 
            phone: '' 
        },
        vehicle: { 
            registrationNumber: '', 
            usage: '',
            type: '', 
            makeYear: '',
            color: '' 
        },
        driver: {
            name: '',
            job: '',
            fullAddress: '',
            phone: '',
            licenseNumber: '',
            licenseType: '',
            licenseIssueDate: '',
            licenseExpiryDate: '',
            age: '',
            idNumber: ''
        },
        accident: {
            date: '',
            time: '',
            weatherCondition: '',
            roadCondition: '',
            accidentLocation: '',
            accidentType: '',
            damageToVehicle: '',
            vehicleSpeed: '',
            timeOfAccident: '', 
            passengersCount: 0,
            vehicleUsedPermission: false,
            accidentNotifierName: '',
            accidentNotifierPhone: ''
        },
        otherVehicles: [], 
        vehicleDamages: '', 
        personalInjuries: [], 
        thirdPartyInjuredNames: [], 
        vehiclePassengers: [], 
        externalWitnesses: [], 
        driverSignature: {
            name: '',
            date: ''
        },
        claimant: {
            name: '',
            signature: ''
        },
        receiver: {
            name: '',
            notes: ''
        },
        generalNotes: ''
    });

    const handleChange = (e, section, subField, arrayName, index, itemField) => {
        const { name, value, type, checked } = e.target;

        if (arrayName && typeof index === 'number' && itemField) { 
            setFormData(prev => {
                const newArray = [...prev[arrayName]];
                newArray[index] = { ...newArray[index], [itemField]: type === 'checkbox' ? checked : value };
                return { ...prev, [arrayName]: newArray };
            });
        } else if (section && subField) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [subField]: type === 'checkbox' ? checked : value
                }
            }));
        } else if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: type === 'checkbox' ? checked : value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleStringArrayChange = (arrayName, index, newValue) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName]];
            newArray[index] = newValue;
            return { ...prev, [arrayName]: newArray };
        });
    };


    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const plateNumber = formData.vehicle.registrationNumber;
        if (!plateNumber) {
            alert(t('mashreq.plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const dataToSend = {
            ...formData,
            driver: {
                ...formData.driver,
                age: formData.driver.age ? parseInt(formData.driver.age, 10) : null,
            },
            accident: {
                ...formData.accident,
                passengersCount: formData.accident.passengersCount ? parseInt(formData.accident.passengersCount, 10) : 0,
            },
            personalInjuries: formData.personalInjuries.map(injury => ({
                ...injury,
                age: injury.age ? parseInt(injury.age, 10) : null
            }))
        };


        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const response = await fetch(`http://localhost:3002/api/v1/Al_MashreqAccidentReport/add/${plateNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify(dataToSend)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
            }

            console.log('Form submitted successfully:', responseData);
            alert(t('mashreq.formSubmissionSuccess') + (responseData.message ? `\n${responseData.message}` : ''));
            onClose();

        } catch (error) {
            console.error('Submission error:', error);
            alert(t('mashreq.formSubmissionError') + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addArrayItem = (arrayName, itemStructure) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], itemStructure]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: prev[arrayName].filter((_, i) => i !== index)
        }));
    };
    const addStringToArray = (arrayName) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], ""] 
        }));
    };


    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return t('mashreq.officePolicyTitle');
            case 2: return t('mashreq.insuredVehicleTitle');
            case 3: return t('mashreq.driverInfoTitle');
            case 4: return t('mashreq.accidentDetailsTitle');
            case 5: return t('mashreq.otherPartiesDamagesTitle');
            case 6: return t('mashreq.signaturesNotesTitle');
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="px-4 py-3 mb-4">
            <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div key={step} className="flex flex-col items-center text-center flex-1">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{step}</div>
                        <span className="text-xs mt-1 text-gray-600">
                            {step === 1 && t('mashreq.step1Indicator')}
                            {step === 2 && t('mashreq.step2Indicator')}
                            {step === 3 && t('mashreq.step3Indicator')}
                            {step === 4 && t('mashreq.step4Indicator')}
                            {step === 5 && t('mashreq.step5Indicator')}
                            {step === 6 && t('mashreq.step6Indicator')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCommonInput = (label, name, value, onChange, type = "text", required = false, options = null, section = null, subField = null, arrayName = null, index = null, itemField = null) => (
        <div>
            <label className="block text-sm font-medium text-gray-700">{t(label)} {required && <span className="text-red-500">*</span>}</label>
            {type === "select" ? (
                <select name={name} value={value} onChange={(e) => handleChange(e, section, subField || name, arrayName, index, itemField || name)} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required={required}>
                    {options.map(opt => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                </select>
            ) : type === "textarea" ? (
                <textarea name={name} value={value} onChange={(e) => handleChange(e, section, subField || name, arrayName, index, itemField || name)} rows="3" className="mt-1 w-full p-2 border border-gray-300 rounded-md" required={required}></textarea>
            ) : (
                <input type={type} name={name} value={value} onChange={(e) => handleChange(e, section, subField || name, arrayName, index, itemField || name)} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required={required} />
            )}
        </div>
    );
    const renderCheckbox = (label, name, checked, onChange, section, subField, arrayName, index, itemField) => (
        <div className="flex items-center col-span-1 md:col-span-2">
            <input type="checkbox" id={name} name={name} checked={checked} onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField)} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            <label htmlFor={name} className="ml-2 mr-2 block text-sm text-gray-700">{t(label)}</label>
        </div>
    );


    const renderOfficePolicyInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCommonInput("mashreq.branchOfficeLabel", "branchOffice", formData.branchOffice, handleChange, "text", true)}
            {renderCommonInput("mashreq.policyTypeLabel", "type", formData.insurancePolicy.type, handleChange, "text", false, null, "insurancePolicy", "type")}
            {renderCommonInput("mashreq.policyNumberLabel", "number", formData.insurancePolicy.number, handleChange, "text", false, null, "insurancePolicy", "number")}
            {renderCommonInput("mashreq.policyDurationLabel", "duration", formData.insurancePolicy.duration, handleChange, "text", false, null, "insurancePolicy", "duration")}
            {renderCommonInput("mashreq.policyFromLabel", "from", formData.insurancePolicy.from, handleChange, "date", false, null, "insurancePolicy", "from")}
            {renderCommonInput("mashreq.policyToLabel", "to", formData.insurancePolicy.to, handleChange, "date", false, null, "insurancePolicy", "to")}
        </div>
    );

    const renderInsuredVehicleInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* <div className="md:col-span-2 p-2 bg-gray-50 rounded border">
                <p className="text-sm text-gray-600">{t("mashreq.insuredNameLabel")}: (Backend will use: {formData.insuredPerson.name || "DB value"})</p>
            </div> */}
            {renderCommonInput("mashreq.vehicleRegNoLabel", "registrationNumber", formData.vehicle.registrationNumber, handleChange, "text", true, null, "vehicle", "registrationNumber")}
            {renderCommonInput("mashreq.vehicleUsageLabel", "usage", formData.vehicle.usage, handleChange, "text", false, null, "vehicle", "usage")}
            {renderCommonInput("mashreq.vehicleMakeYearLabel", "makeYear", formData.vehicle.makeYear, handleChange, "number", false, null, "vehicle", "makeYear")}
            {/* <div className="p-2 bg-gray-50 rounded border">
                 <p className="text-sm text-gray-600">{t("mashreq.vehicleTypeLabel")}: (Backend will use: {formData.vehicle.type || "DB value"})</p>
                 <p className="text-sm text-gray-600">{t("mashreq.vehicleColorLabel")}: (Backend will use: {formData.vehicle.color || "DB value"})</p>
            </div> */}
        </div>
    );

    const renderDriverInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCommonInput("mashreq.driverNameLabel", "name", formData.driver.name, handleChange, "text", true, null, "driver", "name")}
            {renderCommonInput("mashreq.driverJobLabel", "job", formData.driver.job, handleChange, "text", false, null, "driver", "job")}
            {renderCommonInput("mashreq.driverAddressLabel", "fullAddress", formData.driver.fullAddress, handleChange, "text", false, null, "driver", "fullAddress")}
            {renderCommonInput("mashreq.driverPhoneLabel", "phone", formData.driver.phone, handleChange, "tel", false, null, "driver", "phone")}
            {renderCommonInput("mashreq.driverLicenseNoLabel", "licenseNumber", formData.driver.licenseNumber, handleChange, "text", true, null, "driver", "licenseNumber")}
            {renderCommonInput("mashreq.driverLicenseTypeLabel", "licenseType", formData.driver.licenseType, handleChange, "text", false, null, "driver", "licenseType")}
            {renderCommonInput("mashreq.driverLicenseIssueDateLabel", "licenseIssueDate", formData.driver.licenseIssueDate, handleChange, "date", false, null, "driver", "licenseIssueDate")}
            {renderCommonInput("mashreq.driverLicenseExpiryDateLabel", "licenseExpiryDate", formData.driver.licenseExpiryDate, handleChange, "date", false, null, "driver", "licenseExpiryDate")}
            {renderCommonInput("mashreq.driverAgeLabel", "age", formData.driver.age, handleChange, "number", false, null, "driver", "age")}
            {renderCommonInput("mashreq.driverIdNumberLabel", "idNumber", formData.driver.idNumber, handleChange, "text", false, null, "driver", "idNumber")}
        </div>
    );

    const renderAccidentDetails = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCommonInput("mashreq.accidentDateLabel", "date", formData.accident.date, handleChange, "date", true, null, "accident", "date")}
            {renderCommonInput("mashreq.accidentTimeLabel", "time", formData.accident.time, handleChange, "time", true, null, "accident", "time")}
            {renderCommonInput("mashreq.weatherConditionLabel", "weatherCondition", formData.accident.weatherCondition, handleChange, "text", false, null, "accident", "weatherCondition")}
            {renderCommonInput("mashreq.roadConditionLabel", "roadCondition", formData.accident.roadCondition, handleChange, "text", false, null, "accident", "roadCondition")}
            {renderCommonInput("mashreq.accidentLocationLabel", "accidentLocation", formData.accident.accidentLocation, handleChange, "text", true, null, "accident", "accidentLocation")}
            {renderCommonInput("mashreq.accidentTypeLabel", "accidentType", formData.accident.accidentType, handleChange, "text", false, null, "accident", "accidentType")}
            {renderCommonInput("mashreq.damageToVehicleLabel", "damageToVehicle", formData.accident.damageToVehicle, handleChange, "textarea", false, null, "accident", "damageToVehicle")}
            {renderCommonInput("mashreq.vehicleSpeedLabel", "vehicleSpeed", formData.accident.vehicleSpeed, handleChange, "text", false, null, "accident", "vehicleSpeed")}
            {renderCommonInput("mashreq.timeOfAccidentLabel", "timeOfAccident", formData.accident.timeOfAccident, handleChange, "text", false, null, "accident", "timeOfAccident")}
            {renderCommonInput("mashreq.passengersCountLabel", "passengersCount", formData.accident.passengersCount, handleChange, "number", false, null, "accident", "passengersCount")}
            {renderCheckbox("mashreq.vehicleUsedPermissionLabel", "vehicleUsedPermission", formData.accident.vehicleUsedPermission, handleChange, "accident", "vehicleUsedPermission")}
            {renderCommonInput("mashreq.accidentNotifierNameLabel", "accidentNotifierName", formData.accident.accidentNotifierName, handleChange, "text", false, null, "accident", "accidentNotifierName")}
            {renderCommonInput("mashreq.accidentNotifierPhoneLabel", "accidentNotifierPhone", formData.accident.accidentNotifierPhone, handleChange, "tel", false, null, "accident", "accidentNotifierPhone")}
        </div>
    );

    const renderOtherPartiesDamages = () => (
        <div className="space-y-6">
            {/* Other Vehicles */}
            <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">{t('mashreq.otherVehiclesTitle')}</h3>
                {formData.otherVehicles.map((vehicle, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-3 border border-gray-300 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">{t('mashreq.otherVehicleItem', { index: index + 1 })}</span>
                            <button type="button" onClick={() => removeArrayItem('otherVehicles', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {renderCommonInput("mashreq.otherVehicleNumberLabel", `ov_reg_${index}`, vehicle.vehicleNumber, handleChange, "text", false, null, null, null, "otherVehicles", index, "vehicleNumber")}
                            {renderCommonInput("mashreq.otherVehicleTypeLabel", `ov_type_${index}`, vehicle.type, handleChange, "text", false, null, null, null, "otherVehicles", index, "type")}
                            {renderCommonInput("mashreq.otherVehicleMakeYearLabel", `ov_makeyear_${index}`, vehicle.makeYear, handleChange, "text", false, null, null, null, "otherVehicles", index, "makeYear")}
                            {renderCommonInput("mashreq.otherVehicleColorLabel", `ov_color_${index}`, vehicle.color, handleChange, "text", false, null, null, null, "otherVehicles", index, "color")}
                            {renderCommonInput("mashreq.otherVehicleOwnerNameLabel", `ov_ownername_${index}`, vehicle.ownerName, handleChange, "text", false, null, null, null, "otherVehicles", index, "ownerName")}
                            {renderCommonInput("mashreq.otherVehicleOwnerAddressLabel", `ov_owneraddress_${index}`, vehicle.ownerAddress, handleChange, "text", false, null, null, null, "otherVehicles", index, "ownerAddress")}
                            {renderCommonInput("mashreq.otherVehicleDriverNameLabel", `ov_drivername_${index}`, vehicle.driverName, handleChange, "text", false, null, null, null, "otherVehicles", index, "driverName")}
                            {renderCommonInput("mashreq.otherVehicleDriverAddressLabel", `ov_driveraddress_${index}`, vehicle.driverAddress, handleChange, "text", false, null, null, null, "otherVehicles", index, "driverAddress")}
                            {renderCommonInput("mashreq.otherVehicleInsuranceCoLabel", `ov_insco_${index}`, vehicle.insuranceCompany, handleChange, "text", false, null, null, null, "otherVehicles", index, "insuranceCompany")}
                            {renderCommonInput("mashreq.otherVehiclePolicyNoLabel", `ov_policyno_${index}`, vehicle.insurancePolicyNumber, handleChange, "text", false, null, null, null, "otherVehicles", index, "insurancePolicyNumber")}
                            {renderCheckbox("mashreq.otherVehicleWasParkedLabel", `ov_parked_${index}`, vehicle.wasParked, handleChange, null, null, "otherVehicles", index, "wasParked")}
                            {renderCommonInput("mashreq.otherVehicleDamageDescLabel", `ov_dmgdesc_${index}`, vehicle.damageDescription, handleChange, "textarea", false, null, null, null, "otherVehicles", index, "damageDescription")}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('otherVehicles', { vehicleNumber: '', type: '', makeYear: '', color: '', ownerName: '', ownerAddress: '', driverName: '', driverAddress: '', insuranceCompany: '', insurancePolicyNumber: '', wasParked: false, damageDescription: '' })}
                    className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('mashreq.addOtherVehicleButton')}
                </button>
            </div>

            {renderCommonInput("mashreq.vehicleDamagesOverallLabel", "vehicleDamages", formData.vehicleDamages, handleChange, "textarea")}

            <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">{t('mashreq.personalInjuriesTitle')}</h3>
                {formData.personalInjuries.map((injury, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-3 border border-gray-300 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-gray-700">{t('mashreq.personalInjuryItem', { index: index + 1, name: injury.name || t('newLabel') })}</span>
                            <button type="button" onClick={() => removeArrayItem('personalInjuries', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {renderCommonInput("mashreq.injuryNameLabel", `pi_name_${index}`, injury.name, handleChange, "text", false, null, null, null, "personalInjuries", index, "name")}
                            {renderCommonInput("mashreq.injuryAgeLabel", `pi_age_${index}`, injury.age, handleChange, "number", false, null, null, null, "personalInjuries", index, "age")}
                            {renderCommonInput("mashreq.injuryJobLabel", `pi_job_${index}`, injury.job, handleChange, "text", false, null, null, null, "personalInjuries", index, "job")}
                            {renderCommonInput("mashreq.injuryAddressLabel", `pi_address_${index}`, injury.address, handleChange, "text", false, null, null, null, "personalInjuries", index, "address")}
                            {renderCommonInput("mashreq.injuryTypeLabel", `pi_type_${index}`, injury.injuryType, handleChange, "textarea", false, null, null, null, "personalInjuries", index, "injuryType")}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('personalInjuries', { name: '', age: '', job: '', address: '', injuryType: '' })}
                    className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('mashreq.addPersonalInjuryButton')}
                </button>
            </div>

            {[
                { title: "mashreq.thirdPartyInjuredNamesTitle", arrayName: "thirdPartyInjuredNames", buttonLabel: "mashreq.addThirdPartyInjuredNameButton", itemLabel: "mashreq.thirdPartyInjuredNameItem", placeholder: "mashreq.thirdPartyInjuredNamePlaceholder" },
                { title: "mashreq.vehiclePassengersTitle", arrayName: "vehiclePassengers", buttonLabel: "mashreq.addVehiclePassengerButton", itemLabel: "mashreq.vehiclePassengerItem", placeholder: "mashreq.passengerNamePlaceholder" },
                { title: "mashreq.externalWitnessesTitle", arrayName: "externalWitnesses", buttonLabel: "mashreq.addExternalWitnessButton", itemLabel: "mashreq.externalWitnessItem", placeholder: "mashreq.witnessNamePlaceholder" }
            ].map(section => (
                <div key={section.arrayName}>
                    <h3 className="text-md font-medium text-gray-700 mb-2">{t(section.title)}</h3>
                    {formData[section.arrayName].map((name, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md mb-2 border border-gray-200">
                            <input
                                type="text"
                                placeholder={t(section.placeholder)}
                                value={name}
                                onChange={e => handleStringArrayChange(section.arrayName, index, e.target.value)}
                                className="flex-grow p-2 border text-sm border-gray-300 rounded-md mr-2"
                            />
                            <button type="button" onClick={() => removeArrayItem(section.arrayName, index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addStringToArray(section.arrayName)} className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                        {t(section.buttonLabel)}
                    </button>
                </div>
            ))}
        </div>
    );

    const renderSignaturesNotes = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderCommonInput("mashreq.driverSignatureNameLabel", "name", formData.driverSignature.name, handleChange, "text", false, null, "driverSignature", "name")}
            {renderCommonInput("mashreq.driverSignatureDateLabel", "date", formData.driverSignature.date, handleChange, "date", false, null, "driverSignature", "date")}
            {renderCommonInput("mashreq.claimantNameLabel", "name", formData.claimant.name, handleChange, "text", false, null, "claimant", "name")}
            {renderCommonInput("mashreq.claimantSignatureLabel", "signature", formData.claimant.signature, handleChange, "text", false, null, "claimant", "signature")}
            {renderCommonInput("mashreq.receiverNameLabel", "name", formData.receiver.name, handleChange, "text", false, null, "receiver", "name")}
            {renderCommonInput("mashreq.receiverNotesLabel", "notes", formData.receiver.notes, handleChange, "textarea", false, null, "receiver", "notes")}
            <div className="md:col-span-2">
                {renderCommonInput("mashreq.generalNotesLabel", "generalNotes", formData.generalNotes, handleChange, "textarea")}
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[900px] bg-white rounded-lg shadow-lg"> {/* Slightly wider for more complex form */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">{t('mashreq.modalTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-300 mx-6 mb-4">
                        <p className="text-lg font-semibold text-gray-700">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-340px)] overflow-y-auto space-y-4"> {/* Adjusted max-h */}
                        {currentStep === 1 && renderOfficePolicyInfo()}
                        {currentStep === 2 && renderInsuredVehicleInfo()}
                        {currentStep === 3 && renderDriverInfo()}
                        {currentStep === 4 && renderAccidentDetails()}
                        {currentStep === 5 && renderOtherPartiesDamages()}
                        {currentStep === 6 && renderSignaturesNotes()}
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>{t('backButton')}</button>
                        {currentStep < 6 && (
                            <button type="button" onClick={handleNext} className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{t('nextButton')}</button>
                        )} {currentStep==6 && (
                            <button type="submit" className={`px-4 py-2 text-sm text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : t('submitButton')}</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InsuranceMashreqRep;