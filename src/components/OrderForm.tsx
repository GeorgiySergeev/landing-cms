import { useState, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';
import styles from './OrderForm.module.css';

export interface OrderFormProps {
  productName?: string;
  productPrice?: string;
  discountPercent?: string;
  oldPrice?: string;
  currency?: string;
  language?: string;
  country?: string;
  formId?: string;
  submitUrl?: string;
}

const OrderForm = ({
  productName = 'Product',
  productPrice = '100',
  discountPercent = '50',
  oldPrice = '200',
  currency = 'USD',
  language = 'en',
  country = 'us',
  formId = 'order_form',
  submitUrl = '#',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [formNumber, setFormNumber] = useState(0);
  const [currentDate, setCurrentDate] = useState('');

  // Language-specific text
  const texts = {
    en: {
      formTitle: 'The official application form',
      productOffer: `To order "${productName}" for ${productPrice} ${currency}, write your Name and Contact phone number in the fields below and click on "ORDER FOR ${productPrice} ${currency}"`,
      nameLabel: 'Your name:',
      namePlaceholder: 'Your name:',
      phoneLabel: 'Your phone number:',
      phonePlaceholder: 'Your phone number:',
      submitButton: `ORDER FOR ${productPrice} ${currency}`,
      confidential:
        '* Confidential. Your information will only be used for ordering and delivery.',
      toReceive: `To receive ${productName}`,
    },
    ar: {
      formTitle: 'نموذج الطلب الرسمي',
      productOffer: `لطلب "${productName}" مقابل ${productPrice} ${currency}، اكتب اسمك ورقم هاتفك في الحقول أدناه واضغط على "اطلب مقابل ${productPrice} ${currency}"`,
      nameLabel: 'اسمك:',
      namePlaceholder: 'اسمك:',
      phoneLabel: 'رقم هاتفك:',
      phonePlaceholder: 'رقم هاتفك:',
      submitButton: `اطلب مقابل ${productPrice} ${currency}`,
      confidential: '* سري. سيتم استخدام معلوماتك فقط للطلب والتسليم.',
      toReceive: `للحصول على ${productName}`,
    },
    bn: {
      formTitle: 'অফিসিয়াল আবেদন ফর্ম',
      productOffer: `"${productName}" অর্ডার করতে ${productPrice} ${currency} এর জন্য, নিচের ঘরগুলিতে আপনার নাম এবং যোগাযোগের ফোন নম্বর লিখুন এবং "${productPrice} ${currency} এর জন্য অর্ডার করুন" এ ক্লিক করুন`,
      nameLabel: 'আপনার নাম:',
      namePlaceholder: 'আপনার নাম লিখুন',
      phoneLabel: 'আপনার মোবাইল নম্বর:',
      phonePlaceholder: 'আপনার মোবাইল নম্বর',
      submitButton: `${productPrice} ${currency} এর জন্য অর্ডার করুন`,
      confidential:
        '* গোপনীয়। আপনার তথ্য শুধুমাত্র অর্ডার ও ডেলিভারির জন্য ব্যবহৃত হবে।',
      toReceive: `${productName} পেতে`,
    },
  };

  const currentLanguage =
    language === 'ar' ? 'ar' : language === 'bn' ? 'bn' : 'en';
  const t = texts[currentLanguage];

  // Initialize form number and date
  useEffect(() => {
    // Random form number between 29000 and 30000
    const randomFormNumber = Math.floor(Math.random() * 1000) + 29000;
    setFormNumber(randomFormNumber);

    // Generate future date (current date + 1 month)
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    setCurrentDate(`${day}.${month}.${year}`);
  }, []);

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (phone.length < 5) {
      alert('Please enter a valid phone number');
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('product_name', productName);
    formData.append('product_price', productPrice);
    formData.append('currency', currency);
    formData.append('country', country);
    formData.append('language', language);

    // Handle form submission
    if (submitUrl === '#') {
      console.log('Form submitted with data:', Object.fromEntries(formData));
      alert('Thank you for your order! We will contact you soon.');
    } else {
      // Submit to actual URL
      fetch(submitUrl, {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          alert('Thank you for your order! We will contact you soon.');
        })
        .catch(error => {
          console.error('Error:', error);
          alert('There was an error submitting your order. Please try again.');
        });
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.content}>
        {/* Logo */}
        <img
          src="/images/product-image.png"
          alt="Logo"
          className={styles.productImage}
        />

        {/* Form Title */}
        <h1 className={styles.formTitle}>{t.formTitle}</h1>
        <div className={styles.formNumber}>
          №{formNumber} 957 of 30 000 from {currentDate}
        </div>

        <div className={styles.toReceive}>{t.toReceive}</div>

        {/* Product Offer Box */}
        <div className={styles.offerBox}>{t.productOffer}</div>

        {/* Order Form */}
        <form onSubmit={handleSubmit} id={formId}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              {t.nameLabel}
            </label>
            <input
              name="name"
              id="name"
              placeholder={t.namePlaceholder}
              required
              type="text"
              value={name}
              onChange={e => setName((e.target as HTMLInputElement).value)}
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>
              {t.phoneLabel}
            </label>
            <input
              minLength={5}
              name="phone"
              id="phone"
              placeholder={t.phonePlaceholder}
              required
              type="tel"
              value={phone}
              onChange={e => setPhone((e.target as HTMLInputElement).value)}
              className={styles.formInput}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {t.submitButton}
          </button>

          <div className={styles.confidentialText}>{t.confidential}</div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
