"use client";

import React, { useState } from 'react';

const VerificationForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем данные на сервер
      const response = await axios.post('/api/users/verify', formData);

      // В случае успешного ответа, можно выполнить соответствующие действия
      console.log('Успешная верификация:', response.data);

      // код для перенаправления пользователя или отображения успеха
    } catch (error) {
      // В случае ошибки, обработайте её
      console.error('Ошибка верификации:', error);

      // код для ошибки или выполнения других действий
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-400 w-1/5">
        <h1 className="text-xl font-bold my-4 text-center">Verify your account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Code"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Password"
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Confirm Password"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full bg-blue-400 text-gray font-bold cursor-pointer px-6 py-2"
            >
              Verify
            </button>
            
          </div>
          <div className="flex justify-between p-3">
              <button className="text-blue-400 cursor-pointer">Sign In</button>
              <button className="text-blue-400 cursor-pointer">Sign Up</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationForm;