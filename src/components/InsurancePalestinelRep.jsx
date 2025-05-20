import { useState } from "react";
import { X } from "lucide-react";

const t = (key, ...args) => {
    const translations = {
        "palestine.modalTitle": "Palestine Accident Report Form",
        "palestine.step1Indicator": "Agent & Policy",
        "palestine.step2Indicator": "Vehicle Info",
        "palestine.step3Indicator": "Driver Info",
        "palestine.step4Indicator": "Accident Details",
        "palestine.step5Indicator": "Third Party",
        "palestine.step6Indicator": "Injuries & Witnesses",
        "palestine.step7Indicator": "Passengers & Additional",

        "palestine.agentPolicyTitle": "Agent and Policy Information",
        "palestine.vehicleInfoTitle": "Insured Vehicle Information",
        "palestine.driverInfoTitle": "Driver Information",
        "palestine.accidentDetailsTitle": "Accident Details",
        "palestine.thirdPartyTitle": "Third Party Information",
        "palestine.injuriesWitnessesTitle": "Injuries and Witnesses",
        "palestine.passengersAdditionalTitle": "Passengers and Additional Details",

        "palestine.agentNameLabel": "Agent Name",
        "palestine.docNumberLabel": "Document Number",
        "palestine.docTypeLabel": "Document Type",
        "palestine.docTypeOptionComprehensive": "Comprehensive (شامل)",
        "palestine.docTypeOptionThirdParty": "Third Party (طرف ثالث)",
        "palestine.insurancePeriodFromLabel": "Insurance From",
        "palestine.insurancePeriodToLabel": "Insurance To",

        "palestine.docDateLabel": "Document Date",
        "palestine.vehicleNumberLabel": "Vehicle Number ",
        "palestine.vehicleTypeLabel": "Vehicle Type (from DB)",
        "palestine.vehicleMakeLabel": "Vehicle Make",
        "palestine.modelYearLabel": "Model Year (from DB)",
        "palestine.vehicleUsageLabel": "Vehicle Usage",
        "palestine.vehicleColorLabel": "Color (from DB)",
        "palestine.ownerNameLabel": "Owner Name",
        "palestine.ownerIDLabel": "Owner ID (from DB)",
        "palestine.regExpiryLabel": "Registration Expiry (from DB)",

        "palestine.driverNameLabel": "Driver Name",
        "palestine.driverIdNumberLabel": "Driver ID Number",
        "palestine.driverAgeLabel": "Driver Age",
        "palestine.driverOccupationLabel": "Driver Occupation",
        "palestine.driverAddressLabel": "Driver Address",

        "palestine.licenseInfoTitle": "License Information (Optional)",
        "palestine.licenseNumberLabel": "License Number",
        "palestine.licenseTypeLabel": "License Type",
        "palestine.licenseIssueDateLabel": "License Issue Date",
        "palestine.licenseExpiryDateLabel": "License Expiry Date",


        "palestine.accidentDateLabel": "Accident Date",
        "palestine.accidentTimeLabel": "Accident Time (HH:MM)",
        "palestine.accidentLocationLabel": "Accident Location",
        "palestine.numPassengersLabel": "Number of Passengers",
        "palestine.vehicleSpeedLabel": "Vehicle Speed (km/h)",
        "palestine.vehiclePurposeLabel": "Vehicle Purpose at Time of Accident",
        "palestine.accidentDescLabel": "Accident Description",
        "palestine.responsiblePartyLabel": "Responsible Party",
        "palestine.policeInformedLabel": "Police Informed?",
        "palestine.policeStationLabel": "Police Station (if informed)",

        "palestine.tpVehicleNumberLabel": "TP Vehicle Number",
        "palestine.tpVehicleTypeLabel": "TP Vehicle Type",
        "palestine.tpMakeLabel": "TP Make",
        "palestine.tpModelLabel": "TP Model",
        "palestine.tpColorLabel": "TP Color",
        "palestine.tpOwnerNameLabel": "TP Owner Name",
        "palestine.tpOwnerPhoneLabel": "TP Owner Phone",
        "palestine.tpOwnerAddressLabel": "TP Owner Address",
        "palestine.tpDriverNameLabel": "TP Driver Name",
        "palestine.tpDriverPhoneLabel": "TP Driver Phone",
        "palestine.tpDriverAddressLabel": "TP Driver Address",
        "palestine.tpInsuranceCoLabel": "TP Insurance Company",
        "palestine.tpPolicyNoLabel": "TP Policy Number",
        "palestine.tpVehicleDamagesLabel": "TP Vehicle Damages",

        "palestine.injuriesTitle": "Injuries",
        "palestine.addInjuryButton": "+ Add Injury",
        "palestine.injuryItemTitle": "Injury #{index}",
        "palestine.injuryNameLabel": "Injured Person's Name",
        "palestine.injuryAgeLabel": "Age",
        "palestine.injuryOccupationLabel": "Occupation",
        "palestine.injuryAddressLabel": "Address",
        "palestine.injuryTypeLabel": "Injury Type/Description",
        "palestine.witnessesTitle": "Witnesses",
        "palestine.addWitnessButton": "+ Add Witness",
        "palestine.witnessItemTitle": "Witness #{index}",
        "palestine.witnessNameLabel": "Witness Name",
        "palestine.witnessAddressLabel": "Witness Address",
        "palestine.witnessStatementGivenLabel": "Statement Given?",

        "palestine.passengersTitle": "Passengers (Names)",
        "palestine.addPassengerButton": "+ Add Passenger",
        "palestine.passengerItemTitle": "Passenger #{index}",
        "palestine.passengerNameLabel": "Passenger Name",
        "palestine.additionalDetailsTitle": "Additional Details",
        "palestine.notesLabel": "Notes",
        "palestine.signatureLabel": "Signature (Name/Text)",
        "palestine.signatureDateLabel": "Signature Date",
        "palestine.agentRemarksLabel": "Agent Remarks",


        "deleteButton": "Delete",
        "newLabel": "New",
        "backButton": "Previous",
        "nextButton": "Next",
        "submitButton": "Submit",
        "formSubmissionSuccess": "Report submitted successfully!",
        "formSubmissionError": "Error submitting report: ",
        "plateNumberRequiredError": "Insured Vehicle Plate Number is required.",
        "selectDefault": "Select an option",
        "selectDocTypeDefault": "Select Document Type",
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

function InsurancePalestineRep({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        agentInfo: {
            agentName: '', documentNumber: '', documentType: '',
            insurancePeriod: { from: '', to: '' },
        },
        vehicleInfo: { 
            documentDate: '', vehicleNumber: '', vehicleType: '', make: '',
            modelYear: '', usage: '', color: '', ownerName: '',
            ownerID: '', registrationExpiry: '',
        },
        driverInfo: {
            name: '', idNumber: '', age: '', occupation: '', address: '',
            license: { number: '', type: '', issueDate: '', expiryDate: '' }, 
        },
        accidentDetails: {
            accidentDate: '', time: '', location: '', numberOfPassengers: '',
            vehicleSpeed: '', vehiclePurposeAtTime: '', accidentDescription: '',
            responsibleParty: '', policeInformed: false, policeStation: '',
        },
        thirdParty: { 
            vehicleNumber: '', vehicleType: '', make: '', model: '', color: '',
            ownerName: '', ownerPhone: '', ownerAddress: '', driverName: '',
            driverPhone: '', driverAddress: '', insuranceCompany: '',
            insurancePolicyNumber: '', vehicleDamages: '',
        },
        injuries: [],
        witnesses: [],
        passengers: [], 
        additionalDetails: {
            notes: '', signature: '', date: '', agentRemarks: '',
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


        const plateNumber = formData.vehicleInfo.vehicleNumber;
        if (!plateNumber && currentStep === 7) {
            alert(t('palestine.plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const dataToSend = JSON.parse(JSON.stringify(formData));

        const toNumberOrNull = (val) => {
            const num = Number(val);
            return isNaN(num) || val === '' || val === null || val === undefined ? null : num;
        };
        const toBoolean = (val) => typeof val === 'string' ? (val.toLowerCase() === 'true') : Boolean(val);

        dataToSend.driverInfo.age = toNumberOrNull(dataToSend.driverInfo.age);
        dataToSend.accidentDetails.numberOfPassengers = toNumberOrNull(dataToSend.accidentDetails.numberOfPassengers);
        dataToSend.accidentDetails.vehicleSpeed = toNumberOrNull(dataToSend.accidentDetails.vehicleSpeed);
        dataToSend.accidentDetails.policeInformed = toBoolean(dataToSend.accidentDetails.policeInformed);

        (dataToSend.injuries || []).forEach(injury => {
            injury.age = toNumberOrNull(injury.age);
        });
        (dataToSend.witnesses || []).forEach(witness => {
            witness.statementGiven = toBoolean(witness.statementGiven);
        });
        dataToSend.injuries = dataToSend.injuries || [];
        dataToSend.witnesses = dataToSend.witnesses || [];
        dataToSend.passengers = dataToSend.passengers || [];



        if (dataToSend.driverInfo.license && !dataToSend.driverInfo.license.number) {
            delete dataToSend.driverInfo.license;
        }


        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log("Submitting Palestine Data: ", JSON.stringify(dataToSend, null, 2));
            console.log("Plate Number for URL: ", plateNumber);

            // const response = await fetch(`http://localhost:3002/api/v1/PalestineAccidentReport/add/${plateNumber}`, {
            const response = await fetch(`http://localhost:3002/api/v1/PalestineAccidentReport/add/${plateNumber}`, {
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
            alert(t('palestine.formSubmissionSuccess') + (responseData.message ? `\n${responseData.message}` : ''));
            onClose();

        } catch (error) {
            console.error('Submission error object:', error);
            alert(t('palestine.formSubmissionError') + error.message);
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
            case 1: return t('palestine.agentPolicyTitle');
            case 2: return t('palestine.vehicleInfoTitle');
            case 3: return t('palestine.driverInfoTitle');
            case 4: return t('palestine.accidentDetailsTitle');
            case 5: return t('palestine.thirdPartyTitle');
            case 6: return t('palestine.injuriesWitnessesTitle');
            case 7: return t('palestine.passengersAdditionalTitle');
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
                            {step === 1 && t('palestine.step1Indicator')}
                            {step === 2 && t('palestine.step2Indicator')}
                            {step === 3 && t('palestine.step3Indicator')}
                            {step === 4 && t('palestine.step4Indicator')}
                            {step === 5 && t('palestine.step5Indicator')}
                            {step === 6 && t('palestine.step6Indicator')}
                            {step === 7 && t('palestine.step7Indicator')}
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
                        className="h-4 w-4 text-indigo-600 b rounded focus:ring-indigo-500"
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
                        className="mt-1 w-full p-2  rounded-md text-sm"
                        required={required}
                    >
                        <option value="">{options && options.find(o=>o.value==='') ? t(options.find(o=>o.value==='').label) : t("selectDefault")}</option>
                        {options && options.filter(o=>o.value !== '').map(opt => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
                    </select>
                ) : type === "textarea" ? (
                    <textarea
                        id={inputId}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        rows="2"
                        className="mt-1 w-full p-2 rounded-md text-sm"
                        required={required}
                    ></textarea>
                ) : (
                    <input
                        id={inputId}
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="mt-1 w-full p-2 rounded-md text-sm"
                        required={required}
                        step={type === "number" ? "any" : undefined}
                    />
                )}
            </div>
        );
    };


    const renderAgentPolicyInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("palestine.agentNameLabel", "agentName", formData.agentInfo.agentName, "text", true, "agentInfo", "agentName")}
            {renderCommonInput("palestine.docNumberLabel", "documentNumber", formData.agentInfo.documentNumber, "text", true, "agentInfo", "documentNumber")}
            {renderCommonInput("palestine.docTypeLabel", "documentType", formData.agentInfo.documentType, "select", true, "agentInfo", "documentType", null, null, null, null, [
                { value: "", label: "select"},
                { value: "شامل", label: "palestine.docTypeOptionComprehensive" },
                { value: "طرف ثالث", label: "palestine.docTypeOptionThirdParty" },
            ])}
            {renderCommonInput("palestine.insurancePeriodFromLabel", "from", formData.agentInfo.insurancePeriod.from, "date", true, "agentInfo", "insurancePeriod", null, null, null, "from")}
            {renderCommonInput("palestine.insurancePeriodToLabel", "to", formData.agentInfo.insurancePeriod.to, "date", true, "agentInfo", "insurancePeriod", null, null, null, "to")}
        </div>
    );

    const renderVehicleInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("palestine.vehicleNumberLabel", "vehicleNumber", formData.vehicleInfo.vehicleNumber, "text", true, "vehicleInfo", "vehicleNumber")}
            {renderCommonInput("palestine.docDateLabel", "documentDate", formData.vehicleInfo.documentDate, "date", true, "vehicleInfo", "documentDate")}
            {renderCommonInput("palestine.vehicleMakeLabel", "make", formData.vehicleInfo.make, "text", true, "vehicleInfo", "make")}
            {renderCommonInput("palestine.vehicleUsageLabel", "usage", formData.vehicleInfo.usage, "text", true, "vehicleInfo", "usage")}
            {renderCommonInput("palestine.ownerNameLabel", "ownerName", formData.vehicleInfo.ownerName, "text", true, "vehicleInfo", "ownerName")}
        </div>
    );

    const renderDriverInfo = () => (
         <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderCommonInput("palestine.driverNameLabel", "name", formData.driverInfo.name, "text", true, "driverInfo", "name")}
                {renderCommonInput("palestine.driverIdNumberLabel", "idNumber", formData.driverInfo.idNumber, "text", true, "driverInfo", "idNumber")}
                {renderCommonInput("palestine.driverAgeLabel", "age", formData.driverInfo.age, "number", true, "driverInfo", "age")}
                {renderCommonInput("palestine.driverOccupationLabel", "occupation", formData.driverInfo.occupation, "text", true, "driverInfo", "occupation")}
                {renderCommonInput("palestine.driverAddressLabel", "address", formData.driverInfo.address, "text", true, "driverInfo", "address")}
            </div>
            <div>
                <h4 className="text-md font-medium text-gray-600 mb-1">{t("palestine.licenseInfoTitle")}</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3  rounded-md bg-gray-50">
                    {renderCommonInput("palestine.licenseNumberLabel", "number", formData.driverInfo.license.number, "text", false, "driverInfo", "license", null, null, null, "number")}
                    {renderCommonInput("palestine.licenseTypeLabel", "type", formData.driverInfo.license.type, "text", false, "driverInfo", "license", null, null, null, "type")}
                    {renderCommonInput("palestine.licenseIssueDateLabel", "issueDate", formData.driverInfo.license.issueDate, "date", false, "driverInfo", "license", null, null, null, "issueDate")}
                    {renderCommonInput("palestine.licenseExpiryDateLabel", "expiryDate", formData.driverInfo.license.expiryDate, "date", false, "driverInfo", "license", null, null, null, "expiryDate")}
                </div>
            </div>
        </div>
    );

    const renderAccidentDetailsInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("palestine.accidentDateLabel", "accidentDate", formData.accidentDetails.accidentDate, "date", true, "accidentDetails", "accidentDate")}
            {renderCommonInput("palestine.accidentTimeLabel", "time", formData.accidentDetails.time, "time", true, "accidentDetails", "time")}
            {renderCommonInput("palestine.accidentLocationLabel", "location", formData.accidentDetails.location, "text", true, "accidentDetails", "location")}
            {renderCommonInput("palestine.numPassengersLabel", "numberOfPassengers", formData.accidentDetails.numberOfPassengers, "number", true, "accidentDetails", "numberOfPassengers")}
            {renderCommonInput("palestine.vehicleSpeedLabel", "vehicleSpeed", formData.accidentDetails.vehicleSpeed, "number", true, "accidentDetails", "vehicleSpeed")}
            {renderCommonInput("palestine.vehiclePurposeLabel", "vehiclePurposeAtTime", formData.accidentDetails.vehiclePurposeAtTime, "text", true, "accidentDetails", "vehiclePurposeAtTime")}
            <div className="md:col-span-2">
            {renderCommonInput("palestine.accidentDescLabel", "accidentDescription", formData.accidentDetails.accidentDescription, "textarea", true, "accidentDetails", "accidentDescription")}
            </div>
            {renderCommonInput("palestine.responsiblePartyLabel", "responsibleParty", formData.accidentDetails.responsibleParty, "text", true, "accidentDetails", "responsibleParty")}
            {renderCommonInput("palestine.policeInformedLabel", "policeInformed", formData.accidentDetails.policeInformed, "checkbox", false, "accidentDetails", "policeInformed")}
            {formData.accidentDetails.policeInformed && renderCommonInput("palestine.policeStationLabel", "policeStation", formData.accidentDetails.policeStation, "text", false, "accidentDetails", "policeStation")}
        </div>
    );

    const renderThirdPartyInfo = () => ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderCommonInput("palestine.tpVehicleNumberLabel", "vehicleNumber", formData.thirdParty.vehicleNumber, "text", false, "thirdParty", "vehicleNumber")}
            {renderCommonInput("palestine.tpVehicleTypeLabel", "vehicleType", formData.thirdParty.vehicleType, "text", false, "thirdParty", "vehicleType")}
            {renderCommonInput("palestine.tpMakeLabel", "make", formData.thirdParty.make, "text", false, "thirdParty", "make")}
            {renderCommonInput("palestine.tpModelLabel", "model", formData.thirdParty.model, "text", false, "thirdParty", "model")}
            {renderCommonInput("palestine.tpColorLabel", "color", formData.thirdParty.color, "text", false, "thirdParty", "color")}
            {renderCommonInput("palestine.tpOwnerNameLabel", "ownerName", formData.thirdParty.ownerName, "text", false, "thirdParty", "ownerName")}
            {renderCommonInput("palestine.tpOwnerPhoneLabel", "ownerPhone", formData.thirdParty.ownerPhone, "tel", false, "thirdParty", "ownerPhone")}
            {renderCommonInput("palestine.tpOwnerAddressLabel", "ownerAddress", formData.thirdParty.ownerAddress, "text", false, "thirdParty", "ownerAddress")}
            {renderCommonInput("palestine.tpDriverNameLabel", "driverName", formData.thirdParty.driverName, "text", false, "thirdParty", "driverName")}
            {renderCommonInput("palestine.tpDriverPhoneLabel", "driverPhone", formData.thirdParty.driverPhone, "tel", false, "thirdParty", "driverPhone")}
            {renderCommonInput("palestine.tpDriverAddressLabel", "driverAddress", formData.thirdParty.driverAddress, "text", false, "thirdParty", "driverAddress")}
            {renderCommonInput("palestine.tpInsuranceCoLabel", "insuranceCompany", formData.thirdParty.insuranceCompany, "text", false, "thirdParty", "insuranceCompany")}
            {renderCommonInput("palestine.tpPolicyNoLabel", "insurancePolicyNumber", formData.thirdParty.insurancePolicyNumber, "text", false, "thirdParty", "insurancePolicyNumber")}
            <div className="md:col-span-2 lg:col-span-3">
                {renderCommonInput("palestine.tpVehicleDamagesLabel", "vehicleDamages", formData.thirdParty.vehicleDamages, "textarea", false, "thirdParty", "vehicleDamages")}
            </div>
        </div>
    );

    const renderInjuriesAndWitnesses = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("palestine.injuriesTitle")}</h3>
                {(formData.injuries || []).map((injury, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('palestine.injuryItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('injuries', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                            {renderCommonInput("palestine.injuryNameLabel", `inj_name_${index}`, injury.name, "text", true, null, null, "injuries", index, "name")}
                            {renderCommonInput("palestine.injuryAgeLabel", `inj_age_${index}`, injury.age, "number", true, null, null, "injuries", index, "age")}
                            {renderCommonInput("palestine.injuryOccupationLabel", `inj_occ_${index}`, injury.occupation, "text", true, null, null, "injuries", index, "occupation")}
                            {renderCommonInput("palestine.injuryAddressLabel", `inj_addr_${index}`, injury.address, "text", true, null, null, "injuries", index, "address")}
                            <div className="md:col-span-2">
                                {renderCommonInput("palestine.injuryTypeLabel", `inj_type_${index}`, injury.injuryType, "textarea", true, null, null, "injuries", index, "injuryType")}
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('injuries', { name: '', age: '', occupation: '', address: '', injuryType: '' })}
                    className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('palestine.addInjuryButton')}
                </button>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("palestine.witnessesTitle")}</h3>
                {(formData.witnesses || []).map((witness, index) => (
                     <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 ">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('palestine.witnessItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('witnesses', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                            {renderCommonInput("palestine.witnessNameLabel", `wit_name_${index}`, witness.name, "text", true, null, null, "witnesses", index, "name")}
                            {renderCommonInput("palestine.witnessAddressLabel", `wit_addr_${index}`, witness.address, "text", true, null, null, "witnesses", index, "address")}
                            {renderCommonInput("palestine.witnessStatementGivenLabel", `wit_stmt_${index}`, witness.statementGiven, "checkbox", false, null, null, "witnesses", index, "statementGiven")}
                        </div>
                    </div>
                ))}
                 <button type="button" onClick={() => addArrayItem('witnesses', { name: '', address: '', statementGiven: false })}
                    className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('palestine.addWitnessButton')}
                </button>
            </div>
        </div>
    );

     const renderPassengersAndAdditional = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("palestine.passengersTitle")}</h3>
                 {(formData.passengers || []).map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-3   ">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('palestine.passengerItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('passengers', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        {renderCommonInput("palestine.passengerNameLabel", `pass_name_${index}`, passenger.name, "text", true, null, null, "passengers", index, "name")}
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('passengers', { name: '' })}
                    className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('palestine.addPassengerButton')}
                </button>
            </div>
            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("palestine.additionalDetailsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {renderCommonInput("palestine.notesLabel", "notes", formData.additionalDetails.notes, "textarea", false, "additionalDetails", "notes")}
                     {renderCommonInput("palestine.signatureLabel", "signature", formData.additionalDetails.signature, "text", true, "additionalDetails", "signature")}
                     {renderCommonInput("palestine.signatureDateLabel", "date", formData.additionalDetails.date, "date", true, "additionalDetails", "date")}
                     {renderCommonInput("palestine.agentRemarksLabel", "agentRemarks", formData.additionalDetails.agentRemarks, "textarea", false, "additionalDetails", "agentRemarks")}
                </div>
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[900px] bg-[rgb(255,255,255)] dark:bg-navbarBack dark:text-dark4 rounded-lg shadow-lg">
                <div className="flex items-center justify-between px-6 py-3 border-b  dark:border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700  dark:text-[rgb(255,255,255)]">{t('palestine.modalTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b  border-gray-300 mx-6 mb-3">
                        <p className="text-md font-semibold text-gray-700 dark:text-[rgb(255,255,255)]">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-330px)] overflow-y-auto space-y-4">
                        {currentStep === 1 && renderAgentPolicyInfo()}
                        {currentStep === 2 && renderVehicleInfo()}
                        {currentStep === 3 && renderDriverInfo()}
                        {currentStep === 4 && renderAccidentDetailsInfo()}
                        {currentStep === 5 && renderThirdPartyInfo()}
                        {currentStep === 6 && renderInjuriesAndWitnesses()}
                        {currentStep === 7 && renderPassengersAndAdditional()}
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center border-t   mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-[rgb(255,255,255)]   hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>{t('backButton')}</button>
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

export default InsurancePalestineRep;