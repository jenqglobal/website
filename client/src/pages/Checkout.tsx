import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Loader2, CreditCard, Shield, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const plans = [
  { name: 'Essential', price: 199, tier: 'Essential', description: 'Complete tech care for businesses ready to establish reliable systems.' },
  { name: 'Growth', price: 399, tier: 'Growth', description: 'Accelerate your business with priority support and development hours.' },
  { name: 'Scale', price: 599, tier: 'Scale', description: 'Full-service tech partnership for enterprises demanding excellence.' }
];

const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'zoom', label: 'Zoom Call' }
];

export default function Checkout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    preferred_contact: 'email',
    notes: ''
  });
  
  const [orderData, setOrderData] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const planParam = searchParams.get('plan');
    if (planParam) {
      const plan = plans.find(p => p.name.toLowerCase() === planParam.toLowerCase());
      if (plan) setSelectedPlan(plan);
    } else {
      setSelectedPlan(plans[1]);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.customer_name.trim()) return 'Please enter your name';
    if (!formData.customer_email.trim()) return 'Please enter your email';
    if (!/\S+@\S+\.\S+/.test(formData.customer_email)) return 'Please enter a valid email';
    if (!formData.customer_phone.trim()) return 'Please enter your phone number';
    if (!formData.preferred_contact) return 'Please select a preferred contact method';
    return null;
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }
    
    setLoading(true);
    setPaymentError('');
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          preferred_contact: formData.preferred_contact,
          plan: `${selectedPlan.name} Plan`,
          plan_price: selectedPlan.price,
          plan_tier: selectedPlan.tier,
          notes: formData.notes
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrderData(data.order);
        setStep(2);
      } else {
        setPaymentError(data.error || 'Failed to create order');
      }
    } catch (err) {
      setPaymentError('Network error. Please try again.');
      console.error('Order creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async () => {
    if (!orderData) return;
    
    setPaymentLoading(true);
    setPaymentError('');
    
    try {
      const response = await fetch('/api/checkout/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.id,
          customerName: formData.customer_name,
          customerEmail: formData.customer_email,
          customerPhone: formData.customer_phone,
          preferredContact: formData.preferred_contact,
          plan: orderData.plan,
          planPrice: orderData.plan_price,
          planTier: orderData.plan_tier
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPaymentError(data.error);
        setPaymentLoading(false);
        return;
      }
      
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: 'JenQ Global Solutions',
        description: `${orderData.plan} - Monthly Subscription`,
        order_id: data.orderId,
        prefill: {
          name: formData.customer_name,
          email: formData.customer_email,
          contact: formData.customer_phone
        },
        theme: {
          color: '#CF142B'
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/checkout/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderData.id
              })
            });
            
            const verifyData = await verifyResponse.json();
            
            if (verifyData.success) {
              setOrderSuccess(true);
              setStep(3);
            } else {
              setPaymentError('Payment verification failed');
            }
          } catch (err) {
            setPaymentError('Payment verification error');
          }
          setPaymentLoading(false);
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          }
        }
      };
      
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (response) => {
          setPaymentError(response.error.description || 'Payment failed');
          setPaymentLoading(false);
        });
        rzp.open();
      } else {
        setPaymentError('Razorpay not loaded. Please refresh the page.');
        setPaymentLoading(false);
      }
    } catch (err) {
      setPaymentError('Failed to initialize payment');
      setPaymentLoading(false);
    }
  };

  const handlePayPalPayment = async () => {
    if (!orderData) return;
    
    setPaymentLoading(true);
    setPaymentError('');
    
    try {
      const response = await fetch('/api/checkout/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.id,
          customerName: formData.customer_name,
          customerEmail: formData.customer_email,
          customerPhone: formData.customer_phone,
          preferredContact: formData.preferred_contact,
          plan: orderData.plan,
          planPrice: orderData.plan_price,
          planTier: orderData.plan_tier
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        setPaymentError(data.error);
        setPaymentLoading(false);
        return;
      }

      if (data.paypalUrl) {
        window.location.href = data.paypalUrl;
      } else {
        setPaymentError('Failed to get PayPal payment URL');
        setPaymentLoading(false);
      }
    } catch (err) {
      setPaymentError('Failed to initialize PayPal');
      setPaymentLoading(false);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment();
    } else {
      handlePayPalPayment();
    }
  };

  return (
    <div className="min-h-screen bg-animated">
      <Header />
      
      <div style={{ paddingTop: 120, paddingBottom: 80, minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-main" style={{ maxWidth: 900 }}>
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
                  Complete Your <span className="text-gradient">Subscription</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                  Fill in your details to get started with your selected plan
                </p>
              </div>

              <div className="glass-card" style={{ padding: 40, maxWidth: 700, margin: '0 auto' }}>
                {selectedPlan && (
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)',
                    border: '1px solid rgba(207,20,43,0.3)',
                    borderRadius: 16,
                    padding: 24,
                    marginBottom: 32
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Selected Plan</span>
                      <span style={{ 
                        background: '#CF142B', 
                        color: 'white', 
                        padding: '4px 12px', 
                        borderRadius: 100, 
                        fontSize: 11, 
                        fontWeight: 700 
                      }}>MOST POPULAR</span>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', marginBottom: 8 }}>
                      {selectedPlan.name} - ${selectedPlan.price}<span style={{ fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>/month</span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>{selectedPlan.description}</p>
                  </div>
                )}

                <form onSubmit={handleSubmitDetails}>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', color: 'white', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(207,20,43,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', color: 'white', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(207,20,43,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', color: 'white', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customer_phone"
                      value={formData.customer_phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(207,20,43,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', color: 'white', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                      Preferred Contact Method *
                    </label>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      {contactMethods.map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, preferred_contact: method.value }))}
                          style={{
                            padding: '12px 20px',
                            background: formData.preferred_contact === method.value 
                              ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)'
                              : 'rgba(255,255,255,0.05)',
                            border: formData.preferred_contact === method.value 
                              ? 'none'
                              : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 10,
                            color: 'white',
                            fontWeight: 600,
                            fontSize: 14,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={{ display: 'block', color: 'white', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions?"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        color: 'white',
                        fontSize: 15,
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(207,20,43,0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: loading ? 'rgba(207,20,43,0.5)' : 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 12,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10
                    }}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Continue to Payment
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {step === 2 && orderData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
                  Select <span className="text-gradient">Payment Method</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                  Your order has been created. Complete your payment to activate your subscription.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, maxWidth: 800, margin: '0 auto' }}>
                <div className="glass-card" style={{ padding: 32 }}>
                  <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '1.1rem' }}>Order Summary</h3>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Plan</span>
                      <span style={{ color: 'white', fontWeight: 600 }}>{orderData.plan}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Order Number</span>
                      <span style={{ color: 'white', fontWeight: 600 }}>{orderData.order_number}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>Customer</span>
                      <span style={{ color: 'white' }}>{orderData.customer_name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ color: 'white', fontWeight: 600 }}>Total (Monthly)</span>
                      <span style={{ color: '#CF142B', fontWeight: 800, fontSize: '1.5rem' }}>${orderData.plan_price}</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card" style={{ padding: 32 }}>
                  <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 16, fontSize: '1.1rem' }}>Payment Method</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <button
                      onClick={() => setPaymentMethod('razorpay')}
                      style={{
                        padding: '16px 20px',
                        background: paymentMethod === 'razorpay' 
                          ? 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)'
                          : 'rgba(255,255,255,0.03)',
                        border: paymentMethod === 'razorpay' 
                          ? '1px solid rgba(207,20,43,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: paymentMethod === 'razorpay' ? '#CF142B' : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <CreditCard size={20} style={{ color: 'white' }} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ color: 'white', fontWeight: 600 }}>Razorpay</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Credit/Debit Card, UPI, Net Banking</div>
                      </div>
                      {paymentMethod === 'razorpay' && (
                        <CheckCircle size={20} style={{ color: '#34D399', marginLeft: 'auto' }} />
                      )}
                    </button>

                    <button
                      onClick={() => setPaymentMethod('paypal')}
                      style={{
                        padding: '16px 20px',
                        background: paymentMethod === 'paypal' 
                          ? 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.1) 100%)'
                          : 'rgba(255,255,255,0.03)',
                        border: paymentMethod === 'paypal' 
                          ? '1px solid rgba(207,20,43,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: paymentMethod === 'paypal' ? '#CF142B' : 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>PP</span>
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ color: 'white', fontWeight: 600 }}>PayPal</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Pay with your PayPal account</div>
                      </div>
                      {paymentMethod === 'paypal' && (
                        <CheckCircle size={20} style={{ color: '#34D399', marginLeft: 'auto' }} />
                      )}
                    </button>
                  </div>

                  {paymentError && (
                    <div style={{ 
                      background: 'rgba(239,68,68,0.1)', 
                      border: '1px solid rgba(239,68,68,0.3)',
                      borderRadius: 10,
                      padding: '12px 16px',
                      marginTop: 16,
                      color: '#EF4444',
                      fontSize: 14
                    }}>
                      {paymentError}
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={paymentLoading}
                    style={{
                      width: '100%',
                      padding: '16px 32px',
                      background: paymentLoading ? 'rgba(207,20,43,0.5)' : 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                      border: 'none',
                      borderRadius: 12,
                      color: 'white',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: paymentLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 10,
                      marginTop: 20
                    }}
                  >
                    {paymentLoading ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ${orderData.plan_price}/month
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8, 
                    justifyContent: 'center',
                    marginTop: 16,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 13
                  }}>
                    <Shield size={16} />
                    <span>Secure payment powered by {paymentMethod === 'razorpay' ? 'Razorpay' : 'PayPal'}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    fontSize: 14
                  }}
                >
                  ← Back to details
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && orderSuccess && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #34D399 0%, #10B981 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px'
              }}>
                <CheckCircle size={40} style={{ color: 'white' }} />
              </div>
              
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
                Subscription <span className="text-gradient">Activated!</span>
              </h1>
              
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
                Thank you for subscribing to {orderData?.plan}. We'll be in touch within 24 hours to set up your account.
              </p>

              {orderData && (
                <div className="glass-card" style={{ padding: 32, maxWidth: 500, margin: '0 auto 32px', textAlign: 'left' }}>
                  <h3 style={{ color: 'white', fontWeight: 700, marginBottom: 20 }}>Order Details</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Order Number</span>
                    <span style={{ color: 'white', fontWeight: 600 }}>{orderData.order_number}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Plan</span>
                    <span style={{ color: 'white' }}>{orderData.plan}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Amount</span>
                    <span style={{ color: '#CF142B', fontWeight: 800 }}>${orderData.plan_price}/month</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Status</span>
                    <span style={{ color: '#34D399', fontWeight: 600 }}>Active</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/" className="btn-primary">Go to Homepage</a>
                <a href="/contact" className="btn-secondary">Contact Us</a>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}