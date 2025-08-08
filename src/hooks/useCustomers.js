import { useEffect } from "react";
import { CustomerStore } from "@/stores/crm/domains/CustomerStore";

export const useCustomers = () => {
  const {
    customers,
    customersLoading,
    customersError,
    customersLoaded,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers,
    clearCustomersError,
  } = CustomerStore();

  // Component mount olduğunda müşteri verilerini yükle
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    // Data
    customers,
    loading: customersLoading,
    error: customersError,
    loaded: customersLoaded,

    // Actions
    refresh: refreshCustomers,
    add: addCustomer,
    update: updateCustomer,
    remove: deleteCustomer,
    clearError: clearCustomersError,
  };
};
