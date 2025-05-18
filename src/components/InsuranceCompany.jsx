import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import AddInsuranceCompany from './AddInsuranceCompany';

function InsuranceCompany() {
    const [companies, setCompanies] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchCompanies = async () => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/company/all`, {
                headers: { token }
            });

            const formattedData = res.data.map(item => ({
                id: item._id,
                name: item.name,
                contact: item.contact,
                address: item.address,
                insuranceType: item.insuranceType,
                rates: item.rates,
            }));

            setCompanies(formattedData);
        } catch (err) {
            console.error('Error fetching insurance companies:', err);
        }
    };

    const handleEdit = (company) => {
        setSelectedCompany(company.id);
        setFormData({
            name: company.name,
            contact: company.contact,
            address: company.address,
            insuranceType: company.insuranceType,
            rates: company.rates,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            console.log(id)
            await axios.delete(`http://localhost:3002/api/v1/company/delete/${id}`, {
                headers: { token }
            });
            fetchCompanies();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting insurance company:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('rates.')) {
            const rateField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                rates: {
                    ...prev.rates,
                    [rateField]: value
                }
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = `islam__${localStorage.getItem("token")}`;

        try {
            await axios.patch(`http://localhost:3002/api/v1/company/updateInsuranceCompany/${selectedCompany}`, formData, {
                headers: { token }
            });

            fetchCompanies();
            setShowForm(false);
            setFormData({});
            setSelectedCompany(null);
        } catch (err) {
            console.error('Error updating insurance company:', err);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Company Name', flex: 1 },
        { field: 'contact', headerName: 'Contact Info', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'insuranceType', headerName: 'Insurance Type', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
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
                            <EditIcon className="mr-2" /> Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            🗑️ Delete
                        </MenuItem>
                    </Menu>
                </>
            ),
        }
    ];

    return (
        <div className="p-4" style={{ minHeight: '100vh' }}>
            <div className="bg-white flex p-[22px] rounded-md justify-between items-center mb-3">
                <div className="flex gap-[14px]">
                    <a className href="/home" data-discover="true">Home</a>
                    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
                    </svg>
                    <a className href="/insuranceCompany" data-discover="true">Insurance Companies</a>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add new Insurance Company
                </button>
            </div>

            {/* DataGrid */}
            <DataGrid
                rows={companies}
                columns={columns}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                disableSelectionOnClick
                getRowId={(row) => row.id}
            />

            {/* Edit Insurance Company Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="2md:w-75 w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                            <h2 className="text-2xl font-semibold rounded-md">Edit Insurance Company</h2>
                            <button onClick={() => setShowForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-2 space-y-4 border border-gray-300 rounded-md">
                            <div className="grid grid-cols-2 gap-3 px-4 py-4">
                                <div>
                                    <label className="block text-sm font-medium">Company Name</label>
                                    <input type="text" name="name" className="w-full p-2 border rounded-md" value={formData.name || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Contact Info</label>
                                    <input type="text" name="contact" className="w-full p-2 border rounded-md" value={formData.contact || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Address</label>
                                    <input type="text" name="address" className="w-full p-2 border rounded-md" value={formData.address || ''} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Insurance Type</label>
                                    <select
                                        name="insuranceType"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.insuranceType || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="الزامي">الزامي</option>
                                        <option value="شامل">شامل</option>
                                        <option value="طرف ثالث">طرف ثالث</option>
                                    </select>
                                </div>

                                {formData.insuranceType !== 'الزامي' && (
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">Insurance Rates</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium">Base Rate</label>
                                                <input
                                                    type="number"
                                                    name="rates.baseRate"
                                                    className="w-full p-2 border rounded-md"
                                                    value={formData.rates?.baseRate || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Age Factor</label>
                                                <input
                                                    type="number"
                                                    name="rates.ageFactor"
                                                    className="w-full p-2 border rounded-md"
                                                    value={formData.rates?.ageFactor || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Vehicle Age Factor</label>
                                                <input
                                                    type="number"
                                                    name="rates.vehicleAgeFactor"
                                                    className="w-full p-2 border rounded-md"
                                                    value={formData.rates?.vehicleAgeFactor || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium">Vehicle Value Factor</label>
                                                <input
                                                    type="number"
                                                    name="rates.vehicleValueFactor"
                                                    className="w-full p-2 border rounded-md"
                                                    value={formData.rates?.vehicleValueFactor || ''}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end px-4 pb-4">
                                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Insurance Company Form */}
            {showAddForm && (
                <AddInsuranceCompany
                    isOpen={showAddForm}
                    onClose={(closed) => {
                        setShowAddForm(closed);
                        fetchCompanies();
                    }}
                />
            )}
        </div>
    );
}

export default InsuranceCompany;