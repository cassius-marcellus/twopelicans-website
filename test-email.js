const { Resend } = require('resend');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testEmail() {
  console.log('Testing Resend email configuration...\n');
  
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'hello@send.twopelicans.ai';
  const toEmail = process.env.EMAIL_TO || 'ray@twopelicans.ai';
  
  console.log('Configuration:');
  console.log('- API Key exists:', !!apiKey);
  console.log('- API Key length:', apiKey?.length);
  console.log('- From:', fromEmail);
  console.log('- To:', toEmail);
  console.log('');
  
  if (!apiKey) {
    console.error('ERROR: RESEND_API_KEY not found in .env.local');
    return;
  }
  
  const resend = new Resend(apiKey);
  
  try {
    console.log('Sending test email...');
    const data = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: 'Test Email from TwoPelicans.ai',
      html: '<h1>Test Email</h1><p>This is a test email from your TwoPelicans.ai contact form.</p><p>If you receive this, your email configuration is working correctly!</p>',
    });
    
    console.log('\n✅ Email sent successfully!');
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('\n❌ Failed to send email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

testEmail();