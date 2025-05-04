// File: dcmsweb/src/utils/logger.js

const getTodayKey = () => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return `log_${today}`;
  };
  
  export const logError = (message, data = null) => {
    const key = getTodayKey();
    const logs = JSON.parse(localStorage.getItem(key)) || [];
  
    const entry = {
      type: 'error',
      message,
      data,
      time: new Date().toISOString(),
    };
  
    logs.push(entry);
    localStorage.setItem(key, JSON.stringify(logs));
  
    console.error(`[ERROR] ${message}`, data);
  };
  
  export const logInfo = (message, data = null) => {
    const key = getTodayKey();
    const logs = JSON.parse(localStorage.getItem(key)) || [];
  
    const entry = {
      type: 'info',
      message,
      data,
      time: new Date().toISOString(),
    };
  
    logs.push(entry);
    localStorage.setItem(key, JSON.stringify(logs));
  
    console.log(`[INFO] ${message}`, data);
  };
  
  export const getTodayLogs = () => {
    const key = getTodayKey();
    return JSON.parse(localStorage.getItem(key)) || [];
  };
  