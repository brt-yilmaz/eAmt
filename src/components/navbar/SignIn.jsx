import React, { useState } from 'react';
import SignUp from './SignUp.client';

function Button() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <div>
      <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => setShowRegistrationForm(!showRegistrationForm)}>
        {showRegistrationForm ? 'Schließen' : 'Anmelden'}
      </button>

      {showRegistrationForm && <SignUp setShowRegistrationForm={setShowRegistrationForm} />}
    </div>
  );
}

export default Button;