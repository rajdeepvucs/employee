import React from 'react';
import Header from '../header';
import EmpDataTable from '../empdatatable';
import { Modal } from '../modal';

function Home() {
  return (
    <>
      {/* Header Component */}
      <header>
        <Header />
      </header>

      {/* Main Content Area */}
      <main className='mt-2'> {/* margin-top: 2 units */}
        {/* Add Employee Section */}
        <div className='flex justify-end mr-30'> {/* flex container, justify content to the end, margin-right: 30 units */}
          Add Employee
          <Modal /> {/* Modal Component (likely a button that opens a modal to add employees) */}
        </div>

        {/* Employee Data Table Section */}
        <div className="flex justify-center items-center overflow-x-auto"> {/* flex container, center content horizontally and vertically, allows horizontal scrolling if content overflows */}
          <EmpDataTable /> {/* Employee Data Table Component (displays the employee data) */}
        </div>
      </main>
    </>
  );
}

export default Home;