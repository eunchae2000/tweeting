import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  // children 속성으로 React.ReactNode를 가장 많이 사용
  // ReactNode 타입은 string, number, null, undefined 등을 포함하는 가장 넓은 범위를 가짐
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  if (user === null) {
    return <Navigate to="/login" />;
  }
  return children;
}
