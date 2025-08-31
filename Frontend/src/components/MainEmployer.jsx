    import axios from "../api/axios.jsx";
    import { useEffect, useState } from "react";
    import EmployerHeader from "./EmployerHeader.jsx";
    import { useNavigate } from "react-router-dom";

    const MainEmployer = () => {
    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState([]);
    const [newJob, setNewJob] = useState({
        title: "",
        description: "",
        locationString: "مصر",
        latitude: 30.69,
        longitude: 30.31,
        minSalary: 0,
        maxSalary: 0,
        workTypeId: 1,
        categoryId: 1,
        createdAt: new Date().toISOString(),
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // مودال خاص بالتعديل
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editJob, setEditJob] = useState(null);

    useEffect(() => {
        const getDashboard = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/api/EmployerHome/Dashboard", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            });
            console.log(res.data)
            setDashboardData(res.data);
        } catch (err) {
            console.error(err);
        }
        };
        getDashboard();
    }, []);

    const handleAddJob = async () => {
        try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
            "/api/EmployerHome/AddJob",
            JSON.stringify(newJob),
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            }
        );
        setDashboardData((prev) => [...prev, res.data]);
        alert("تم إضافة الوظيفة بنجاح!");
        setIsModalOpen(false);
        setNewJob({
            title: "",
            description: "",
            locationString: "مصر",
            latitude: 30.69,
            longitude: 30.31,
            minSalary: 0,
            maxSalary: 0,
            workTypeId: 1,
            categoryId: 1,
        });
        } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء إضافة الوظيفة.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    // فتح المودال الخاص بالتعديل
    const handleEditClick = (id,job) => {
        const currentJob = Array.isArray(job) ? job[0] : job;
        console.log("Job selected for edit:", currentJob);
        console.log("Job selected for edit:", job);
        setEditJob({
        id: id,
        title: job.title,
        description: job.description,
        locationString: job.locationString,
        latitude: job.latitude || 30.69,   // قيم افتراضية
        longitude: job.longitude || 30.31, // قيم افتراضية
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        workTypeId: job.workTypeId || 1,
        categoryId: job.categoryId || 1,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateJob = async () => {
        if (!editJob) return;
        const token = localStorage.getItem("token");
        console.log(editJob.id)
        try {
        const res = await axios.put(
            `/api/EmployerHome/UpdateJob/${editJob.id}`,
            editJob,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            }
        );
        setDashboardData((prev) =>
            prev.map((job) => (job.id === editJob.id ? res.data : job))
        );
        alert("تم تعديل الوظيفة بنجاح");
        setIsEditModalOpen(false);
        } catch (err) {
        console.error(err);
        console.log(editJob.id)
        console.log(editJob)
        alert("حدث خطأ أثناء تعديل الوظيفة");
        }
    };

    const handleDeleteJob = async (id) => {
        const token = localStorage.getItem("token");
        try {
        await axios.delete(`/api/EmployerHome/DeleteJob/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
        setDashboardData((prev) => prev.filter((job) => job.id !== id));
        alert("تم حذف الوظيفة بنجاح");
        } catch (err) {
        console.error(err);
        alert("حدث خطأ أثناء حذف الوظيفة ");
        }
    };

    const categories = [
        { id: 1, name: "سوبر ماركـت وهايبر ماركت" },
        { id: 2, name: "تعليم ودروس خصوصية" },
        { id: 3, name: "صيدلة وعيادات" },
        { id: 4, name: "مطاعم وكافيهات" },
        { id: 5, name: "إداري ومكتب بسيط" },
        { id: 6, name: "عمالة يدوية" },
        { id: 7, name: "أشغال خارجية" },
        { id: 8, name: "أمن وحراسة" },
        { id: 9, name: "حرف وصناعات بسيطة" },
        { id: 10, name: "توصيل ونقل" },
        { id: 11, name: "خدمات منزلية ورعاية" },
        { id: 12, name: "مزارع وأعمال يدوية" },
    ];

    return (
        <>
        <div>
            <div
            style={{ position: "fixed", left: "0", right: "0", top: "0", width: "100%" }}
            className="header_container"
            >
            <EmployerHeader onClick={() => setIsModalOpen(true)} />
            </div>

            {/* ---------- Modal لإضافة وظيفة ---------- */}
            {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-[600px] max-w-full">
                <h2 className="text-2xl font-bold mb-4">إضافة وظيفة جديدة</h2>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleAddJob();
                    }}
                    className="flex flex-col gap-4"
                >
                    <input
                    name="title"
                    value={newJob.title}
                    onChange={handleChange}
                    placeholder="عنوان الوظيفة"
                    className="border p-2 rounded"
                    required
                    />
                    <select
                    name="categoryId"
                    value={newJob.categoryId}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    >
                    <option value="">-- اختر الفئة --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.name}
                        </option>
                    ))}
                    </select>
                    <textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleChange}
                    placeholder="الوصف"
                    className="border p-2 rounded"
                    required
                    />
                    <input
                    name="locationString"
                    value={newJob.locationString}
                    onChange={handleChange}
                    placeholder="الموقع"
                    className="border p-2 rounded"
                    />
                    <select
                    name="workTypeId"
                    value={newJob.workTypeId}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    >
                    <option value={1}>دوام كامل</option>
                    <option value={2}>دوام جزئي</option>
                    <option value={3}>عن بعد</option>
                    </select>
                    <div className="flex gap-2">
                    <input
                        name="minSalary"
                        type="number"
                        value={newJob.minSalary}
                        onChange={handleChange}
                        placeholder="الحد الأدنى للراتب"
                        className="border p-2 rounded w-1/2"
                    />
                    <input
                        name="maxSalary"
                        type="number"
                        value={newJob.maxSalary}
                        onChange={handleChange}
                        placeholder="الحد الأقصى للراتب"
                        className="border p-2 rounded w-1/2"
                    />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        إلغاء
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        إضافة
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}

            {/* ---------- Modal لتعديل وظيفة ---------- */}
            {isEditModalOpen && editJob && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-8 w-[600px] max-w-full">
                <h2 className="text-2xl font-bold mb-4">تعديل الوظيفة</h2>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateJob();
                    }}
                    className="flex flex-col gap-4"
                >
                    <input
                    name="title"
                    value={editJob.title}
                    onChange={(e) => setEditJob({ ...editJob, title: e.target.value })}
                    className="border p-2 rounded"
                    required
                    />
                    <select
                    name="categoryId"
                    value={editJob.categoryId}
                    onChange={(e) => setEditJob({ ...editJob, categoryId: parseInt(e.target.value) })}
                    className="border p-2 rounded"
                    >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.name}
                        </option>
                    ))}
                    </select>
                    <textarea
                    name="description"
                    value={editJob.description}
                    onChange={(e) => setEditJob({ ...editJob, description: e.target.value })}
                    className="border p-2 rounded"
                    required
                    />
                    <input
                    name="locationString"
                    value={editJob.locationString}
                    onChange={(e) => setEditJob({ ...editJob, locationString: e.target.value })}
                    className="border p-2 rounded"
                    />
                    <select
                    name="workTypeId"
                    value={editJob.workTypeId}
                    onChange={(e) => setEditJob({ ...editJob, workTypeId: parseInt(e.target.value) })}
                    className="border p-2 rounded"
                    >
                    <option value={1}>دوام كامل</option>
                    <option value={2}>دوام جزئي</option>
                    <option value={3}>عن بعد</option>
                    </select>
                    <div className="flex gap-2">
                    <input
                        name="minSalary"
                        type="number"
                        value={editJob.minSalary}
                        onChange={(e) => setEditJob({ ...editJob, minSalary: parseInt(e.target.value) })}
                        className="border p-2 rounded w-1/2"
                    />
                    <input
                        name="maxSalary"
                        type="number"
                        value={editJob.maxSalary}
                        onChange={(e) => setEditJob({ ...editJob, maxSalary: parseInt(e.target.value) })}
                        className="border p-2 rounded w-1/2"
                    />

                    {/* latitude */}
                        <input
                        type="number"
                        step="0.01"
                        name="latitude"
                        value={editJob.latitude}
                        onChange={(e) =>
                            setEditJob({ ...editJob, [e.target.name]: parseFloat(e.target.value) })
                        }
                        placeholder="Latitude"
                        />

                        {/* longitude */}
                        <input
                        type="number"
                        step="0.01"
                        name="longitude"
                        value={editJob.longitude}
                        onChange={(e) =>
                            setEditJob({ ...editJob, [e.target.name]: parseFloat(e.target.value) })
                        }
                        placeholder="Longitude"
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="bg-gray-300 px-4 py-2 rounded"
                    >
                        إلغاء
                    </button>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        حفظ التعديلات
                    </button>
                    </div>
                </form>
                </div>
            </div>
            )}
        </div>

        <div style={{ marginTop: "100px"}} className="flex-3 flex flex-col gap-[60px] pt-[70px]">
            <h2 className="mb-[40px] font-medium text-[32px] text-[#2D9CDB]">الوظائف النشطه:</h2>
            <div  style={{display:"flex", flexWrap:"wrap"}}>
            {dashboardData.map((active_job) => (
                <div
                key={active_job.id}
                className="flex gap-[57px] items-center py-[30px] pr-[24px]"
                >
                <div style={{display:"flex"}} className="job flex gap-[30px] items-center border border-[#A6A6A6] py-[33px] px-[26px] rounded-[20px]">
                    <div className="job_info flex-col gap-[29px]">
                    <h3 className="job_name font-medium text-[#2D9CDB] text-[24px] mb-[30px]">
                        {active_job.title}
                    </h3>
                    <div className="job_description flex flex-col gap-[20px]">
                        <span className="text-[#ACACAC] font-medium text-[18px]">
                        تاريخ النشر:{" "}
                        {new Date(active_job.createdAt).toLocaleDateString("ar-EG")}
                        </span>
                        <span className="text-[#ACACAC] font-medium text-[18px]">
                        الموقع:{active_job.locationString}
                        </span>
                        <span className="text-[#ACACAC] font-medium text-[18px]">
                        نوع الوظيفه:{" "}
                        {active_job.workTypeId === 1
                            ? "كامل"
                            : active_job.workTypeId === 2
                            ? "جزئي"
                            : active_job.workTypeId === 3
                            ? "عن بعد"
                            : "غير محدد"}
                        </span>
                        <span className="text-[#ACACAC] font-medium text-[18px]">
                        اقل راتب: {active_job.minSalary}
                        </span>
                        <span className="text-[#ACACAC] font-medium text-[18px]">
                        اعلي راتب: {active_job.maxSalary}
                        </span>
                    </div>
                    </div>
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}} className="job_Stats flex flex-col gap-[50px] items-end">
                        <div onClick={() => navigate(`/applicants/${active_job.id}`, { state: { applications: active_job.applications } })} style={{ cursor:"pointer",width:"200px", backgroundColor:"#FFDADA",padding: "20px 40px",display:"flex", alignItems:"center", flexDirection:"column", borderRadius:"7px" }} className="options flex items-center gap-[20px] w-full">
                            <h2>{active_job.applicantsCount}</h2>
                            <h4>عدد المقبولين </h4>
                        </div>
                        <div className="options flex items-center gap-[20px] w-full">
                            <button
                            onClick={() => handleEditClick(active_job.id,active_job)}
                            className="rounded-[10px] py-[9px] px-[24px] bg-[white] border border-[#2D9CDB94] text-[18px] font-medium text-[#2D9CDB94] cursor-pointer"
                            >
                            تعديل الوظيفه
                            </button>
                            <button
                            onClick={() => handleDeleteJob(active_job.id)}
                            className="rounded-[10px] py-[9px] px-[24px] bg-[white] border border-[#2D9CDB94] text-[18px] font-medium text-[#2D9CDB94] cursor-pointer"
                            >
                            حذف الوظيفه
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </>
    );
    };

    export default MainEmployer;