import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
import ApiConfig from "../../apiConfig/ApiConfig";

const MODULES = [
  "Blog Management",
  "Service Page",
  "Category Management",
  "Contact Forms",
  "Dashboard Access",
];

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string().when("mode", {
    is: (val) => val !== "edit",
    then: (schema) =>
      schema
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 20 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),

  permissions: Yup.array()
    .of(
      Yup.object().shape({
        moduleName: Yup.string().required(),
        isAllow: Yup.boolean(),
      })
    )
    .test(
      "at-least-one-allowed",
      "At least one module must be allowed",
      (value) => value?.some((perm) => perm.isAllow)
    ),
});

const styles = {
  formContainer: {
    minHeight: "100vh",
    padding: "20px",
    background: "#f5f7fa",
  },
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  label: {
    fontWeight: 700,
    color: "black",
    fontSize: "14px",
    marginBottom: "0.25rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  error: {
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "4px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    background: "#f0f0f0",
    fontWeight: "600",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "14px",
  },
  backBtn: {
    padding: "6px 12px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },
  submitBtn: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

const AddSubAdminForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const subadmin = state?.subadmin || null;
  const mode = state?.mode || "add";
  const isEditMode = mode === "edit";
  const isViewMode = mode === "view";

  const initialPermissions = MODULES.map((moduleName) => {
    const matched = subadmin?.permissions?.find((p) => p.moduleName === moduleName);
    return {
      moduleName,
      isAllow: matched ? matched.isAllow : false,
    };
  });

  const initialValues = {
    name: subadmin?.name || "",
    email: subadmin?.email || "",
    password: "",
    permissions: initialPermissions,
    mode,
  };

const handleSubmit = async (values, { resetForm }) => {
  const payload = {
    name: values.name,
    email: values.email,
    password: values.password,
    permissions: values.permissions,
  };

  const endpoint = isEditMode
    ? ApiConfig.editSubAdmin(subadmin._id)
    : ApiConfig.createSubAdmin;

  const method = isEditMode ? "PUT" : "POST";

  const res = await apiRequestHandler({
    method,
    endPoint: endpoint,
    data: payload,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (res?.success) {
    toast.success(res.message);
    navigate("/admin/list-subadmin");
  } else {
    toast.error(res.message || "Something went wrong");
  }

  resetForm();
};


  return (
    <div style={styles.formContainer}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div onClick={() => navigate(-1)} style={styles.backBtn}>
            ← Back
          </div>
          <h3 style={styles.header}>
            {isViewMode
              ? "View SubAdmin"
              : isEditMode
              ? "Edit SubAdmin"
              : "Add New SubAdmin"}
          </h3>
          <div style={{ width: "60px" }} />
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label style={styles.label}>Name</label>
                  <Field name="name" style={styles.input} readOnly={isViewMode} />
                  <div style={styles.error}>
                    <ErrorMessage name="name" />
                  </div>
                </div>

                <div className="col-md-6">
                  <label style={styles.label}>Email</label>
                  <Field name="email" style={styles.input} readOnly={isViewMode} />
                  <div style={styles.error}>
                    <ErrorMessage name="email" />
                  </div>
                </div>

                {!isViewMode && (
                  <div className="col-md-6">
                    <label style={styles.label}>Password</label>
                    <Field name="password" type="password" style={styles.input} />
                    <div style={styles.error}>
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                )}

                <div className="col-12">
                  <label style={styles.label}>Permissions</label>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Module Name</th>
                        <th style={styles.th}>Allow Access</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.permissions.map((perm, index) => (
                        <tr key={index}>
                          <td style={styles.td}>{perm.moduleName}</td>
                          <td style={styles.td}>
                            <input
                              type="checkbox"
                              disabled={isViewMode}
                              checked={perm.isAllow}
                              onChange={(e) =>
                                setFieldValue(
                                  `permissions[${index}].isAllow`,
                                  e.target.checked
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={styles.error}>
                    <ErrorMessage name="permissions" />
                  </div>
                </div>

                {!isViewMode && (
                  <div className="col-12 text-center">
                    <button type="submit" style={styles.submitBtn}>
                      {isEditMode ? "Update SubAdmin" : "Create SubAdmin"}
                    </button>
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSubAdminForm;
