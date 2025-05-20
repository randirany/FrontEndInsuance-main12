'use client';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, Tabs, Tab, Box, FormControl, InputLabel, Select } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { X, User, Users, Info } from 'lucide-react';
function Departments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);
    const [anchorEls, setAnchorEls] = useState({});
    const [showDepartmentDetails, setShowDepartmentDetails] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    const [showAddHeadForm, setShowAddHeadForm] = useState(false);
    const [headFormData, setHeadFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [employeeFormData, setEmployeeFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [availableEmployees, setAvailableEmployees] = useState([]);
    
    const [selectedDepartmentId, setSelectedDepartmentId] = useState('all');
    const [departmentEmployees, setDepartmentEmployees] = useState([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);

    const fetchDepartments = async () => {
        try {
            setLoading(true);
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get('http://localhost:3002/api/v1/department/all', {
                headers: { token }
            });
            console.log(res.data.departments)
            setDepartments(res.data.departments || []);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching departments:', err);
            setLoading(false);
        }
    };

    const fetchEmployeesByDepartment = async (departmentId) => {
        if (departmentId === 'all') {
            setDepartmentEmployees(getAllEmployees());
            return;
        }
        
        try {
            setLoadingEmployees(true);
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/user/allEmployee/${departmentId}`, {
                headers: { token }
            });
            console.log('Department employees:', res.data);
            
            const formattedEmployees = res.data.employees.map(emp => ({
                ...emp,
                id: emp._id
            }));
            
            setDepartmentEmployees(formattedEmployees);
            setLoadingEmployees(false);
        } catch (err) {
            console.error('Error fetching department employees:', err);
            setLoadingEmployees(false);
            setDepartmentEmployees([]);
        }
    };

    const fetchAvailableEmployees = async () => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get('http://localhost:3002/api/v1/user/all', {
                headers: { token }
            });
            console.log('user', res.data)
            setAvailableEmployees(res.data.getAll || []);
        } catch (err) {
            console.error('Error fetching available employees:', err);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchAvailableEmployees();
    }, []);
    
    useEffect(() => {
        if (selectedTab === 1) { 
            fetchEmployeesByDepartment(selectedDepartmentId);
        }
    }, [selectedDepartmentId, selectedTab]);

    const handleDepartmentSelectChange = (event) => {
        setSelectedDepartmentId(event.target.value);
    };

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        if (newValue === 1) {
            setSelectedDepartmentId('all');
            setDepartmentEmployees(getAllEmployees());
        }
    };

    const handleViewDepartment = (department) => {
        setSelectedDepartment(department);
        setShowDepartmentDetails(true);
        handleMenuClose();
    };

    const handleEditDepartment = (department) => {
        setSelectedDepartment(department);
        setFormData({
            name: department.name,
            description: department.description,
            permissions: department.permissions || []
        });
        setShowEditForm(true);
        handleMenuClose();
    };

    const handleDeleteDepartment = async (id) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            try {
                const token = `islam__${localStorage.getItem("token")}`;
                await axios.delete(`http://localhost:3002/api/v1/department/delete/${id}`, {
                    headers: { token }
                });
                fetchDepartments();
                handleMenuClose();
            } catch (err) {
                console.error('Error deleting department:', err);
            }
        }
    };

    const handleAddEmployee = (department) => {
        setSelectedDepartment(department);
        setShowAddEmployeeForm(true);
        handleMenuClose();
    };
    const handleAddHead = (department) => {
        setSelectedDepartment(department);
        setShowAddHeadForm(true);
        handleMenuClose();
    };
    const handleEmployeeFormChange = (e) => {
        console.log(employeeFormData)
        setEmployeeFormData({
            ...employeeFormData,
            [e.target.name]: e.target.value
        });
    };
    const handleHeadFormChange = (e) => {
        setHeadFormData({
            ...headFormData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddEmployeeSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("selectedDepartment", selectedDepartment)
            const token = `islam__${localStorage.getItem("token")}`;
            console.log(employeeFormData)
            await axios.post(`http://localhost:3002/api/v1/user/addEmployee/${selectedDepartment._id}`,
                employeeFormData,
                { headers: { token } }
            );
            fetchDepartments();
            setShowAddEmployeeForm(false);
            setEmployeeFormData({
                name: '',
                email: '',
                password: '',
            });
            if (selectedTab === 1 && selectedDepartmentId !== 'all') {
                fetchEmployeesByDepartment(selectedDepartmentId);
            }
        } catch (err) {
            console.error('Error adding employee:', err);
        }
    };
    const handleAddHeadSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            await axios.post(
                `http://localhost:3002/api/v1/user/addHeadOfEmployeeToDepartment/${selectedDepartment._id}`,
                headFormData,
                { headers: { token } }
            );
            fetchDepartments();
            setShowAddHeadForm(false);
            setHeadFormData({
                name: '',
                email: '',
                password: '',
            });
            if (selectedTab === 1 && selectedDepartmentId !== 'all') {
                fetchEmployeesByDepartment(selectedDepartmentId);
            }
        } catch (err) {
            console.error('Error adding department head:', err);
        }
    };
    const handleRemoveEmployee = async (departmentId, employeeId,data) => {
        console.log("data",data)
        if (data.role=='HeadOfEmployee') {
            try {
                const token = `islam__${localStorage.getItem("token")}`;
                console.log(token)
                await axios.delete(`http://localhost:3002/api/v1/user/deleteHeadOfEmployeeFromDepartment/${departmentId}/${employeeId}`, {
                    headers: { token }
                });
                fetchDepartments();
                if (selectedTab === 1 && selectedDepartmentId !== 'all') {
                    fetchEmployeesByDepartment(selectedDepartmentId);
                }
            } catch (err) {
                console.error('Error removing employee:', err);
            }
        }else{
            try {
                const token = `islam__${localStorage.getItem("token")}`;
                console.log(token)
                await axios.delete(`http://localhost:3002/api/v1/user/deleteEmployee/${departmentId}/${employeeId}`, {
                    headers: { token }
                });
                fetchDepartments();
                if (selectedTab === 1 && selectedDepartmentId !== 'all') {
                    fetchEmployeesByDepartment(selectedDepartmentId);
                }
            } catch (err) {
                console.error('Error removing employee:', err);
            }
        }
    };

    const handleFormChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'permissions') {
            const updatedPermissions = [...formData.permissions];
            if (checked) {
                updatedPermissions.push(value);
            } else {
                const index = updatedPermissions.indexOf(value);
                if (index > -1) {
                    updatedPermissions.splice(index, 1);
                }
            }
            setFormData({ ...formData, permissions: updatedPermissions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUpdateDepartment = async (e) => {
        e.preventDefault();
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log('UpdateDepartment', selectedDepartment)
            await axios.patch(`http://localhost:3002/api/v1/department/update/${selectedDepartment._id}`,
                formData,
                { headers: { token } }
            );
            fetchDepartments();
            setShowEditForm(false);
        } catch (err) {
            console.error('Error updating department:', err);
        }
    };

    const handleAddDepartment = async (e) => {
        e.preventDefault();
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            console.log('AddDepartment', selectedDepartment)
            await axios.post(`http://localhost:3002/api/v1/department/add`,
                formData,
                { headers: { token } }
            );
            fetchDepartments();
            setShowEditForm(false);
        } catch (err) {
            console.error('Error updating department:', err);
        }
    };

    const departmentColumns = [
        { field: 'name', headerName: 'department name ', flex: 1 },
        { field: 'description', headerName: 'description', flex: 2 },
        {
            field: 'headOfEmployee',
            headerName: ' head Of Employee',
            flex: 1,
            renderCell: (params) => {
                return params?.row?.headOfEmployee?.name || '—';
            }
        },
        {
            field: 'employeeCount',
            headerName: ' Employee Number',
            flex: 0.5,
            renderCell: (params) => params?.row?.employees ? params.row.employees.length : 0
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={(event) => handleMenuOpen(event, params.row._id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEls[params.row._id]}
                        open={Boolean(anchorEls[params.row._id])}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleViewDepartment(params.row)}>
                            <Info className="mr-2 w-4 h-4" />
                            show details
                        </MenuItem>
                        <MenuItem onClick={() => handleEditDepartment(params.row)}>
                            <EditIcon className="mr-2" />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleAddHead(params.row)}>
                            <PersonAddIcon className="mr-2" />
                            Add Head
                        </MenuItem>
                        <MenuItem onClick={() => handleAddEmployee(params.row)}>
                            <PersonAddIcon className="mr-2" />
                            Add Employee
                        </MenuItem>

                        <MenuItem onClick={() => handleDeleteDepartment(params.row._id)}>
                            🗑️ Delete
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    const employeeColumns = [
        { field: 'name', headerName: 'name', flex: 1 },
        { field: 'email', headerName: ' email', flex: 1 },
        { field: 'role', headerName: 'role', flex: 1 },
        { field: 'status', headerName: 'status', flex: 0.5 },
        {
            field: 'department',
            headerName: 'department',
            flex: 1,
            renderCell: (params) => {
                const dept = departments.find(d =>
                    d.employees.some(e => e._id === params.row?._id) ||
                    (d.headOfEmployee && d.headOfEmployee._id === params.row?._id)
                );
                return dept ? dept.name : 'Not assigned';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const dept = departments.find(d =>
                    d.employees.some(e => e?._id === params?.row?._id) ||
                    (d.headOfEmployee && d.headOfEmployee._id === params.row._id)
                );

                return dept ? (
                    <IconButton
                        onClick={() => handleRemoveEmployee(dept._id, params.row._id,params.row)}
                        title="Remove from department"
                        style={{fontSize:"15px"}}
                    >
                        🗑️
                    </IconButton>
                ) : null;
            },
        },
    ];

    // Prepare employees list from all departments
    const getAllEmployees = () => {
        let allEmployees = [];

        departments.forEach(dept => {
            // Add department head if exists
            if (dept.headOfEmployee) {
                allEmployees.push({
                    ...dept.headOfEmployee,
                    department: dept.name,
                    id: dept.headOfEmployee._id
                });
            }

            // Add department employees
            if (dept.employees && dept.employees.length) {
                const deptEmployees = dept.employees.map(emp => ({
                    ...emp,
                    department: dept.name,
                    id: emp._id
                }));
                allEmployees = [...allEmployees, ...deptEmployees];
            }
        });

        return allEmployees;
    };

    const availablePermissions = [
        "addAccedent", "showAccedent", "deleteAccedent",
        "createNotification", "getNotifications", "markAsRead", "Deletenotification",
        "addInsured", "deleteInsured", "allInsured", "findbyidInsured",
        "addcar", "removeCar", "showVehicles",
        "addRoad", "deleteRoad", "updateRoad", "allRoad",
        "addAgents", "deleteAgents", "updateAgents", "allAgents",
        "addCompany", "deleteCompany", "upateCompany", "allCompany"
    ];

    return (
        <div className="py-10 px-4 dark:bg-dark2 dark:text-dark3" style={{ minHeight: '100vh' }}>

            <div className="bg-[rgb(255,255,255)] dark:bg-navbarBack flex p-[22px] rounded-md justify-between items-center mb-3">
                <div className="flex gap-[14px]">
                    <a className href="/home" data-discover="true">Home</a>
                    <svg width={21} height={20} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" /></svg>
                    <a className href="/departments" data-discover="true">Users && Departments</a>
                </div>
                <button
                    onClick={() => {
                        setSelectedDepartment(null);
                        setFormData({
                            name: '',
                            description: '',
                            permissions: []
                        });
                        setShowEditForm(true);
                    }}
                    className="p-2 bg-indigo-600  text-[rgb(255,255,255)] rounded-md hover:bg-blue-700 "
                >
                    Add new Department
                </button>
            </div>
            <div className='bg-[rgb(255,255,255)] mt-3 rounded-md'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs value={selectedTab} onChange={handleTabChange} aria-label="department tabs">
                        <Tab icon={<Users className="w-4 h-4 mr-2" />} iconPosition="start" label="Departments" />
                        <Tab icon={<User className="w-4 h-4 mr-2" />} iconPosition="start" label="Employees" />
                    </Tabs>
                </Box>

                {selectedTab === 0 ? (
                    <DataGrid
                        rows={departments}
                        columns={departmentColumns}
                        autoHeight
                        pageSize={10}
                        rowsPerPageOptions={[10, 20, 50]}
                        disableSelectionOnClick
                        loading={loading}
                        getRowId={(row) => row._id}
                    />
                ) : (
                    <div>
                        <div className="p-4 border dark:border-borderNav-b">
                            <FormControl variant="outlined" sx={{ minWidth: 300 }}>
                                <InputLabel id="department-select-label">Select Department</InputLabel>
                                <Select
                                    labelId="department-select-label"
                                    id="department-select"
                                    value={selectedDepartmentId}
                                    onChange={handleDepartmentSelectChange}
                                    label="Select Department"
                                >
                                    <MenuItem value="all">All Employees</MenuItem>
                                    {departments.map((dept) => (
                                        <MenuItem key={dept._id} value={dept._id}>
                                            {dept.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        
                        <DataGrid
                            rows={selectedDepartmentId === 'all' ? getAllEmployees() : departmentEmployees}
                            columns={employeeColumns}
                            autoHeight
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 50]}
                            disableSelectionOnClick
                            loading={selectedDepartmentId === 'all' ? loading : loadingEmployees}
                        />
                    </div>
                )}

                {showDepartmentDetails && selectedDepartment?.employees && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="2md:w-75 w-full max-w-[800px] bg-[rgb(255,255,255)] rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                                <h2 className="text-2xl font-semibold">  {selectedDepartment.name}</h2>
                                <button onClick={() => setShowDepartmentDetails(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md p-4 mb-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold"> Department name:</p>
                                        <p>{selectedDepartment.name}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">Description:</p>
                                        <p>{selectedDepartment.description}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold"> Department Head :</p>
                                        <p>{selectedDepartment.headOfEmployee ? selectedDepartment.headOfEmployee.name : 'Not assigned'}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold"> Number of employees in this department:</p>
                                        <p>{selectedDepartment?.employees ? selectedDepartment.employees.length : 0}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md p-4 mb-4">
                                <h3 className="text-xl font-semibold mb-2">permissions</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {selectedDepartment.permissions && selectedDepartment.permissions.length > 0 ? (
                                        selectedDepartment.permissions.map((perm, idx) => (
                                            <div key={idx} className="bg-gray-100 p-2 rounded">
                                                {perm}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="col-span-3">No permissions defined</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showEditForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
                    <div className="2md:w-75 w-full max-w-[800px] bg-[rgb(255,255,255)]  dark:bg-dark2 rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                                <h2 className="text-2xl font-semibold rounded-md">
                                    {selectedDepartment ? ' Edit department' : ' Add new department '}
                                </h2>
                                <button onClick={() => setShowEditForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={selectedDepartment ? handleUpdateDepartment : handleAddDepartment} className="mt-2 space-y-4 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md">
                                <div className="grid grid-cols-2 gap-3 px-4 py-4">
                                    <div>
                                        <label className="block text-sm font-medium"> Department name</label>
                                        <input type="text" name="name" required className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack" value={formData.name} onChange={handleFormChange} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium">description</label>
                                        <textarea name="description" required rows="1" className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack" value={formData.description} onChange={handleFormChange} />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-2">permission</label>
                                        <div className="grid grid-cols-3 gap-x-3 gap-y-2 max-h-60 overflow-y-auto p-2 border dark:border-borderNav rounded-md">
                                            {availablePermissions.map((permission) => (
                                                <div key={permission} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`perm-${permission}`}
                                                        name="permissions"
                                                        value={permission}
                                                        checked={formData.permissions && formData.permissions.includes(permission)}
                                                        onChange={handleFormChange}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`perm-${permission}`} className="text-sm">{permission}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end px-4 pb-4">
                                    <button type="submit" className="px-4 py-2 text-[rgb(255,255,255)] bg-indigo-600 rounded-md hover:bg-indigo-500">
                                        {selectedDepartment ? ' save' : 'add department '}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showAddEmployeeForm && selectedDepartment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
                    <div className="2md:w-75 w-full max-w-[700px] bg-[rgb(255,255,255)] rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                                <h2 className="text-2xl font-semibold rounded-md">
                                    Add a new employee at {selectedDepartment.name}
                                </h2>
                                <button onClick={() => setShowAddEmployeeForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddEmployeeSubmit} className="mt-2 space-y-4 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md">
                                <div className="grid grid-cols-1 gap-3 px-4 py-4">
                                    <div>
                                        <label className="block text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={employeeFormData.name}
                                            onChange={handleEmployeeFormChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium"> Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={employeeFormData.email}
                                            onChange={handleEmployeeFormChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={employeeFormData.password}
                                            onChange={handleEmployeeFormChange}
                                        />
                                    </div>

                                </div>

                                <div className="flex justify-end px-4 pb-4">
                                    <button type="submit" className="px-4 py-2 text-[rgb(255,255,255)] bg-indigo-600 rounded-md hover:bg-indigo-500">
                                        save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {showAddHeadForm && selectedDepartment && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
                    <div className="2md:w-75 w-full max-w-[700px] bg-[rgb(255,255,255)] rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                                <h2 className="text-2xl font-semibold rounded-md">
                                    Add Head for {selectedDepartment.name} Department
                                </h2>
                                <button onClick={() => setShowAddHeadForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleAddHeadSubmit} className="mt-2 space-y-4 border dark:border-borderNav border dark:border-borderNav-gray-300 rounded-md">
                                <div className="grid grid-cols-1 gap-3 px-4 py-4">
                                    <div>
                                        <label className="block text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={headFormData.name}
                                            onChange={handleHeadFormChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={headFormData.email}
                                            onChange={handleHeadFormChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="w-full p-2 border dark:border-borderNav rounded-md  dark:bg-navbarBack dark:bg-navbarBack"
                                            value={headFormData.password}
                                            onChange={handleHeadFormChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end px-4 pb-4">
                                    <button type="submit" className="px-4 py-2 text-[rgb(255,255,255)] bg-indigo-600 rounded-md hover:bg-indigo-500">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}


export default Departments