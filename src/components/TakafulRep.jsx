import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsuranceTakafulRep from './InsuranceTakafulRep'; 

const API_BASE_URL = "https://backendinstursed.onrender.com/api/v1"; 


function TakafulRep() {
    const [takafulReports, setTakafulReports] = useState([]);
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

    const fetchTakafulReports = async () => {
        setLoading(true);
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/TakafulAccidentReport/all`, {
                headers: { token }
            });

            console.log("Fetched Takaful Reports Raw Response:", res);

            const reportsArray = res.data.findAll || res.data.data || (Array.isArray(res.data) ? res.data : null);

            if (!Array.isArray(reportsArray)) {
                console.error("Fetched data (reportsArray for Takaful) is not an array:", reportsArray);
                console.error("Full response data for Takaful:", res.data);
                setTakafulReports([]);
                setLoading(false);
                return;
            }

            const formattedData = reportsArray.map(report => ({
                id: report._id,
                reportIdentifier: report.policyInfo?.policyNumber || report._id.slice(-6) || 'N/A',
                accidentDate: report.accidentInfo?.accidentDate ? new Date(report.accidentInfo.accidentDate).toLocaleDateString() : 'N/A',
                accidentLocation: report.accidentInfo?.accidentLocation || 'N/A',
                insuredName: report.insuredPerson?.name || (report.insuredId?.first_name ? `${report.insuredId.first_name} ${report.insuredId.last_name}` : 'N/A'),
                driverName: report.driverInfo?.name || 'N/A',
                vehiclePlateNo: report.insuredVehicle?.plateNumber || 'N/A',
                agentName: report.accidentInfo?.agentName || 'N/A',
                fullReport: report
            }));
            console.log("Formatted Takaful Reports:", formattedData);
            setTakafulReports(formattedData);
        } catch (err) {
            console.error('Error fetching Takaful reports:', err.response?.data || err.message || err);
            setTakafulReports([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (reportRow) => {
        setSelectedReportId(reportRow.id);
        setEditFormData(reportRow.fullReport || {});
        setShowEditForm(true);
        handleMenuClose();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this report?")) return;
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            await axios.delete(`http://localhost:3002/api/v1/TakafulAccidentReport/delete/${id}`, { // افترضت هذا المسار
                headers: { token }
            });
            alert("Report deleted successfully.");
            fetchTakafulReports();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting Takaful report:", err.response?.data || err.message || err);
            alert("Failed to delete report. See console for details.");
        }
    };

    const handleFormClose = () => {
        setShowAddReportForm(false);
        setShowEditForm(false);
        setSelectedReportId(null);
        setEditFormData({});
        fetchTakafulReports();
    };

    useEffect(() => {
        fetchTakafulReports();
    }, []);

    const columns = [
        { field: 'reportIdentifier', headerName: 'Policy/Report No.', flex: 1.2 },
        { field: 'accidentDate', headerName: 'Accident Date', flex: 1 },
        { field: 'accidentLocation', headerName: 'Location', flex: 1.5 },
        { field: 'insuredName', headerName: 'Insured Name', flex: 1.5 },
        { field: 'driverName', headerName: 'Driver Name', flex: 1.5 },
        { field: 'vehiclePlateNo', headerName: 'Vehicle Plate No.', flex: 1 },
        { field: 'agentName', headerName: 'Agent Name', flex: 1 },
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
                        <MenuItem onClick={() => handleEdit(params.row)}>
                            <EditIcon sx={{ mr: 1 }} /> {"Edit"}
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon sx={{ mr: 1 }} /> {"Delete"}
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="p-4" style={{ minHeight: '100vh' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{"Takaful Accident Reports"}</h1>
                <button
                    onClick={() => {
                        setEditFormData({});
                        setSelectedReportId(null);
                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <AddIcon sx={{ mr: 0.5 }} /> {"Add Takaful Report"}
                </button>
            </div>

            <DataGrid
                rows={takafulReports}
                columns={columns}
                autoHeight
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 10, page: 0 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
                disableRowSelectionOnClick
                getRowId={(row) => row.id}
                sx={{
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f0f9f8', 
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#f0f9f8',
                    }
                }}
            />

            {(showAddReportForm || showEditForm) && (
                <InsuranceTakafulRep
                    isOpen={showAddReportForm || showEditForm}
                    onClose={handleFormClose}
                    initialData={showEditForm ? editFormData : undefined}
                    reportId={showEditForm ? selectedReportId : undefined}
                />
            )}
        </div>
    );
}


export default TakafulRep;