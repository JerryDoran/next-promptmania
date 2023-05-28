import { connectDB } from '@lib/dbConnect';
import Prompt from '@models/Prompt';

// this is a lamda function meaning it spins up when its called then dies after the request was
// completed and a response was returned
export async function GET(req, res) {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
}
