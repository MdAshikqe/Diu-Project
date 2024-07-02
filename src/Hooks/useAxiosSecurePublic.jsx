import axios from 'axios';

const axiosSecurePublic=axios.create({
    baseURL:'https://diu-project-server.vercel.app',

})
const useAxiosSecurePublic = () => {
    return axiosSecurePublic;
};

export default useAxiosSecurePublic;