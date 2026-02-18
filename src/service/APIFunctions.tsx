import axios from 'axios';
import { BaseURL } from '../constants/BaseURL';
import Cookies from 'js-cookie';
import type { MobileAnalysisFormDTO, NameFixingDTO } from './types';


axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorResponse = error.response?.status;
      if ( errorResponse === 401 || errorResponse === 403 ) {
        // Token is invalid or expired
        Cookies.remove('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

/**
 * Logs in a user with the given email and password.
 * 
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} A promise that resolves with the response data.
 */
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BaseURL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const Logout = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await axios.post(`${BaseURL}/auth/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        Cookies.remove('authToken');
        return response.data;
    } catch (error) {
        console.error("Logout failed:", error);
        Cookies.remove('authToken');
        throw error;
    }
}   

export const isAuthenticated = (): boolean => {
    return !!Cookies.get('authToken');
};

export const getAuthHeaders = () => {
    const token = Cookies.get('authToken');
    if (!token) {
        throw new Error('No authentication token found');
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await axios.post(`${BaseURL}/auth/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error("Forgot password failed:", error);
        throw error;
    }
}

export const resetPassword = async (body: {token: string, email: string, password: string, password_confirmation: string}) => {
    try {
        const response = await axios.post(`${BaseURL}/auth/reset-password`, body);
        return response.data;
    } catch (error) {
        console.error("Reset password failed:", error);
        throw error;
    }
}

export const updatePassword = async (body: {current_password: string, new_password: string, new_password_confirmation: string}) => {
    const token = Cookies.get('authToken');
    try {
        const response = await axios.post(`${BaseURL}/auth/update-password`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Change password failed:", error);
        throw error;
    }
}

export const getUserProfile = async () => {
    try {
        const response = await axios.get(`${BaseURL}/auth/user`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Get user profile failed:", error);
        throw error;
    }
}

export const updateUserProfile = async (body : any) => {
    try {
        const response = await axios.post(`${BaseURL}/auth/update-profile`, body, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Update user profile failed:", error);
        throw error;
    }
}
 

export const getNameFixingReport = async (id: number) => {
    try {
        const response = await axios.get(`${BaseURL}/name-fixing/report/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Get name fixing report failed:", error);
        throw error;
    }
}

export const generateReport = async (body: NameFixingDTO) => {
    try {
        const response = await axios.post(`${BaseURL}/name-fixing/store`, body, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Generate report failed:", error);
        throw error;
    }
}
//the below is not real it is just to show
export const generateMobileNumerologyReport = async (body: MobileAnalysisFormDTO) => {
    console.log("Generating mobile numerology report with body:", body);
    return body;
    // try {
    //     const response = await axios.post(`${BaseURL}/mobile-numerology`, body, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     });
    //     return response.data;
    // } catch (error) {
    //     console.error("Generate mobile numerology report failed:", error);
    //     throw error;
    // }
}

export const generateAdvanceMobileNumerologyReport = async (body: MobileAnalysisFormDTO) => {
    try {
        const response = await axios.post(`${BaseURL}/advance-mobile-numerology/store`, body, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Generate advance mobile numerology report failed:", error);
        throw error;
    }
}

export const updateAdvanceMobileNumerologyReport = async (id: number, body: MobileAnalysisFormDTO) => {
    try {
        const response = await axios.put(`${BaseURL}/advance-mobile-numerology/${id}`, body, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Update advance mobile numerology report failed:", error);
        throw error;
    }
}
//just to show will be implemented later
export const updateMobileNumerologyReport = async (id: number, body: MobileAnalysisFormDTO) => {
    const token = Cookies.get('authToken');
    console.log("Updating mobile numerology report with id:", id, "and body:", body);
    return body;
}

export const getMobileNumerologyReportList = async () => {
    try {
        const response = await axios.get(`${BaseURL}/advance-mobile-numerology/list`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Get mobile numerology report failed:", error);
        throw error;
    }
}

export const getAdvanceMobileNumerologyReportData = async (id: number) => {
    try {
        const response = await axios.get(`${BaseURL}/advance-mobile-numerology/${id}/edit`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error(`Get advance mobile numerology report failed:`, error);
        throw error;
    }
}

// vedic switch word APIs
export const getVedicSwitchWordCategories = async () => {
    const token = Cookies.get('authToken');
    try {
        const response = await axios.get(`${BaseURL}/switch-words/categories`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Get vedic switch word categories failed:", error);
        throw error;
    }
}

export const createVedicSwitchWord = async (body) =>{
    const token = Cookies.get('authToken');
    try {
        const response = await axios.post(`${BaseURL}/switch-words`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Create vedic switch word failed:", error);
        throw error;
    }
}

export const getVedicSwitchWordReportData = async (pageNo: number, perPage: number) =>{
    const token = Cookies.get('authToken');
    try {
        const response = await axios.get(`${BaseURL}/switch-words?page=${pageNo}&per_page=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Get vedic switch word report data failed:", error);
        throw error;
    }
}

export const deleteVedicSwitchWordRecord = async (id : number) => {
    const token = Cookies.get('authToken');
    try {
        const response = await axios.delete(`${BaseURL}/switch-words/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Delete vedic switch word failed:", error);
        throw error;
    }
} 


// Crystal Analysis Intermediate

export const createCrystalAnalysisIntermediate = async (body : any) =>{
    try {
        const response = await axios.post(`${BaseURL}/crystals`, body, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        console.error("Create crystal analysis intermediate failed:", error);
        throw error;
    }
}


