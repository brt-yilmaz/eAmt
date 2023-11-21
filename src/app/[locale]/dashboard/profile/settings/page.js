'use client';
import { useUser } from "@/services/useUser";

function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="min-h-[67vh]">
      <h1>Settings Page</h1>
      <pre>{user ? user.name : 'User not found'}</pre>
    </div>
  );
}

export default SettingsPage;
