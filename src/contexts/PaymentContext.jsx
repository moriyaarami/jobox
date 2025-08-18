import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'credit_card',
      brand: 'visa',
      last4: '4532',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
      holderName: 'John Doe'
    },
    {
      id: '2',
      type: 'bank_account',
      bank: 'בנק הפועלים',
      last4: '1234',
      accountType: 'checking',
      isDefault: false,
      holderName: 'John Doe'
    }
  ]);

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      candidateName: 'מועמד א׳',
      position: 'Senior Full Stack Developer',
      hireDate: '2024-08-15',
      amount: 3000,
      commission: 10,
      status: 'paid',
      paidDate: '2024-08-20',
      dueDate: '2024-08-25'
    },
    {
      id: 'INV-002',
      candidateName: 'מועמד ב׳',
      position: 'UX/UI Designer',
      hireDate: '2024-08-10',
      amount: 2500,
      commission: 10,
      status: 'pending',
      dueDate: '2024-08-25'
    },
    {
      id: 'INV-003',
      candidateName: 'מועמד ג׳',
      position: 'Project Manager',
      hireDate: '2024-08-05',
      amount: 3500,
      commission: 10,
      status: 'overdue',
      dueDate: '2024-08-20'
    }
  ]);

  const [stats, setStats] = useState({
    totalRevenue: 45000,
    successfulHires: 18,
    pendingPayments: 3,
    averageCommission: 2500
  });

  const addPaymentMethod = async (paymentData) => {
    try {
      // Mock payment method addition
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newPaymentMethod = {
        id: Date.now().toString(),
        ...paymentData,
        isDefault: paymentMethods.length === 0
      };
      
      setPaymentMethods(prev => [...prev, newPaymentMethod]);
      
      return { success: true, paymentMethod: newPaymentMethod };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removePaymentMethod = async (paymentMethodId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPaymentMethods(prev => prev.filter(pm => pm.id !== paymentMethodId));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const setDefaultPaymentMethod = async (paymentMethodId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPaymentMethods(prev => prev.map(pm => ({
        ...pm,
        isDefault: pm.id === paymentMethodId
      })));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const processPayment = async (invoiceId, paymentMethodId) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setInvoices(prev => prev.map(invoice => 
        invoice.id === invoiceId 
          ? { ...invoice, status: 'paid', paidDate: new Date().toISOString().split('T')[0] }
          : invoice
      ));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const createInvoice = async (hireData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newInvoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        candidateName: hireData.candidateName,
        position: hireData.position,
        hireDate: hireData.hireDate || new Date().toISOString().split('T')[0],
        amount: hireData.amount,
        commission: 10, // 10% commission
        status: 'pending',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
      };
      
      setInvoices(prev => [newInvoice, ...prev]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        successfulHires: prev.successfulHires + 1,
        pendingPayments: prev.pendingPayments + 1
      }));
      
      return { success: true, invoice: newInvoice };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getCommissionInfo = () => {
    return {
      rate: 10, // 10%
      description: 'מודל העמלות שלנו',
      terms: [
        '10% מהשכר החודשי הראשון',
        'תשלום רק בגיוס מוצלח',
        'ללא עלויות נסתרות',
        'תנאי תשלום: 30 יום'
      ],
      paymentTerms: 30 // days
    };
  };

  const exportReport = async (period = 'monthly') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock report generation
      const report = {
        period,
        generatedAt: new Date().toISOString(),
        totalInvoices: invoices.length,
        totalRevenue: stats.totalRevenue,
        paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
        pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
        overdueInvoices: invoices.filter(inv => inv.status === 'overdue').length
      };
      
      return { success: true, report };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    paymentMethods,
    invoices,
    stats,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    processPayment,
    createInvoice,
    getCommissionInfo,
    exportReport,
    // Computed values
    totalRevenue: stats.totalRevenue,
    pendingAmount: invoices
      .filter(inv => inv.status === 'pending')
      .reduce((sum, inv) => sum + inv.amount, 0),
    overdueAmount: invoices
      .filter(inv => inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.amount, 0)
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;

