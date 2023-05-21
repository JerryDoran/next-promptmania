import { connectDB } from '@lib/dbConnect';
import Prompt from '@models/Prompt';

// this is a lamda function meaning it spins up when its called then dies after the request was
// completed and a response was returned
export async function POST(req, res) {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
}
