import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsuranceAhliaRep from './insuranceAhliaRep';

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
            <Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="p-4" style={{ minHeight: '100vh' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Al-Ahlia Accident Reports</h1>
                <button
                    onClick={() => {
                        setEditFormData({}); 
                        setSelectedReportId(null); 
                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <AddIcon sx={{ mr: 0.5 }} /> Add Ahlia Report
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