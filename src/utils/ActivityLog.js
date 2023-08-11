import Vue from "vue";
import axios from "axios";
import {appSettings} from "../appsettings";

export const eventBus = new Vue();
export default {
  async trackActivity(company, user, description) {
    const activity = {
      company_active: company,
      user: user,
      description: description,
      timestamp: new Date(),
    };


    try {
      const response = await axios.post(`${appSettings.$api_url}/api/Activity/save`, activity);
      const savedActivity = response.data;

    } catch (error) {
      console.error(error);
    }
  },

};
