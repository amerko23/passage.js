/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//lightbox modal
const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  const handleBackdropClick = () => {
    onClose();
  };
  const handleContentClick = event => {
    event.stopPropagation();
  };
  return (
    <div style={modalStyle} onClick={handleBackdropClick}>
      <div style={modalContentStyle} onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};
const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
};

const Passage = ({ props }) => {
  const [clientToken, setClientToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  //Fetch clientToken from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/fetch-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
        if (data.error_no === 'S00') {
          setClientToken(data.clientToken);
        } else {
          const error = () => {
            toast.error(<div>Error: Unable to generate token. Please check request parameters.</div>, {
              position: toast.POSITION.TOP_RIGHT,
            });
          };
          error();
        }
      } catch (error) {
        const err = () => {
          toast.error(<div> Error: Unable to connect to the server. Please try again later.</div>, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
        err();
      }
    };

    fetchData();
  }, []);

  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  //Form input handlers
  const handlePhoneInputChange = e => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    let formattedInput;
    if (input.length < 4) {
      formattedInput = input;
    } else if (input.length < 7) {
      formattedInput = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else {
      formattedInput = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
    }
    setFormValues({ ...formValues, phoneNumber: formattedInput });
  };

  const handleCardNumberChange = e => {
    let input = e.target.value.replace(/\D/g, ''); // Allow only digits
    input = input.substring(0, 16); // Limit to 16 digits

    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) formattedInput += ' ';
      formattedInput += input.charAt(i);
    }

    setFormValues(prevState => ({
      ...prevState,
      cardNumber: formattedInput,
    }));
  };

  const handleExpiryDateChange = e => {
    let input = e.target.value.replace(/\D/g, '');
    input = input.substring(0, 4);

    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }

    setFormValues({ ...formValues, expiryDate: input });
  };
  const validateExpiryDate = value => {
    if (value.length !== 5) return false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    const [month, year] = value.split('/').map(Number);

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Expiry date cannot be in the past';
    }

    return true;
  };
  const handleCvvChange = e => {
    const input = e.target.value.replace(/\D/g, '');
    const trimmedInput = input.substring(0, 3);

    setFormValues({ ...formValues, cvv: trimmedInput });
  };

  const {
    'data-variant': variant,
    'data-submitText': submitText,
    'data-submitBg': submitBg,
    'data-submitColor': submitColor,
    'data-valorLogo': valorLogo,
    'data-cardholdName': cardholdName,
    'data-email': email,
    'data-phone': phone,
    'data-billingAddress': billingAddress,
    'data-defaultCardholderName': defaultCardholderName,
    'data-defaultEmail': defaultEmail,
    'data-defaultPhone': defaultPhone,
    'data-defaultAddress1': defaultAddress1,
    'data-defaultAddress2': defaultAddress2,
    'data-defaultCity': defaultCity,
    'data-defaultState': defaultState,
  } = props;

  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' },
  ];

  const [showModal, setShowModal] = useState(false);

  //lightbox: check if fields are valid before showing modal
  const checkFormErrors = async () => {
    const result = await trigger(['email', 'phone', 'address1', 'city', 'state', 'zip']);
    if (result) {
      setShowModal(true);
    }
  };

  const onSubmit = async data => {
    try {
      const response = await fetch('http://localhost:3001/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, clientToken }),
      });

      const responseData = await response.json();
      if (response.ok) {
        await performSale(responseData.cardToken, data);
      } else {
        const error = () => {
          toast.error(<div>Error: Card Details Incorrect.</div>, {
            position: toast.POSITION.TOP_RIGHT,
          });
        };
        error();
      }
    } catch (error) {
      const err = () => {
        toast.error(<div> Error: Unable to connect to the server. Please try again later.</div>, {
          position: toast.POSITION.TOP_RIGHT,
        });
      };
      err();
    }
  };

  //Call Sale API
  const performSale = async (cardToken, saleData) => {
    const saleDetails = {
      txn_type: 'sale',
      token: cardToken,
      amount: saleData.amount,
      surchargeIndicator: '0',
      surchargeAmount: '5.00',
      phone: saleData.phone,
      address1: saleData.address1,
      address2: saleData.address2,
      city: saleData.city,
      state: 'NY',
      shipping_country: 'US',
      billing_country: 'US',
      zip: saleData.zip,
      email: saleData.email,
      customer_sms: 1,
      merchant_email: 1,
    };

    try {
      const response = await fetch('http://localhost:3001/sale-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleDetails),
      });

      const responseData = await response.json();
      if (response.ok && responseData.error_no === 'S00') {
        // Handle successful response
        toast.success(
          <div>
            Payment Successful
            <br />
            Amount: ${responseData.amount}
            <br />
            Tran No: {responseData.tran_no}
            <br />
            Approval Code: {responseData.approval_code}
            <br />
            Transaction Status: {responseData.msg}
          </div>,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
        reset();
        setFormValues({
          phoneNumber: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        });
        setShowModal(false);
      } else {
        // General error handling for unsuccessful responses
        toast.error(
          <div>
            Unable To Make Payment
            <br />
            Message: {responseData.msg}
          </div>,
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } catch (error) {
      // Handle network or other unexpected errors
      toast.error(<div>Error: Unable to connect to the server. Please try again later.</div>, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {variant !== 'lightbox' ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-container'>
            {valorLogo && <img src='https://valorpaytech.com/wp-content/uploads/2019/11/Valor_PayTech_Logo_Medium.png' alt='' />}
            {email && (
              <>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                   type='email'
                   className='form-control' 
                   {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                       message: 'Invalid email format' 
                      }
                    })}
                   placeholder={defaultEmail || 'abc@xyz.com'}
                  />
                  {errors.email && <span style={{ color: '#fc5a4e' }}>{errors.email.message}</span>}
                </div>
                <br />
              </>
            )}
            {phone && (
              <>
                <div className='form-group'>
                  <label>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                        message: 'Invalid phone format',
                      },
                    })}
                    value={formValues.phoneNumber || ''}
                    onChange={handlePhoneInputChange}
                    placeholder={defaultPhone || '(123) 123-1234'}
                  />
                  {errors.phone && <span style={{ color: '#fc5a4e' }}>{errors.phone.message}</span>}
                </div>
                <br />
              </>
            )}
            {billingAddress && (
              <>
                <div className='form-section'>
                  <label>Billing Address</label>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address1', { required: 'Address line 1 is required' })} placeholder={defaultAddress1 || 'Address line 1'} />
                    {errors.address1 && <span style={{ color: '#fc5a4e' }}>{errors.address1.message}</span>}
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address2')} placeholder={defaultAddress2 || 'Address line 2'} />
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input type='text' className='form-control' {...register('city', { required: 'City is required' })} placeholder={defaultCity || 'City'} />
                      {errors.city && <span style={{ color: '#fc5a4e' }}>{errors.city.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <select className='form-control' {...register('state', { required: 'State is required' })} defaultValue={defaultState || ''}>
                        <option value='' disabled>
                          {defaultState ? defaultState : 'Select State'}
                        </option>
                        {states.map(state => (
                          <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span style={{ color: '#fc5a4e' }}>{errors.state.message}</span>}
                    </div>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('zip', { required: 'Zip Code is required', pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid zip code format' } })} placeholder='Zip Code' />
                    {errors.zip && <span style={{ color: '#fc5a4e' }}>{errors.zip.message}</span>}
                  </div>
                </div>
                <br />
              </>
            )}
            <div className='form-section'>
              <label>Card Information</label>
              <div className='form-group'>
                <input
                  type='text'
                  className='form-control'
                  {...register('cardNumber', {
                    required: 'Card Number is required',
                    pattern: {
                      value: /^(\d{4} ){3}\d{4}$/,
                      message: 'Invalid card number format',
                    },
                  })}
                  value={formValues.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder='Card Number'
                />
                {errors.cardNumber && <span style={{ color: '#fc5a4e' }}>{errors.cardNumber.message}</span>}
              </div>
              <div className='form-row'>
                <div className='form-group half-width'>
                  <input
                    type='text'
                    className='form-control'
                    {...register('expiryDate', {
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: 'Invalid expiry date format',
                      },
                      validate: validateExpiryDate,
                    })}
                    value={formValues.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder='MM/YY'
                  />
                  {errors.expiryDate && <span style={{ color: '#fc5a4e' }}>{errors.expiryDate.message}</span>}
                </div>
                <div className='form-group half-width'>
                  <input
                    type='text'
                    className='form-control'
                    {...register('cvv', {
                      required: 'CVV is required',
                      pattern: {
                        value: /^\d{3}$/,
                        message: 'Invalid CVV format. Must be 3 digits.',
                      },
                    })}
                    value={formValues.cvv}
                    onChange={handleCvvChange}
                    placeholder='CVV'
                  />
                  {errors.cvv && <span style={{ color: '#fc5a4e' }}>{errors.cvv.message}</span>}
                </div>
              </div>
            </div>
            <br />
            {cardholdName && (
              <>
                <div className='form-group'>
                  <label>Name on Card</label>
                  <input type='text' className='form-control' {...register('cardholderName', { required: 'Name on card is required' })} placeholder={defaultCardholderName || 'Name on Card'} />
                  {errors.cardholderName && <span style={{ color: '#fc5a4e' }}>{errors.cardholderName.message}</span>}
                </div>
                <br />
              </>
            )}
            <div className='form-group'>
              <label>Amount</label>
              <input
                type='text'
                className='form-control'
                {...register('amount', {
                  required: 'Amount is required',
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d{0,2})?$/,
                    message: 'Invalid amount format. Only numbers up to two decimal places are allowed.',
                  },
                  validate: value => (parseFloat(value) >= 0.1 && parseFloat(value) <= 99999.99) || 'Amount must be between 0.1 and 99,999.99',
                })}
                onChange={e => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

                  if (!value.includes('.') && value.length > 5) {
                    value = value.substr(0, 5) + '.' + value.substr(5, value.length);
                  }

                  const parts = value.split('.');
                  if (parts[0].length > 5) parts[0] = parts[0].substr(0, 5);
                  if (parts[1] && parts[1].length > 2) parts[1] = parts[1].substr(0, 2);
                  value = parts.join('.');

                  e.target.value = value;
                }}
                placeholder='Amount'
              />
              {errors.amount && <span style={{ color: '#fc5a4e' }}>{errors.amount.message}</span>}
            </div>
            <br />
            <div className='form-group'>
              <label className='policy'>
                <input type='checkbox' {...register('agreement', { required: 'You must agree to the terms' })} />
                <span style={{ display: 'inline-block', width: '8px' }}></span>I agree to the Valor Payments Terms of Service &amp;{' '}
                <a href='https://valorpaytech.com/privacy-policy/' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
                  Privacy Policy.
                </a>
              </label>
              {errors.agreement && <div style={{ color: '#fc5a4e', marginTop: '8px' }}>{errors.agreement.message}</div>}
            </div>
            <br />
            {/* Submit button */}
            <div className='form-group'>
              <button
                type='submit'
                className='submit-button'
                style={{
                  backgroundColor: submitBg || '#0056b3',
                  color: submitColor || '#FFFFFF',
                }}>
                {submitText || 'Buy Now'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        //lightbox attribute style
        <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: '#fff' }}>
          <div className='form-container'>
            {valorLogo && <img src='https://valorpaytech.com/wp-content/uploads/2019/11/Valor_PayTech_Logo_Medium.png' alt='' />}
            {/* Email input */}
            {email && (
              <>
                <div className='form-group'>
                  <label>Email</label>
                  <input type='email' className='form-control' {...register('email', { required: 'Email is required', pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' } })} placeholder={defaultEmail || 'abc@xyz.com'} />
                  {errors.email && <span style={{ color: '#fc5a4e' }}>{errors.email.message}</span>}
                </div>
                <br />
              </>
            )}
            {/* Phone input */}
            {phone && (
              <>
                <div className='form-group'>
                  <label>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: {
                        value: /^\(\d{3}\) \d{3}-\d{4}$/,
                        message: 'Invalid phone format',
                      },
                    })}
                    value={formValues.phoneNumber || ''}
                    onChange={handlePhoneInputChange}
                    placeholder={defaultPhone || '(123) 123-1234'}
                  />
                  {errors.phone && <span style={{ color: '#fc5a4e' }}>{errors.phone.message}</span>}
                </div>
                <br />
              </>
            )}
            {/* Billing Address section */}
            {billingAddress && (
              <>
                <div className='form-section'>
                  <label>Billing Address</label>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address1', { required: 'Address line 1 is required' })} placeholder={defaultAddress1 || 'Address line 1'} />
                    {errors.address1 && <span style={{ color: '#fc5a4e' }}>{errors.address1.message}</span>}
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('address2')} placeholder={defaultAddress2 || 'Address line 2'} />
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input type='text' className='form-control' {...register('city', { required: 'City is required' })} placeholder={defaultCity || 'City'} />
                      {errors.city && <span style={{ color: '#fc5a4e' }}>{errors.city.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <select className='form-control' {...register('state', { required: 'State is required' })} defaultValue={defaultState || ''}>
                        <option value='' disabled>
                          Select State
                        </option>
                        {states.map(state => (
                          <option key={state.abbreviation} value={state.abbreviation}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {errors.state && <span style={{ color: '#fc5a4e' }}>{errors.state.message}</span>}
                    </div>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-control' {...register('zip', { required: 'Zip Code is required', pattern: { value: /^\d{5}(-\d{4})?$/, message: 'Invalid zip code format' } })} placeholder='Zip Code' />
                    {errors.zip && <span style={{ color: '#fc5a4e' }}>{errors.zip.message}</span>}
                  </div>
                </div>
                <br />
              </>
            )}
            {/* Submit button */}
            <div className='form-group'>
              <button
                type='button'
                className='submit-button'
                onClick={checkFormErrors}
                style={{
                  backgroundColor: submitBg || '#0056b3',
                  color: submitColor || '#FFFFFF',
                }}>
                Pay Now
              </button>
            </div>
            <div>
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                {/* Card Information section */}
                <div className='form-section'>
                  <label>Card Information</label>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      {...register('cardNumber', {
                        required: 'Card Number is required',
                        pattern: {
                          value: /^(\d{4} ){3}\d{4}$/,
                          message: 'Invalid card number format',
                        },
                      })}
                      value={formValues.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder='Card Number'
                    />
                    {errors.cardNumber && <span style={{ color: '#fc5a4e' }}>{errors.cardNumber.message}</span>}
                  </div>
                  <div className='form-row'>
                    <div className='form-group half-width'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('expiryDate', {
                          required: 'Expiry date is required',
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                            message: 'Invalid expiry date format',
                          },
                          validate: validateExpiryDate,
                        })}
                        value={formValues.expiryDate}
                        onChange={handleExpiryDateChange}
                        placeholder='MM/YY'
                      />
                      {errors.expiryDate && <span style={{ color: '#fc5a4e' }}>{errors.expiryDate.message}</span>}
                    </div>
                    <div className='form-group half-width'>
                      <input
                        type='text'
                        className='form-control'
                        {...register('cvv', {
                          required: 'CVV is required',
                          pattern: {
                            value: /^\d{3}$/,
                            message: 'Invalid CVV format. Must be 3 digits.',
                          },
                        })}
                        value={formValues.cvv}
                        onChange={handleCvvChange}
                        placeholder='CVV'
                      />
                      {errors.cvv && <span style={{ color: '#fc5a4e' }}>{errors.cvv.message}</span>}
                    </div>
                  </div>
                </div>
                <br />
                {/* Card Name */}
                {cardholdName && (
                  <>
                    <div className='form-group'>
                      <label>Name on Card</label>
                      <input type='text' className='form-control' {...register('cardholderName', { required: 'Name on card is required' })} placeholder={defaultCardholderName || 'Name on Card'} />
                      {errors.cardholderName && <span style={{ color: '#fc5a4e' }}>{errors.cardholderName.message}</span>}
                    </div>
                    <br />
                  </>
                )}
                {/* Amount Input */}
                <div className='form-group'>
                  <label>Amount</label>
                  <input
                    type='text'
                    className='form-control'
                    {...register('amount', {
                      required: 'Amount is required',
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d{0,2})?$/,
                        message: 'Invalid amount format. Only numbers up to two decimal places are allowed.',
                      },
                      validate: value => (parseFloat(value) >= 0.1 && parseFloat(value) <= 99999.99) || 'Amount must be between 0.1 and 99,999.99',
                    })}
                    onChange={e => {
                      let value = e.target.value;
                      // Allow only numbers and a single decimal point
                      value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

                      // Check the length and format the value accordingly
                      if (!value.includes('.') && value.length > 5) {
                        value = value.substr(0, 5) + '.' + value.substr(5, value.length);
                      }

                      // Limit to 5 digits before the decimal and 2 digits after
                      const parts = value.split('.');
                      if (parts[0].length > 5) parts[0] = parts[0].substr(0, 5);
                      if (parts[1] && parts[1].length > 2) parts[1] = parts[1].substr(0, 2);
                      value = parts.join('.');

                      e.target.value = value;
                    }}
                    placeholder='Amount'
                  />
                  {errors.amount && <span style={{ color: '#fc5a4e' }}>{errors.amount.message}</span>}
                </div>
                <br />
                {/* Agreement checkbox */}
                <div className='form-group'>
                  <label className='policy'>
                    <input type='checkbox' {...register('agreement', { required: 'You must agree to the terms' })} />I agree to the Valor Payments Terms of Service &amp;{' '}
                    <a href='https://valorpaytech.com/privacy-policy/' target='_blank' rel='noopener noreferrer' style={{ textDecoration: 'underline', color: 'blue' }}>
                      Privacy Policy.
                    </a>
                  </label>
                  {errors.agreement && <div style={{ color: '#fc5a4e', marginTop: '8px' }}>{errors.agreement.message}</div>}
                </div>
                <br />
                {/* Submit button */}
                <div className='form-group'>
                  <button
                    type='submit'
                    className='submit-button'
                    style={{
                      backgroundColor: submitBg || '#0056b3',
                      color: submitColor || '#FFFFFF',
                    }}>
                    {submitText || 'Buy Now'}
                  </button>
                </div>
                <br />
                {/* Cancel button */}
                <div className='form-group'>
                  <button
                    type='text'
                    className='submit-button'
                    onClick={() => setShowModal(false)}
                    style={{
                      backgroundColor: '#fc5a4e',
                      color: '#FFFFFF',
                    }}>
                    Cancel
                  </button>
                </div>
              </Modal>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Passage;
