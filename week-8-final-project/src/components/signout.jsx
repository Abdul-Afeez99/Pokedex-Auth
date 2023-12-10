import React from 'react';
import { useAuth } from '../context/authprovider';

function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <button
      type="button"
      onClick={signOut}
      className="fixed top-8 right-8 flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;