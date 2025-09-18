import dbConnect from "../../../lib/dbConnect";
import Category from "../../../models/Categories";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const categories = await Category.find({ status: "active" });
        return Response.json(categories);
    } catch (error) {
        return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}
