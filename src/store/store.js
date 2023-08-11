import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    eCard:{
      cardFullName: '',
      cardCompanyName: '',
      cardDesignation: '',
      cardEmail: '',
      cardEmailOptional: '',
      cardContactNo: '',
      cardContactNoOptional: '',
      cardAddress: '',
      cardWebsite: '',
      cardComments: '',
      tagArray:[],
      frontImageUrl: '',
      backImageUrl: '',
    },

    company:{
      companyNameS:'',
      headquartersS:'',
      designationS:'',
      contact_nameS:'',
      contact_noS:'',
      contact_emailS:'',
      company_usernameS:'',
      company_passwordS:'',
      company_status:'',
    },

    creator:{
      creator_company_C:'',
      employee_no_C:'',
      designation_C:'',
      creator_nameC:'',
      username_C:'',
      password_C:'',
      contact_no_C:'',
      email_C:'',
      status_C:''
    },

    viewer:{
      viewer_company_C:'',
      employee_no_V:'',
      designation_V:'',
      viewer_name_V:'',
      username_V:'',
      password_V:'',
      contact_no_V:'',
      email_V:'',
      status_V:''
    },

    activity:{
      description_S:'',
      company_S:'',
      user_S:'',
      timeStamp_S:''
    },

    activities: [],

  },

  mutations:{
    // E Card Mutations
    updateFullName(state, fullName){
      state.eCard.cardFullName = fullName
    },
    updateCompanyName(state, companyName){
      state.eCard.cardCompanyName = companyName
    },
    updateDesignation(state, designation){
      state.eCard.cardDesignation = designation
    },
    updateEmail(state, email){
      state.eCard.cardEmail = email
    },
    updateEmailOptional(state, emailOptional){
      state.eCard.cardEmailOptional = emailOptional
    },
    updateContactNo(state, contactNo){
      state.eCard.cardContactNo = contactNo
    },
    updateContactNoOptional(state, contactNoOptional){
      state.eCard.cardContactNoOptional = contactNoOptional
    },
    updateAddress(state, address){
      state.eCard.cardAddress = address
    },
    updateWebsite(state, website){
      state.eCard.cardWebsite = website
    },
    updateComments(state, comments){
      state.eCard.cardComments = comments
    },
    updateTagArray(state, newArray){
      state.eCard.tagArray= newArray
    },

    //E card Images----------------------------------------//
    setFrontImageUrl(state, url) {
      state.eCard.frontImageUrl = url;
    },
    setBackImageUrl(state, url) {
      state.eCard.backImageUrl = url;
    },

    // Company Mutations
    updateCompanyN(state, companyName){
      state.company.companyNameS = companyName
    },
    updateHeadquarters(state, headQ){
      state.company.headquartersS = headQ
    },
    updateDesignationC(state, designationC){
      state.company.designationS = designationC
    },
    updateName(state, con_name){
      state.company.contact_nameS = con_name
    },
    updateContactNoC(state, contactC){
      state.company.contact_noS =contactC
    },
    updateEmailC(state, com_email){
      state.company.contact_emailS = com_email
    },
    updateUsername(state, com_username){
      state.company.company_usernameS = com_username
    },
    updatePassword(state, com_password){
      state.company.company_passwordS = com_password
    },
    updateStatusC(state, status){
      state.company.company_status = status
    },



    // Creator Mutations
    updateCreatorCompany(state, c_company){
      state.creator.creator_company_C = c_company
    },
    updateCreatorEmpNo(state, c_emp_no){
      state.creator.employee_no_C = c_emp_no
    },
    updateCreatorDesignation(state, c_designation){
      state.creator.designation_C = c_designation
    },
    updateCreatorName(state, c_name){
      state.creator.creator_nameC = c_name
    },
    updateCreatorUsername(state, c_username){
      state.creator.username_C = c_username
    },
    updateCreatorPassword(state, c_password){
      state.creator.password_C = c_password
    },
    updateCreatorContactNo(state, c_contact_no){
      state.creator.contact_no_C = c_contact_no
    },
    updateCreatorEmail(state, c_email){
      state.creator.email_C = c_email
    },
    updateCreatorStatus(state, c_status){
      state.creator.status_C = c_status
    },

    //Viewer Mutations
    updateViewerCompany(state, v_company){
      state.viewer.viewer_company_C = v_company
    },
    updateViewerEmpNo(state, v_emp_no){
      state.viewer.employee_no_V = v_emp_no
    },
    updateViewerDesignation(state, v_designation){
      state.viewer.designation_V = v_designation
    },
    updateViewerName(state, v_name){
      state.viewer.creator_nameV = v_name
    },
    updateViewerUsername(state, v_username){
      state.viewer.username_V = v_username
    },
    updateViewerPassword(state, v_password){
      state.viewer.password_V = v_password
    },
    updateViewerContactNo(state, v_contact_no){
      state.viewer.contact_no_V = v_contact_no
    },
    updateViewerEmail(state, v_email){
      state.viewer.email_V = v_email
    },
    updateViewerStatus(state, v_status){
      state.viewer.status_V = v_status
    },

    //Activity Mutations
    updateActivityDes(state, activity_des){
      state.activity.description_S = activity_des
    },
    updateActivityCompany(state, activity_company){
      state.activity.company_S = activity_company
    },
    updateActivityUser(state, activity_user){
      state.activity.user_S = activity_user
    },
    updateActivityTimeStamp(state, activity_time){
      state.activity.timeStamp_S = activity_time
    },
  },

})




