import axios from "axios";
export const baseUrl = "http://localhost:8080/api/customers";

export const addCustomer = async (body) => {
  try {
    const data = await axios.post(`${baseUrl}/add`, body);
    if (data.status !== 201) {
      return { error: true, message: data.data.message,status:data.status };
    } else {
      return { error: false, message: "Success", data: data.data ,status:data.status };
    }
  } catch (error) {
    return { error: true, message: error.response.data.message, status:500};
  }
};

export const getAllCustomer = async () => {
    try {
      const data = await axios.get(`${baseUrl}` );
      if (data.status !== 200) {
        return { error: true, message: data.data.message,status:data.status };
      } else {
        return { error: false, message: "Success", data: data.data ,status:data.status };
      }
    } catch (error) {
      return { error: true, message: error.response.data.message, status:500};
    }
  };
export const getCustomerById = async (id) => {
    try {
      const data = await axios.get(`${baseUrl}/get/${id}`);
      if (data.status !== 200) {
        return { error: true, message: data.data.message,status:data.status };
      } else {
        return { error: false, message: "Success", data: data.data ,status:data.status };
      }
    } catch (error) {
      return { error: true, message: error.response.data.message, status:500};
    }
  };


export const updateCustomer = async (id, body) => {
    try {
      const data = await axios.put(`${baseUrl}/update/${id}`, body);
      if (data.status !== 200) {
        return { error: true, message: data.data.message,status:data.status };
      } else {
        return { error: false, message: "Success", data: data.data ,status:data.status };
      }
    } catch (error) {
      return { error: true, message: error.response.data.message, status:500};
    }
  };
  

export const deleteCustomer = async (id) => {
    try {
      const data = await axios.delete(`${baseUrl}/delete/${id}`);
      if (data.status !== 200) {
        return { error: true, message: data.data.message,status:data.status };
      } else {
        return { error: false, message: "Success", data: data.data ,status:data.status };
      }
    } catch (error) {
      return { error: true, message: error.response.data.message, status:500};
    }
  };
  