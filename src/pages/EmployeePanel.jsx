import React from "react";
import Navbar from "../components/Navbar";
import TaskCounts from "../components/TaskCounts";
import MyTasks from "../components/MyTasks";
import ProfileCard from "../components/ProfileCard";

const EmployeePanel = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Task Counts Section */}
      <section className="mt-4">
        <TaskCounts />
      </section>

      {/* Profile Section */}
      <section className="mt-6 px-4">
        <ProfileCard />
      </section>

      {/* My Tasks */}
      <section className="mt-6 px-4">
        <MyTasks />
      </section>
    </div>
  );
};

export default EmployeePanel;
