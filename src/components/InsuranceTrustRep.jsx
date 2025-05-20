import { useState } from "react";
import { X } from "lucide-react";

const t = (key, ...args) => {
    const translations = {
        "trust.modalTitle": "Trust Accident Report Form",
        "trust.step1Indicator": "Accident Details",
        "trust.step2Indicator": "Insured Vehicle",
        "trust.step3Indicator": "Driver Details",
        "trust.step4Indicator": "Damages",
        "trust.step5Indicator": "Other Vehicle",
        "trust.step6Indicator": "Witnesses & Police",
        "trust.step7Indicator": "Narration & Declaration",

        "trust.accidentDetailsTitle": "Accident Details",
        "trust.insuredVehicleTitle": "Insured Vehicle Information",
        "trust.driverDetailsTitle": "Driver Details",
        "trust.damagesTitle": "Damages to Insured Vehicle",
        "trust.otherVehicleTitle": "Other Vehicle Involved",
        "trust.witnessesPoliceTitle": "Witnesses and Police Report",
        "trust.narrationDeclarationTitle": "Narration and Declaration",

        "trust.accidentLocationLabel": "Accident Location",
        "trust.accidentDateLabel": "Accident Date",
        "trust.accidentTimeLabel": "Accident Time (HH:MM)",
        "trust.accidentTypeLabel": "Accident Type",
        "trust.reportDateLabel": "Report Date",

        "trust.plateNumberLabel": "Plate Number (from DB)",
        "trust.vehicleTypeLabel": "Type (from DB)",
        "trust.vehicleModelLabel": "Model (from DB)",
        "trust.vehicleColorLabel": "Color (from DB)",
        "trust.vehicleOwnershipLabel": "Ownership (from DB)",
        "trust.vehicleUsageLabel": "Usage",
        "trust.manufactureYearLabel": "Manufacture Year",
        "trust.chassisNumberLabel": "Chassis Number",
        "trust.testExpiryLabel": "Test Expiry (from DB - License Expiry)",
        "trust.insuranceCompanyLabel": "Insurance Company",
        "trust.policyNumberLabel": "Policy Number",
        "trust.insuranceTypeLabel": "Insurance Type",
        "trust.insurancePeriodFromLabel": "Insurance Period From",
        "trust.insurancePeriodToLabel": "Insurance Period To",

        "trust.driverNameLabel": "Driver Name",
        "trust.driverBirthDateLabel": "Driver Birth Date",
        "trust.driverAddressLabel": "Driver Address",
        "trust.driverLicenseNumberLabel": "License Number",
        "trust.driverLicenseTypeLabel": "License Type",
        "trust.driverLicenseExpiryLabel": "License Expiry Date",
        "trust.relationToInsuredLabel": "Relation to Insured",

        "trust.damageFrontLabel": "Front Damage",
        "trust.damageBackLabel": "Back Damage",
        "trust.damageRightLabel": "Right Side Damage",
        "trust.damageLeftLabel": "Left Side Damage",
        "trust.estimatedCostLabel": "Estimated Cost of Damage",
        "trust.garageNameLabel": "Repair Garage Name",
        "trust.towCompanyLabel": "Towing Company",

        "trust.ovPlateNumberLabel": "OV Plate Number",
        "trust.ovTypeLabel": "OV Type",
        "trust.ovModelLabel": "OV Model",
        "trust.ovColorLabel": "OV Color",
        "trust.ovInsuranceCompanyLabel": "OV Insurance Company",
        "trust.ovDriverNameLabel": "OV Driver Name",
        "trust.ovDriverAddressLabel": "OV Driver Address",
        "trust.ovLicenseNumberLabel": "OV License Number",
        "trust.ovDamageDescriptionLabel": "OV Damage Description",

        "trust.witnessesTitle": "Witnesses",
        "trust.addWitnessButton": "+ Add Witness",
        "trust.witnessItemTitle": "Witness #{index}",
        "trust.witnessNameLabel": "Witness Name",
        "trust.witnessAddressLabel": "Witness Address",
        "trust.witnessPhoneLabel": "Witness Phone",
        "trust.policeReportTitle": "Police Report",
        "trust.policeReportDateLabel": "Police Report Date",
        "trust.policeAuthorityLabel": "Police Authority/Station",
        "trust.sketchDrawnLabel": "Sketch Drawn by Police?",
        "trust.officersPresentLabel": "Police Officers Present at Scene?",

        "trust.narrationLabel": "Accident Narration",
        "trust.signatureLabel": "Notifier Signature (Name/Text)",
        "trust.declarationTitle": "Declaration",
        "trust.declarerNameLabel": "Declarer Name",
        "trust.declarationDateLabel": "Declaration Date",
        "trust.reviewerNameLabel": "Reviewer Name",
        "trust.reviewerSignatureLabel": "Reviewer Signature (Name/Text)",
        "trust.reviewDateLabel": "Review Date",

        "deleteButton": "Delete",
        "newLabel": "New",
        "backButton": "Previous",
        "nextButton": "Next",
        "submitButton": "Submit",
        "formSubmissionSuccess": "Report submitted successfully!",
        "formSubmissionError": "Error submitting report: ",
        "plateNumberRequiredError": "Insured Vehicle Plate Number is required.",
        "selectDefault": "Select an option"
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


function InsuranceTrustRep({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        accidentDetails: {
            location: '', date: '', time: '', accidentType: '', reportDate: '',
        },
        insuredVehicle: {
            plateNumber: '', type: '', model: '', color: '', ownership: '',
            usage: '', manufactureYear: '', chassisNumber: '', testExpiry: '',
            insuranceCompany: '', policyNumber: '', insuranceType: '',
            insurancePeriod: { from: '', to: '' },
        },
        driverDetails: {
            name: '', birthDate: '', address: '', licenseNumber: '',
            licenseType: '', licenseExpiry: '', relationToInsured: '',
        },
        damages: {
            front: '', back: '', right: '', left: '',
            estimatedCost: '', garageName: '', towCompany: '',
        },
        otherVehicle: {
            plateNumber: '', type: '', model: '', color: '', insuranceCompany: '',
            driverName: '', driverAddress: '', licenseNumber: '', damageDescription: '',
        },
        witnesses: [],
        policeReport: {
            reportDate: '', authority: '', sketchDrawn: false, officersPresent: false,
        },
        narration: '',
        signature: '',
        declaration: {
            declarerName: '', declarationDate: '', reviewerName: '',
            reviewerSignature: '', reviewDate: '',
        },
    });

    const handleChange = (e, section, subField, arrayName, index, itemField, subSubField) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newState = { ...prev };
            if (arrayName && typeof index === 'number') {
                if (!newState[arrayName]) newState[arrayName] = [];
                if (!newState[arrayName][index]) newState[arrayName][index] = {};
                const newArray = [...newState[arrayName]];
                newArray[index] = { ...newArray[index], [itemField]: val };
                newState[arrayName] = newArray;
            } else if (section && subSubField && subField) {
                newState[section] = {
                    ...newState[section],
                    [subField]: {
                        ...(newState[section]?.[subField] || {}),
                        [subSubField]: val,
                    },
                };
            } else if (section && subField) {
                newState[section] = {
                    ...(newState[section] || {}),
                    [subField]: val,
                };
            } else if (section) {
                newState[section] = {
                    ...(newState[section] || {}),
                    [name]: val,
                };
            } else {
                newState[name] = val;
            }
            return newState;
        });
    };

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 7));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const plateNumber = formData.insuredVehicle.plateNumber;
        if (!plateNumber && currentStep === 7) {
            alert(t('trust.plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const dataToSend = JSON.parse(JSON.stringify(formData));

        const toBoolean = (val) => typeof val === 'string' ? (val.toLowerCase() === 'true') : Boolean(val);

        dataToSend.policeReport.sketchDrawn = toBoolean(dataToSend.policeReport.sketchDrawn);
        dataToSend.policeReport.officersPresent = toBoolean(dataToSend.policeReport.officersPresent);
        dataToSend.witnesses = dataToSend.witnesses || [];


        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log("Submitting Trust Data: ", JSON.stringify(dataToSend, null, 2));
            console.log("Plate Number for URL: ", plateNumber);

            // const response = await fetch(`http://localhost:3002/api/v1/TrustAccidentReport/add/${plateNumber}`, {
            const response = await fetch(`http://localhost:3002/api/v1/TrustAccidentReport/add/${plateNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify(dataToSend)
            });

            const responseData = await response.json();
            if (!response.ok) {
                console.error("Server Error Response:", responseData);
                throw new Error(responseData.message || `HTTP error! status: ${response.status} - ${JSON.stringify(responseData.errors || responseData)}`);
            }

            console.log('Form submitted successfully:', responseData);
            alert(t('trust.formSubmissionSuccess') + (responseData.message ? `\n${responseData.message}` : ''));
            onClose();

        } catch (error) {
            console.error('Submission error object:', error);
            alert(t('trust.formSubmissionError') + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addArrayItem = (arrayName, itemStructure = {}) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), itemStructure]
        }));
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: (prev[arrayName] || []).filter((_, i) => i !== index)
        }));
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return t('trust.accidentDetailsTitle');
            case 2: return t('trust.insuredVehicleTitle');
            case 3: return t('trust.driverDetailsTitle');
            case 4: return t('trust.damagesTitle');
            case 5: return t('trust.otherVehicleTitle');
            case 6: return t('trust.witnessesPoliceTitle');
            case 7: return t('trust.narrationDeclarationTitle');
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="px-4 py-3 mb-4">
            <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                    <div key={step} className="flex flex-col items-center text-center flex-1 px-1">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium ${currentStep >= step ? 'bg-indigo-600 text-[rgb(255,255,255)]' : 'bg-gray-200 text-gray-600'}`}>{step}</div>
                        <span className="text-[10px] leading-tight mt-1 text-gray-600">
                            {step === 1 && t('trust.step1Indicator')}
                            {step === 2 && t('trust.step2Indicator')}
                            {step === 3 && t('trust.step3Indicator')}
                            {step === 4 && t('trust.step4Indicator')}
                            {step === 5 && t('trust.step5Indicator')}
                            {step === 6 && t('trust.step6Indicator')}
                            {step === 7 && t('trust.step7Indicator')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCommonInput = (label, name, value, type = "text", required = false, section = null, subField = null, arrayName = null, index = null, itemField = null, subSubField = null, options = null) => {
        const inputId = `${section || ''}${subField || ''}${arrayName || ''}${index || ''}${itemField || ''}${subSubField || ''}${name || label}`;

        if (type === "checkbox") {
            return (
                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={inputId}
                        name={name}
                        checked={Boolean(value)}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="h-4 w-4 text-indigo-600 border dark:border-borderNav-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={inputId} className="ml-2 block text-sm font-medium text-gray-700">
                        {t(label)} {required && <span className="text-red-500">*</span>}
                    </label>
                </div>
            );
        }

        return (
            <div className="mb-2">
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-[rgb(255,255,255)]">{t(label)} {required && <span className="text-red-500">*</span>}</label>
                {type === "select" ? (
                    <select
                        id={inputId}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md text-sm"
                        required={required}
                    >
                        <option value="">{options && options.find(o => o.value === '') ? t(options.find(o => o.value === '').label) : t("selectDefault")}</option>
                        {options && options.filter(o => o.value !== '').map(opt => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                    </select>
                ) : type === "textarea" ? (
                    <textarea
                        id={inputId}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        rows="2"
                        className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md text-sm"
                        required={required}
                    ></textarea>
                ) : (
                    <input
                        id={inputId}
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md text-sm"
                        required={required}
                        step={type === "number" ? "any" : undefined}
                    />
                )}
            </div>
        );
    };


    const renderAccidentDetailsInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("trust.accidentLocationLabel", "location", formData.accidentDetails.location, "text", true, "accidentDetails", "location")}
            {renderCommonInput("trust.accidentDateLabel", "date", formData.accidentDetails.date, "date", true, "accidentDetails", "date")}
            {renderCommonInput("trust.accidentTimeLabel", "time", formData.accidentDetails.time, "time", true, "accidentDetails", "time")}
            {renderCommonInput("trust.accidentTypeLabel", "accidentType", formData.accidentDetails.accidentType, "text", true, "accidentDetails", "accidentType")}
            {renderCommonInput("trust.reportDateLabel", "reportDate", formData.accidentDetails.reportDate, "date", true, "accidentDetails", "reportDate")}
        </div>
    );

    const renderInsuredVehicleInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderCommonInput("trust.plateNumberLabel", "plateNumber", formData.insuredVehicle.plateNumber, "text", true, "insuredVehicle", "plateNumber")}
            {renderCommonInput("trust.vehicleUsageLabel", "usage", formData.insuredVehicle.usage, "text", true, "insuredVehicle", "usage")}
            {renderCommonInput("trust.manufactureYearLabel", "manufactureYear", formData.insuredVehicle.manufactureYear, "text", true, "insuredVehicle", "manufactureYear")}
            {renderCommonInput("trust.chassisNumberLabel", "chassisNumber", formData.insuredVehicle.chassisNumber, "text", true, "insuredVehicle", "chassisNumber")}
            {renderCommonInput("trust.insuranceCompanyLabel", "insuranceCompany", formData.insuredVehicle.insuranceCompany, "text", true, "insuredVehicle", "insuranceCompany")}
            {renderCommonInput("trust.policyNumberLabel", "policyNumber", formData.insuredVehicle.policyNumber, "text", true, "insuredVehicle", "policyNumber")}
            {renderCommonInput("trust.insuranceTypeLabel", "insuranceType", formData.insuredVehicle.insuranceType, "text", true, "insuredVehicle", "insuranceType")}
            {renderCommonInput("trust.insurancePeriodFromLabel", "from", formData.insuredVehicle.insurancePeriod.from, "date", true, "insuredVehicle", "insurancePeriod", null, null, null, "from")}
            {renderCommonInput("trust.insurancePeriodToLabel", "to", formData.insuredVehicle.insurancePeriod.to, "date", true, "insuredVehicle", "insurancePeriod", null, null, null, "to")}
        </div>
    );

    const renderDriverDetailsInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("trust.driverNameLabel", "name", formData.driverDetails.name, "text", true, "driverDetails", "name")}
            {renderCommonInput("trust.driverBirthDateLabel", "birthDate", formData.driverDetails.birthDate, "date", true, "driverDetails", "birthDate")}
            {renderCommonInput("trust.driverAddressLabel", "address", formData.driverDetails.address, "text", true, "driverDetails", "address")}
            {renderCommonInput("trust.driverLicenseNumberLabel", "licenseNumber", formData.driverDetails.licenseNumber, "text", true, "driverDetails", "licenseNumber")}
            {renderCommonInput("trust.driverLicenseTypeLabel", "licenseType", formData.driverDetails.licenseType, "text", true, "driverDetails", "licenseType")}
            {renderCommonInput("trust.driverLicenseExpiryLabel", "licenseExpiry", formData.driverDetails.licenseExpiry, "date", true, "driverDetails", "licenseExpiry")}
            {renderCommonInput("trust.relationToInsuredLabel", "relationToInsured", formData.driverDetails.relationToInsured, "text", true, "driverDetails", "relationToInsured")}
        </div>
    );

    const renderDamagesInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("trust.damageFrontLabel", "front", formData.damages.front, "textarea", true, "damages", "front")}
            {renderCommonInput("trust.damageBackLabel", "back", formData.damages.back, "textarea", true, "damages", "back")}
            {renderCommonInput("trust.damageRightLabel", "right", formData.damages.right, "textarea", true, "damages", "right")}
            {renderCommonInput("trust.damageLeftLabel", "left", formData.damages.left, "textarea", true, "damages", "left")}
            {renderCommonInput("trust.estimatedCostLabel", "estimatedCost", formData.damages.estimatedCost, "text", true, "damages", "estimatedCost")}
            {renderCommonInput("trust.garageNameLabel", "garageName", formData.damages.garageName, "text", true, "damages", "garageName")}
            {renderCommonInput("trust.towCompanyLabel", "towCompany", formData.damages.towCompany, "text", true, "damages", "towCompany")}
        </div>
    );

    const renderOtherVehicleInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderCommonInput("trust.ovPlateNumberLabel", "plateNumber", formData.otherVehicle.plateNumber, "text", true, "otherVehicle", "plateNumber")}
            {renderCommonInput("trust.ovTypeLabel", "type", formData.otherVehicle.type, "text", true, "otherVehicle", "type")}
            {renderCommonInput("trust.ovModelLabel", "model", formData.otherVehicle.model, "text", true, "otherVehicle", "model")}
            {renderCommonInput("trust.ovColorLabel", "color", formData.otherVehicle.color, "text", true, "otherVehicle", "color")}
            {renderCommonInput("trust.ovInsuranceCompanyLabel", "insuranceCompany", formData.otherVehicle.insuranceCompany, "text", true, "otherVehicle", "insuranceCompany")}
            {renderCommonInput("trust.ovDriverNameLabel", "driverName", formData.otherVehicle.driverName, "text", true, "otherVehicle", "driverName")}
            {renderCommonInput("trust.ovDriverAddressLabel", "driverAddress", formData.otherVehicle.driverAddress, "text", true, "otherVehicle", "driverAddress")}
            {renderCommonInput("trust.ovLicenseNumberLabel", "licenseNumber", formData.otherVehicle.licenseNumber, "text", true, "otherVehicle", "licenseNumber")}
            <div className="md:col-span-2 lg:col-span-3">
                {renderCommonInput("trust.ovDamageDescriptionLabel", "damageDescription", formData.otherVehicle.damageDescription, "textarea", true, "otherVehicle", "damageDescription")}
            </div>
        </div>
    );

    const renderWitnessesAndPoliceInfo = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("trust.witnessesTitle")}</h3>
                {(formData.witnesses || []).map((witness, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 border-b">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('trust.witnessItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('witnesses', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
                            {renderCommonInput("trust.witnessNameLabel", `wit_name_${index}`, witness.name, "text", true, null, null, "witnesses", index, "name")}
                            {renderCommonInput("trust.witnessAddressLabel", `wit_addr_${index}`, witness.address, "text", true, null, null, "witnesses", index, "address")}
                            {renderCommonInput("trust.witnessPhoneLabel", `wit_phone_${index}`, witness.phone, "tel", true, null, null, "witnesses", index, "phone")}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('witnesses', { name: '', address: '', phone: '' })}
                    className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('trust.addWitnessButton')}
                </button>
            </div>
            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("trust.policeReportTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("trust.policeReportDateLabel", "reportDate", formData.policeReport.reportDate, "date", true, "policeReport", "reportDate")}
                    {renderCommonInput("trust.policeAuthorityLabel", "authority", formData.policeReport.authority, "text", true, "policeReport", "authority")}
                    {renderCommonInput("trust.sketchDrawnLabel", "sketchDrawn", formData.policeReport.sketchDrawn, "checkbox", true, "policeReport", "sketchDrawn")}
                    {renderCommonInput("trust.officersPresentLabel", "officersPresent", formData.policeReport.officersPresent, "checkbox", true, "policeReport", "officersPresent")}
                </div>
            </div>
        </div>
    );

    const renderNarrationAndDeclarationInfo = () => (
        <div className="space-y-6">
            {renderCommonInput("trust.narrationLabel", "narration", formData.narration, "textarea", true, null, "narration")}
            {renderCommonInput("trust.signatureLabel", "signature", formData.signature, "text", true, null, "signature")}
            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("trust.declarationTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("trust.declarerNameLabel", "declarerName", formData.declaration.declarerName, "text", true, "declaration", "declarerName")}
                    {renderCommonInput("trust.declarationDateLabel", "declarationDate", formData.declaration.declarationDate, "date", true, "declaration", "declarationDate")}
                    {renderCommonInput("trust.reviewerNameLabel", "reviewerName", formData.declaration.reviewerName, "text", true, "declaration", "reviewerName")}
                    {renderCommonInput("trust.reviewerSignatureLabel", "reviewerSignature", formData.declaration.reviewerSignature, "text", true, "declaration", "reviewerSignature")}
                    {renderCommonInput("trust.reviewDateLabel", "reviewDate", formData.declaration.reviewDate, "date", true, "declaration", "reviewDate")}
                </div>
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[900px] bg-[rgb(255,255,255)] dark:bg-navbarBack dark:text-dark4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between px-6 py-3 border-b  ">
                    <h2 className="text-lg font-semibold text-gray-700  dark:text-[rgb(255,255,255)]">{t('trust.modalTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b  border-gray-300 mx-6 mb-3">
                        <p className="text-md font-semibold text-gray-700 dark:text-[rgb(255,255,255)]">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-330px)] overflow-y-auto space-y-4">
                        {currentStep === 1 && renderAccidentDetailsInfo()}
                        {currentStep === 2 && renderInsuredVehicleInfo()}
                        {currentStep === 3 && renderDriverDetailsInfo()}
                        {currentStep === 4 && renderDamagesInfo()}
                        {currentStep === 5 && renderOtherVehicleInfo()}
                        {currentStep === 6 && renderWitnessesAndPoliceInfo()}
                        {currentStep === 7 && renderNarrationAndDeclarationInfo()}
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center border-t  dark:border-borderNav-gray-200 mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-[rgb(255,255,255)] border dark:border-borderNav border dark:border-borderNav-gray-300 hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>{t('backButton')}</button>
                        {currentStep < 7 ? (
                            <button type="button" onClick={handleNext} className={`px-4 py-2 text-sm text-[rgb(255,255,255)] bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{t('nextButton')}</button>
                        ) : (
                            <button type="submit" className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : t('submitButton')}</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InsuranceTrustRep;