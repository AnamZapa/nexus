import StudentSidebar from "../../components/student/StudentSidebar";
import "../../styles/studentLayout.css";

export default function StudentLayout({ children }) {
  return (
    <div className="student-layout">

      <StudentSidebar />

      <main className="student-content">
        {children}
      </main>

    </div>
  );
}