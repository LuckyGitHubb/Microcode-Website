import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/DeleteBlogModal";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
import { url } from "../../apiConfig/ApiConfig";
import { formatDate } from "../../utils/formatedDate";
import Loader from "../../components/Loader";

const getAllCategories = async () => {
  const res = await apiRequestHandler({
    endPoint: "getAdminCategory",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res?.data;
};

const CategoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const categoriesPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Start loading
      try {
        const res = await getAllCategories();
        setCategories(res || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
        setCategories([]);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!Array.isArray(categories)) {
      setFilteredCategories([]);
      return;
    }
    if (searchTerm) {
      const filtered =
        categories?.length > 0
          ? categories?.filter((category) =>
              category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : [];
      setFilteredCategories(filtered);
      setCurrentPage(1);
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories?.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const tdStyle = {
    padding: "14px",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    borderBottom: "1px solid #eee",
    borderRight: "1px solid #eee",
  };

  const thStyle = {
    padding: "14px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: "#fff",
    borderBottom: "2px solid #f0f0f0",
    borderRight: "1px solid #eee",
    textAlign: "left",
  };

  const handleCategoryDeleted = async (id) => {
    try {
      setIsLoading(true); // Start loading for delete action
      const res = await apiRequestHandler({
        method: "DELETE",
        endPoint: `${url}/category/${id}`,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res?.success) {
        toast.success(res?.message);
        const updatedCategories = await getAllCategories();
        setCategories(updatedCategories || []);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f7fa" }}>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <h4 style={{ margin: 0 }}>Category Management</h4>
          <button
            onClick={() => navigate("/admin/add-category")}
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
            + Add Category
          </button>
        </div>

        {/* Search Input with Icon */}
        <div
          style={{ position: "relative", width: "250px", marginBottom: "20px" }}
        >
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
            placeholder="Search by title..."
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

        {/* Table or Loader */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div
              style={{
                overflowX: "auto",
                border: "1px solid #ccc",
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  backgroundColor: "#fff",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        ...thStyle,
                        borderLeft: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      Sr No.
                    </th>
                    <th
                      style={{
                        ...thStyle,
                        borderLeft: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      Title
                    </th>
                    <th
                      style={{
                        ...thStyle,
                        borderLeft: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                      }}
                    >
                      Created Date & Time
                    </th>
                    <th
                      style={{
                        ...thStyle,
                        borderLeft: "1px solid #ccc",
                        borderTop: "1px solid #ccc",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories?.length > 0 ? (
                    currentCategories?.map((category, index) => (
                      <tr key={index}>
                        <td style={{ ...tdStyle, borderLeft: "1px solid #ccc" }}>
                          {indexOfFirstCategory + index + 1}
                        </td>
                        <td style={{ ...tdStyle, borderLeft: "1px solid #ccc" }}>
                          {category.name}
                        </td>
                        <td style={{ ...tdStyle, borderLeft: "1px solid #ccc" }}>
                          {formatDate(category.createdAt)}
                        </td>
                        <td
                          style={{
                            ...tdStyle,
                            borderLeft: "1px solid #ccc",
                            borderRight: "1px solid #ccc",
                          }}
                        >
                          <FaEye
                            title="View"
                            style={{
                              color: "#00bfa5",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate("/admin/add-category", {
                                state: { category, mode: "view" },
                              })
                            }
                          />
                          <FaEdit
                            title="Edit"
                            style={{
                              color: "#ff9800",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate("/admin/add-category", {
                                state: { category, mode: "edit" },
                              })
                            }
                          />
                          <FaTrash
                            title="Delete"
                            style={{ color: "#f44336", cursor: "pointer" }}
                            onClick={() => {
                              setCategoryToDelete(category);
                              setShowDeleteModal(true);
                            }}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#888",
                        }}
                      >
                        No Categories Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
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
                  Showing {indexOfFirstCategory + 1} to{" "}
                  {Math.min(indexOfLastCategory, filteredCategories.length)} of{" "}
                  {filteredCategories.length} entries
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
                      backgroundColor:
                        currentPage === i + 1 ? "#00bfa5" : "transparent",
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

        {/* Delete Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            handleCategoryDeleted(categoryToDelete?._id);
            setShowDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default CategoryManagement;