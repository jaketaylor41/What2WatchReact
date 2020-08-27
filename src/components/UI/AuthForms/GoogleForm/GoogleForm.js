// import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import config from '../../../../config';

// const googleForm = () => {

//     const {clientId} = config.googleClient;
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [url, setUrl] = useState("");

//     const responseGoogle = (response) => {
//         setName(response.profileObj.name);
//         setEmail(response.profileObj.email);
//         setUrl(response.profileObj.imageUrl);
//     };


//     return (
//         <GoogleLogin
//             clientId={clientId}
//             buttonText="Sign In "
//             onSuccess={responseGoogle}
//             onFailure={responseGoogle}
//             cookiePolicy={'single_host_origin'}

//         />
//     );

// };



// export default googleForm;