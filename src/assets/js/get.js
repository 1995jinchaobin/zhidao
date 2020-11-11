import axios from "axios";
function get(obj){
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    if(!userId){
        userId = 0;
    };
    if(!token){
        token = '';
    }
    const url = obj.url
    const params = {
        token:token,
        userId:userId,
        ...obj
    }
    return new Promise((resolve,reject) =>{
        // console.log(params)
        // console.log(url)
        axios.get(url,{params:params}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}
export default get;