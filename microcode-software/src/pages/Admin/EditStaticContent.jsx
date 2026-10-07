import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DefaultEditor from "react-simple-wysiwyg";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
import ApiConfig from "../../apiConfig/ApiConfig";

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
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

const EditStaticContentForm = () => {
    const [staticContent, setStaticContent] = useState({})
    const { state } = useLocation();
    const content = state?.content;
    const mode = state?.mode || "edit";
    const isViewMode = mode === "view";
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getStaticContent = async () => {
        try {
                const res = await apiRequestHandler({ endPoint: ApiConfig.getByType(content?.contentType), method: "GET" })
            if (res?.success) {
                setStaticContent(res?.data || {})
            }
            else {
                toast.error("Somthing went wrong while getting satic content")
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing went wrong while getting satic content")
        }
    }
    useEffect(() => {
        getStaticContent()
    }, [])
    const handleSubmit = async (values, { resetForm }) => {
        try {
            setLoading(true);
            const res = await apiRequestHandler({
                method: "PUT",
              endPoint: ApiConfig.getByType(content?.contentType),
                data: {
                    ...values,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (res?.success) {
                toast.success(res?.message);
                navigate("/admin/list-static-content");
            } else {
                toast.error(res?.message);
            }
            resetForm();
        } catch (error) {
            console.error("Error updating static content:", error);
            toast.error("Failed to update content");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.formContainer}>
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div onClick={() => navigate(-1)} style={styles.backBtn}>
                        ← Back
                    </div>
                    <h3 style={styles.header}>
                        {isViewMode ? "View Static Content" : "Edit Static Content"}
                    </h3>
                    <div style={{ width: "60px" }} />
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        title: staticContent?.title || "",
                        description: staticContent?.description || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label style={styles.label}>Title</label>
                                    <Field
                                        name="title"
                                        style={styles.input}
                                        readOnly={isViewMode}
                                    />
                                    <div style={styles.error}>
                                        <ErrorMessage name="title" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label style={styles.label}>Description</label>
                                    <DefaultEditor
                                        value={values?.description}
                                        onChange={(e) => setFieldValue("description", e.target.value)}
                                        disabled={isViewMode}
                                        className="summernote"
                                    />
                                    <div style={styles.error}>
                                        <ErrorMessage name="description" />
                                    </div>
                                </div>

                                {!isViewMode && (
                                    <div className="col-12 text-center">
                                        <button type="submit" style={styles.submitBtn} disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </>
                                            ) : (
                                                "Update Content"
                                            )}
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

export default EditStaticContentForm;