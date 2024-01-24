// import React from 'react'
// import WordGenerator from '../WordGenerator/WordGenerator'
// import './Home.css';
// // import word from "./word.png"
// const Home = ({ isAuthenticated }) => {
    
    
//   return (
//       <div className='home'>
//           {
//         !isAuthenticated ?
//            <h1 >Login to create Project</h1> : <>
//                   <WordGenerator/>
              
              
//               </>
//           }
          
          

//     </div>
//   )
// }

// export default Home


import React from 'react';
import WordGenerator from '../WordGenerator/WordGenerator';
import './Home.css';
import word from "./word.png";

const Home = ({ isAuthenticated }) => {
  return (
    <div className='home'>
      {!isAuthenticated ? (
        <>
          <img src={word} alt="" />
          <h1>Login to create Project</h1>
        </>
      ) : (
        <WordGenerator />
      )}
    </div>
  );
}

export default Home;
