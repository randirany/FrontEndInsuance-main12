import { useState, useEffect } from "react";
import { X } from "lucide-react";

const t = (key, ...args) => {
    const translations = {
        "takaful.modalTitle": "Takaful Accident Report Form",
        "takaful.step1Indicator": "Accident Info",
        "takaful.step2Indicator": "Policy Info",
        "takaful.step3Indicator": "Insured Person",
        "takaful.step4Indicator": "Driver & License",
        "takaful.step5Indicator": "Insured Vehicle",
        "takaful.step6Indicator": "Other Vehicles",
        "takaful.step7Indicator": "Police & Passengers",
        "takaful.step8Indicator": "Narration & Declaration",

        "takaful.accidentInfoTitle": "General Accident Information",
        "takaful.policyInfoTitle": "Insurance Policy Information",
        "takaful.insuredPersonTitle": "Insured Person Information",
        "takaful.driverLicenseTitle": "Driver and License Information",
        "takaful.insuredVehicleTitle": "Insured Vehicle Information & Damage",
        "takaful.otherVehiclesTitle": "Other Vehicles Involved",
        "takaful.policePassengersTitle": "Police, Witnesses & Passengers",
        "takaful.narrationDeclarationTitle": "Accident Narration & Declaration",

        // Accident Info (Step 1)
        "takaful.reportDateLabel": "Report Date",
        "takaful.accidentDateLabel": "Accident Date",
        "takaful.accidentTypeLabel": "Accident Type",
        "takaful.accidentLocationLabel": "Accident Location",
        "takaful.accidentTimeLabel": "Accident Time (HH:MM)",
        "takaful.passengersCountLabel": "Passengers Count (Insured Vehicle)",
        "takaful.agentNameLabel": "Agent Name",

        // Policy Info (Step 2)
        "takaful.policyNumberLabel": "Policy Number",
        "takaful.branchLabel": "Branch",
        "takaful.durationFromLabel": "Policy Duration From",
        "takaful.durationToLabel": "Policy Duration To",
        "takaful.issueDateLabel": "Policy Issue Date",
        "takaful.isFullCoverageLabel": "Full Coverage?",
        "takaful.fullCoverageFeeLabel": "Full Coverage Fee",
        "takaful.isThirdPartyLabel": "Third Party Coverage?",
        "takaful.thirdPartyFeeLabel": "Third Party Fee",
        "takaful.isMandatoryLabel": "Mandatory Insurance?",
        "takaful.maxAllowedPassengersLabel": "Max Allowed Passengers (Policy)",

        // Insured Person (Step 3) - Some data might come from DB
        "takaful.insuredNameLabel": "Insured Name",
        "takaful.insuredAddressLabel": "Insured Address",
        "takaful.insuredResidenceLabel": "Insured Residence",
        "takaful.insuredWorkAddressLabel": "Insured Work Address",
        "takaful.insuredWorkPhoneLabel": "Insured Work Phone",

        // Driver Info (Step 4)
        "takaful.driverNameLabel": "Driver Name",
        "takaful.driverIdNumberLabel": "Driver ID Number",
        "takaful.driverBirthDateLabel": "Driver Birth Date",
        "takaful.driverAgeLabel": "Driver Age",
        "takaful.driverResidenceLabel": "Driver Residence",
        "takaful.driverAddressLabel": "Driver Address",
        "takaful.driverWorkAddressLabel": "Driver Work Address",
        "takaful.driverWorkPhoneLabel": "Driver Work Phone",
        "takaful.relationToInsuredLabel": "Relation to Insured",
        // License Info (Still Step 4)
        "takaful.licenseNumberLabel": "License Number",
        "takaful.licenseTypeLabel": "License Type",
        "takaful.licenseIssueDateLabel": "License Issue Date",
        "takaful.licenseExpiryDateLabel": "License Expiry Date",
        "takaful.matchesVehicleTypeLabel": "License Matches Vehicle Type?",

        // Insured Vehicle (Step 5) - Some data from DB
        "takaful.vehiclePlateNumberLabel": "Vehicle Plate Number", // User inputs this
        "takaful.damageTitle": "Damage to Insured Vehicle",
        "takaful.damageFrontLabel": "Front Damage Description",
        "takaful.damageBackLabel": "Back Damage Description",
        "takaful.damageLeftLabel": "Left Side Damage Description",
        "takaful.damageRightLabel": "Right Side Damage Description",
        "takaful.damageEstValueLabel": "Estimated Damage Value",
        "takaful.damageTowingCoLabel": "Towing Company",
        "takaful.damageGarageLabel": "Repair Garage",

        // Other Vehicles (Step 6)
        "takaful.addOtherVehicleButton": "+ Add Other Vehicle",
        "takaful.otherVehicleItemTitle": "Other Vehicle #{index}",
        "takaful.ovVehicleNumberLabel": "Vehicle Number",
        "takaful.ovOwnerNameLabel": "Owner Name",
        "takaful.ovDriverNameLabel": "Driver Name",
        "takaful.ovColorAndTypeLabel": "Color and Type",
        "takaful.ovTotalWeightLabel": "Total Weight",
        "takaful.ovAddressLabel": "Address",
        "takaful.ovPhoneLabel": "Phone",
        "takaful.ovInsuranceCoLabel": "Insurance Company",
        "takaful.ovPolicyNumberLabel": "Policy Number",
        "takaful.ovInsuranceTypeLabel": "Insurance Type",
        "takaful.ovDamageDescLabel": "Damage Description",

        // Police and Witnesses (Step 7)
        "takaful.policeReportedDateLabel": "Date Reported to Police",
        "takaful.policeAuthorityLabel": "Police Authority / Station",
        "takaful.sketchDrawnLabel": "Sketch Drawn by Police?",
        "takaful.policeCameLabel": "Did Police Come to Scene?",
        "takaful.witnessesTitle": "Witnesses",
        "takaful.addWitnessButton": "+ Add Witness",
        "takaful.witnessItemTitle": "Witness #{index}",
        "takaful.witnessNameLabel": "Witness Name",
        "takaful.witnessPhoneLabel": "Witness Phone",
        "takaful.witnessAddressLabel": "Witness Address",
        "takaful.passengersTitle": "Passengers in Insured Vehicle (Injured)",
        "takaful.addPassengerButton": "+ Add Passenger",
        "takaful.passengerItemTitle": "Passenger #{index}",
        "takaful.passengerNameLabel": "Passenger Name",
        "takaful.passengerAgeLabel": "Passenger Age",
        "takaful.passengerAddressLabel": "Passenger Address",
        "takaful.passengerHospitalLabel": "Hospital / Clinic",
        "takaful.passengerInjuryDescLabel": "Injury Description",

        "takaful.accidentNarrationLabel": "Accident Narration / Description",
        "takaful.notifierSignatureLabel": "Notifier Signature (Name/Text)",
        "takaful.receiverNameLabel": "Receiver Name (Employee)",
        "takaful.receiverNotesLabel": "Receiver Notes",
        "takaful.declarationTitle": "Declaration",
        "takaful.declarerNameLabel": "Declarer Name",
        "takaful.declarationDateLabel": "Declaration Date",
        "takaful.docCheckerNameLabel": "Document Checker Name",
        "takaful.checkerJobLabel": "Checker Job Title",
        "takaful.checkerSignatureLabel": "Checker Signature (Name/Text)",
        "takaful.checkerDateLabel": "Checker Signature Date",
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


function InsuranceTakafulRep({ onClose, isOpen }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        accidentInfo: {
            reportDate: '', accidentDate: '', accidentType: '', accidentLocation: '',
            accidentTime: '', passengersCount: '', agentName: '',
        },
        policyInfo: {
            policyNumber: '', branch: '', durationFrom: '', durationTo: '', issueDate: '',
            isFullCoverage: false, fullCoverageFee: '', isThirdParty: false, thirdPartyFee: '',
            isMandatory: false, maxAllowedPassengers: '',
        },
        insuredPerson: {
            name: '', address: '', residence: '', workAddress: '', workPhone: '',
        },
        driverInfo: {
            name: '', idNumber: '', birthDate: '', age: '', residence: '',
            address: '', workAddress: '', workPhone: '', relationToInsured: '',
        },
        licenseInfo: {
            licenseNumber: '', licenseType: '', issueDate: '', expiryDate: '',
            matchesVehicleType: false,
        },
        insuredVehicle: {
            plateNumber: '',
            damage: { 
                front: '', back: '', left: '', right: '',
                estimatedValue: '', towingCompany: '', garage: '',
            },
        },
        otherVehicles: [],
        policeAndWitnesses: {
            reportedDate: '', policeAuthority: '', sketchDrawn: false, policeCame: false,
            witnesses: [],
        },
        passengers: [],
        accidentNarration: '',
        notifierSignature: '',
        receiverName: '',
        receiverNotes: '',
        declaration: {
            declarerName: '', declarationDate: '', documentCheckerName: '',
            checkerJob: '', checkerSignature: '', checkerDate: '',
        },
    });


    const handleChange = (e, section, subField, arrayName, index, itemField, subSubField) => {
        const { name: inputNameFromEvent, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : (type === 'number' ? (value === '' ? '' : Number(value)) : value) ;


        setFormData(prev => {
            const newState = { ...prev };
            if (!section && !subField && typeof arrayName === 'string' && typeof index === 'number' && typeof itemField === 'string') {
                if (!newState[arrayName] || !Array.isArray(newState[arrayName])) {
                    newState[arrayName] = [];
                }
                const newArray = [...newState[arrayName]];
                while (index >= newArray.length) { newArray.push({}); }
                if (!newArray[index] || typeof newArray[index] !== 'object') { newArray[index] = {}; }

                if (arrayName === 'passengers' && itemField === 'age') {
                    newArray[index] = { ...newArray[index], [itemField]: value === '' ? '' : Number(value) };
                } else {
                    newArray[index] = { ...newArray[index], [itemField]: val };
                }

                newState[arrayName] = newArray;
            }
            else if (typeof section === 'string' && typeof subField === 'string' &&
                     typeof arrayName === 'number' && typeof index === 'string' && itemField === null && (subSubField === null || subSubField === undefined) ) {
                const numericIndexInNestedArray = arrayName;
                const propertyKeyInNestedArrayItem = index;
                if (!newState[section]) newState[section] = {};
                if (!newState[section][subField] || !Array.isArray(newState[section][subField])) {
                    newState[section][subField] = [];
                }
                const newNestedArray = [...newState[section][subField]];
                while (numericIndexInNestedArray >= newNestedArray.length) { newNestedArray.push({}); }
                if (!newNestedArray[numericIndexInNestedArray] || typeof newNestedArray[numericIndexInNestedArray] !== 'object') {
                     newNestedArray[numericIndexInNestedArray] = {};
                }
                newNestedArray[numericIndexInNestedArray] = {
                    ...newNestedArray[numericIndexInNestedArray],
                    [propertyKeyInNestedArrayItem]: val,
                };
                newState[section] = {
                    ...newState[section],
                    [subField]: newNestedArray,
                };
            }
            else if (typeof section === 'string' && typeof subField === 'string' && typeof subSubField === 'string' &&
                     arrayName === null && index === null && itemField === null) {
                 newState[section] = {
                    ...(newState[section] || {}),
                    [subField]: {
                        ...(newState[section]?.[subField] || {}),
                        [subSubField]: val,
                    },
                };
            }
            else if (typeof section === 'string' && typeof subField === 'string' &&
                     arrayName === null && index === null && itemField === null && (subSubField === null || subSubField === undefined)) {
                newState[section] = {
                    ...(newState[section] || {}),
                    [subField]: val,
                };
            }
            else if (section === null && typeof subField === 'string' &&
                     arrayName === null && index === null && itemField === null && (subSubField === null || subSubField === undefined)) {
                newState[subField] = val;
            }
            else if (section === null && subField === null && arrayName === null && index === null && itemField === null && (subSubField === null || subSubField === undefined)) {
                 newState[inputNameFromEvent] = val;
            }
            else {
                console.warn("handleChange: Unhandled case or mismatched parameters", {section, subField, arrayName, index, itemField, subSubField, eventName: inputNameFromEvent});
            }
            return newState;
        });
    };

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 8));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const currentPlateNumber = formData.insuredVehicle.plateNumber; 
        if (!currentPlateNumber) {
            alert(t('takaful.plateNumberRequiredError'));
            setIsSubmitting(false);
            return;
        }

        const toNumberOrNull = (val) => {
            if (val === '' || val === null || val === undefined) return null;
            const num = Number(val);
            return isNaN(num) ? null : num;
        };
        const toBoolean = (val) => typeof val === 'string' ? (val.toLowerCase() === 'true') : Boolean(val);
        const toDateStringOrNull = (val) => (val && val.trim() !== '') ? val : null;


        const dataToSend = {
            accidentInfo: {
                reportDate: toDateStringOrNull(formData.accidentInfo.reportDate),
                accidentDate: toDateStringOrNull(formData.accidentInfo.accidentDate),
                accidentType: formData.accidentInfo.accidentType,
                accidentLocation: formData.accidentInfo.accidentLocation,
                accidentTime: formData.accidentInfo.accidentTime,
                passengersCount: toNumberOrNull(formData.accidentInfo.passengersCount),
                agentName: formData.accidentInfo.agentName,
            },
            policyInfo: {
                policyNumber: formData.policyInfo.policyNumber,
                branch: formData.policyInfo.branch,
                durationFrom: toDateStringOrNull(formData.policyInfo.durationFrom),
                durationTo: toDateStringOrNull(formData.policyInfo.durationTo),
                issueDate: toDateStringOrNull(formData.policyInfo.issueDate),
                isFullCoverage: toBoolean(formData.policyInfo.isFullCoverage),
                fullCoverageFee: formData.policyInfo.fullCoverageFee,
                isThirdParty: toBoolean(formData.policyInfo.isThirdParty),
                thirdPartyFee: formData.policyInfo.thirdPartyFee,
                isMandatory: toBoolean(formData.policyInfo.isMandatory),
                maxAllowedPassengers: toNumberOrNull(formData.policyInfo.maxAllowedPassengers),
            },
            insuredPerson: {
                name: formData.insuredPerson.name,
                address: formData.insuredPerson.address,
                residence: formData.insuredPerson.residence,
                workAddress: formData.insuredPerson.workAddress,
                workPhone: formData.insuredPerson.workPhone,
            },
            driverInfo: {
                name: formData.driverInfo.name,
                idNumber: formData.driverInfo.idNumber,
                birthDate: toDateStringOrNull(formData.driverInfo.birthDate),
                age: toNumberOrNull(formData.driverInfo.age),
                residence: formData.driverInfo.residence,
                address: formData.driverInfo.address,
                workAddress: formData.driverInfo.workAddress,
                workPhone: formData.driverInfo.workPhone,
                relationToInsured: formData.driverInfo.relationToInsured,
            },
            licenseInfo: {
                licenseNumber: formData.licenseInfo.licenseNumber,
                licenseType: formData.licenseInfo.licenseType,
                issueDate: toDateStringOrNull(formData.licenseInfo.issueDate),
                expiryDate: toDateStringOrNull(formData.licenseInfo.expiryDate),
                matchesVehicleType: toBoolean(formData.licenseInfo.matchesVehicleType),
            },
            insuredVehicle: { 
                plateNumber: toNumberOrNull(formData.insuredVehicle.plateNumber),
                damage: {
                    front: formData.insuredVehicle.damage.front,
                    back: formData.insuredVehicle.damage.back,
                    left: formData.insuredVehicle.damage.left,
                    right: formData.insuredVehicle.damage.right,
                    estimatedValue: formData.insuredVehicle.damage.estimatedValue, 
                    towingCompany: formData.insuredVehicle.damage.towingCompany,
                    garage: formData.insuredVehicle.damage.garage,
                },
            },
            otherVehicles: (formData.otherVehicles || []).map(v => ({
                vehicleNumber: v.vehicleNumber,
                ownerName: v.ownerName,
                driverName: v.driverName,
                colorAndType: v.colorAndType,
                totalWeight: v.totalWeight, 
                address: v.address,
                phone: v.phone,
                insuranceCompany: v.insuranceCompany,
                policyNumber: v.policyNumber,
                insuranceType: v.insuranceType,
                damageDescription: v.damageDescription,
            })),
            policeAndWitnesses: {
                reportedDate: toDateStringOrNull(formData.policeAndWitnesses.reportedDate),
                policeAuthority: formData.policeAndWitnesses.policeAuthority,
                sketchDrawn: toBoolean(formData.policeAndWitnesses.sketchDrawn),
                policeCame: toBoolean(formData.policeAndWitnesses.policeCame),
                witnesses: (formData.policeAndWitnesses.witnesses || []).map(w => ({
                    name: w.name,
                    phone: w.phone,
                    address: w.address,
                })),
            },
            passengers: (formData.passengers || []).map(p => ({
                name: p.name,
                age: toNumberOrNull(p.age),
                address: p.address,
                hospital: p.hospital,
                injuryDescription: p.injuryDescription,
            })),
            accidentNarration: formData.accidentNarration,
            notifierSignature: formData.notifierSignature,
            receiverName: formData.receiverName,
            receiverNotes: formData.receiverNotes,
            declaration: {
                declarerName: formData.declaration.declarerName,
                declarationDate: toDateStringOrNull(formData.declaration.declarationDate),
                documentCheckerName: formData.declaration.documentCheckerName,
                checkerJob: formData.declaration.checkerJob,
                checkerSignature: formData.declaration.checkerSignature,
                checkerDate: toDateStringOrNull(formData.declaration.checkerDate),
            },
        };
        
        let jsonDataString;
        try {
            jsonDataString = JSON.stringify(dataToSend);
            console.log("Stringified JSON to send (compact):", jsonDataString);
            console.log("Pretty Stringified JSON to send (for debugging):\n", JSON.stringify(dataToSend, null, 2));

        } catch (stringifyError) {
            console.error("Error during JSON.stringify:", stringifyError);
            alert("Error preparing data for submission. Please check console for stringify errors.");
            setIsSubmitting(false);
            return;
        }

        try {
            const token = `islam__${localStorage.getItem("token")}`;
            // console.log("Plate Number for URL: ", currentPlateNumber); // Already logged

            const response = await fetch(`http://localhost:3002/api/v1/TakafulAccidentReport/add/${currentPlateNumber}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Crucial
                    token
                },
                body: jsonDataString // Send the stringified JSON
            });

            const responseData = await response.json(); // Attempt to parse server response as JSON

            if (!response.ok) {
                console.error("Server Error Response (not OK):", responseData, "Status:", response.status);
                let errorMessage = responseData.message || `HTTP error! status: ${response.status}`;
                if (responseData.error) { // If server sends an 'error' field with details
                     errorMessage += `\nServer Error Details: ${responseData.error}`;
                } else if (responseData.errors && Array.isArray(responseData.errors)) {
                    errorMessage += "\nValidation Details: " + responseData.errors.map(err => `${err.path || 'field'}: ${err.message || err.msg}`).join(", ");
                } else if (typeof responseData.errors === 'object') {
                    errorMessage += "\nValidation Details: " + JSON.stringify(responseData.errors);
                }
                throw new Error(errorMessage);
            }

            console.log('Form submitted successfully:', responseData);
            alert(t('takaful.formSubmissionSuccess') + (responseData.message ? `\n${responseData.message}` : ''));
            onClose();

        } catch (error) {
            console.error('Submission or Fetch error object:', error);
            if (error.message.includes("JSON.parse: unexpected character") || error.message.includes("invalid json response body")) {
                alert(t('takaful.formSubmissionError') + "Server did not return valid JSON. Check server logs.");
            } else {
                alert(t('takaful.formSubmissionError') + error.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    const addArrayItem = (arrayName, itemStructure = {}) => {
        setFormData(prev => {
            if (arrayName.includes('.')) {
                const parts = arrayName.split('.');
                const mainArrayKey = parts[0];
                const nestedArrayKey = parts[1];
                const updatedMainObject = {
                    ...(prev[mainArrayKey] || {}),
                    [nestedArrayKey]: [...(prev[mainArrayKey]?.[nestedArrayKey] || []), itemStructure]
                };
                return { ...prev, [mainArrayKey]: updatedMainObject };
            }
            return { ...prev, [arrayName]: [...(prev[arrayName] || []), itemStructure] };
        });
    };

    const removeArrayItem = (arrayName, index) => {
        setFormData(prev => {
            if (arrayName.includes('.')) {
                const parts = arrayName.split('.');
                const mainArrayKey = parts[0];
                const nestedArrayKey = parts[1];
                if (!prev[mainArrayKey] || !prev[mainArrayKey][nestedArrayKey]) return prev;
                const updatedNestedArray = prev[mainArrayKey][nestedArrayKey].filter((_, i) => i !== index);
                const updatedMainObject = {
                    ...prev[mainArrayKey],
                    [nestedArrayKey]: updatedNestedArray
                };
                return { ...prev, [mainArrayKey]: updatedMainObject };
            }
            if (!prev[arrayName]) return prev;
            return { ...prev, [arrayName]: prev[arrayName].filter((_, i) => i !== index) };
        });
    };

    const getStepTitle = () => {
        switch (currentStep) {
            case 1: return t('takaful.accidentInfoTitle');
            case 2: return t('takaful.policyInfoTitle');
            case 3: return t('takaful.insuredPersonTitle');
            case 4: return t('takaful.driverLicenseTitle');
            case 5: return t('takaful.insuredVehicleTitle');
            case 6: return t('takaful.otherVehiclesTitle');
            case 7: return t('takaful.policePassengersTitle');
            case 8: return t('takaful.narrationDeclarationTitle');
            default: return '';
        }
    };

    const renderStepIndicator = () => (
        <div className="px-4 py-3 mb-4">
            <div className="flex justify-between items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                    <div key={step} className="flex flex-col items-center text-center flex-1 px-1">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium ${currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{step}</div>
                        <span className="text-[10px] leading-tight mt-1 text-gray-600">
                            {step === 1 && t('takaful.step1Indicator')}
                            {step === 2 && t('takaful.step2Indicator')}
                            {step === 3 && t('takaful.step3Indicator')}
                            {step === 4 && t('takaful.step4Indicator')}
                            {step === 5 && t('takaful.step5Indicator')}
                            {step === 6 && t('takaful.step6Indicator')}
                            {step === 7 && t('takaful.step7Indicator')}
                            {step === 8 && t('takaful.step8Indicator')}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCommonInput = (label, name, value, type = "text", required = false, section = null, subField = null, arrayName = null, index = null, itemField = null, subSubField = null, options = null) => {
        const inputId = `${section || ''}${subField || ''}${arrayName || ''}${index || ''}${itemField || ''}${subSubField || ''}${name}`;
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
                        <option value="">{t("selectDefault")}</option>
                        {options && options.map(opt => <option key={opt.value} value={opt.value}>{t(opt.label)}</option>)}
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
                        min={type === "number" ? 0 : undefined}
                    />
                )}
            </div>
        );
    };

    const renderAccidentInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderCommonInput("takaful.reportDateLabel", "reportDate", formData.accidentInfo.reportDate, "date", true, "accidentInfo", "reportDate")}
            {renderCommonInput("takaful.accidentDateLabel", "accidentDate", formData.accidentInfo.accidentDate, "date", true, "accidentInfo", "accidentDate")}
            {renderCommonInput("takaful.accidentTimeLabel", "accidentTime", formData.accidentInfo.accidentTime, "time", true, "accidentInfo", "accidentTime")}
            {renderCommonInput("takaful.accidentTypeLabel", "accidentType", formData.accidentInfo.accidentType, "text", true, "accidentInfo", "accidentType")}
            {renderCommonInput("takaful.accidentLocationLabel", "accidentLocation", formData.accidentInfo.accidentLocation, "text", true, "accidentInfo", "accidentLocation")}
            {renderCommonInput("takaful.passengersCountLabel", "passengersCount", formData.accidentInfo.passengersCount, "number", true, "accidentInfo", "passengersCount")}
            {renderCommonInput("takaful.agentNameLabel", "agentName", formData.accidentInfo.agentName, "text", true, "accidentInfo", "agentName")}
        </div>
    );

    const renderPolicyInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderCommonInput("takaful.policyNumberLabel", "policyNumber", formData.policyInfo.policyNumber, "text", true, "policyInfo", "policyNumber")}
            {renderCommonInput("takaful.branchLabel", "branch", formData.policyInfo.branch, "text", true, "policyInfo", "branch")}
            {renderCommonInput("takaful.durationFromLabel", "durationFrom", formData.policyInfo.durationFrom, "date", true, "policyInfo", "durationFrom")}
            {renderCommonInput("takaful.durationToLabel", "durationTo", formData.policyInfo.durationTo, "date", true, "policyInfo", "durationTo")}
            {renderCommonInput("takaful.issueDateLabel", "issueDate", formData.policyInfo.issueDate, "date", true, "policyInfo", "issueDate")}
            {renderCommonInput("takaful.maxAllowedPassengersLabel", "maxAllowedPassengers", formData.policyInfo.maxAllowedPassengers, "number", true, "policyInfo", "maxAllowedPassengers")}
            {renderCommonInput("takaful.fullCoverageFeeLabel", "fullCoverageFee", formData.policyInfo.fullCoverageFee, "text", true, "policyInfo", "fullCoverageFee")}
            {renderCommonInput("takaful.thirdPartyFeeLabel", "thirdPartyFee", formData.policyInfo.thirdPartyFee, "text", true, "policyInfo", "thirdPartyFee")}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {renderCommonInput("takaful.isFullCoverageLabel", "isFullCoverage", formData.policyInfo.isFullCoverage, "checkbox", true, "policyInfo", "isFullCoverage")}
                {renderCommonInput("takaful.isThirdPartyLabel", "isThirdParty", formData.policyInfo.isThirdParty, "checkbox", true, "policyInfo", "isThirdParty")}
                {renderCommonInput("takaful.isMandatoryLabel", "isMandatory", formData.policyInfo.isMandatory, "checkbox", true, "policyInfo", "isMandatory")}
            </div>
        </div>
    );

    const renderInsuredPersonInfo = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {renderCommonInput("takaful.insuredNameLabel", "name", formData.insuredPerson.name, "text", true, "insuredPerson", "name")}
            {renderCommonInput("takaful.insuredAddressLabel", "address", formData.insuredPerson.address, "text", true, "insuredPerson", "address")}
            {renderCommonInput("takaful.insuredResidenceLabel", "residence", formData.insuredPerson.residence, "text", true, "insuredPerson", "residence")}
            {renderCommonInput("takaful.insuredWorkAddressLabel", "workAddress", formData.insuredPerson.workAddress, "text", true, "insuredPerson", "workAddress")}
            {renderCommonInput("takaful.insuredWorkPhoneLabel", "workPhone", formData.insuredPerson.workPhone, "tel", true, "insuredPerson", "workPhone")}
        </div>
    );

    const renderDriverAndLicenseInfo = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Driver Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {renderCommonInput("takaful.driverNameLabel", "name", formData.driverInfo.name, "text", true, "driverInfo", "name")}
                    {renderCommonInput("takaful.driverIdNumberLabel", "idNumber", formData.driverInfo.idNumber, "text", true, "driverInfo", "idNumber")}
                    {renderCommonInput("takaful.driverBirthDateLabel", "birthDate", formData.driverInfo.birthDate, "date", true, "driverInfo", "birthDate")}
                    {renderCommonInput("takaful.driverAgeLabel", "age", formData.driverInfo.age, "number", true, "driverInfo", "age")}
                    {renderCommonInput("takaful.driverResidenceLabel", "residence", formData.driverInfo.residence, "text", true, "driverInfo", "residence")}
                    {renderCommonInput("takaful.driverAddressLabel", "address", formData.driverInfo.address, "text", true, "driverInfo", "address")}
                    {renderCommonInput("takaful.driverWorkAddressLabel", "workAddress", formData.driverInfo.workAddress, "text", true, "driverInfo", "workAddress")}
                    {renderCommonInput("takaful.driverWorkPhoneLabel", "workPhone", formData.driverInfo.workPhone, "tel", true, "driverInfo", "workPhone")}
                    {renderCommonInput("takaful.relationToInsuredLabel", "relationToInsured", formData.driverInfo.relationToInsured, "text", true, "driverInfo", "relationToInsured")}
                </div>
            </div>
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">License Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {renderCommonInput("takaful.licenseNumberLabel", "licenseNumber", formData.licenseInfo.licenseNumber, "text", true, "licenseInfo", "licenseNumber")}
                    {renderCommonInput("takaful.licenseTypeLabel", "licenseType", formData.licenseInfo.licenseType, "text", true, "licenseInfo", "licenseType")}
                    {renderCommonInput("takaful.licenseIssueDateLabel", "issueDate", formData.licenseInfo.issueDate, "date", true, "licenseInfo", "issueDate")}
                    {renderCommonInput("takaful.licenseExpiryDateLabel", "expiryDate", formData.licenseInfo.expiryDate, "date", true, "licenseInfo", "expiryDate")}
                    {renderCommonInput("takaful.matchesVehicleTypeLabel", "matchesVehicleType", formData.licenseInfo.matchesVehicleType, "checkbox", true, "licenseInfo", "matchesVehicleType")}
                </div>
            </div>
        </div>
    );

    const renderInsuredVehicleInfo = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">Insured Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {renderCommonInput("takaful.vehiclePlateNumberLabel", "plateNumber", formData.insuredVehicle.plateNumber, "number", true, "insuredVehicle", "plateNumber")}
                </div>
            </div>
            <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">{t("takaful.damageTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("takaful.damageFrontLabel", "front", formData.insuredVehicle.damage.front, "textarea", true, "insuredVehicle", "damage", null, null, null, "front")}
                    {renderCommonInput("takaful.damageBackLabel", "back", formData.insuredVehicle.damage.back, "textarea", true, "insuredVehicle", "damage", null, null, null, "back")}
                    {renderCommonInput("takaful.damageLeftLabel", "left", formData.insuredVehicle.damage.left, "textarea", true, "insuredVehicle", "damage", null, null, null, "left")}
                    {renderCommonInput("takaful.damageRightLabel", "right", formData.insuredVehicle.damage.right, "textarea", true, "insuredVehicle", "damage", null, null, null, "right")}
                    {renderCommonInput("takaful.damageEstValueLabel", "estimatedValue", formData.insuredVehicle.damage.estimatedValue, "text", true, "insuredVehicle", "damage", null, null, null, "estimatedValue")}
                    {renderCommonInput("takaful.damageTowingCoLabel", "towingCompany", formData.insuredVehicle.damage.towingCompany, "text", true, "insuredVehicle", "damage", null, null, null, "towingCompany")}
                    {renderCommonInput("takaful.damageGarageLabel", "garage", formData.insuredVehicle.damage.garage, "text", true, "insuredVehicle", "damage", null, null, null, "garage")}
                </div>
            </div>
        </div>
    );

    const renderOtherVehicles = () => (
        <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Other Vehicles Involved</h3>
            {(formData.otherVehicles || []).map((vehicle, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md mb-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-md font-medium text-gray-600">{t('takaful.otherVehicleItemTitle', { index: index + 1 })}</h4>
                        <button type="button" onClick={() => removeArrayItem('otherVehicles', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
                        {renderCommonInput("takaful.ovVehicleNumberLabel", `ov_vnum_${index}`, vehicle.vehicleNumber, "text", true, null, null, "otherVehicles", index, "vehicleNumber")}
                        {renderCommonInput("takaful.ovOwnerNameLabel", `ov_oname_${index}`, vehicle.ownerName, "text", true, null, null, "otherVehicles", index, "ownerName")}
                        {renderCommonInput("takaful.ovDriverNameLabel", `ov_dname_${index}`, vehicle.driverName, "text", true, null, null, "otherVehicles", index, "driverName")}
                        {renderCommonInput("takaful.ovColorAndTypeLabel", `ov_ctype_${index}`, vehicle.colorAndType, "text", true, null, null, "otherVehicles", index, "colorAndType")}
                        {renderCommonInput("takaful.ovTotalWeightLabel", `ov_weight_${index}`, vehicle.totalWeight, "text", true, null, null, "otherVehicles", index, "totalWeight")}
                        {renderCommonInput("takaful.ovAddressLabel", `ov_addr_${index}`, vehicle.address, "text", true, null, null, "otherVehicles", index, "address")}
                        {renderCommonInput("takaful.ovPhoneLabel", `ov_phone_${index}`, vehicle.phone, "tel", true, null, null, "otherVehicles", index, "phone")}
                        {renderCommonInput("takaful.ovInsuranceCoLabel", `ov_insco_${index}`, vehicle.insuranceCompany, "text", true, null, null, "otherVehicles", index, "insuranceCompany")}
                        {renderCommonInput("takaful.ovPolicyNumberLabel", `ov_polnum_${index}`, vehicle.policyNumber, "text", true, null, null, "otherVehicles", index, "policyNumber")}
                        {renderCommonInput("takaful.ovInsuranceTypeLabel", `ov_instype_${index}`, vehicle.insuranceType, "text", true, null, null, "otherVehicles", index, "insuranceType")}
                        <div className="md:col-span-2 lg:col-span-3">
                            {renderCommonInput("takaful.ovDamageDescLabel", `ov_dmgdesc_${index}`, vehicle.damageDescription, "textarea", true, null, null, "otherVehicles", index, "damageDescription")}
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={() => addArrayItem('otherVehicles', { vehicleNumber: '', ownerName: '', driverName: '', colorAndType: '', totalWeight: '', address: '', phone: '', insuranceCompany: '', policyNumber: '', insuranceType: '', damageDescription: '' })}
                className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                {t('takaful.addOtherVehicleButton')}
            </button>
        </div>
    );

    const renderPolicePassengersInfo = () => (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Police Information & Witnesses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("takaful.policeReportedDateLabel", "reportedDate", formData.policeAndWitnesses.reportedDate, "date", true, "policeAndWitnesses", "reportedDate")}
                    {renderCommonInput("takaful.policeAuthorityLabel", "policeAuthority", formData.policeAndWitnesses.policeAuthority, "text", true, "policeAndWitnesses", "policeAuthority")}
                    {renderCommonInput("takaful.sketchDrawnLabel", "sketchDrawn", formData.policeAndWitnesses.sketchDrawn, "checkbox", true, "policeAndWitnesses", "sketchDrawn")}
                    {renderCommonInput("takaful.policeCameLabel", "policeCame", formData.policeAndWitnesses.policeCame, "checkbox", true, "policeAndWitnesses", "policeCame")}
                </div>
                <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-600 mb-2">{t("takaful.witnessesTitle")}</h4>
                    {(formData.policeAndWitnesses.witnesses || []).map((witness, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 border border-gray-200">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="text-sm font-medium text-gray-500">{t('takaful.witnessItemTitle', { index: index + 1 })}</h5>
                                <button type="button" onClick={() => removeArrayItem('policeAndWitnesses.witnesses', index)}
                                    className="text-xs text-red-500 hover:text-red-700" disabled={isSubmitting}>{t('deleteButton')}</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
                                {renderCommonInput("takaful.witnessNameLabel", `w_name_${index}`, witness.name, "text", true, "policeAndWitnesses", "witnesses", index, "name", null)}
                                {renderCommonInput("takaful.witnessPhoneLabel", `w_phone_${index}`, witness.phone, "tel", true, "policeAndWitnesses", "witnesses", index, "phone", null)}
                                {renderCommonInput("takaful.witnessAddressLabel", `w_addr_${index}`, witness.address, "text", true, "policeAndWitnesses", "witnesses", index, "address", null)}
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('policeAndWitnesses.witnesses', { name: '', phone: '', address: '' })}
                        className="mt-1 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                        {t('takaful.addWitnessButton')}
                    </button>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("takaful.passengersTitle")}</h3>
                {(formData.passengers || []).map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-3 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-md font-medium text-gray-600">{t('takaful.passengerItemTitle', { index: index + 1 })}</h4>
                            <button type="button" onClick={() => removeArrayItem('passengers', index)} className="text-sm text-red-600 hover:text-red-800" disabled={isSubmitting}>{t('deleteButton')}</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3">
                            {renderCommonInput("takaful.passengerNameLabel", `p_name_${index}`, passenger.name, "text", true, null, null, "passengers", index, "name")}
                            {renderCommonInput("takaful.passengerAgeLabel", `p_age_${index}`, passenger.age, "number", true, null, null, "passengers", index, "age")}
                            {renderCommonInput("takaful.passengerAddressLabel", `p_addr_${index}`, passenger.address, "text", true, null, null, "passengers", index, "address")}
                            {renderCommonInput("takaful.passengerHospitalLabel", `p_hosp_${index}`, passenger.hospital, "text", true, null, null, "passengers", index, "hospital")}
                            <div className="md:col-span-2 lg:col-span-3">
                                {renderCommonInput("takaful.passengerInjuryDescLabel", `p_inj_${index}`, passenger.injuryDescription, "textarea", true, null, null, "passengers", index, "injuryDescription")}
                            </div>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => addArrayItem('passengers', { name: '', age: '', address: '', hospital: '', injuryDescription: '' })}
                    className="mt-2 px-3 py-1.5 text-sm bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200" disabled={isSubmitting}>
                    {t('takaful.addPassengerButton')}
                </button>
            </div>
        </div>
    );

    const renderNarrationAndDeclaration = () => (
        <div className="space-y-6">
            {renderCommonInput("takaful.accidentNarrationLabel", "accidentNarration", formData.accidentNarration, "textarea", true, null, "accidentNarration")}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {renderCommonInput("takaful.notifierSignatureLabel", "notifierSignature", formData.notifierSignature, "text", true, null, "notifierSignature")}
                {renderCommonInput("takaful.receiverNameLabel", "receiverName", formData.receiverName, "text", true, null, "receiverName")}
            </div>
            {renderCommonInput("takaful.receiverNotesLabel", "receiverNotes", formData.receiverNotes, "textarea", true, null, "receiverNotes")}

            <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{t("takaful.declarationTitle")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderCommonInput("takaful.declarerNameLabel", "declarerName", formData.declaration.declarerName, "text", true, "declaration", "declarerName")}
                    {renderCommonInput("takaful.declarationDateLabel", "declarationDate", formData.declaration.declarationDate, "date", true, "declaration", "declarationDate")}
                    {renderCommonInput("takaful.docCheckerNameLabel", "documentCheckerName", formData.declaration.documentCheckerName, "text", true, "declaration", "documentCheckerName")}
                    {renderCommonInput("takaful.checkerJobLabel", "checkerJob", formData.declaration.checkerJob, "text", true, "declaration", "checkerJob")}
                    {renderCommonInput("takaful.checkerSignatureLabel", "checkerSignature", formData.declaration.checkerSignature, "text", true, "declaration", "checkerSignature")}
                    {renderCommonInput("takaful.checkerDateLabel", "checkerDate", formData.declaration.checkerDate, "date", true, "declaration", "checkerDate")}
                </div>
            </div>
        </div>
    );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-4">
            <div className="w-full max-w-[1000px] bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">{t('takaful.modalTitle')}</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-100" disabled={isSubmitting}><X className="w-5 h-5" /></button>
                </div>
                {renderStepIndicator()}
                <form onSubmit={handleSubmit} className="rounded-md">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-300 mx-6 mb-3">
                        <p className="text-md font-semibold text-gray-700">{getStepTitle()}</p>
                    </div>
                    <div className="px-6 pb-6 max-h-[calc(100vh-330px)] overflow-y-auto space-y-4">
                        {currentStep === 1 && renderAccidentInfo()}
                        {currentStep === 2 && renderPolicyInfo()}
                        {currentStep === 3 && renderInsuredPersonInfo()}
                        {currentStep === 4 && renderDriverAndLicenseInfo()}
                        {currentStep === 5 && renderInsuredVehicleInfo()}
                        {currentStep === 6 && renderOtherVehicles()}
                        {currentStep === 7 && renderPolicePassengersInfo()}
                        {currentStep === 8 && renderNarrationAndDeclaration()}
                    </div>
                    <div className="px-6 py-3 flex justify-between items-center border-t border-gray-200 mt-auto">
                        <button type="button" onClick={handleBack} className={`px-4 py-2 text-sm rounded-md shadow-sm ${currentStep === 1 || isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`} disabled={currentStep === 1 || isSubmitting}>{t('backButton')}</button>
                        {currentStep < 8 && (
                            <button type="button" onClick={handleNext} className={`px-4 py-2 text-sm text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{t('nextButton')}</button>
                        )}
                        {currentStep === 8 && (
                            <button type="submit" className={`px-4 py-2 text-sm text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : t('submitButton')}</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InsuranceTakafulRep;