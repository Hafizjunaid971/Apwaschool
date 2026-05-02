// Agar Vite use kar rahe ho toh yeh lagao:
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Agar Create React App (CRA) use kar rahe ho toh upar wala hata kar yeh lagao:
// export const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";