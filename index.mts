export default async function() {
  console.log('DEEPSEEK_API_KEY:', process.env.DEEPSEEK_API_KEY);
  return {
    status: 'success',
    apiKey: process.env.DEEPSEEK_API_KEY
  };
}