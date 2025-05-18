import { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
};

const formatCurrency = (amount, currencySymbol = "₪") => {
    if (amount === null || amount === undefined || isNaN(Number(amount))) return "N/A";
    return `${currencySymbol}${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function CheckDetails() {
    const { insuredId, vehicleId, insuranceId } = useParams();
    const [checks, setChecks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCheckDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = `islam__${localStorage.getItem("token")}`;
                const response = await axios.get(
                    `http://localhost:3002/api/v1/insured/getCheck/${insuredId}/${vehicleId}/${insuranceId}`,
                    {
                        headers: { token }
                    }
                );
                console.log(response.data.checks)
                setChecks(response.data.checks || []);
            } catch (err) {
                console.error("Error fetching check details:", err);
                setError(err.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        if (insuredId && vehicleId && insuranceId) {
            fetchCheckDetails();
        } else {
            setError("Missing required IDs (insured, vehicle, or insurance) in the URL.");
            setLoading(false);
        }
    }, [insuredId, vehicleId, insuranceId]);

    if (loading) {
        return (
            <div className='flex justify-center h-[100vh] items-center'>
                <div className="sk-fading-circle ">
                    <div className="sk-circle1 sk-circle"></div>
                    <div className="sk-circle2 sk-circle"></div>
                    <div className="sk-circle3 sk-circle"></div>
                    <div className="sk-circle4 sk-circle"></div>
                    <div className="sk-circle5 sk-circle"></div>
                    <div className="sk-circle6 sk-circle"></div>
                    <div className="sk-circle7 sk-circle"></div>
                    <div className="sk-circle8 sk-circle"></div>
                    <div className="sk-circle9 sk-circle"></div>
                    <div className="sk-circle10 sk-circle"></div>
                    <div className="sk-circle11 sk-circle"></div>
                    <div className="sk-circle12 sk-circle"></div>
                </div>
            </div>

        );
    }

    return (
        <div className="navblayout" style={{ padding: '20px' }}>
            <div className='mb-2 py-2 '>
                <div className="bg-white flex p-[20px] rounded-md justify-between items-center ">
                    <div className="flex gap-[14px]">
                        <NavLink to="/home">Home</NavLink>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z"
                                fill="#6B7280"
                            />
                        </svg>
                        <p>Check Details</p>
                    </div>


                </div>
            </div>

            <div className="p-2 md-3 rounded-md bg-white min-h-[50vh]" >
                {!loading && !error && checks.length === 0 && (
                    <div className="flex justify-center my-2">
                        <div className="  border-l-4 border-[#5750F1] bg-[#5750F1]/5  p-4 rounded-md shadow-md w-full mx-5">
                            <p className="font-medium">No check details found for this insurance.</p>
                        </div>
                    </div>
                )}


                {!error && checks.length > 0 && (
                    <div className="bg-white rounded-lg p-2  min-h-[50vh]">
                        {checks.map((check, index) => (
                            <div key={check._id || index}>
                                <div className="flex items-start py-4 px-2 my-2 hover:bg-gray-100 rounded-lg shadow-sm">
                                    <div className="mr-4 mt-1">
                                        {check.checkImage ? (
                                            <div
                                                className="relative w-24 h-24 cursor-pointer bg-gray-200 rounded-md overflow-hidden"
                                                title="View Image"
                                            >
                                                <img
                                                    src={check.checkImage}
                                                    alt="Check"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = "none";
                                                        e.target.nextSibling.style.display = "flex";
                                                    }}
                                                />
                                                <div className="absolute inset-0 hidden items-center justify-center bg-gray-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="font-medium text-base">
                                            Check No: <span className="text-gray-600">{check.checkNumber || 'N/A'}</span>
                                        </div>
                                        <div className="mt-1">
                                            <div className="text-sm">
                                                Due Date: <span className="text-gray-600">{formatDate(check.checkDueDate)}</span>
                                            </div>
                                            <div className="text-sm">
                                                Amount: <span className="text-gray-600 font-bold">{formatCurrency(check.checkAmount)}</span>
                                            </div>
                                            <div className={`text-sm font-medium ${check.isReturned ? "text-red-600" : "text-green-600"}`}>
                                                Returned: {check.isReturned ? 'Yes' : 'No'}
                                            </div>
                                        </div>
                                    </div>
                                    {check.checkImage && (
                                        <div className="ml-2">
                                            <button
                                                onClick={() => window.open(check.checkImage, '_blank')}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                                title="Open image in new tab"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {index < checks.length - 1 && (
                                    <div className="border-b border-gray-200 mx-12"></div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckDetails;