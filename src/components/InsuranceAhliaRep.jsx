import { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from 'axios';
const t = (key, ...args) => {
    const translations = {
        "reportInfoTitle": "Report information",
        "policyInfoTitle": "Policy information",
        "driverInfoTitle": "Driver information",
        "vehicleInfoTitle": "Vehicle information",
        "accidentDetailsTitle": "Accident details",
        "declarationTitle": "Declaration",
        "reportNumberLabel": "Report Number",
        "accidentDateLabel": "Accident Date",
        "accidentTimeLabel": "Accident Time", 
        "agentNumberLabel": "Agent Number",
        "policyNumberLabel": "Policy Number",
        "policyTypeLabel": "Policy Type",
        "policyTypeOptionDefault": "Select Policy Type",
        "policyTypeOptionCOM": "COM",
        "policyTypeOptionTPL": "TPL",
        "policyTypeOptionA.C.T": "A.C.T",
        "policyDurationFromLabel": "Policy Duration From",
        "policyDurationToLabel": "Policy Duration To",
        "insuredPersonNameLabel": "Insured Person Name",
        "driverNameLabel": "Driver Name",
        "idNumberLabel": "ID Number",
        "ageLabel": "Age",
        "licenseNumberLabel": "License Number",
        "licenseTypeLabel": "License Type",
        "licenseIssueDateLabel": "License Issue Date",
        "licenseMatchesVehicleLabel": "License Matches Vehicle",
        "vehicleUsageLabel": "Usage",
        "manufactureYearLabel": "Manufacture Year",
        "vehicleTypeLabel": "Vehicle Type",
        "registrationNumberLabel": "Registration Number (Plate Number)",
        "registrationTypeLabel": "Registration Type",
        "lastTestDateLabel": "Last Test Date",
        "licenseExpiryLabel": "License Expiry Date",
        "accidentLocationLabel": "Accident Location",
        "weatherConditionLabel": "Weather Condition",
        "purposeOfUseLabel": "Purpose of Use",
        "accidentTypeLabel": "Accident Type",
        "accidentTypeOptionDefault": "Select Accident Type",
        "accidentTypeOptionBody": "جسدي",
        "accidentTypeOptionMaterial": "مادي",
        "accidentTypeOptionBodyMaterial": "جسدي + مادي",
        "accidentDetailsTimeLabel": "Accident Time (Details)", // For Step 5
        "accidentsketchLabel": "Accident Sketch",
        "driverStatementLabel": "Driver Statement",
        "thirdPartyDamagedVehiclesTitle": "Third Party Damaged Vehicles",
        "thirdPartyVehicleItem": "Vehicle #{index}: {id}",
        "newLabel": "New",
        "deleteButton": "Delete",
        "addDamagedVehicleButton": "+ Add Damaged Vehicle",
        "thirdPartyInjuriesTitle": "Third Party Injuries",
        "thirdPartyInjuryItem": "Injury #{index}: {name}",
        "addInjuryButton": "+ Add Injury",
        "declarationDriverSignatureLabel": "Driver/Authorized Signature",
        "declarationDateLabel": "Declaration Date",
        "declarationOfficerSignatureLabel": "Officer Signature",
        "declarationOfficerDateLabel": "Officer Signature Date",
        "modalTitle": "Ahlia Accident Report Form",
        "step1Indicator": "Report Information",
        "step2Indicator": "Policy Information",
        "step3Indicator": "Driver Information",
        "step4Indicator": "Vehicle Information",
        "step5Indicator": "Accident Details",
        "step6Indicator": "Declaration",
        "backButton": "Previous",
        "nextButton": "Next",
        "submitButton": "Submit",
        "saveChangesButton": "Save Changes",
        "formSubmissionSuccess": "Form submitted successfully!",
        "formSubmissionUpdateSuccess": "Form updated successfully!",
        "formSubmissionError": "Error submitting form: ",
        "plateNumberRequiredError": "Vehicle Registration Number (Plate Number) is required to submit the report.",
        // For thirdPartyVehicles inputs
        "tpv_vehicleNumberLabel": "Vehicle Number",
        "tpv_typeLabel": "Type",
        "tpv_modelLabel": "Model",
        "tpv_colorLabel": "Color",
        "tpv_ownerNameLabel": "Owner Name",
        "tpv_ownerAddressLabel": "Owner Address",
        "tpv_ownerPhoneLabel": "Owner Phone",
        "tpv_driverNameLabel": "Driver Name",
        "tpv_driverAddressLabel": "Driver Address",
        "tpv_driverPhoneLabel": "Driver Phone",
        "tpv_insuranceCompanyLabel": "Insurance Company",
        "tpv_insurancePolicyNumberLabel": "Policy Number",
        "tpv_damageDetailsLabel": "Damage Details",
        // For thirdPartyInjuries inputs
        "tpi_nameLabel": "Name",
        "tpi_ageLabel": "Age",
        "tpi_addressLabel": "Address",
        "tpi_professionLabel": "Profession",
        "tpi_injuryTypeLabel": "Injury Type",


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

function InsuranceAhliaRep({ onClose, isOpen, initialData, reportId }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialFormData = {
        reportNumber: '', accidentDate: '', accidentTime: '', policeNumber: '', agentNumber: '',
        policyInfo: { policyNumber: '', type: '', durationFrom: '', durationTo: '' },
        insuredPerson: { name: '' },
        driverInfo: { name: '', idNumber: '', age: '', licenseNumber: '', licenseType: '', licenseIssueDate: '', matchesVehicle: false },
        vehicleInfo: { usage: '', manufactureYear: '', vehicleType: '', registrationNumber: '', registrationType: '', lastTestDate: '', licenseExpiry: '' },
        accidentDetails: { location: '', time: '', weather: '', purposeOfUse: '', accidentType: '', sketch: '', driverStatement: '', signature: '' },
        thirdPartyVehicles: [], thirdPartyInjuries: [], thirdPartyPassengers: [], externalWitnesses: [],
        declaration: { driverSignature: '', declarationDate: '', officerSignature: '', officerDate: '' }
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (isOpen) { // Only run when modal opens or initialData/reportId changes while open
            if (initialData && reportId) {
                const formatDateForInput = (dateString) => {
                    if (!dateString) return '';
                    try { return new Date(dateString).toISOString().split('T')[0]; } catch (e) { return ''; }
                };
                setFormData({
                    reportNumber: initialData.reportNumber || '',
                    accidentDate: formatDateForInput(initialData.accidentDate),
                    accidentTime: initialData.accidentTime || '',
                    policeNumber: initialData.policeNumber || '',
                    agentNumber: initialData.agentNumber || '',
                    policyInfo: {
                        policyNumber: initialData.policyInfo?.policyNumber || '',
                        type: initialData.policyInfo?.type || '',
                        durationFrom: formatDateForInput(initialData.policyInfo?.durationFrom),
                        durationTo: formatDateForInput(initialData.policyInfo?.durationTo),
                    },
                    insuredPerson: { name: initialData.insuredPerson?.name || '' },
                    driverInfo: {
                        name: initialData.driverInfo?.name || '',
                        idNumber: initialData.driverInfo?.idNumber || '',
                        age: initialData.driverInfo?.age || '',
                        licenseNumber: initialData.driverInfo?.licenseNumber || '',
                        licenseType: initialData.driverInfo?.licenseType || '',
                        licenseIssueDate: formatDateForInput(initialData.driverInfo?.licenseIssueDate),
                        matchesVehicle: initialData.driverInfo?.matchesVehicle || false,
                    },
                    vehicleInfo: {
                        usage: initialData.vehicleInfo?.usage || '',
                        manufactureYear: initialData.vehicleInfo?.manufactureYear || '',
                        vehicleType: initialData.vehicleInfo?.vehicleType || '',
                        registrationNumber: initialData.vehicleInfo?.registrationNumber || '',
                        registrationType: initialData.vehicleInfo?.registrationType || '',
                        lastTestDate: formatDateForInput(initialData.vehicleInfo?.lastTestDate),
                        licenseExpiry: formatDateForInput(initialData.vehicleInfo?.licenseExpiry),
                    },
                    accidentDetails: {
                        location: initialData.accidentDetails?.location || '',
                        time: initialData.accidentDetails?.time || initialData.accidentTime || '',
                        weather: initialData.accidentDetails?.weather || '',
                        purposeOfUse: initialData.accidentDetails?.purposeOfUse || '',
                        accidentType: initialData.accidentDetails?.accidentType || '',
                        sketch: initialData.accidentDetails?.sketch || '',
                        driverStatement: initialData.accidentDetails?.driverStatement || '',
                        signature: initialData.accidentDetails?.signature || '',
                    },
                    thirdPartyVehicles: Array.isArray(initialData.thirdPartyVehicles) ? initialData.thirdPartyVehicles : [],
                    thirdPartyInjuries: Array.isArray(initialData.thirdPartyInjuries) ? initialData.thirdPartyInjuries : [],
                    thirdPartyPassengers: Array.isArray(initialData.thirdPartyPassengers) ? initialData.thirdPartyPassengers : [],
                    externalWitnesses: Array.isArray(initialData.externalWitnesses) ? initialData.externalWitnesses : [],
                    declaration: {
                        driverSignature: initialData.declaration?.driverSignature || '',
                        declarationDate: formatDateForInput(initialData.declaration?.declarationDate),
                        officerSignature: initialData.declaration?.officerSignature || '',
                        officerDate: formatDateForInput(initialData.declaration?.officerDate),
                    },
                });
            } else {
                setFormData(initialFormData); // Reset for add mode
                setCurrentStep(1); // Reset step for add mode
            }
        }
    }, [initialData, reportId, isOpen]);


    const handleChange = (e, section, subField, arrayName, index, itemField) => {
        const { name, value, type, checked } = e.target;
        const valToSet = type === 'checkbox' ? checked : value;

        setFormData(prev => {
            const newState = { ...prev };
            if (arrayName && typeof index === 'number' && itemField) {
                const currentArray = prev[arrayName] || [];
                const newArray = [...currentArray];
                newArray[index] = { ...(newArray[index] || {}), [itemField]: valToSet };
                newState[arrayName] = newArray;
            } else if (section && subField) {
                newState[section] = { ...(prev[section] || {}), [subField]: valToSet };
            } else if (section) {
                newState[section] = { ...(prev[section] || {}), [name]: valToSet };
            } else {
                newState[name] = valToSet;
            }
            return newState;
        });
    };

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const plateNumberForUrl = formData.vehicleInfo.registrationNumber;

        if (!reportId && !plateNumberForUrl) {
            alert(t('plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const dataToSend = JSON.parse(JSON.stringify(formData));

        const toNumberOrUndefined = (val) => {
            const num = Number(val);
            return isNaN(num) || val === '' || val === null || val === undefined ? undefined : num;
        };
        const toBoolean = (val) => typeof val === 'string' ? (val.toLowerCase() === 'true') : Boolean(val);
        const formatDateForBackend = (dateStr) => {
            if (!dateStr) return undefined;
            try { return new Date(dateStr).toISOString(); } catch (e) { return undefined; }
        };

        dataToSend.accidentDate = formatDateForBackend(dataToSend.accidentDate);
        if (dataToSend.policyInfo) {
            dataToSend.policyInfo.durationFrom = formatDateForBackend(dataToSend.policyInfo.durationFrom);
            dataToSend.policyInfo.durationTo = formatDateForBackend(dataToSend.policyInfo.durationTo);
        }
        if (dataToSend.driverInfo) {
            dataToSend.driverInfo.age = toNumberOrUndefined(dataToSend.driverInfo.age);
            dataToSend.driverInfo.licenseIssueDate = formatDateForBackend(dataToSend.driverInfo.licenseIssueDate);
            dataToSend.driverInfo.matchesVehicle = toBoolean(dataToSend.driverInfo.matchesVehicle);
        }
        if (dataToSend.vehicleInfo) {
            dataToSend.vehicleInfo.lastTestDate = formatDateForBackend(dataToSend.vehicleInfo.lastTestDate);
            dataToSend.vehicleInfo.licenseExpiry = formatDateForBackend(dataToSend.vehicleInfo.licenseExpiry);
        }
        if (dataToSend.declaration) {
            dataToSend.declaration.declarationDate = formatDateForBackend(dataToSend.declaration.declarationDate);
            dataToSend.declaration.officerDate = formatDateForBackend(dataToSend.declaration.officerDate);
        }

        // Ensure arrays are initialized properly for submission
        dataToSend.thirdPartyVehicles = Array.isArray(dataToSend.thirdPartyVehicles) ? dataToSend.thirdPartyVehicles : [];
        dataToSend.thirdPartyInjuries = Array.isArray(dataToSend.thirdPartyInjuries) ? dataToSend.thirdPartyInjuries : [];
        dataToSend.thirdPartyPassengers = Array.isArray(dataToSend.thirdPartyPassengers) ? dataToSend.thirdPartyPassengers : [];
        dataToSend.externalWitnesses = Array.isArray(dataToSend.externalWitnesses) ? dataToSend.externalWitnesses : [];


        let url = '';
        let method = '';

        if (reportId) {
            url = `http://localhost:3002/api/v1/AhliaAccidentReport/update/${reportId}`; // Make sure this endpoint exists
            method = 'PATCH'; // Or PUT
        } else {
            url = `http://localhost:3002/api/v1/AhliaAccidentReport/add/${plateNumberForUrl}`;
            method = 'POST';
        }

        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log("Submitting Ahlia Data:", method, url, JSON.stringify(dataToSend, null, 2));

            const response = await axios({
                method: method, url: url, data: dataToSend,
                headers: { 'Content-Type': 'application/json', token }
            });

            console.log(`Form ${reportId ? 'updated' : 'submitted'} successfully:`, response.data);
            alert(t(reportId ? 'formSubmissionUpdateSuccess' : 'formSubmissionSuccess') + (response.data.message ? `\n${response.data.message}` : ''));
            onClose(true); 

        } catch (error) {
            console.error(`Submission error (${reportId ? 'update' : 'add'}):`, error.response?.data || error.message || error);
            alert(t('formSubmissionError') + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    };

    const addArrayItem = (arrayName, item) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...(prev[arrayName] || []), item]
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
            case 1: return t('reportInfoTitle');
            case 2: return t('policyInfoTitle');
            case 3: return t('driverInfoTitle');
            case 4: return t('vehicleInfoTitle');
            case 5: return t('accidentDetailsTitle');
            case 6: return t('declarationTitle');
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="px-4 py-3 mb-4">
            <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                    <div key={step} className="flex flex-col items-center text-center flex-1">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${currentStep >= step ? 'bg-indigo-600 text-[rgb(255,255,255)]' : 'bg-gray-200 text-gray-600'}`}>{step}</div>
                        <span className="text-xs mt-1 text-gray-600">
                            {step === 1 && t('step1Indicator')} {step === 2 && t('step2Indicator')} {step === 3 && t('step3Indicator')}
                            {step === 4 && t('step4Indicator')} {step === 5 && t('step5Indicator')} {step === 6 && t('step6Indicator')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCommonInput = (label, name, value, type = "text", required = false, section = null, subField = null, options = null, arrayName = null, index = null, itemField = null) => {
        const inputId = `${section || ''}${subField || ''}${arrayName || ''}${index || ''}${itemField || ''}${name || label}`;
        return (
            <div>
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-[rgb(255,255,255)]">{t(label)} {required && <span className="text-red-500">*</span>}</label>
                {type === "select" ? (
                    <select id={inputId} name={name} value={value || ''} onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField || name)} className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md" required={required}>
                        {(options || []).map(opt => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                    </select>
                ) : type === "textarea" ? (
                    <textarea id={inputId} name={name} value={value || ''} onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField || name)} rows="3" className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md" required={required}></textarea>
                ) : (
                    <input id={inputId} type={type} name={name} value={value || ''} onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField || name)} className="mt-1 w-full p-2 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md" required={required} />
                )}
            </div>
        );
    };

    const renderCheckbox = (label, name, checked, section, subField, arrayName = null, index = null, itemField = null) => {
        const inputId = `${section || ''}${subField || ''}${arrayName || ''}${index || ''}${itemField || ''}${name || label}`;
        return (
            <div className="flex items-center col-span-1 md:col-span-2 mt-1">
                <input type="checkbox" id={inputId} name={name} checked={Boolean(checked)} onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField || name)} className="h-4 w-4 text-indigo-600 border dark:border-borderNav-gray-300 rounded" />
                <label htmlFor={inputId} className="ml-2 block text-sm text-gray-700">{t(label)}</label>
            </div>
        );
    };

    const modalTitleText = reportId ? "Edit Ahlia Accident Report" : t('modalTitle');
    const submitButtonText = reportId ? t('saveChangesButton') : t('submitButton');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[800px] bg-[rgb(255,255,255)] rounded-lg shadow-lg dark:bg-navbarBack ">
                <div className="flex items-center justify-between px-6 py-4 border-b  dark:border-borderNav-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-[rgb(255,255,255)]">{modalTitleText}</h2>
                    <button onClick={() => onClose(false)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b  dark:border-borderNav-gray-300 mx-6 mb-4">
                        <p className="text-lg font-semibold text-gray-700 dark:text-[rgb(255,255,255)]">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-320px)] overflow-y-auto space-y-4">
                        {currentStep === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderCommonInput("reportNumberLabel", "reportNumber", formData.reportNumber, "text", false, null, null, null, null, "reportNumber")}
                                {renderCommonInput("accidentDateLabel", "accidentDate", formData.accidentDate, "date", true, null, null, null, null, "accidentDate")}
                                {renderCommonInput("accidentTimeLabel", "accidentTime", formData.accidentTime, "time", true, null, null, null, null, "accidentTime")}
                                {renderCommonInput("policeNumberLabel", "policeNumber", formData.policeNumber, "text", false, null, null, null, null, "policeNumber")}
                                {renderCommonInput("agentNumberLabel", "agentNumber", formData.agentNumber, "text", false, null, null, null, null, "agentNumber")}
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderCommonInput("policyNumberLabel", "policyNumber", formData.policyInfo.policyNumber, "text", false, "policyInfo", "policyNumber")}
                                {renderCommonInput("policyTypeLabel", "type", formData.policyInfo.type, "select", false, "policyInfo", "type", [
                                    { value: "", label: "policyTypeOptionDefault" }, { value: "COM", label: "policyTypeOptionCOM" },
                                    { value: "TPL", label: "policyTypeOptionTPL" }, { value: "A.C.T", label: "policyTypeOptionA.C.T" },
                                ])}
                                {renderCommonInput("policyDurationFromLabel", "durationFrom", formData.policyInfo.durationFrom, "date", false, "policyInfo", "durationFrom")}
                                {renderCommonInput("policyDurationToLabel", "durationTo", formData.policyInfo.durationTo, "date", false, "policyInfo", "durationTo")}
                                {renderCommonInput("insuredPersonNameLabel", "name", formData.insuredPerson.name, "text", false, "insuredPerson", "name")}
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderCommonInput("driverNameLabel", "name", formData.driverInfo.name, "text", false, "driverInfo", "name")}
                                {renderCommonInput("idNumberLabel", "idNumber", formData.driverInfo.idNumber, "text", false, "driverInfo", "idNumber")}
                                {renderCommonInput("ageLabel", "age", formData.driverInfo.age, "number", false, "driverInfo", "age")}
                                {renderCommonInput("licenseNumberLabel", "licenseNumber", formData.driverInfo.licenseNumber, "text", false, "driverInfo", "licenseNumber")}
                                {renderCommonInput("licenseTypeLabel", "licenseType", formData.driverInfo.licenseType, "text", false, "driverInfo", "licenseType")}
                                {renderCommonInput("licenseIssueDateLabel", "licenseIssueDate", formData.driverInfo.licenseIssueDate, "date", false, "driverInfo", "licenseIssueDate")}
                                {renderCheckbox("licenseMatchesVehicleLabel", "matchesVehicle", formData.driverInfo.matchesVehicle, "driverInfo", "matchesVehicle")}
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderCommonInput("vehicleUsageLabel", "usage", formData.vehicleInfo.usage, "text", false, "vehicleInfo", "usage")}
                                {renderCommonInput("manufactureYearLabel", "manufactureYear", formData.vehicleInfo.manufactureYear, "text", false, "vehicleInfo", "manufactureYear")}
                                {renderCommonInput("vehicleTypeLabel", "vehicleType", formData.vehicleInfo.vehicleType, "text", false, "vehicleInfo", "vehicleType")}
                                {renderCommonInput("registrationNumberLabel", "registrationNumber", formData.vehicleInfo.registrationNumber, "text", true, "vehicleInfo", "registrationNumber")}
                                {renderCommonInput("registrationTypeLabel", "registrationType", formData.vehicleInfo.registrationType, "text", false, "vehicleInfo", "registrationType")}
                                {renderCommonInput("lastTestDateLabel", "lastTestDate", formData.vehicleInfo.lastTestDate, "date", false, "vehicleInfo", "lastTestDate")}
                                {renderCommonInput("licenseExpiryLabel", "licenseExpiry", formData.vehicleInfo.licenseExpiry, "date", false, "vehicleInfo", "licenseExpiry")}
                            </div>
                        )}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderCommonInput("accidentLocationLabel", "location", formData.accidentDetails.location, "text", false, "accidentDetails", "location")}
                                    {renderCommonInput("accidentDetailsTimeLabel", "time", formData.accidentDetails.time, "time", false, "accidentDetails", "time")}
                                    {renderCommonInput("weatherConditionLabel", "weather", formData.accidentDetails.weather, "text", false, "accidentDetails", "weather")}
                                    {renderCommonInput("purposeOfUseLabel", "purposeOfUse", formData.accidentDetails.purposeOfUse, "text", false, "accidentDetails", "purposeOfUse")}
                                    {renderCommonInput("accidentTypeLabel", "accidentType", formData.accidentDetails.accidentType, "select", false, "accidentDetails", "accidentType", [
                                        { value: "", label: "accidentTypeOptionDefault" },
                                        { value: "جسدي", label: "accidentTypeOptionBody" },
                                        { value: "مادي", label: "accidentTypeOptionMaterial" },
                                        { value: "جسدي + مادي", label: "accidentTypeOptionBodyMaterial" },
                                    ])}
                                    {renderCommonInput("accidentsketchLabel", "sketch", formData.accidentDetails.sketch, "text", false, "accidentDetails", "sketch")}
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    {renderCommonInput("driverStatementLabel", "driverStatement", formData.accidentDetails.driverStatement, "textarea", false, "accidentDetails", "driverStatement")}
                                </div>
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">{t('thirdPartyDamagedVehiclesTitle')}</h3>
                                    {(formData.thirdPartyVehicles || []).map((vehicle, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-md mb-2  dark:bg-borderNav border dark:border-borderNav-gray-200 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700 dark:text-[rgb(255,255,255)] ">{t('thirdPartyVehicleItem', { index: index + 1, id: vehicle.vehicleNumber || t('newLabel') })}</span>
                                                <button type="button" onClick={() => removeArrayItem('thirdPartyVehicles', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                                            </div>
                                            {renderCommonInput("tpv_vehicleNumberLabel", "vehicleNumber", vehicle.vehicleNumber, "text", false, null, null, null, "thirdPartyVehicles", index, "vehicleNumber")}
                                            {renderCommonInput("tpv_typeLabel", "type", vehicle.type, "text", false, null, null, null, "thirdPartyVehicles", index, "type")}
                                            {renderCommonInput("tpv_modelLabel", "model", vehicle.model, "text", false, null, null, null, "thirdPartyVehicles", index, "model")}
                                            {renderCommonInput("tpv_colorLabel", "color", vehicle.color, "text", false, null, null, null, "thirdPartyVehicles", index, "color")}
                                            {renderCommonInput("tpv_ownerNameLabel", "ownerName", vehicle.ownerName, "text", false, null, null, null, "thirdPartyVehicles", index, "ownerName")}
                                            {renderCommonInput("tpv_ownerAddressLabel", "ownerAddress", vehicle.ownerAddress, "text", false, null, null, null, "thirdPartyVehicles", index, "ownerAddress")}
                                            {renderCommonInput("tpv_ownerPhoneLabel", "ownerPhone", vehicle.ownerPhone, "tel", false, null, null, null, "thirdPartyVehicles", index, "ownerPhone")}
                                            {renderCommonInput("tpv_driverNameLabel", "driverName", vehicle.driverName, "text", false, null, null, null, "thirdPartyVehicles", index, "driverName")}
                                            {renderCommonInput("tpv_driverAddressLabel", "driverAddress", vehicle.driverAddress, "text", false, null, null, null, "thirdPartyVehicles", index, "driverAddress")}
                                            {renderCommonInput("tpv_driverPhoneLabel", "driverPhone", vehicle.driverPhone, "tel", false, null, null, null, "thirdPartyVehicles", index, "driverPhone")}
                                            {renderCommonInput("tpv_insuranceCompanyLabel", "insuranceCompany", vehicle.insuranceCompany, "text", false, null, null, null, "thirdPartyVehicles", index, "insuranceCompany")}
                                            {renderCommonInput("tpv_insurancePolicyNumberLabel", "insurancePolicyNumber", vehicle.insurancePolicyNumber, "text", false, null, null, null, "thirdPartyVehicles", index, "insurancePolicyNumber")}
                                            {renderCommonInput("tpv_damageDetailsLabel", "damageDetails", vehicle.damageDetails, "textarea", false, null, null, null, "thirdPartyVehicles", index, "damageDetails")}
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addArrayItem('thirdPartyVehicles',
                                        { vehicleNumber: '', type: '', model: '', color: '', ownerName: '', ownerAddress: '', ownerPhone: '', driverName: '', driverAddress: '', driverPhone: '', insuranceCompany: '', insurancePolicyNumber: '', damageDetails: '' }
                                    )} className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                                        {t('addDamagedVehicleButton')}
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">{t('thirdPartyInjuriesTitle')}</h3>
                                    {(formData.thirdPartyInjuries || []).map((injury, index) => (
                                        <div key={index} className="bg-gray-50 p-3 rounded-md mb-2 border dark:border-borderNav border dark:border-borderNav-gray-200 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-700">{t('thirdPartyInjuryItem', { index: index + 1, name: injury.name || t('newLabel') })}</span>
                                                <button type="button" onClick={() => removeArrayItem('thirdPartyInjuries', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                                            </div>
                                            {renderCommonInput("tpi_nameLabel", "name", injury.name, "text", false, null, null, null, "thirdPartyInjuries", index, "name")}
                                            {renderCommonInput("tpi_ageLabel", "age", injury.age, "number", false, null, null, null, "thirdPartyInjuries", index, "age")}
                                            {renderCommonInput("tpi_addressLabel", "address", injury.address, "text", false, null, null, null, "thirdPartyInjuries", index, "address")}
                                            {renderCommonInput("tpi_professionLabel", "profession", injury.profession, "text", false, null, null, null, "thirdPartyInjuries", index, "profession")}
                                            {renderCommonInput("tpi_injuryTypeLabel", "injuryType", injury.injuryType, "textarea", false, null, null, null, "thirdPartyInjuries", index, "injuryType")}
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => addArrayItem('thirdPartyInjuries',
                                        { name: '', age: '', address: '', profession: '', injuryType: '' }
                                    )} className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                                        {t('addInjuryButton')}
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentStep === 6 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderCommonInput("declarationDriverSignatureLabel", "driverSignature", formData.declaration.driverSignature, "text", false, "declaration", "driverSignature")}
                                {renderCommonInput("declarationDateLabel", "declarationDate", formData.declaration.declarationDate, "date", false, "declaration", "declarationDate")}
                                {renderCommonInput("declarationOfficerSignatureLabel", "officerSignature", formData.declaration.officerSignature, "text", false, "declaration", "officerSignature")}
                                {renderCommonInput("declarationOfficerDateLabel", "officerDate", formData.declaration.officerDate, "date", false, "declaration", "officerDate")}
                            </div>
                        )}
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center border dark:border-borderNav-t border dark:border-borderNav-gray-200 mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-[rgb(255,255,255)] border dark:border-borderNav border dark:border-borderNav-gray-300 hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>
                            {t('backButton')}
                        </button>
                        {currentStep < 6 && (
                            <button type="button" onClick={handleNext} className={`px-4 py-2 text-sm text-[rgb(255,255,255)] bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                                {t('nextButton')}
                            </button>
                        )}{currentStep == 6 && (
                            <button type="submit" className={`px-4 py-2 text-sm text-[rgb(255,255,255)] bg-indigo-700 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : submitButtonText}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InsuranceAhliaRep;