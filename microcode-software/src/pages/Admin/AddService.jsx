import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultEditor from "react-simple-wysiwyg";
import { apiRequestHandler } from "../../apiConfig/service";
import { toast } from "react-toastify";
import { useEffect } from "react";
const validationSchema = Yup.object({
  slug: Yup.string().required("Slug is required"),
  serviceName: Yup.string().required("Service name is required"),
  metaTitle: Yup.string().required("Meta title is required"),
  metaDescription: Yup.string().required("Meta description is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  keywords: Yup.string().required("Keywords are required"),
  whyChooseUs: Yup.object({
    title: Yup.string().required("Why Choose Us title is required"),
    description: Yup.string().required("Why Choose Us description is required"),
  }),
  featureSection: Yup.object({
    description: Yup.string().required(
      "Feature section description is required"
    ),
    features: Yup.array().of(
      Yup.string()
        .required("At least one feature is required")
        .min(1, "At least one feature is required")
    ),
  }),
  faqSection: Yup.object({
    description: Yup.string().required("FAQ section description is required"),
    questions: Yup.array()
      .of(
        Yup.object({
          question: Yup.string().required("Question is required"),
          answer: Yup.string().required("Answer is required"),
        })
      )
      .min(1, "At least one question is required"),
  }),
});

const styles = {
  formContainer: {
    minHeight: "100vh",
    padding: "20px",
    background: "#f5f7fa",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "1.5rem",
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
  filePreviewContainer: {
    position: "relative",
    display: "inline-block",
    marginTop: "10px",
  },
  filePreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "6px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  removeIcon: {
    position: "absolute",
    top: "-8px",
    right: "2px",
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
    fontWeight: "bold",
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
  arrayBtn: {
    padding: "6px 12px",
    margin: "5px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};

const AddServiceForm = () => {
  const { state } = useLocation();
  const service = state?.service;
  const mode = state?.mode || "add";
  const isViewMode = mode === "view";
  const isEditMode = mode === "edit";
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState("");
  const [whyChooseUsImage, setWhyChooseUsImage] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
  setBannerImage(service?.bannerImage||"")
  setWhyChooseUsImage(service?.whyChooseUs?.image||"")
  },[service])

  const handleImageChange = async (e, setImage) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await apiRequestHandler({
          method: "POST",
          endPoint: "uploadFile",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response?.data?.url) {
          setImage(response.data.url);
        }
      } catch (err) {
        console.error("❌ Upload error:", err);
      }
      e.target.value = null;
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
   try {
    setLoading(true)
     if (bannerImage) {
      values.bannerImage = bannerImage;
    }
    if (whyChooseUsImage) {
      values.whyChooseUs.image = whyChooseUsImage;
    }
    if(service){
      values.servicePageId=service?._id;
    }
    const res = await apiRequestHandler({
      method: "POST",
      endPoint: "addService",
      data: values,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    console.log(res)
    if (res?.success) {
      resetForm();
      setBannerImage("");
      setWhyChooseUsImage("");
      toast.success(res.message);
      navigate("/admin/list-services");
    } else {
      toast.error(res.message || "Something went wrong");
    }
   } catch (error) {
    console.log(error)
    toast.error( "Something went wrong")
   }
   finally{
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
        <div style={styles.header}>
          <div onClick={() => navigate(-1)} style={styles.backBtn}>
            ← Back
          </div>
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              flex: 1,
            }}
          >
            {isViewMode
              ? "View Service"
              : isEditMode
              ? "Edit Service"
              : "Add New Service"}
          </h3>
          <div style={{ width: "60px" }} />
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            slug: service?.slug || "",
            serviceName: service?.serviceName || "",
            metaTitle: service?.metaTitle || "",
            metaDescription: service?.metaDescription || "",
            title: service?.title || "",
            description: service?.description || "",
            keywords: service?.keywords || "",
            whyChooseUs: {
              title: service?.whyChooseUs?.title || "",
              description: service?.whyChooseUs?.description || "",
            },
            featureSection: {
              title:service?.featureSection?.title || "",
              description: service?.featureSection?.description || "",
              features: service?.featureSection?.features || [""],
            },
            faqSection: {
              description: service?.faqSection?.description || "",
              questions: service?.faqSection?.questions || [
                { question: "", answer: "" },
              ],
            },
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="row g-3">
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
                    <ErrorMessage name="metaTitle" />
                  </div>
                </div>
                 <div className="col-md-6">
                  <label style={styles.label}>Service Name</label>
                  <Field
                    name="serviceName"
                    style={styles.input}
                    readOnly={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="serviceName" />
                  </div>
                </div>

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

                {!isViewMode && (
                  <div className="col-md-6">
                    <label style={styles.label}>Banner Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setBannerImage)}
                      style={styles.input}
                    />
                    {bannerImage && (
                      <div style={styles.filePreviewContainer}>
                        <img
                          src={bannerImage}
                          alt="preview"
                          style={styles.filePreview}
                        />
                        <div
                          style={styles.removeIcon}
                          onClick={() => setBannerImage("")}
                        >
                          ×
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="col-12">
                  <label style={styles.label}>Description</label>
                  <DefaultEditor
                    value={values.description}
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    className="summernote"
                    disabled={isViewMode}
                  />
                  <div style={styles.error}>
                    <ErrorMessage name="description" />
                  </div>
                </div>

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

                <div className="col-12">
                  <h4>Why Choose Us Section</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label style={styles.label}>Title</label>
                      <Field
                        name="whyChooseUs.title"
                        style={styles.input}
                        readOnly={isViewMode}
                      />
                      <div style={styles.error}>
                        <ErrorMessage name="whyChooseUs.title" />
                      </div>
                    </div>

                    {!isViewMode && (
                      <div className="col-md-6">
                        <label style={styles.label}>Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageChange(e, setWhyChooseUsImage)
                          }
                          style={styles.input}
                        />
                        {whyChooseUsImage && (
                          <div style={styles.filePreviewContainer}>
                            <img
                              src={whyChooseUsImage}
                              alt="preview"
                              style={styles.filePreview}
                            />
                            <div
                              style={styles.removeIcon}
                              onClick={() => setWhyChooseUsImage("")}
                            >
                              ×
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="col-12">
                      <label style={styles.label}>Description</label>
                      <DefaultEditor
                        value={values.whyChooseUs.description}
                        onChange={(e) =>
                          setFieldValue(
                            "whyChooseUs.description",
                            e.target.value
                          )
                        }
                        className="summernote"
                        disabled={isViewMode}
                      />
                      <div style={styles.error}>
                        <ErrorMessage name="whyChooseUs.description" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <h4>Feature Section</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label style={styles.label}>Title</label>
                      <Field
                        name="featureSection.title"
                        style={styles.input}
                        readOnly={isViewMode}
                      />
                      <div style={styles.error}>
                        <ErrorMessage name="featureSection.title" />
                      </div>
                    </div>
                    <div className="col-12">
                      <label style={styles.label}>Description</label>
                      <DefaultEditor
                        value={values.featureSection.description}
                        onChange={(e) =>
                          setFieldValue(
                            "featureSection.description",
                            e.target.value
                          )
                        }
                        className="summernote"
                        disabled={isViewMode}
                      />
                      <div style={styles.error}>
                        <ErrorMessage name="featureSection.description" />
                      </div>
                    </div>

                    <FieldArray name="featureSection.features">
                      {({ push, remove }) => (
                        <div className="col-12">
                          <label style={styles.label}>Features</label>
                          {values.featureSection.features.map((_, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center mb-2"
                            >
                              <Field
                                name={`featureSection.features[${index}]`}
                                style={{ ...styles.input, marginRight: "10px" }}
                                readOnly={isViewMode}
                              />
                              {!isViewMode && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  style={{
                                    ...styles.arrayBtn,
                                    backgroundColor: "#e74c3c",
                                    color: "#fff",
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          ))}
                          {!isViewMode && (
                            <button
                              type="button"
                              onClick={() => push("")}
                              style={{
                                ...styles.arrayBtn,
                                backgroundColor: "#333",
                                color: "#fff",
                              }}
                            >
                              Add Feature
                            </button>
                          )}
                          <div style={styles.error}>
                            <ErrorMessage name="featureSection.features" />
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                <div className="col-12">
                  <h4>FAQ Section</h4>
                  <div className="row g-3">
                    <div className="col-12">
                      <label style={styles.label}>Description</label>
                      <DefaultEditor
                        value={values.faqSection.description}
                        onChange={(e) =>
                          setFieldValue(
                            "faqSection.description",
                            e.target.value
                          )
                        }
                        className="summernote"
                        disabled={isViewMode}
                      />
                      <div style={styles.error}>
                        <ErrorMessage name="faqSection.description" />
                      </div>
                    </div>

                    <FieldArray name="faqSection.questions">
                      {({ push, remove }) => (
                        <div className="col-12">
                          <label style={styles.label}>Questions</label>
                          {values.faqSection.questions.map((_, index) => (
                            <div
                              key={index}
                              className="mb-3 p-3 border rounded"
                            >
                              <div className="mb-2">
                                <label style={styles.label}>Question</label>
                                <Field
                                  name={`faqSection.questions[${index}].question`}
                                  style={styles.input}
                                  readOnly={isViewMode}
                                />
                                <div style={styles.error}>
                                  <ErrorMessage
                                    name={`faqSection.questions[${index}].question`}
                                  />
                                </div>
                              </div>
                              <div>
                                <label style={styles.label}>Answer</label>
                                <DefaultEditor
                                  value={
                                    values.faqSection.questions[index].answer
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `faqSection.questions[${index}].answer`,
                                      e.target.value
                                    )
                                  }
                                  className="summernote"
                                  disabled={isViewMode}
                                />
                                <div style={styles.error}>
                                  <ErrorMessage
                                    name={`faqSection.questions[${index}].answer`}
                                  />
                                </div>
                              </div>
                              {!isViewMode && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  style={{
                                    ...styles.arrayBtn,
                                    backgroundColor: "#e74c3c",
                                    color: "#fff",
                                    marginTop: "10px",
                                  }}
                                >
                                  Remove FAQ
                                </button>
                              )}
                            </div>
                          ))}
                          {!isViewMode && (
                            <button
                              type="button"
                              onClick={() => push({ question: "", answer: "" })}
                              style={{
                                ...styles.arrayBtn,
                                backgroundColor: "#333",
                                color: "#fff",
                              }}
                            >
                              Add FAQ
                            </button>
                          )}
                          <div style={styles.error}>
                            <ErrorMessage name="faqSection.questions">
                              {(error) =>
                                typeof error === "string"
                                  ? error
                                  : "Please ensure all questions and answers are filled correctly"
                              }
                            </ErrorMessage>
                          </div>{" "}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>

                {!isViewMode && (
                  <div className="col-12 text-center">
                    <button type="submit" style={styles.submitBtn}>
                      {isEditMode ? "Update Service" : "Submit Service"}  
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

export default AddServiceForm;
