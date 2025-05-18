import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import AddCustomer from './AddCustomer';
import Add_vehicle from './Add_vehicle';
import { useTranslation } from 'react-i18next';

export default function Customers() {

    const { t, i18n: { language } } = useTranslation();
    const [customers, setCustomers] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedInsuredId, setSelectedInsuredId] = useState(null); // لتخزين الـ insuredId

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchCustomers = async () => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/insured/allInsured`, {
                headers: { token }
            });

            const formattedData = res.data.insuredList.map(item => ({
                id: item._id,
                first_name: item.first_name,
                last_name: item.last_name,
                id_Number: item.id_Number,
                phone_number: item.phone_number,
                joining_date: item.joining_date ? item.joining_date.slice(0, 10) : '',
                notes: item.notes,
                city: item.city,
                birth_date: item.birth_date ? item.birth_date.slice(0, 10) : '',
                name: `${item.first_name} ${item.last_name}`,
                Mobile: item.phone_number,
                address: item.city,
                Identity: item.id_Number,
                email: item.email,
                agent: item.agentsName,
            }));

            setCustomers(formattedData);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer.id);
        setFormData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            id_Number: customer.id_Number,
            phone_number: customer.phone_number,
            joining_date: customer.joining_date,
            notes: customer.notes,
            city: customer.city,
            birth_date: customer.birth_date,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            await axios.delete(`http://localhost:3002/api/v1/insured/deleteInsured/${id}`, {
                headers: { token }
            });
            fetchCustomers();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting customer:", err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = `islam__${localStorage.getItem("token")}`;

        try {
            await axios.patch(`http://localhost:3002/api/v1/insured/updateInsured/${selectedCustomer}`, formData, {
                headers: { token }
            });

            fetchCustomers();
            setShowForm(false);
            setFormData({});
            setSelectedCustomer(null);
        } catch (err) {
            console.error('Error updating customer:', err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns = useMemo(() => [
    { field: 'name', headerName: t('Name'), flex: 1 },
    { field: 'Mobile', headerName: t('Mobile'), flex: 1 },
    { field: 'address', headerName: t('Address'), flex: 1 },
    { field: 'Identity', headerName: t('Identity'), flex: 1 },
    { field: 'email', headerName: t('Email'), flex: 1 },
    { field: 'agent', headerName: t('Agent'), flex: 1 },
    {
      field: 'actions',
      headerName: t('Actions'),
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuOpen(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEls[params.row.id]}
            open={Boolean(anchorEls[params.row.id])}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleEdit(params.row)}>
              <EditIcon className="mr-2" /> {t('Edit')}
            </MenuItem>
            <MenuItem onClick={() => handleDelete(params.row.id)}>
              🗑️ {t('Delete')}
            </MenuItem>
            <MenuItem onClick={async () => {
              await Add_vehicle(params.row.id);
              await setSelectedInsuredId(params.row.id);
              await handleMenuClose();
            }}>
              🚗 {t('Add Vehicle')}
            </MenuItem>
          </Menu>
        </>
      ),
    }
  ], [t, language, anchorEls]);
    return (
        <div className="p-4" style={{ minHeight: '100vh' }}
        >

            <div className="bg-white flex p-[22px] rounded-md justify-between items-center mb-3 " dir={language === "en" ? "ltr" : "rtl"}>
                <div className="flex gap-[14px]">
                    <a className href="/home" data-discover="true">{t('customers.firstTitle')}</a>
                   {language === 'en' ? (
  <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
  </svg>
) : (
  <svg className="transform -scale-x-100" width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
  </svg>
)}
        <a className href="/customer" data-discover="true">{t('customers.secondeTitle')}</a>
            </div>
            <button
                onClick={() => setShowAddForm(true)
                }
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
            >
                {t('customers.buttonAdd')}
            </button>
        </div>

            {/* DataGrid */ }
    <DataGrid
        rows={customers}
        columns={columns}
        autoHeight
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
        getRowId={(row) => row.id}

    />

    {/* Edit Customer Form */ }
    {
        showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="2md:w-75 w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                        <h2 className="text-2xl font-semibold rounded-md">Edit Customer</h2>
                        <button onClick={() => setShowForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-2 space-y-4 border border-gray-300 rounded-md">
                        <div className="grid grid-cols-2 gap-3 px-4 py-4">
                            <div>
                                <label className="block text-sm font-medium">First Name</label>
                                <input type="text" name="first_name" className="w-full p-2 border rounded-md" value={formData.first_name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Last Name</label>
                                <input type="text" name="last_name" className="w-full p-2 border rounded-md" value={formData.last_name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">ID Number</label>
                                <input type="text" name="id_Number" className="w-full p-2 border rounded-md" value={formData.id_Number} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone Number</label>
                                <input type="text" name="phone_number" className="w-full p-2 border rounded-md" value={formData.phone_number} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Joining Date</label>
                                <input type="date" name="joining_date" className="w-full p-2 border rounded-md" value={formData.joining_date} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Birth Date</label>
                                <input type="date" name="birth_date" className="w-full p-2 border rounded-md" value={formData.birth_date} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">City</label>
                                <input type="text" name="city" className="w-full p-2 border rounded-md" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Notes</label>
                                <textarea name="notes" rows="2" className="w-full p-2 border rounded-md" value={formData.notes} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="flex justify-end px-4 pb-4">
                            <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    {/* Add Customer Form (if open) */ }
    {
        showAddForm && (
            <AddCustomer
                isOpen={showAddForm}
                onClose={(closed) => {
                    setShowAddForm(closed);
                    fetchCustomers();
                }}
            />
        )
    }

    {/* Add Vehicle Form (if open) */ }
    {
        selectedInsuredId && (

            <Add_vehicle
                isOpen={true}
                insuredId={selectedInsuredId}
                onClose={() => setSelectedInsuredId(null)}
            />
        )
    }
        </div >
    );
}
