import { supabase } from './supabaseClient';

// Helper for handling Supabase errors
const handleSupaError = (error) => {
  if (error) {
    console.error('Supabase Error:', error);
    throw error;
  }
};

// User endpoints (Example migration)
export const userAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('users').select('*');
    handleSupaError(error);
    return data;
  },
  getById: async (id) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    handleSupaError(error);
    return data;
  },
  create: async (payload) => {
    const { data, error } = await supabase.from('users').insert(payload).select().single();
    handleSupaError(error);
    return data;
  },
  update: async (id, payload) => {
    const { data, error } = await supabase.from('users').update(payload).eq('id', id).select().single();
    handleSupaError(error);
    return data;
  },
  delete: async (id) => {
    const { data, error } = await supabase.from('users').delete().eq('id', id);
    handleSupaError(error);
    return data;
  },
  // Supabase Auth Login Example
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    handleSupaError(error);
    return data;
  },
  getDrivers: async () => {
    const { data, error } = await supabase.from('users').select('*').eq('role', 'driver');
    handleSupaError(error);
    return data;
  }
};

// Truck endpoints (Example migration)
export const truckAPI = {
  getAll: async () => {
    const { data, error } = await supabase.from('trucks').select('*');
    handleSupaError(error);
    return data;
  },
  getById: async (id) => {
    const { data, error } = await supabase.from('trucks').select('*').eq('id', id).single();
    handleSupaError(error);
    return data;
  },
  getByStatus: async (status) => {
    const { data, error } = await supabase.from('trucks').select('*').eq('status', status);
    handleSupaError(error);
    return data;
  },
  // You would continue mapping the rest of the endpoints here similarly.
};

// Default export if needed
export default supabase;
