import dbConnect from '../../../lib/dbConnect';
import Merchant from '../../../models/Merchant';
import '../../../models/Categories'; // Ensure Category model is registered

export async function GET() {
    await dbConnect();
    try {
        const merchants = await Merchant.find({ status: 'active' })
            .sort({ createdAt: -1 })
            .populate('category');
        return Response.json(merchants);
    } catch (error) {
        console.error('Merchant API error:', error);
        return Response.json({ error: 'Failed to fetch merchants', details: typeof error === 'object' && error !== null ? (error as Error).message : String(error) }, { status: 500 });
    }
}
