import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultEditor from "react-simple-wysiwyg";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  slug: Yup.string().required("Slug is required"),
  metaTitle: Yup.string().required("Meta title is required"),
  metaDescription: Yup.string().required("Meta description is required"),
  title: Yup.string().required("Title is required"),
  shortDescription: Yup.string().required("Short description is required"),
  keywords: Yup.string().required("Keywords are required"),
  tags: Yup.string().required("Tags are required"),
  categories: Yup.array().min(1, "At least one category must be selected"),
  description: Yup.string().required("Detailed description is required"),
  blogThumbnail: Yup.string().required("Blog thumbnail is required"),
  blogImage: Yup.string().required("Blog image is required"),
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
  textarea: {
    width: "100%",
    padding: "0.5rem 0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
    minHeight: "100px",
  },
  error: {
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "4px",
  },
  filePreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "10px",
    marginBottom: "10px",
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
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

const getAllCategories = async () => {
  const res = await apiRequestHandler({
    endPoint: "getAdminCategory",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  const formattedCategories = res?.data?.map((category) => ({
    value: category._id,
    label: category.name,
  }));
  return formattedCategories;
};

const AddBlogForm = () => { 
  const { state } = useLocation(); 
  const blog = state?.blog;
  const mode = state?.mode || "add";
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    getAllCategories().then((res) => setCategoryOptions(res || []));
  }, []);

  const handleImageUpload = async (e, setFieldValue, fieldName) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await apiRequestHandler({
          method: "POST",
          endPoint: "uploadFile",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.data?.url) {
          setFieldValue(fieldName, response.data.url);
        }
      } catch (err) {
        console.error(`❌ Upload error for ${fieldName}:`, err);
        toast.error(`Failed to upload ${fieldName}`);
      }
    }
    e.target.value = null;
  };

  const handleRemoveImage = (setFieldValue, fieldName) => {
    setFieldValue(fieldName, "");
  };

  const handleSubmit = async (values, { resetForm }) => {

    try {
      setLoading(true)
      const res = await apiRequestHandler({
        method: "POST",
        endPoint: "addBlog",
        data: {
          ...values,
          blogId: blog?._id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin/blog-list");
      } else {
        toast.error(res?.message|| "Something went wrong");
      }
      resetForm();
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)

    }
    finally {
      setLoading(false)
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
            {isViewMode
              ? "View Blog"
              : isEditMode
                ? "Edit Blog"
                : "Add New Blog"}
          </h3>
          <div style={{ width: "60px" }} />
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            slug: blog?.slug || "",
            metaTitle: blog?.metaTitle || "",
            metaDescription: blog?.metaDescription || "",
            title: blog?.title || "",
            shortDescription: blog?.shortDescription || "",
            keywords: blog?.keywords || "",
            tags: blog?.tags || "",
            categories:
              blog?.category?.map((category) => ({
                value: category._id,
                label: category.name,
              })) || [],
            description: blog?.description || "",
            blogThumbnail: blog?.blogThumbnail || "",
            blogImage: blog?.blogImage || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors }) => (
            <Form>
              <div className="row g-3">
                <label style={styles.label}>Meta Data</label>
                <div className="col-md-6">
                  <label style={styles.label}>Slug</label>
                  <Field
                    name="slug"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="slug" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Meta Title</label>
                  <Field
                    name="metaTitle"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="metaTitle" />
                  </div>
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Meta Description</label>
                  <Field
                    name="metaDescription"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="metaDescription" />
                  </div>
                </div>
                <div className="col-md-6"></div>

                <div className="col-md-6">
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
                  <label style={styles.label}>Short Description</label>
                  <Field
                    as="textarea"
                    name="shortDescription"
                    style={styles.textarea}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="shortDescription" />
                  </div>
                </div>

                {!isViewMode && (
                  <>
                    <div className="col-md-6">
                      <label style={styles.label}>Blog Thumbnail</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, setFieldValue, "blogThumbnail")
                        }
                        style={styles.input}
                      />
                      {values.blogThumbnail && (
                        <div className="mt-2 position-relative">
                          <img
                            src={values.blogThumbnail}
                            alt="Thumbnail Preview"
                            style={styles.filePreview}
                          />
                          <span
                            style={styles.removeIcon}
                            onClick={() =>
                              handleRemoveImage(setFieldValue, "blogThumbnail")
                            }
                          >
                            ✖
                          </span>
                        </div>
                      )}
                      <div style={styles.error}>
                        <ErrorMessage name="blogThumbnail" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label style={styles.label}>Blog Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, setFieldValue, "blogImage")
                        }
                        style={styles.input}
                      />
                      {values.blogImage && (
                        <div className="mt-2 position-relative">
                          <img
                            src={values.blogImage}
                            alt="Blog Image Preview"
                            style={styles.filePreview}
                          />
                          <span
                            style={styles.removeIcon}
                            onClick={() =>
                              handleRemoveImage(setFieldValue, "blogImage")
                            }
                          >
                            ✖
                          </span>
                        </div>
                      )}
                      <div style={styles.error}>
                        <ErrorMessage name="blogImage" />
                      </div>
                    </div>
                  </>
                )}

                {isViewMode && values.blogThumbnail && (
                  <div className="col-md-6">
                    <label style={styles.label}>Blog Thumbnail</label>
                    <img
                      src={values.blogThumbnail}
                      alt="Thumbnail Preview"
                      style={styles.filePreview}
                    />
                  </div>
                )}

                {isViewMode && values.blogImage && (
                  <div className="col-md-6">
                    <label style={styles.label}>Blog Image</label>
                    <img
                      src={values.blogImage}
                      alt="Blog Image Preview"
                      style={styles.filePreview}
                    />
                  </div>
                )}

                <div className="col-md-6">
                  <label style={styles.label}>Keywords (comma separated)</label>
                  <Field
                    name="keywords"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="keywords" />
                  </div>
                </div>

                <div className="col-md-6">
                  <label style={styles.label}>Tags (comma separated)</label>
                  <Field
                    name="tags"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="tags" />
                  </div>
                </div>

                <div className="col-12">
                  <label style={styles.label}>Detailed Description</label>
                  <DefaultEditor
                    value={values?.description}
                    onChange={(e) => {
                      setFieldValue("description", e.target.value);
                      console.log(errors);
                    }}
                    disabled={isViewMode}
                    className="summernote"
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="description" />
                  </div>
                </div>

                <div className="col-md-6">
                  <label style={styles.label}>Categories</label>
                  <Select
                    isMulti
                    name="categories"
                    options={categoryOptions}
                    value={values.categories}
                    isDisabled={isViewMode}
                    onChange={(selected) =>
                      setFieldValue("categories", selected)
                    }
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="categories" />
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
                        isEditMode ? "Update Blog" : "Submit Blog"
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

export default AddBlogForm;