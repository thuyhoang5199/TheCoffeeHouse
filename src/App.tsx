import React from 'react';
import './App.css';
import { Router } from './routers/index';
import { SWRConfig } from 'swr';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className='App'>
      <SWRConfig value={{ errorRetryCount: 2, revalidateOnFocus: false }}>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </SWRConfig>

      {/* <MenuNews /> */}
    </div>
  );
}

export default App;

// const App: React.FunctionComponent = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<HomePage />} />
//         <Route path='blogs' element={<BlogsPage />} />
//         <Route path='store' element={<StorePage />} />
//         <Route path='product-listing' element={<ProductListingPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
