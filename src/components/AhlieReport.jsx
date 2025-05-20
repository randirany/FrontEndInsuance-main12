import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsuranceAhliaRep from './insuranceAhliaRep';
import { Link } from 'react-router-dom';

function AhlieReport() {
    const [ahliaReports, setAhliaReports] = useState([{
        
   } ]);
    const [anchorEls, setAnchorEls] = useState({});
    const [editFormData, setEditFormData] = useState({}); 
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState(null);
    const [showAddReportForm, setShowAddReportForm] = useState(false);
    const [loading, setLoading] = useState(true); 

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchAhliaReports = async () => {
        // setLoading(true);
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/AhliaAccidentReport/all`, {
                headers: { token }
            });
            
            const reports = res.data.findAll || res.data.data || res.data; 
            if (!Array.isArray(reports)) {
                console.error("Fetched data is not an array:", reports);
                setAhliaReports([]);
                setLoading(false);
                return;
            }

            const formattedData = reports.map(report => ({
                id: report._id,
                reportNumber: report.reportNumber || 'N/A',
                accidentDate: report.accidentDate ? new Date(report.accidentDate).toLocaleDateString() : 'N/A',
                accidentLocation: report.accidentDetails?.location || 'N/A',
                policyNumber: report.policyInfo?.policyNumber || 'N/A',
                insuredName: report.insuredPerson?.name || (report.insuredId?.first_name ? `${report.insuredId.first_name} ${report.insuredId.last_name}`: 'N/A'), // اسم المؤمن له
                driverName: report.driverInfo?.name || 'N/A',
                vehicleRegNo: report.vehicleInfo?.registrationNumber || 'N/A',
                fullReport: report 
            }));
            setAhliaReports(formattedData);
        } catch (err) {
            console.error('Error fetching Ahlia reports:', err);
            setAhliaReports([]); 
        } finally {
            setLoading(false);
        }
    };



    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            await axios.delete(`https://backendinstursed.onrender.com/api/v1/AhliaAccidentReport/delete/${id}`, {
                headers: { token }
            });
            fetchAhliaReports(); 
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting Ahlia report:", err);
            alert("Failed to delete report. See console for details.");
        }
    };

    const handleEditFormClose = (refresh) => {
        setShowEditForm(false);
        setSelectedReportId(null);
        setEditFormData({});
        if (refresh) {
            fetchAhliaReports();
        }
    }


    useEffect(() => {
        fetchAhliaReports();
    }, []);

    const columns = [
        { field: 'reportNumber', headerName: 'Report No.', flex: 1 },
        { field: 'accidentDate', headerName: 'Accident Date', flex: 1 },
        { field: 'accidentLocation', headerName: 'Location', flex: 1.5 },
        { field: 'policyNumber', headerName: 'Policy No.', flex: 1 },
        { field: 'insuredName', headerName: 'Insured Name', flex: 1.5 },
        { field: 'driverName', headerName: 'Driver Name', flex: 1.5 },
        { field: 'vehicleRegNo', headerName: 'Vehicle Reg. No.', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
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
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon sx={{ mr: 1 }} /> Delete
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    if (loading) {
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
            
<div className="px-4 py-7  dark:bg-dark2 dark:text-dark3" style={{ minHeight: '100vh' }}>

            <div className="bg-[rgb(255,255,255)] dark:bg-navbarBack flex p-[22px] rounded-md justify-between items-center mb-3">
                <div className="flex gap-[14px]">
                    <Link className='' to="/home" data-discover="true">Home</Link>
                    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
                    </svg>
                    <a className href="/insuranceCompany" data-discover="true">Al-Ahlia Accident Reports</a>
                </div>
                <button
                    onClick={() => {
                        setEditFormData({});
                        setSelectedReportId(null);
                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-indigo-600  text-[rgb(255,255,255)] rounded-md hover:bg-blue-700"
                >
                    Add Ahlia Report
                </button>
            </div>
            <DataGrid
                rows={ahliaReports}
                columns={columns}
                initialState={{
                    pagination: {
                      paginationModel: { pageSize: 10, page: 0 },
                    },
                  }}
                pageSizeOptions={[5 , 10 , 25, 50]}
                disableRowSelectionOnClick 
                getRowId={(row) => row.id}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-cell': {
                    },
                     '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#f5f5f5',
                    }
                }}
            />

            {(showAddReportForm || showEditForm) && (
                <InsuranceAhliaRep
                    isOpen={showAddReportForm || showEditForm}
                    onClose={(refresh) => {
                        setShowAddReportForm(false);
                        handleEditFormClose(refresh);
                    }}

                    initialData={showEditForm ? editFormData : undefined}
                    reportId={showEditForm ? selectedReportId : undefined} 
                />
            )}
        </div>
    );
}

export default AhlieReport;