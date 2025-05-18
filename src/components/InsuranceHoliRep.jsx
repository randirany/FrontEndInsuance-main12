import { useState } from "react";
import { X } from "lucide-react";

const t = (key, ...args) => {
    const translations = {
        "holi.modalTitle": "Holi Lands Accident Report Form",
        "holi.step1Indicator": "Insurance & Vehicle",
        "holi.step2Indicator": "Owner & Driver",
        "holi.step3Indicator": "Accident Details",
        "holi.step4Indicator": "Other Vehicles",
        "holi.step5Indicator": "Involvement & Injuries",
        "holi.step6Indicator": "Signatures & Notes",

        "holi.insuranceVehicleTitle": "Insurance and Vehicle Details",
        "holi.ownerDriverTitle": "Owner and Driver Details",
        "holi.accidentDetailsTitle": "Accident Details",
        "holi.otherVehiclesTitle": "Other Vehicles Involved",
        "holi.involvementInjuriesTitle": "Involvement Details and Injuries",
        "holi.signaturesNotesTitle": "Signatures and Notes",

        "holi.policyNumberLabel": "Policy Number",
        "holi.insuranceDurationLabel": "Insurance Duration (e.g., 1 Year)",
        "holi.fromDateLabel": "Insurance From Date",
        "holi.toDateLabel": "Insurance To Date",
        "holi.insuranceTypeLabel": "Insurance Type",
        "holi.vehicleNumberLabel_policy": "Vehicle Number",

        "holi.vehicleDetailsTitle": "Vehicle Details",
        "holi.vehicleBranchLabel": "Vehicle Branch/Office",
        "holi.chassisNumberLabel": "Chassis Number",


        "holi.ownerNameLabel": "Owner Name (from DB)",
        "holi.driverNameLabel": "Driver Name",
        "holi.driverIDLabel": "Driver ID",
        "holi.driverLicenseNumberLabel": "Driver License Number",
        "holi.driverLicenseGradeLabel": "Driver License Grade",
        "holi.licenseIssueDateLabel": "License Issue Date",
        "holi.driverPhoneLabel": "Driver Phone",
        "holi.driverAddressLabel": "Driver Address",
        "holi.driverProfessionLabel": "Driver Profession",
        "holi.licenseIssuePlaceLabel": "License Issue Place",

        "holi.accidentDateLabel": "Accident Date",
        "holi.accidentTimeLabel": "Accident Time (HH:MM)",
        "holi.speedAtTimeLabel": "Speed at Time of Accident (km/h)",
        "holi.numberOfPassengersLabel": "Number of Passengers",
        "holi.lightsUsedLabel": "Lights Used (e.g., Headlights, None)",
        "holi.directionFromLabel": "Vehicle Direction From",
        "holi.accidentDirectionLabel": "Accident Direction",
        "holi.accidentLocationLabel": "Accident Location",
        "holi.accidentDetailsTextLabel": "Accident Details (Description)",
        "holi.accidentCauseLabel": "Cause of Accident",
        "holi.notesByBranchManagerLabel": "Notes by Branch Manager",
        "holi.policeNotifiedLabel": "Police Notified?",
        "holi.whoInformedPoliceLabel": "Who Informed Police? (if notified)",

        "holi.addOtherVehicleButton": "+ Add Other Vehicle",
        "holi.otherVehicleItemTitle": "Other Vehicle #{index}",
        "holi.ovVehicleNumberLabel": "Vehicle Number",
        "holi.ovVehicleTypeLabel": "Vehicle Type",
        "holi.ovMakeLabel": "Make",
        "holi.ovModelLabel": "Model",
        "holi.ovPlateNumberLabel": "Plate Number",
        "holi.ovInsuranceCompanyLabel": "Insurance Company",
        "holi.ovDriverNameLabel": "Driver Name",
        "holi.ovDriverAddressLabel": "Driver Address",
        "holi.ovDetailsLabel": "Details/Damage",

        "holi.involvementDetailsTitle": "Involvement Details",
        "holi.damageToUserCarLabel": "Damage to Insured Car (Description)",
        "holi.damageToThirdPartyLabel": "Damage to Third Party (Description)",
        "holi.injuriesTitle": "Injuries",
        "holi.addInjuryButton": "+ Add Injury",
        "holi.injuryItemTitle": "Injury #{index}",
        "holi.injuryNameLabel": "Injured Person's Name",
        "holi.injuryAgeLabel": "Age",
        "holi.injuryAddressLabel": "Address",
        "holi.injuryOccupationLabel": "Occupation",
        "holi.injuryMaritalStatusLabel": "Marital Status",
        "holi.injuryTypeLabel": "Injury Type/Description",

        "holi.injuredNamesAndAddressesLabel": "Injured Names & Addresses (Overall)",
        "holi.passengerNamesAndAddressesLabel": "Passenger Names & Addresses (Overall)",
        "holi.additionalDetailsLabel": "Additional Details/Notes",
        "holi.signatureLabel": "Notifier Signature (Name/Text)",
        "holi.signatureDateLabel": "Notifier Signature Date",
        "holi.employeeNotesLabel": "Employee Notes",
        "holi.employeeSignatureLabel": "Employee Signature (Name/Text)",
        "holi.employeeDateLabel": "Employee Signature Date",


        "deleteButton": "Delete",
        "newLabel": "New",
        "backButton": "Previous",
        "nextButton": "Next",
        "submitButton": "Submit",
        "formSubmissionSuccess": "Report submitted successfully!",
        "formSubmissionError": "Error submitting report: ",
        "plateNumberRequiredError": "Vehicle Plate Number (for lookup) is required.",
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


function InsuranceHoliRep({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lookupPlateNumber, setLookupPlateNumber] = useState('');

    const [formData, setFormData] = useState({
        insuranceDetails: {
            policyNumber: '', insuranceDuration: '', fromDate: '',
            toDate: '', insuranceType: '', vehicleNumber: '',
        },
        vehicleDetails: {
            vehicleColor: '', vehicleBranch: '', chassisNumber: '',
            plateNumber: '', modelYear: '', vehicleUsage: '',
        },
        ownerAndDriverDetails: {
            ownerName: '', driverName: '', driverID: '', driverLicenseNumber: '',
            driverLicenseGrade: '', licenseIssueDate: '', licenseExpiryDate: '', // from DB
            driverPhone: '', driverAddress: '', driverProfession: '', licenseIssuePlace: '',
        },
        accidentDetails: {
            accidentDate: '', accidentTime: '', speedAtTime: '', numberOfPassengers: '',
            lightsUsed: '', directionFrom: '', accidentDirection: '', accidentLocation: '',
            accidentDetailsText: '', accidentCause: '', notesByBranchManager: '',
            policeNotified: false, whoInformedPolice: '',
        },
        otherVehicles: [],
        involvementDetails: {
            damageToUserCar: '', damageToThirdParty: '',
        },
        injuries: [],
        injuredNamesAndAddresses: '',
        passengerNamesAndAddresses: '',
        additionalDetails: '',
        signature: '',
        signatureDate: '',
        employeeNotes: '',
        employeeSignature: '',
        employeeDate: '',
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

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 6)); // 6 steps
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!lookupPlateNumber && currentStep === 6) {
            alert(t('holi.plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const dataToSend = JSON.parse(JSON.stringify(formData));

        const toNumberOrNull = (val) => {
            const num = Number(val);
            return isNaN(num) || val === '' || val === null || val === undefined ? null : num;
        };
        const toBoolean = (val) => typeof val === 'string' ? (val.toLowerCase() === 'true') : Boolean(val);

        dataToSend.accidentDetails.numberOfPassengers = toNumberOrNull(dataToSend.accidentDetails.numberOfPassengers);
        dataToSend.accidentDetails.policeNotified = toBoolean(dataToSend.accidentDetails.policeNotified);
        (dataToSend.injuries || []).forEach(injury => {
            injury.age = toNumberOrNull(injury.age);
        });

        dataToSend.otherVehicles = dataToSend.otherVehicles || [];
        dataToSend.injuries = dataToSend.injuries || [];


        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log("Submitting Holi Data: ", JSON.stringify(dataToSend, null, 2));
            console.log("Lookup Plate Number for URL: ", lookupPlateNumber);

            // const response = await fetch(`http://localhost:3002/api/v1/HoliAccidentReport/add/${lookupPlateNumber}`, {
            const response = await fetch(`http://localhost:3002/api/v1/HoliAccidentReport/add/${lookupPlateNumber}`, {
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
            alert(t('holi.formSubmissionSuccess') + (responseData.message ? `\n${responseData.message}` : ''));
            onClose();

        } catch (error) {
            console.error('Submission error object:', error);
            alert(t('holi.formSubmissionError') + error.message);
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
            case 1: return t('holi.insuranceVehicleTitle');
            case 2: return t('holi.ownerDriverTitle');
            case 3: return t('holi.accidentDetailsTitle');
            case 4: return t('holi.otherVehiclesTitle');
            case 5: return t('holi.involvementInjuriesTitle');
            case 6: return t('holi.signaturesNotesTitle');
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="px-4 py-3 mb-4">
            <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6].map((step) => ( 
                    <div key={step} className="flex flex-col items-center text-center flex-1 px-1">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{step}</div>
                        <span className="text-[10px] leading-tight mt-1 text-gray-600">
                            {step === 1 && t('holi.step1Indicator')}
                            {step === 2 && t('holi.step2Indicator')}
                            {step === 3 && t('holi.step3Indicator')}
                            {step === 4 && t('holi.step4Indicator')}
                            {step === 5 && t('holi.step5Indicator')}
                            {step === 6 && t('holi.step6Indicator')}
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
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={inputId} className="ml-2 block text-sm font-medium text-gray-700">
                        {t(label)} {required && <span className="text-red-500">*</span>}
                    </label>
                </div>
            );
        }

        return (
            <div className="mb-2">
                <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">{t(label)} {required && <span className="text-red-500">*</span>}</label>
                {type === "select" ? (
                    <select
                        id={inputId}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
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
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
                        required={required}
                    ></textarea>
                ) : (
                    <input
                        id={inputId}
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleChange(e, section, subField, arrayName, index, itemField, subSubField)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm"
                        required={required}
                        step={type === "number" ? "any" : undefined}
                    />
                )}
            </div>
        );
    };

    const renderInsuranceAndVehicle = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Lookup Vehicle by Plate Number</h3>
                <input
                    type="text"
                    placeholder="Enter Plate Number for Lookup"
                    value={lookupPlateNumber}
                    onChange={(e) => setLookupPlateNumber(e.target.value)}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md text-sm mb-4"
                />
            </div>
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Insurance Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {renderCommonInput("holi.policyNumberLabel", "policyNumber", formData.insuranceDetails.policyNumber, "text", false, "insuranceDetails", "policyNumber")}
                    {renderCommonInput("holi.insuranceDurationLabel", "insuranceDuration", formData.insuranceDetails.insuranceDuration, "text", false, "insuranceDetails", "insuranceDuration")}
                    {renderCommonInput("holi.fromDateLabel", "fromDate", formData.insuranceDetails.fromDate, "date", false, "insuranceDetails", "fromDate")}
                    {renderCommonInput("holi.toDateLabel", "toDate", formData.insuranceDetails.toDate, "date", false, "insuranceDetails", "toDate")}
                    {renderCommonInput("holi.insuranceTypeLabel", "insuranceType", formData.insuranceDetails.insuranceType, "text", false, "insuranceDetails", "insuranceType")}

                </div>
            </div>
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">{t("holi.vehicleDetailsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {renderCommonInput("holi.vehicleBranchLabel", "vehicleBranch", formData.vehicleDetails.vehicleBranch, "text", false, "vehicleDetails", "vehicleBranch")}
                    {renderCommonInput("holi.chassisNumberLabel", "chassisNumber", formData.vehicleDetails.chassisNumber, "text", false, "vehicleDetails", "chassisNumber")}
                </div>
            </div>
        </div>
    );

    const renderOwnerAndDriver = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {renderCommonInput("holi.driverNameLabel", "driverName", formData.ownerAndDriverDetails.driverName, "text", false, "ownerAndDriverDetails", "driverName")}
            {renderCommonInput("holi.driverIDLabel", "driverID", formData.ownerAndDriverDetails.driverID, "text", false, "ownerAndDriverDetails", "driverID")}
            {renderCommonInput("holi.driverLicenseNumberLabel", "driverLicenseNumber", formData.ownerAndDriverDetails.driverLicenseNumber, "text", false, "ownerAndDriverDetails", "driverLicenseNumber")}
            {renderCommonInput("holi.driverLicenseGradeLabel", "driverLicenseGrade", formData.ownerAndDriverDetails.driverLicenseGrade, "text", false, "ownerAndDriverDetails", "driverLicenseGrade")}
            {renderCommonInput("holi.licenseIssueDateLabel", "licenseIssueDate", formData.ownerAndDriverDetails.licenseIssueDate, "date", false, "ownerAndDriverDetails", "licenseIssueDate")}
            {renderCommonInput("holi.driverPhoneLabel", "driverPhone", formData.ownerAndDriverDetails.driverPhone, "tel", false, "ownerAndDriverDetails", "driverPhone")}
            {renderCommonInput("holi.driverAddressLabel", "driverAddress", formData.ownerAndDriverDetails.driverAddress, "text", false, "ownerAndDriverDetails", "driverAddress")}
            {renderCommonInput("holi.driverProfessionLabel", "driverProfession", formData.ownerAndDriverDetails.driverProfession, "text", false, "ownerAndDriverDetails", "driverProfession")}
            {renderCommonInput("holi.licenseIssuePlaceLabel", "licenseIssuePlace", formData.ownerAndDriverDetails.licenseIssuePlace, "text", false, "ownerAndDriverDetails", "licenseIssuePlace")}
        </div>
    );

    const renderAccidentDetailsInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("holi.accidentDateLabel", "accidentDate", formData.accidentDetails.accidentDate, "date", false, "accidentDetails", "accidentDate")}
            {renderCommonInput("holi.accidentTimeLabel", "accidentTime", formData.accidentDetails.accidentTime, "time", false, "accidentDetails", "accidentTime")}
            {renderCommonInput("holi.speedAtTimeLabel", "speedAtTime", formData.accidentDetails.speedAtTime, "text", false, "accidentDetails", "speedAtTime")}
            {renderCommonInput("holi.numberOfPassengersLabel", "numberOfPassengers", formData.accidentDetails.numberOfPassengers, "number", false, "accidentDetails", "numberOfPassengers")}
            {renderCommonInput("holi.lightsUsedLabel", "lightsUsed", formData.accidentDetails.lightsUsed, "text", false, "accidentDetails", "lightsUsed")}
            {renderCommonInput("holi.directionFromLabel", "directionFrom", formData.accidentDetails.directionFrom, "text", false, "accidentDetails", "directionFrom")}
            {renderCommonInput("holi.accidentDirectionLabel", "accidentDirection", formData.accidentDetails.accidentDirection, "text", false, "accidentDetails", "accidentDirection")}
            {renderCommonInput("holi.accidentLocationLabel", "accidentLocation", formData.accidentDetails.accidentLocation, "text", false, "accidentDetails", "accidentLocation")}
            <div className="md:col-span-2">
                {renderCommonInput("holi.accidentDetailsTextLabel", "accidentDetailsText", formData.accidentDetails.accidentDetailsText, "textarea", false, "accidentDetails", "accidentDetailsText")}
            </div>
            {renderCommonInput("holi.accidentCauseLabel", "accidentCause", formData.accidentDetails.accidentCause, "text", false, "accidentDetails", "accidentCause")}
            <div className="md:col-span-2">
                {renderCommonInput("holi.notesByBranchManagerLabel", "notesByBranchManager", formData.accidentDetails.notesByBranchManager, "textarea", false, "accidentDetails", "notesByBranchManager")}
            </div>
            {renderCommonInput("holi.policeNotifiedLabel", "policeNotified", formData.accidentDetails.policeNotified, "checkbox", false, "accidentDetails", "policeNotified")}
            {formData.accidentDetails.policeNotified && renderCommonInput("holi.whoInformedPoliceLabel", "whoInformedPolice", formData.accidentDetails.whoInformedPolice, "text", false, "accidentDetails", "whoInformedPolice")}
        </div>
    );

    const renderOtherVehiclesInfo = () => (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("holi.otherVehiclesTitle")}</h3>
            {(formData.otherVehicles || []).map((vehicle, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md mb-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-medium text-gray-600">{t('holi.otherVehicleItemTitle', { index: index + 1 })}</h4>
                        <button type="button" onClick={() => removeArrayItem('otherVehicles', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
                        {renderCommonInput("holi.ovVehicleNumberLabel", `ov_vnum_${index}`, vehicle.vehicleNumber, "text", false, null, null, "otherVehicles", index, "vehicleNumber")}
                        {renderCommonInput("holi.ovVehicleTypeLabel", `ov_vtype_${index}`, vehicle.vehicleType, "text", false, null, null, "otherVehicles", index, "vehicleType")}
                        {renderCommonInput("holi.ovMakeLabel", `ov_make_${index}`, vehicle.make, "text", false, null, null, "otherVehicles", index, "make")}
                        {renderCommonInput("holi.ovModelLabel", `ov_model_${index}`, vehicle.model, "text", false, null, null, "otherVehicles", index, "model")}
                        {renderCommonInput("holi.ovPlateNumberLabel", `ov_plate_${index}`, vehicle.plateNumber, "text", false, null, null, "otherVehicles", index, "plateNumber")}
                        {renderCommonInput("holi.ovInsuranceCompanyLabel", `ov_insco_${index}`, vehicle.insuranceCompany, "text", false, null, null, "otherVehicles", index, "insuranceCompany")}
                        {renderCommonInput("holi.ovDriverNameLabel", `ov_dname_${index}`, vehicle.driverName, "text", false, null, null, "otherVehicles", index, "driverName")}
                        {renderCommonInput("holi.ovDriverAddressLabel", `ov_daddr_${index}`, vehicle.driverAddress, "text", false, null, null, "otherVehicles", index, "driverAddress")}
                        <div className="md:col-span-2 lg:col-span-3">
                            {renderCommonInput("holi.ovDetailsLabel", `ov_details_${index}`, vehicle.details, "textarea", false, null, null, "otherVehicles", index, "details")}
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={() => addArrayItem('otherVehicles', { vehicleNumber: '', vehicleType: '', make: '', model: '', plateNumber: '', insuranceCompany: '', driverName: '', driverAddress: '', details: '' })}
                className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                {t('holi.addOtherVehicleButton')}
            </button>
        </div>
    );

    const renderInvolvementAndInjuries = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("holi.involvementDetailsTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("holi.damageToUserCarLabel", "damageToUserCar", formData.involvementDetails.damageToUserCar, "textarea", false, "involvementDetails", "damageToUserCar")}
                    {renderCommonInput("holi.damageToThirdPartyLabel", "damageToThirdParty", formData.involvementDetails.damageToThirdParty, "textarea", false, "involvementDetails", "damageToThirdParty")}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("holi.injuriesTitle")}</h3>
                {(formData.injuries || []).map((injury, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('holi.injuryItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('injuries', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                            {renderCommonInput("holi.injuryNameLabel", `inj_name_${index}`, injury.name, "text", false, null, null, "injuries", index, "name")}
                            {renderCommonInput("holi.injuryAgeLabel", `inj_age_${index}`, injury.age, "number", false, null, null, "injuries", index, "age")}
                            {renderCommonInput("holi.injuryAddressLabel", `inj_addr_${index}`, injury.address, "text", false, null, null, "injuries", index, "address")}
                            {renderCommonInput("holi.injuryOccupationLabel", `inj_occ_${index}`, injury.occupation, "text", false, null, null, "injuries", index, "occupation")}
                            {renderCommonInput("holi.injuryMaritalStatusLabel", `inj_marital_${index}`, injury.maritalStatus, "text", false, null, null, "injuries", index, "maritalStatus")}
                            <div className="md:col-span-2">
                                {renderCommonInput("holi.injuryTypeLabel", `inj_type_${index}`, injury.injuryType, "textarea", false, null, null, "injuries", index, "injuryType")}
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('injuries', { name: '', age: '', address: '', occupation: '', maritalStatus: '', injuryType: '' })}
                    className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('holi.addInjuryButton')}
                </button>
            </div>
        </div>
    );

    const renderSignaturesAndNotes = () => (
        <div className="space-y-4">
            {renderCommonInput("holi.injuredNamesAndAddressesLabel", "injuredNamesAndAddresses", formData.injuredNamesAndAddresses, "textarea", false, null, "injuredNamesAndAddresses")}
            {renderCommonInput("holi.passengerNamesAndAddressesLabel", "passengerNamesAndAddresses", formData.passengerNamesAndAddresses, "textarea", false, null, "passengerNamesAndAddresses")}
            {renderCommonInput("holi.additionalDetailsLabel", "additionalDetails", formData.additionalDetails, "textarea", false, null, "additionalDetails")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderCommonInput("holi.signatureLabel", "signature", formData.signature, "text", false, null, "signature")}
                {renderCommonInput("holi.signatureDateLabel", "signatureDate", formData.signatureDate, "date", false, null, "signatureDate")}
            </div>
            {renderCommonInput("holi.employeeNotesLabel", "employeeNotes", formData.employeeNotes, "textarea", false, null, "employeeNotes")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderCommonInput("holi.employeeSignatureLabel", "employeeSignature", formData.employeeSignature, "text", false, null, "employeeSignature")}
                {renderCommonInput("holi.employeeDateLabel", "employeeDate", formData.employeeDate, "date", false, null, "employeeDate")}
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">{t('holi.modalTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-300 mx-6 mb-3">
                        <p className="text-md font-semibold text-gray-700">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-330px)] overflow-y-auto space-y-4">
                        {currentStep === 1 && renderInsuranceAndVehicle()}
                        {currentStep === 2 && renderOwnerAndDriver()}
                        {currentStep === 3 && renderAccidentDetailsInfo()}
                        {currentStep === 4 && renderOtherVehiclesInfo()}
                        {currentStep === 5 && renderInvolvementAndInjuries()}
                        {currentStep === 6 && renderSignaturesAndNotes()}
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center border-t border-gray-200 mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>{t('backButton')}</button>
                        {currentStep < 6 ? (
                            <button type="button" onClick={handleNext} className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{t('nextButton')}</button>
                        ) : (
                            <button type="submit" className={`px-4 py-2 text-sm text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : t('submitButton')}</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InsuranceHoliRep;