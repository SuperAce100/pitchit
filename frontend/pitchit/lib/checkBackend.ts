/**
 * Checks if the backend server is running and accessible
 * @returns Promise that resolves to true if the server is running, false otherwise
 */
export async function checkBackendServer(): Promise<boolean> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error checking backend server:', error);
    return false;
  }
} 