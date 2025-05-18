// MashreqRep.js
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsuranceMashreqRep from './insuranceMashreqRep';
const t = (key, ...args) => {
    const translations = {
        "mashreq.reportsTitle": "Al-Mashreq Accident Reports",
        "mashreq.addReportButton": "Add Mashreq Report",
        "deleteAction": "Delete",
        "editAction": "Edit",
        "confirmDelete": "Are you sure you want to delete this report?",
        "deleteSuccess": "Report deleted successfully.",
        "deleteError": "Failed to delete report. See console for details.",

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


function MashreqRep() {
    const [mashreqReports, setMashreqReports] = useState([]);
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

    const fetchMashreqReports = async () => {
        setLoading(true);
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            // !!! تأكد من صحة هذا الـ Endpoint !!!
            const res = await axios.get(`http://localhost:3002/api/v1/Al_MashreqAccidentReport/all`, {
                headers: { token }
            });

            console.log("Fetched Mashreq Reports Raw Response:", res);

            // تم تعديل الوصول إلى البيانات بناءً على رد API المشرق
            // عادة ما يكون res.data.findAll أو res.data.reports أو res.data (إذا كان الرد هو المصفوفة مباشرة)
            const reportsArray = res.data.findAll || res.data.reports || (Array.isArray(res.data) ? res.data : null);

            if (!Array.isArray(reportsArray)) {
                console.error("Fetched data (reportsArray for Mashreq) is not an array:", reportsArray);
                console.error("Full response data for Mashreq:", res.data);
                setMashreqReports([]);
                setLoading(false);
                return;
            }

            const formattedData = reportsArray.map(report => ({
                id: report._id,
                // سكيما المشرق لا تحتوي على reportNumber، يمكنك استخدام رقم البوليصة أو جزء من ID
                reportIdentifier: report.insurancePolicy?.number || report._id.slice(-6) || 'N/A',
                accidentDate: report.accident?.date ? new Date(report.accident.date).toLocaleDateString() : 'N/A',
                accidentLocation: report.accident?.accidentLocation || 'N/A',
                insuredName: report.insuredPerson?.name || (report.insuredId?.first_name ? `${report.insuredId.first_name} ${report.insuredId.last_name}` : 'N/A'),
                driverName: report.driver?.name || 'N/A',
                vehicleRegNo: report.vehicle?.registrationNumber || 'N/A', // هذا هو plateNumber
                branchOffice: report.branchOffice || 'N/A',
                fullReport: report
            }));
            console.log("Formatted Mashreq Reports:", formattedData);
            setMashreqReports(formattedData);
        } catch (err) {
            console.error('Error fetching Mashreq reports:', err.response?.data || err.message || err);
            setMashreqReports([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (reportRow) => {
        setSelectedReportId(reportRow.id);
        setEditFormData(reportRow.fullReport || {});
        setShowEditForm(true);
        handleMenuClose();
        fetchMashreqReports();
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t("confirmDelete"))) return;
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            // !!! تأكد من صحة هذا الـ Endpoint !!!
            await axios.delete(`https://backendinstursed.onrender.com/api/v1/Al_MashreqAccidentReport/delete/${id}`, {
                headers: { token }
            });
            alert(t("deleteSuccess"));
            fetchMashreqReports();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting Mashreq report:", err.response?.data || err.message || err);
            alert(t("deleteError"));
        }
    };

    const handleFormClose = (refresh) => { 
        setShowAddReportForm(false);
        setShowEditForm(false);
        setSelectedReportId(null);
        setEditFormData({});
        if (refresh) {
            fetchMashreqReports();
        }
    };

    useEffect(() => {
        fetchMashreqReports();
    }, []);

    const columns = [
        { field: 'reportIdentifier', headerName: 'Report/Policy No.', flex: 1.2 },
        { field: 'accidentDate', headerName: 'Accident Date', flex: 1 },
        { field: 'accidentLocation', headerName: 'Location', flex: 1.5 },
        { field: 'insuredName', headerName: 'Insured Name', flex: 1.5 },
        { field: 'driverName', headerName: 'Driver Name', flex: 1.5 },
        { field: 'vehicleRegNo', headerName: 'Vehicle Reg. No.', flex: 1 },
        { field: 'branchOffice', headerName: 'Branch Office', flex: 1 },
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
                            <DeleteIcon sx={{ mr: 1 }} /> {t("deleteAction")}
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
                <h1 className="text-2xl font-bold">{t("mashreq.reportsTitle")}</h1>
                <button
                    onClick={() => {
                        setEditFormData({});
                        setSelectedReportId(null);
                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <AddIcon sx={{ mr: 0.5 }} /> {t("mashreq.addReportButton")}
                </button>
            </div>

            <DataGrid
                rows={mashreqReports}
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
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#f5f5f5',
                    }
                }}
            />

            {(showAddReportForm || showEditForm) && (
                <InsuranceMashreqRep
                    isOpen={showAddReportForm || showEditForm}
                    onClose={handleFormClose}
                    initialData={showEditForm ? editFormData : undefined}
                    reportId={showEditForm ? selectedReportId : undefined}
                />
            )}
        </div>
    );
}

export default MashreqRep;