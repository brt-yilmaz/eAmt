'use client';
import { useUser } from "@/services/useUser";

function ProfilePage() {
  const { user } = useUser();

  return (
    <div className="min-h-[67vh]">
      <h1>Profile Page</h1>
      <pre>{user ? user.name : 'User not found'}</pre>
    </div>
  );
}

export default ProfilePage;
