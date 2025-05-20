import { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { IconButton, Menu, MenuItem } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';
import axios from 'axios';
import AddInsuranceMandatory from "./AddInsuranceMandatory";
import AddCheckModal from "./AddCheckModal";

function InsuranceList() {
    const [isOpenMandatory, setIsOpenMandatory] = useState(false);
    const navigate = useNavigate()
    const { insuredId, vehicleId } = useParams();
    const [customerData, setCustomerData] = useState({});
    const [selectedVehicleInsurances, setSelectedVehicleInsurances] = useState([]);
    const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
    const [anchorEls, setAnchorEls] = useState({});
    const [isAddCheckModalOpen, setIsAddCheckModalOpen] = useState(false);
    const [selectedInsuranceIdForCheck, setSelectedInsuranceIdForCheck] = useState(null);


    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const handleOpenAddCheckModal = (insuranceId) => {
        setSelectedInsuranceIdForCheck(insuranceId);
        setIsAddCheckModalOpen(true);
        handleMenuClose();
    };

    const handleCloseAddCheckModal = () => {
        setIsAddCheckModalOpen(false);
        setSelectedInsuranceIdForCheck(null);
    };

    const refreshInsuranceData = () => {
        if (insuredId && vehicleId) {
            fetchVehicleInsurances(insuredId, vehicleId);
        }
    };

    useEffect(() => {
        fetchCustomer();
        if (vehicleId) {
            fetchVehicleInsurances(insuredId, vehicleId);
        }
    }, [insuredId, vehicleId]);

    const fetchCustomer = async () => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const response = await axios.get(`http://localhost:3002/api/v1/insured/findInsured/${insuredId}`, {
                headers: { token }
            });
            const data = await response.data;
            setCustomerData(data.insured);
            if (data.insured && data.insured.vehicles) {

                const currentVehicle = response.data.insured.vehicles.find(v => v._id === vehicleId);
                if (currentVehicle) {
                    setSelectedVehicleDetails(currentVehicle);
                } else {
                    setSelectedVehicleDetails(null);
                }
            }

        } catch (error) {
            console.error("Error fetching customer data:", error);
        }
    };

    const fetchVehicleInsurances = async (currentInsuredId, currentVehicleId) => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const response = await axios.get(`http://localhost:3002/api/v1/insured/get/${currentInsuredId}/${currentVehicleId}`, {
                headers: { token }
            });
            const data = await response.data.insurances;
            const formattedInsurances = data.map((insurance) => ({
                id: insurance._id,
                insuranceType: insurance.insuranceType,
                insuranceCompany: insurance.insuranceCompany,
                startDate: new Date(insurance.insuranceStartDate).toLocaleDateString(),
                endDate: new Date(insurance.insuranceEndDate).toLocaleDateString(),
                insuranceAmount: insurance.insuranceAmount,
                paidAmount: insurance.paidAmount,
                remainingDebt: insurance.remainingDebt || (insurance.insuranceAmount - (insurance.paidAmount || 0)),
                paymentMethod: insurance.paymentMethod
            }));
            setSelectedVehicleInsurances(formattedInsurances);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteInsurance = async (checkId) => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            await axios.delete(`http://localhost:3002/api/v1/insured/removeInsuranceFromVehicle/${insuredId}/${vehicleId}/${checkId}`,
                {
                    headers: { token }
                });
            refreshInsuranceData();
            handleMenuClose();
        } catch (error) {
            console.log(error);
        }
        handleMenuClose();
    };


    const insuredColumns = [
        { field: 'startDate', headerName: 'Start Date', flex: 1 },
        { field: 'endDate', headerName: 'End Date', flex: 1 },
        { field: 'insuranceAmount', headerName: 'Insurance Amount', flex: 1, type: 'number' },
        { field: 'paidAmount', headerName: 'Paid Amount', flex: 1, type: 'number' },
        { field: 'remainingDebt', headerName: 'Remaining Debt', flex: 1, type: 'number' },
        { field: 'insuranceType', headerName: 'Insurance Type', flex: 1 },
        { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
        { field: 'insuranceCompany', headerName: 'Insurance Company', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.7,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="actions"
                        onClick={(event) => handleMenuOpen(event, params.row.id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEls[params.row.id]}
                        open={Boolean(anchorEls[params.row.id])}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleDeleteInsurance(params.row.id)}>
                            <DeleteIcon sx={{ mr: 1 }} /> Delete
                        </MenuItem>
                        {params.row.paymentMethod === "شيك" && (
                            <MenuItem onClick={() => navigate(`/check/${insuredId}/${vehicleId}/${params.row.id}`)}>
                                <ReceiptLongIcon sx={{ mr: 1 }} />
                                details check
                            </MenuItem>

                        )}

                        {params.row.paymentMethod === "شيك" && (
                            <MenuItem onClick={() => handleOpenAddCheckModal(params.row.id)}>
                                <AddCardIcon sx={{ mr: 1 }} /> Add Check
                            </MenuItem>
                        )}
                    </Menu>
                </>
            ),
        },
    ];

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            console.log(error);
        }
    };

    if (!customerData._id && !selectedVehicleDetails) {
        return (
            <div className='flex justify-center h-[100vh] items-center dark:text-dark4 dark:bg-dark2'>
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
        <div className="navblayout py-1">
            <div className="bg-[rgb(255,255,255)] flex p-[22px] rounded-md justify-between items-center dark:bg-navbarBack mt-4">
                <div className="dark:text-dark3 flex rounded-md justify-between items-center">
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

            <div className="block gap-3 py-4 md:flex">
                <div className="w-full md:w-64 rounded-lg bg-[rgb(255,255,255)] dark:bg-navbarBack  shadow-sm md:mb-0">
                    <div className="p-6">
                        <h2 className="mb-4 text-[24px] font-semibold text-gray-900  dark:text-[rgb(255,255,255)]">Customer Info</h2>
                        <div className="space-y-3">
                            <div><label className="text-xs text-gray-500">First Name</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{customerData.first_name || "N/A"}</p></div>
                            <div><label className="text-xs text-gray-500">Last Name</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{customerData.last_name || "N/A"}</p></div>
                            <div><label className="text-xs text-gray-500">Mobile</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{customerData.phone_number || "N/A"}</p></div>
                            <div><label className="text-xs text-gray-500">Identity</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{customerData.id_Number || "N/A"}</p></div>
                            <div><label className="text-xs text-gray-500">Birth Date</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{formatDate(customerData.birth_date)}</p></div>
                            <div><label className="text-xs text-gray-500">Join Date</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{formatDate(customerData.joining_date)}</p></div>
                            <div><label className="text-xs text-gray-500">City</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{customerData.city || "N/A"}</p></div>
                            <div><label className="text-xs text-gray-500">Notes</label><p className="text-gray-500 text-sm">{customerData.notes || "N/A"}</p></div>
                        </div>
                    </div>
                </div>

                <div className="md:max-w-[calc(100%-17rem)] w-full">
                    {selectedVehicleDetails ? (
                        <div className="rounded-lg dark:bg-navbarBack  bg-[rgb(255,255,255)] p-6 shadow-sm mb-4">
                            <h2 className="text-[20px] font-semibold text-gray-900 mb-4  dark:text-[rgb(255,255,255)]">Vehicle Details ({selectedVehicleDetails.plateNumber || "N/A"})</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                <div><label className="text-xs text-gray-500">Model</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.model || "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">Type</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.type || "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">Plate Number</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.plateNumber || "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">Model Year</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.modelNumber || "N/A"}</p></div> {/* Assuming modelNumber is year */}
                                <div><label className="text-xs text-gray-500">Ownership</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.ownership || "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">Color</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.color || "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">Price</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{selectedVehicleDetails.price ? `₪${selectedVehicleDetails.price}` : "N/A"}</p></div>
                                <div><label className="text-xs text-gray-500">License Expiry</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{formatDate(selectedVehicleDetails.licenseExpiry)}</p></div>
                                <div><label className="text-xs text-gray-500">Last Test</label><p className="text-gray-900 font-medium  dark:text-[rgb(255,255,255)]">{formatDate(selectedVehicleDetails.lastTest)}</p></div>
                            </div>
                        </div>
                    ) : (
                        vehicleId &&

                        <div className='flex justify-center  items-center'>
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


                    )}

                    <div className="rounded-lg bg-[rgb(255,255,255)] p-6 shadow-sm dark:bg-navbarBack ">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-[24px] font-semibold text-gray-900 dark:text-[rgb(255,255,255)]">Vehicle Insurances</h2>
                        </div>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={selectedVehicleInsurances}
                                columns={insuredColumns}
                                paginationModel={{ page: 0, pageSize: 5 }}
                                pageSizeOptions={[5, 10, 20]}
                                loading={!selectedVehicleInsurances.length && vehicleId}
                                sx={{ border: 0 }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AddInsuranceMandatory
                isOpen={isOpenMandatory}
                onClose={() => {
                    setIsOpenMandatory(false);
                    refreshInsuranceData();
                }}
                insuredId={insuredId}
                vehicleId={vehicleId}
            />
            {selectedInsuranceIdForCheck && (
                <AddCheckModal
                    isOpen={isAddCheckModalOpen}
                    onClose={handleCloseAddCheckModal}
                    insuredId={insuredId}
                    vehicleId={vehicleId}
                    insuranceId={selectedInsuranceIdForCheck}
                    onCheckAdded={() => {
                        refreshInsuranceData();
                    }}
                />
            )}
        </div>
    );
}

export default InsuranceList;