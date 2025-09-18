import dbConnect from '../../../lib/dbConnect';
import Slider from '../../../models/Slider';

export async function GET() {
    await dbConnect();
    try {
        const sliders = await Slider.find({ status: 'active' }).sort({ order: 1, createdAt: -1 });
        return Response.json(sliders);
    } catch (error) {
        console.error('Slider API error:', error);
        return Response.json({ error: 'Failed to fetch sliders', details: typeof error === 'object' && error !== null ? (error as Error).message : String(error) }, { status: 500 });
    }
}
