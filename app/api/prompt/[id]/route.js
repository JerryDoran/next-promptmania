import { connectDB } from '@lib/dbConnect';
import Prompt from '@models/Prompt';

// this is a lamda function meaning it spins up when its called then dies after the request was
// completed and a response was returned
export async function GET(req, { params }) {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch the prompt', { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();

  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to update the prompt', { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to delete the prompt', { status: 500 });
  }
}
