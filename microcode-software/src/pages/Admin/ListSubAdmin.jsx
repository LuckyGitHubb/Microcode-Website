import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
import { url } from "../../apiConfig/ApiConfig";
import DeleteModal from "../../components/DeleteBlogModal";
import Loader from "../../components/Loader"; // Import the Loader component
import { formatDate } from "../../utils/formatedDate";

const SubAdminManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subadmins, setSubadmins] = useState([]);
  const [filteredSubadmins, setFilteredSubadmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subadminToDelete, setSubadminToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const subadminsPerPage = 5;

  const fetchSubAdmins = async () => {
    try {
      setIsLoading(true); // Start loading
      const res = await apiRequestHandler({
        endPoint: `${url}/subadmin/all`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res?.success) {
        const sortedData = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubadmins(sortedData);
      } else {
        toast.error(res.message || "Failed to fetch subadmins");
      }
    } catch (err) {
      toast.error("Error while fetching subadmins");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  useEffect(() => {
    const filtered =
      subadmins?.filter(
        (sa) =>
          sa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sa.email.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    setFilteredSubadmins(filtered);
    setCurrentPage(1);
  }, [searchTerm, subadmins]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLast = currentPage * subadminsPerPage;
  const indexOfFirst = indexOfLast - subadminsPerPage;
  const currentSubadmins = filteredSubadmins.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSubadmins.length / subadminsPerPage);

  const tdStyle = {
    padding: "14px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderBottom: "1px solid #eee",
  };

  const thStyle = {
    padding: "14px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: "#fff",
    borderBottom: "2px solid #f0f0f0",
    textAlign: "left",
  };

  const handleDeleteSubadmin = async (id) => {
    try {
      setIsLoading(true); // Start loading for delete action
      const res = await apiRequestHandler({
        method: "DELETE",
        endPoint: `${url}/subadmin/delete/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res?.success) {
        toast.success(res.message);
        fetchSubAdmins();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f7fa" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: 0 }}>SubAdmin Management</h4>
          <button
            onClick={() => navigate("/admin/add-subadmin")}
            style={{
              background: "#00bfa5",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + Add SubAdmin
          </button>
        </div>

        <div style={{ position: "relative", width: "250px", marginBottom: "20px" }}>
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: "10px",
              transform: "translateY(-50%)",
              color: "#888",
              fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 32px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
            }}
          />
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...thStyle, borderRight: "1px solid #eee" }}>Sr No.</th>
                    <th style={{ ...thStyle, borderRight: "1px solid #eee" }}>Name</th>
                    <th style={{ ...thStyle, borderRight: "1px solid #eee" }}>Email</th>
                    <th style={{ ...thStyle, borderRight: "1px solid #eee" }}>Created At</th>
                    <th style={thStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSubadmins.length > 0 ? (
                    currentSubadmins.map((sa, index) => (
                      <tr key={sa._id}>
                        <td style={{ ...tdStyle, borderRight: "1px solid #eee" }}>
                          {indexOfFirst + index + 1}
                        </td>
                        <td style={{ ...tdStyle, borderRight: "1px solid #eee" }}>{sa.name}</td>
                        <td style={{ ...tdStyle, borderRight: "1px solid #eee" }}>{sa.email}</td>
                        <td style={{ ...tdStyle, borderRight: "1px solid #eee" }}>
                          {formatDate(sa.createdAt)}
                        </td>
                        <td style={tdStyle}>
                          <FaEye
                            title="View"
                            style={{ color: "#00bfa5", marginRight: "10px", cursor: "pointer" }}
                            onClick={() =>
                              navigate("/admin/add-subadmin", {
                                state: { subadmin: sa, mode: "view" },
                              })
                            }
                          />
                          <FaEdit
                            title="Edit"
                            style={{ color: "#ff9800", marginRight: "10px", cursor: "pointer" }}
                            onClick={() =>
                              navigate("/admin/add-subadmin", {
                                state: { subadmin: sa, mode: "edit" },
                              })
                            }
                          />
                          <FaTrash
                            title="Delete"
                            style={{ color: "#f44336", cursor: "pointer" }}
                            onClick={() => {
                              setSubadminToDelete(sa);
                              setShowDeleteModal(true);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                        No SubAdmins Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "16px",
                fontSize: "13px",
                color: "#333",
              }}
            >
              <div>
                <strong>
                  Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredSubadmins.length)} of {filteredSubadmins.length} entries
                </strong>
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: currentPage === i + 1 ? "#00bfa5" : "transparent",
                      color: currentPage === i + 1 ? "#fff" : "#333",
                      border: "1px solid #00bfa5",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleDeleteSubadmin(subadminToDelete?._id);
            setShowDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default SubAdminManagement;