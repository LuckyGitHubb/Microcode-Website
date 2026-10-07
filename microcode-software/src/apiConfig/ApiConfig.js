export const url = "https://microcode-website.onrender.com";
// export const url = "https://www.ns6.microcodepgmt.com";

const ApiConfig = {
  adminLogin: `${url}/auth/admin-login`,
  getProfile: `${url}/auth/getProfile`,
  uploadFile: `${url}/auth/uploadFile`,
  addBlog: `${url}/blog/create`,
  getBlog: `${url}/blog/get`,
  getAdminCategory: `${url}/category/get`,
  addCategory: `${url}/category/create`,
  createCashfreeOrder: `${url}/payment/createCashfreeOrder`,
  addService: `${url}/service/createUpdate`,
  getServices: `${url}/service/getAll`,
  getDashboardDataApi: `${url}/dashboard/get`,
  getContactFormData: `${url}/contact/getAll`,
  getAllTransectionData: `${url}/payment/getAllTransactions`,
  getServiceBySlug: (slug) => `${url}/service/${slug}`,

  // ✅ SubAdmin APIs
  createSubAdmin: `${url}/subadmin/create`,
  editSubAdmin: (id) => `${url}/subadmin/edit/${id}`,
  deleteSubAdmin: (id) => `${url}/subadmin/delete/${id}`,
  getAllSubAdmins: `${url}/subadmin/all`,
  getSubAdminById: (id) => `${url}/subadmin/${id}`,
  userLogin: `${url}/auth/user-login`,
  registerUser: `${url}/auth/registerUser`,
  sendOtpToEmailUser: `${url}/auth/sendOtpToEmailUser`,
  verifyOtp: `${url}/auth/verifyOtp`,
  resetPassword: `${url}/auth/resetPassword`,
  getBlogBySlug: (slug) => `${url}/blog/${slug}`,
  getCategories: `${url}/category/getCategories`,
  searchBlogs: `${url}/blog/searchBlogs`,
  getByType:(type)=> `${url}/staticContent/${type}`,

  //Career
  addCareer:`${url}/career/post`,
  allCareer:`${url}/career/getAll`
};

export default ApiConfig;
