import axios from 'axios';
import React from 'react';

const axiosInstace = axios.create(
   {
     baseURL: 'https://clubsphere-server-ruby.vercel.app'
   }
)

const useAxiosPublic = () => {
    return axiosInstace;
};

export default useAxiosPublic;