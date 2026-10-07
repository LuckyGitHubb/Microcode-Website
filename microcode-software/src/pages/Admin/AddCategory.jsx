import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  title: Yup.string().required("Category title is required"),
});
const AddCategoryForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category;
  
  const mode = state?.mode || "add";
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";

  const handleSubmit = async (values, { resetForm }) => {
    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "addCategory",
      data: { name: values?.title, categoryId: category?._id },
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res?.success) {
      resetForm();
      toast.success(res.message);
      navigate("/admin/category-list");
    } else {
      toast.error(res.message || "Something went wrong");
    }
  };

  return (
    <div
      className="container my-5 p-4 bg-light rounded shadow"
      style={{ maxWidth: "600px" }}
    >
      {/* Top Bar with Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div
          onClick={() => navigate(-1)}
          style={{
            padding: "6px 12px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back
        </div>
        <h4 className="m-0 text-center" style={{ flex: 1 }}>
          {isViewMode
            ? "View Category"
            : isEditMode
            ? "Edit Category"
            : "Add Category"}
        </h4>
        <div style={{ width: "60px" }} />{" "}
        {/* Empty div to balance the layout */}
      </div>

      <Formik
        enableReinitialize
        initialValues={{
          title: category?.name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Category Title</label>
              <Field
                name="title"
                className="form-control"
                readOnly={isViewMode}
              />
              <div className="text-danger small">
                <ErrorMessage name="title" />
              </div>
            </div>

            {!isViewMode && (
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#333",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  {isEditMode ? "Update Category" : "Submit Category"}
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategoryForm;
