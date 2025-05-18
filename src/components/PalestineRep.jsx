import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsurancePalestineRep from './InsurancePalestinelRep';
const t = (key, ...args) => {
    const translations = {
        "palestine.reportListTitle": "Palestine Insurance Accident Reports",
        "palestine.addReportButton": "Add Palestine Report",
        "palestine.deleteConfirm": "Are you sure you want to delete this report?",
        "palestine.deleteFailed": "Failed to delete report. See console for details.",
        "palestine.actionsHeader": "Actions",
        "deleteButton": "Delete",
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

function PalestineRep() {
    const [palestineReports, setPalestineReports] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [showAddReportForm, setShowAddReportForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchPalestineReports = async () => {
        setLoading(true);
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/PlestineAccidentReport/all`, {
                headers: { token }
            });

            const reports = res.data.findAll || res.data.data || res.data;
            if (!Array.isArray(reports)) {
                console.error("Fetched Palestine reports data is not an array:", reports);
                setPalestineReports([]);
                setLoading(false);
                return;
            }

            const formattedData = reports.map(report => ({
                id: report._id,
                reportNumber: report.reportNumber || 'N/A',
                accidentDate: report.accidentDetails?.accidentDate ? new Date(report.accidentDetails.accidentDate).toLocaleDateString() : 'N/A',
                accidentLocation: report.accidentDetails?.location || 'N/A',
                documentNumber: report.agentInfo?.documentNumber || 'N/A',
                ownerName: report.vehicleInfo?.ownerName || 'N/A',
                driverName: report.driverInfo?.name || 'N/A',
                vehicleNumber: report.vehicleInfo?.vehicleNumber || 'N/A',
            }));
            setPalestineReports(formattedData);
        } catch (err) {
            console.error('Error fetching Palestine reports:', err);
            setPalestineReports([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('palestine.deleteConfirm'))) return;
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            await axios.delete(`https://backendinstursed.onrender.com/api/v1/PlestineAccidentReport/delete/${id}`, {
                headers: { token }
            });
            fetchPalestineReports();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting Palestine report:", err);
            alert(t('palestine.deleteFailed'));
        }
    };

    useEffect(() => {
        fetchPalestineReports();
    }, []);

    const columns = [
        { field: 'reportNumber', headerName: "Palestine Insurance Accident Reports", flex: 1 },
        { field: 'accidentDate', headerName: "Accident Date", flex: 1 },
        { field: 'accidentLocation', headerName: "Location", flex: 1.5 },
        { field: 'documentNumber', headerName: "Doc. Number", flex: 1 },
        { field: 'ownerName', headerName: "owner Name", flex: 1.5 },
        { field: 'driverName', headerName: "Driver Name", flex: 1.5 },
        { field: 'vehicleNumber', headerName: "vehicle Number", flex: 1 },
        {
            field: 'actions',
            headerName: t('palestine.actionsHeader'),
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
                        {/* يمكنك إضافة خيار "تعديل" هنا لاحقًا إذا أردت */}
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon sx={{ mr: 1 }} /> {t('deleteButton')}
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
                <h1 className="text-2xl font-bold">Palestine Insurance Accident Reports</h1>
                <button
                    onClick={() => {

                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <AddIcon sx={{ mr: 0.5 }} /> {t("palestine.addReportButton")}
                </button>
            </div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={palestineReports}
                    columns={columns}
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
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                        },
                        '& .MuiDataGrid-cell': {
                            fontSize: '0.875rem',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#f0f0f0',
                        }
                    }}
                />
            </Box>

            {showAddReportForm && (
                <InsurancePalestineRep
                    isOpen={showAddReportForm}
                    onClose={() => {
                        setShowAddReportForm(false);
                            fetchPalestineReports();
                    }}
                />
            )}
        </div>
    );
}


export default PalestineRep;