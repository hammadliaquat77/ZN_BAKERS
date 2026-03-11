import { NextResponse } from 'next/server'
import crypto from 'crypto'

// JazzCash Payment Integration
export async function POST(request) {
  try {
    const { amount, orderId, customerName, customerPhone, customerEmail } = await request.json()

    const merchantId = process.env.JAZZCASH_MERCHANT_ID
    const password = process.env.JAZZCASH_PASSWORD
    const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT
    const returnUrl = process.env.JAZZCASH_RETURN_URL

    // Generate transaction reference
    const txnRefNo = `T${Date.now()}`
    const txnDateTime = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    const txnExpiryDateTime = new Date(Date.now() + 3600000).toISOString().replace(/[-:T.Z]/g, '').slice(0, 14)
    const amountInPaisa = Math.round(amount * 100) // JazzCash needs paisa

    // Build hash string (alphabetical order)
    const hashData = [
      integritySalt,
      amountInPaisa,
      '',        // BillReference
      '',        // Description
      'PKR',     // Currency
      merchantId,
      '',        // MobileAccount
      password,
      returnUrl,
      txnDateTime,
      txnExpiryDateTime,
      txnRefNo,
    ].join('&')

    const secureHash = crypto.createHmac('sha256', integritySalt)
      .update(hashData)
      .digest('hex')
      .toUpperCase()

    const paymentData = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: merchantId,
      pp_Password: password,
      pp_TxnRefNo: txnRefNo,
      pp_Amount: amountInPaisa.toString(),
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: txnDateTime,
      pp_BillReference: orderId,
      pp_Description: `ZN Bakers Order #${orderId}`,
      pp_TxnExpiryDateTime: txnExpiryDateTime,
      pp_ReturnURL: returnUrl,
      pp_SecureHash: secureHash,
      ppmpf_1: customerName,
      ppmpf_2: customerPhone,
      ppmpf_3: customerEmail || '',
    }

    return NextResponse.json({
      paymentUrl: 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/',
      paymentData,
      txnRefNo,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// Handle JazzCash callback
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('pp_ResponseCode')
  const txnRef = searchParams.get('pp_TxnRefNo')

  if (status === '000') {
    // Payment successful - update order in DB
    return NextResponse.redirect(new URL(`/payment/success?ref=${txnRef}`, request.url))
  } else {
    return NextResponse.redirect(new URL(`/payment/failed?ref=${txnRef}`, request.url))
  }
}
