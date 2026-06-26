import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // 1. Extract bearer token from headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, message: 'Missing token' });
            return;
        }
        const token = authHeader.split(' ')[1];

        if (!mongoose.connection.db) {
            console.error("❌ Database connection is not established yet.");
            res.status(500).json({ success: false, message: "Database connection error" });
            return;
        }
        // 2. Query the raw 'session' collection created by Better Auth
        const session = await mongoose.connection.db
            .collection('session')
            .findOne({ token: token });

        if (!session) {
            res.status(401).json({ success: false, message: 'Invalid session' });
            return;
        }

        // 3. Verify expiration timestamp
        if (new Date() > new Date(session.expiresAt)) {
            res.status(401).json({ success: false, message: 'Session expired' });
            return;
        }

        // 4. Store the user's ID string directly into req.body as requested
        req.body.userId = session.userId.toString();

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, message: 'Server auth error' });
    }
};