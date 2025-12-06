import axios from 'axios';
import React from 'react';

const axiosInstace = axios.create(
   {
     baseURL: 'http://localhost:3000'
   }
)

const useAxiosPublic = () => {
    return axiosInstace;
};

export default useAxiosPublic;